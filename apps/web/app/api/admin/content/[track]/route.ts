/**
 * @file app/api/admin/content/[track]/route.ts
 * @description Admin PATCH endpoint to update content payload.
 *              Auth via ADMIN_SECRET (same pattern as /api/admin/families).
 *              Bumps version + updated_at via DB trigger.
 * @reference D-040 Phase 3 MVP · D-041 added glossary + findtrack
 */

import { NextResponse } from 'next/server';
import { getSupabaseAdmin, checkAdminAuth } from '@/lib/supabase-admin';

const VALID_TRACKS = ['gamedev', 'fashion', 'stem', 'glossary', 'findtrack', 'space'];

export async function GET(
  req: Request,
  ctx: { params: Promise<{ track: string }> }
) {
  const auth = checkAdminAuth(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: auth.status });

  const { track } = await ctx.params;
  if (!VALID_TRACKS.includes(track)) {
    return NextResponse.json({ ok: false, error: 'Invalid track' }, { status: 400 });
  }

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });

  const { data, error } = await sb
    .from('content_tracks')
    .select('*')
    .eq('track', track)
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, row: data });
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ track: string }> }
) {
  const auth = checkAdminAuth(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: auth.status });

  const { track } = await ctx.params;
  if (!VALID_TRACKS.includes(track)) {
    return NextResponse.json({ ok: false, error: 'Invalid track' }, { status: 400 });
  }

  let body: { payload?: unknown; updated_by?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.payload || typeof body.payload !== 'object') {
    return NextResponse.json({ ok: false, error: 'payload must be an object' }, { status: 400 });
  }

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });

  const { data, error } = await sb
    .from('content_tracks')
    .upsert(
      {
        track,
        payload: body.payload,
        updated_by: body.updated_by || 'admin-ui',
      },
      { onConflict: 'track' }
    )
    .select('track, version, updated_at')
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, row: data });
}
