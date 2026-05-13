/**
 * @file app/api/admin/signup-requests/route.ts
 * @description Admin GET (list) + PATCH (approve/decline) for family_signup_requests.
 *              Auth-gated via ADMIN_SECRET env var (replace with Supabase RLS in P4).
 * @reference D-020 (Gia Phả admin pattern port), D-031 (phone-verify path)
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { provisionFamily } from '@/lib/family-provision';

export const runtime = 'nodejs';

type SignupStatus = 'pending' | 'phone_verify_required' | 'provisioned' | 'email_exists' | 'rejected';

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

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey);
}

// ─── GET — list signup requests ──────────────────────────────────
export async function GET(req: Request) {
  const auth = checkAdminAuth(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.reason }, { status: auth.reason === 'ADMIN_SECRET not configured' ? 503 : 401 });
  }

  const sb = getSupabase();
  if (!sb) {
    return NextResponse.json({
      ok: false,
      error: 'Supabase chưa setup — chưa có dữ liệu lead. Cần apply P1 migration trước.',
      requests: [],
      stats: { total: 0, pending: 0, phone_verify_required: 0, provisioned: 0, email_exists: 0, rejected: 0 },
    }, { status: 503 });
  }

  const url = new URL(req.url);
  const statusFilter = url.searchParams.get('status') as SignupStatus | null;
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50', 10), 200);

  let query = sb.from('family_signup_requests').select('*').order('created_at', { ascending: false }).limit(limit);
  if (statusFilter) query = query.eq('status', statusFilter);

  const { data: requests, error } = await query;
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  // Stats
  const { data: allRows } = await sb.from('family_signup_requests').select('status');
  const stats = {
    total: allRows?.length ?? 0,
    pending: allRows?.filter(r => r.status === 'pending').length ?? 0,
    phone_verify_required: allRows?.filter(r => r.status === 'phone_verify_required').length ?? 0,
    provisioned: allRows?.filter(r => r.status === 'provisioned').length ?? 0,
    email_exists: allRows?.filter(r => r.status === 'email_exists').length ?? 0,
    rejected: allRows?.filter(r => r.status === 'rejected').length ?? 0,
  };

  return NextResponse.json({ ok: true, requests, stats });
}

// ─── PATCH — approve (re-run provision) / decline ────────────────
export async function PATCH(req: Request) {
  const auth = checkAdminAuth(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });
  }

  const sb = getSupabase();
  if (!sb) {
    return NextResponse.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });
  }

  let body: { id: string; action: 'approve' | 'decline'; reason?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.id || !body.action) {
    return NextResponse.json({ ok: false, error: 'Missing id or action' }, { status: 400 });
  }

  if (body.action === 'decline') {
    const { error } = await sb
      .from('family_signup_requests')
      .update({
        status: 'rejected',
        error_message: body.reason ?? 'Declined by admin',
        processed_at: new Date().toISOString(),
      })
      .eq('id', body.id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, status: 'rejected' });
  }

  if (body.action === 'approve') {
    // Force re-set to pending + phone_verified=true so provisionFamily proceeds
    await sb
      .from('family_signup_requests')
      .update({ status: 'pending', phone_verified: true, error_message: null })
      .eq('id', body.id);

    const result = await provisionFamily(body.id);
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  }

  return NextResponse.json({ ok: false, error: 'Unknown action' }, { status: 400 });
}
