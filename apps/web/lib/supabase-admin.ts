/**
 * @file lib/supabase-admin.ts
 * @description Server-side Supabase admin client (service role) helper.
 *              Used by /api/admin/* and /api/content/* routes.
 *              NEVER import in client components — leaks service role key.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

/**
 * Returns a server-side Supabase client using SERVICE_ROLE_KEY.
 * Returns null if env vars missing (caller should handle gracefully).
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  _client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _client;
}

/**
 * Admin auth check (matches existing /api/admin/families pattern).
 * Accepts ADMIN_SECRET via ?secret= query or x-admin-secret header.
 */
export function checkAdminAuth(req: Request): { ok: true } | { ok: false; reason: string; status: number } {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    return { ok: false, reason: 'ADMIN_SECRET not configured', status: 503 };
  }
  const url = new URL(req.url);
  const secret = url.searchParams.get('secret') ?? req.headers.get('x-admin-secret');
  if (secret !== adminSecret) {
    return { ok: false, reason: 'Forbidden', status: 401 };
  }
  return { ok: true };
}
