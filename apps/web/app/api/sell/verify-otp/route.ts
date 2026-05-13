/**
 * @file app/api/sell/verify-otp/route.ts
 * @description POST endpoint — verify phone OTP and provision family for
 *              cross-product email collision case (D-031).
 *              Skeleton: env-gated, returns instructive error when SMS provider
 *              not configured.
 *
 * @flow
 *   1. Receive { parent_email, phone, code }
 *   2. Call verifyPhoneOTP(phone, code) → success/fail
 *   3. On success: find latest pending family_signup_requests for this email,
 *      mark phone_verified=true, re-call provisionFamily(signupId)
 *   4. Return result to UI
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { provisionFamily } from '@/lib/family-provision';
import { verifyPhoneOTP, isPhoneVerifyConfigured } from '@/lib/phone-verify';

export const runtime = 'nodejs';

type VerifyInput = {
  parent_email: string;
  phone: string;
  code: string;
};

export async function POST(req: Request) {
  let body: VerifyInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON', errorCode: 'INVALID_REQUEST' }, { status: 400 });
  }

  if (!body.parent_email || !body.phone || !body.code) {
    return NextResponse.json({ ok: false, error: 'Thiếu email / SĐT / mã OTP.', errorCode: 'INVALID_REQUEST' }, { status: 400 });
  }

  // ─── 1. Verify OTP ───────────────────────────────────────────────
  const verifyResult = await verifyPhoneOTP(body.phone, body.code);
  if (!verifyResult.ok) {
    const status = verifyResult.errorCode === 'RATE_LIMITED' ? 429 : 400;
    return NextResponse.json(verifyResult, { status });
  }

  // ─── 2. Env check ────────────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({
      ok: false,
      error: 'OTP đúng, nhưng hệ thống chưa hoàn tất setup backend. Em sẽ liên hệ anh/chị trong 24h.',
      errorCode: 'DB_ERROR',
    }, { status: 503 });
  }

  const sb = createClient(supabaseUrl, serviceRoleKey);

  // ─── 3. Find latest signup request for this email ────────────────
  const { data: signup, error: signupErr } = await sb
    .from('family_signup_requests')
    .select('id, status')
    .eq('parent_email', body.parent_email.trim().toLowerCase())
    .in('status', ['pending', 'phone_verify_required'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (signupErr || !signup) {
    return NextResponse.json({
      ok: false,
      error: 'Không tìm thấy yêu cầu đăng ký cho email này. Vui lòng đăng ký lại.',
      errorCode: 'INVALID_REQUEST',
    }, { status: 404 });
  }

  // ─── 4. Mark phone_verified=true + reset to pending ──────────────
  const { error: updateErr } = await sb
    .from('family_signup_requests')
    .update({
      phone_verified: true,
      status: 'pending',
      error_message: null,
    })
    .eq('id', signup.id);

  if (updateErr) {
    console.error('[/api/sell/verify-otp] update failed:', updateErr);
    return NextResponse.json({ ok: false, error: 'Lỗi cập nhật trạng thái. Vui lòng thử lại.', errorCode: 'DB_ERROR' }, { status: 500 });
  }

  // ─── 5. Re-run provisionFamily — should now bypass EMAIL_EXISTS check
  const result = await provisionFamily(signup.id);

  if (result.ok) {
    return NextResponse.json(result, { status: 200 });
  }

  return NextResponse.json(result, { status: result.errorCode === 'DB_ERROR' || result.errorCode === 'AUTH_ERROR' ? 500 : 400 });
}

/**
 * GET — convenience endpoint for UI to check if phone verify is wired live.
 * Returns { configured: boolean }.
 */
export async function GET() {
  return NextResponse.json({ configured: isPhoneVerifyConfigured() });
}
