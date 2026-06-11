/**
 * @file app/api/content/[track]/route.ts
 * @description Public GET endpoint for content (gamedev/fashion/stem/glossary/findtrack).
 *              Falls back to bundled JSON if Supabase unavailable.
 *              Cached 60s in production (revalidate=60).
 * @reference D-040 Phase 3 MVP · D-041 added glossary + findtrack
 */

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import gamedevJson from '@/lib/gamedev-data.json';
import fashionJson from '@/lib/fashion-data.json';
import stemJson from '@/lib/stem-data.json';
import glossaryJson from '@/lib/glossary-data.json';
import findtrackJson from '@/lib/findtrack-data.json';
import spaceJson from '@/lib/space-data.json';

const FALLBACKS: Record<string, unknown> = {
  gamedev: gamedevJson,
  fashion: fashionJson,
  stem: stemJson,
  glossary: glossaryJson,
  findtrack: findtrackJson,
  space: spaceJson,
};

const VALID_TRACKS = ['gamedev', 'fashion', 'stem', 'glossary', 'findtrack', 'space'];

export const revalidate = 60; // ISR cache 60s

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ track: string }> }
) {
  const { track } = await ctx.params;

  if (!VALID_TRACKS.includes(track)) {
    return NextResponse.json({ ok: false, error: 'Invalid track' }, { status: 400 });
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    // Supabase env not configured — return bundled JSON
    return NextResponse.json(
      { ok: true, source: 'bundle', track, payload: FALLBACKS[track], version: 0 },
      { headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' } }
    );
  }

  const { data, error } = await sb
    .from('content_tracks')
    .select('payload, version, updated_at')
    .eq('track', track)
    .eq('published', true)
    .maybeSingle();

  if (error || !data) {
    // Fall back to bundled JSON if table not yet migrated or row missing
    return NextResponse.json(
      { ok: true, source: 'bundle-fallback', track, payload: FALLBACKS[track], version: 0, error: error?.message },
      { headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' } }
    );
  }

  return NextResponse.json(
    { ok: true, source: 'supabase', track, payload: data.payload, version: data.version, updated_at: data.updated_at },
    { headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' } }
  );
}
