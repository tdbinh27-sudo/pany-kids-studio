/**
 * @file app/api/admin/families/route.ts
 * @description Admin GET — list provisioned families with filters + stats.
 *              Auth via ADMIN_SECRET (same as signup-requests route).
 * @reference D-022 (trial monitoring), D-026 (B2B carve-out)
 *
 * Query params:
 *   ?status=active|suspended|archived
 *   ?tier=free-trial|basic|pro|premium|enterprise
 *   ?trial=active|expiring_7d|expiring_14d|expired
 *   ?search=<text>     — match name or slug
 *   ?limit=50          — default 50, max 200
 *   ?include_stats=1   — include dashboard stats payload
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getDashboardStats } from '@/lib/family-stats';

export const runtime = 'nodejs';

function checkAdminAuth(req: Request): { ok: boolean; reason?: string } {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    return { ok: false, reason: 'ADMIN_SECRET not configured' };
  }
  const url = new URL(req.url);
  const secret = url.searchParams.get('secret') ?? req.headers.get('x-admin-secret');
  if (secret !== adminSecret) {
    return { ok: false, reason: 'Forbidden' };
  }
  return { ok: true };
}

export async function GET(req: Request) {
  const auth = checkAdminAuth(req);
  if (!auth.ok) {
    const code = auth.reason === 'ADMIN_SECRET not configured' ? 503 : 401;
    return NextResponse.json({ ok: false, error: auth.reason, families: [] }, { status: code });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Skeleton mode — return zero state with stats payload
  if (!supabaseUrl || !serviceRoleKey) {
    const stats = await getDashboardStats();
    return NextResponse.json({
      ok: false,
      error: 'Supabase chưa setup — chưa có dữ liệu families. Cần apply P1 migration trước.',
      families: [],
      stats,
    }, { status: 503 });
  }

  const sb = createClient(supabaseUrl, serviceRoleKey);

  const url = new URL(req.url);
  const statusFilter = url.searchParams.get('status');
  const tierFilter = url.searchParams.get('tier');
  const trialFilter = url.searchParams.get('trial');
  const search = url.searchParams.get('search')?.trim() ?? '';
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50', 10), 200);
  const includeStats = url.searchParams.get('include_stats') === '1';

  let query = sb
    .from('families')
    .select(`
      id,
      slug,
      name,
      owner_user_id,
      status,
      tier,
      trial_started_at,
      trial_ends_at,
      created_at,
      family_settings:family_settings(target_years, age_min, age_max, max_kids, chatbot_name, monthly_chat_cap, monthly_chat_used),
      family_kids(id, name, age, active)
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (statusFilter) query = query.eq('status', statusFilter);
  if (tierFilter) query = query.eq('tier', tierFilter);
  if (search) query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%`);

  if (trialFilter) {
    const now = new Date();
    const nowIso = now.toISOString();
    if (trialFilter === 'expired') {
      query = query.eq('tier', 'free-trial').lt('trial_ends_at', nowIso);
    } else if (trialFilter === 'expiring_7d') {
      const in7d = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
      query = query.eq('tier', 'free-trial').gt('trial_ends_at', nowIso).lt('trial_ends_at', in7d);
    } else if (trialFilter === 'expiring_14d') {
      const in14d = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();
      query = query.eq('tier', 'free-trial').gt('trial_ends_at', nowIso).lt('trial_ends_at', in14d);
    } else if (trialFilter === 'active') {
      query = query.eq('tier', 'free-trial').gt('trial_ends_at', nowIso);
    }
  }

  const { data: families, error } = await query;
  if (error) {
    return NextResponse.json({ ok: false, error: error.message, families: [] }, { status: 500 });
  }

  // Transform — flatten family_settings + add derived kid_count
  type FamilyRow = {
    id: string;
    slug: string;
    name: string;
    owner_user_id: string | null;
    status: string;
    tier: string;
    trial_started_at: string | null;
    trial_ends_at: string | null;
    created_at: string;
    family_settings: Array<{ target_years: number; age_min: number; age_max: number; max_kids: number; chatbot_name: string; monthly_chat_cap: number; monthly_chat_used: number }> | null;
    family_kids: Array<{ id: string; name: string; age: number; active: boolean }> | null;
  };
  const transformed = (families as FamilyRow[] | null ?? []).map(f => {
    const settings = Array.isArray(f.family_settings) ? f.family_settings[0] : f.family_settings;
    const kids = f.family_kids ?? [];
    const activeKids = kids.filter(k => k.active);
    return {
      id: f.id,
      slug: f.slug,
      name: f.name,
      owner_user_id: f.owner_user_id,
      status: f.status,
      tier: f.tier,
      trial_started_at: f.trial_started_at,
      trial_ends_at: f.trial_ends_at,
      created_at: f.created_at,
      settings: settings ?? null,
      kids_count: activeKids.length,
      kids_ages: activeKids.map(k => k.age),
      kid_names: activeKids.map(k => k.name),
      // Derived: days remaining in trial
      trial_days_remaining: f.trial_ends_at
        ? Math.ceil((new Date(f.trial_ends_at).getTime() - Date.now()) / (24 * 60 * 60 * 1000))
        : null,
    };
  });

  const payload: Record<string, unknown> = { ok: true, families: transformed, count: transformed.length };

  if (includeStats) {
    payload.stats = await getDashboardStats();
  }

  return NextResponse.json(payload);
}
