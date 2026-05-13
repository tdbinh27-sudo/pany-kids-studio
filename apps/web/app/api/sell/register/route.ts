/**
 * @file app/api/sell/register/route.ts
 * @description POST endpoint — capture family signup lead + auto-provision.
 *              Skeleton: env-gated. Requires P1 migration applied + Supabase
 *              service-role key + Brevo + Telegram env vars to fully wire.
 *
 * @flow
 *   1. Validate input (name/email/phone/kids_ages)
 *   2. INSERT family_signup_requests with status='pending'
 *   3. Telegram alert: "📥 Lead mới"
 *   4. Call provisionFamily(signupRequestId):
 *      a) If ok → return { ok: true, app_link, family_id }
 *      b) If EMAIL_EXISTS_PHONE_VERIFY → return without throwing, UI shows OTP
 *      c) If other error → return error code
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { provisionFamily } from '@/lib/family-provision';
import { sendFamilyTelegramAlert, buildNewLeadAlert } from '@/lib/family-notifications';

export const runtime = 'nodejs';

type RegisterInput = {
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  family_name?: string;
  kids_count: number;
  kids_ages: number[];
  source?: string;
};

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function isValidVNPhone(p: string): boolean {
  const digits = p.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 12;
}

export async function POST(req: Request) {
  let body: RegisterInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON', errorCode: 'INVALID_REQUEST' }, { status: 400 });
  }

  // ─── Validate ────────────────────────────────────────────────────
  if (!body.parent_name || body.parent_name.trim().length < 2) {
    return NextResponse.json({ ok: false, error: 'Tên phụ huynh không hợp lệ.', errorCode: 'INVALID_REQUEST' }, { status: 400 });
  }
  if (!isValidEmail(body.parent_email)) {
    return NextResponse.json({ ok: false, error: 'Email không hợp lệ.', errorCode: 'INVALID_REQUEST' }, { status: 400 });
  }
  if (!isValidVNPhone(body.parent_phone)) {
    return NextResponse.json({ ok: false, error: 'Số điện thoại không hợp lệ (VN 10-12 số).', errorCode: 'INVALID_REQUEST' }, { status: 400 });
  }
  if (!Array.isArray(body.kids_ages) || body.kids_ages.length === 0) {
    return NextResponse.json({ ok: false, error: 'Vui lòng nhập tuổi của ít nhất 1 con.', errorCode: 'INVALID_REQUEST' }, { status: 400 });
  }
  if (body.kids_ages.length > 5) {
    return NextResponse.json({ ok: false, error: 'Tối đa 5 học viên/gia đình. Liên hệ enterprise nếu cần nhiều hơn.', errorCode: 'TOO_MANY_KIDS' }, { status: 400 });
  }
  for (const a of body.kids_ages) {
    if (typeof a !== 'number' || a < 5 || a > 16) {
      return NextResponse.json({ ok: false, error: `Tuổi ${a} không hợp lệ. Pany Kids hỗ trợ 5-16 tuổi.`, errorCode: 'AGE_OUT_OF_RANGE' }, { status: 400 });
    }
  }

  // ─── Env check ───────────────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    // Skeleton mode — log lead only, no DB. Still send Telegram alert if configured.
    console.warn('[/api/sell/register] Supabase env missing — skeleton mode, lead logged only:', body.parent_email);
    await sendFamilyTelegramAlert({
      text: buildNewLeadAlert({
        parent_name: body.parent_name,
        email: body.parent_email,
        phone: body.parent_phone,
        kids_count: body.kids_ages.length,
        kids_ages: body.kids_ages,
        source: body.source ?? 'unknown',
      }) + '\n\n⚠️ SKELETON MODE — Supabase chưa wire. Anh phải apply migration trước.',
    });
    return NextResponse.json({
      ok: false,
      error: 'Hệ thống đang được setup. Lead của anh/chị đã được ghi nhận, em sẽ liên hệ trong 24h. Cảm ơn anh/chị!',
      errorCode: 'DB_ERROR',
    }, { status: 503 });
  }

  const sb = createClient(supabaseUrl, serviceRoleKey);

  // ─── 1. INSERT family_signup_requests ────────────────────────────
  const { data: signup, error: insertErr } = await sb
    .from('family_signup_requests')
    .insert({
      parent_name: body.parent_name.trim(),
      parent_email: body.parent_email.trim().toLowerCase(),
      parent_phone: body.parent_phone.trim(),
      family_name: body.family_name?.trim() ?? null,
      kids_count: body.kids_ages.length,
      kids_ages: body.kids_ages,
      source: body.source ?? 'dangky-direct',
      status: 'pending',
    })
    .select('id')
    .single();

  if (insertErr || !signup) {
    console.error('[/api/sell/register] family_signup_requests insert failed:', insertErr);
    return NextResponse.json({ ok: false, error: 'Lỗi lưu lead — vui lòng thử lại.', errorCode: 'DB_ERROR' }, { status: 500 });
  }

  // ─── 2. Telegram alert (lead captured) ───────────────────────────
  await sendFamilyTelegramAlert({
    text: buildNewLeadAlert({
      parent_name: body.parent_name,
      email: body.parent_email,
      phone: body.parent_phone,
      kids_count: body.kids_ages.length,
      kids_ages: body.kids_ages,
      source: body.source,
    }),
  });

  // ─── 3. Auto-provision ───────────────────────────────────────────
  const result = await provisionFamily(signup.id);

  if (result.ok) {
    return NextResponse.json(result, { status: 200 });
  }

  // EMAIL_EXISTS_PHONE_VERIFY — return 200 so UI can show OTP step
  if (result.errorCode === 'EMAIL_EXISTS_PHONE_VERIFY') {
    return NextResponse.json(result, { status: 200 });
  }

  // Other errors — 400/500 depending on code
  const httpStatus = result.errorCode === 'DB_ERROR' || result.errorCode === 'AUTH_ERROR' ? 500 : 400;
  return NextResponse.json(result, { status: httpStatus });
}
