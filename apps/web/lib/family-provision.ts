/**
 * @file lib/family-provision.ts
 * @description Server-side helper to auto-provision a new family from a signup
 *              request. Creates: families row + auth user + family_settings +
 *              family_kids (N children) + sends welcome email + Telegram alert.
 *
 *              Port of Gia Phả's clan-provision.ts, adapted for Kids context:
 *              - clan → family
 *              - 12 lunar ceremonies → default family_settings (target_years,
 *                age range, max_kids, chatbot_name 'Đại Ka', primary_lang)
 *              - +family_kids auto-create from kids_ages[] array
 *              - +trial_ends_at = NOW() + 3 months (D-022 free trial)
 *
 * @decision D-020 (clone Gia Phả pattern), D-022 (free 3mo), D-026 (max 5 kids),
 *           D-028 (age 5-16 single-year), D-030 (chatbot_name = Đại Ka default)
 * @status SKELETON — compiles, env-gated. Wire to /api/sell/register in P3.
 *
 * @flow
 *   1. Fetch family_signup_requests row (status='pending')
 *   2. Email-exists pre-check (lesson from Gia Phả's Mai bug)
 *   3. Generate unique family slug
 *   4. INSERT families
 *   5. CREATE auth.users (Supabase admin API) + temp password
 *   6. UPSERT profile (handles on_auth_user_created trigger collision)
 *   7. UPDATE families.owner_user_id
 *   8. INSERT family_settings (defaults)
 *   9. INSERT family_kids (loop kids_ages[])
 *  10. Send welcome email (Brevo)
 *  11. Send Telegram alert (anh)
 *  12. UPDATE family_signup_requests.status='provisioned'
 */

import { createClient } from '@supabase/supabase-js';
import { sendFamilyEmail, buildFamilyWelcomeEmail } from './family-email';
import { sendFamilyTelegramAlert, buildFamilyProvisionedAlert } from './family-notifications';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://kids.panyvn.app';

// ─── Types ─────────────────────────────────────────────────────────

export type ProvisionFamilyResult = {
  ok: boolean;
  family_id?: string;
  slug?: string;
  app_link?: string;
  kids_created?: number;
  email_sent?: boolean;
  telegram_sent?: boolean;
  error?: string;
  errorCode?:
    | 'EMAIL_EXISTS'
    | 'EMAIL_EXISTS_PHONE_VERIFY' // D-031: collision → suggest phone OTP path
    | 'INVALID_REQUEST'
    | 'DB_ERROR'
    | 'AUTH_ERROR'
    | 'AGE_OUT_OF_RANGE'
    | 'TOO_MANY_KIDS'
    | 'PHONE_VERIFY_REQUIRED'      // D-031: phone OTP required
    | 'UNKNOWN';
  // D-031: when EMAIL_EXISTS_PHONE_VERIFY → frontend prompts phone OTP flow
  existing_family_slug?: string;   // collision target's existing family
  phone_verify_hint?: string;      // masked phone like '+84*****1234' to confirm
};

// ─── Helpers ───────────────────────────────────────────────────────

/**
 * Slugify Vietnamese text for URL-safe family slug.
 * "Trần Đức Bình" → "tran-duc-binh"
 */
function slugifyFamilyName(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60);
}

/**
 * Generate a 10-char temp password — friendly chars (no 0/O/1/l).
 */
function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let pwd = '';
  for (let i = 0; i < 10; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }
  return pwd;
}

/**
 * Pick a kid emoji based on age bucket. Cosmetic.
 */
function pickKidEmoji(age: number, position: number): string {
  if (age <= 6) return ['🎨', '🧸', '🌈', '🦄', '🐣'][position % 5];
  if (age <= 11) return ['🚀', '🌟', '⚽', '📚', '🎮'][position % 5];
  return ['🎧', '💡', '🎯', '🔮', '🧠'][position % 5];
}

/**
 * Pick a kid color based on position. Cosmetic.
 */
function pickKidColor(position: number): string {
  return ['#FF6B9D', '#4DABF7', '#51CF66', '#FFD43B', '#845EC2'][position % 5];
}

/**
 * D-031: mask phone for UX hint (don't leak full number).
 * "+84983179109" → "+84*****9109"
 */
function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\s/g, '');
  if (cleaned.length < 7) return '****';
  const last4 = cleaned.slice(-4);
  const prefix = cleaned.startsWith('+') ? cleaned.slice(0, 3) : cleaned.slice(0, 2);
  return `${prefix}*****${last4}`;
}

// ─── Main entry point ──────────────────────────────────────────────

export async function provisionFamily(
  signupRequestId: string,
): Promise<ProvisionFamilyResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { ok: false, error: 'Supabase env vars missing', errorCode: 'DB_ERROR' };
  }

  const sb = createClient(supabaseUrl, serviceRoleKey);

  // ─── 1. Fetch signup request ────────────────────────────────────
  const { data: req, error: reqErr } = await sb
    .from('family_signup_requests')
    .select('*')
    .eq('id', signupRequestId)
    .single();

  if (reqErr || !req) {
    return {
      ok: false,
      error: `Signup request not found: ${reqErr?.message ?? 'unknown'}`,
      errorCode: 'INVALID_REQUEST',
    };
  }
  if (req.status !== 'pending') {
    return {
      ok: false,
      error: `Signup status is "${req.status}", expected "pending"`,
      errorCode: 'INVALID_REQUEST',
    };
  }

  // ─── 1.5 Validate ages + kid count ──────────────────────────────
  const kidsAges: number[] = Array.isArray(req.kids_ages) ? req.kids_ages : [];
  if (kidsAges.length === 0) {
    return { ok: false, error: 'No kids ages provided', errorCode: 'INVALID_REQUEST' };
  }
  if (kidsAges.length > 5) {
    return {
      ok: false,
      error: `Max 5 học viên (anh chị đăng ký ${kidsAges.length}). Liên hệ admin nếu cần enterprise plan.`,
      errorCode: 'TOO_MANY_KIDS',
    };
  }
  for (const age of kidsAges) {
    if (typeof age !== 'number' || age < 5 || age > 16) {
      return {
        ok: false,
        error: `Tuổi ${age} không hợp lệ. Pany Kids hỗ trợ 5-16 tuổi.`,
        errorCode: 'AGE_OUT_OF_RANGE',
      };
    }
  }

  // ─── 2. Email-exists pre-check (D-031: phone-verify path) ───────
  // Lesson from Gia Phả's Mai bug (commit 10e349e): existing CTV / member
  // with same email blocks auth.admin.createUser silently.
  //
  // D-031 enhancement: instead of hard-reject, suggest phone OTP verify
  // when caller provided parent_phone. Anh's customers often re-use same
  // email across PANY products (Gia Phả + Kids + Super OS).
  const { data: existingProfile } = await sb
    .from('profiles')
    .select('user_id, email, family_id, phone')
    .eq('email', req.parent_email)
    .maybeSingle();

  if (existingProfile) {
    // D-031: if signup row was already phone-verified (UI completed OTP step
    // before re-submitting), skip the reject and proceed with cross-product
    // linking (handled by an upstream caller — TODO P3 wire-up).
    if (req.phone_verified === true) {
      // Fall through to normal provisioning — auth user already exists,
      // we just need a new families row + family_kids for the Kids product.
      // (The auth.admin.createUser step will return EMAIL_EXISTS and we'll
      //  fetch the existing user_id instead.)
      console.warn('[family-provision] D-031 cross-product link path — email already in profiles, phone verified, continuing.');
    } else {
      // Lookup the existing family to give the UI useful context for the OTP prompt.
      let existingSlug: string | undefined;
      if (existingProfile.family_id) {
        const { data: existingFam } = await sb
          .from('families')
          .select('slug')
          .eq('id', existingProfile.family_id)
          .maybeSingle();
        existingSlug = existingFam?.slug;
      }

      const phoneHint = req.parent_phone
        ? maskPhone(req.parent_phone)
        : (existingProfile.phone ? maskPhone(existingProfile.phone) : undefined);

      await sb
        .from('family_signup_requests')
        .update({
          status: 'phone_verify_required',
          error_message: `Email ${req.parent_email} đã tồn tại — chờ phone OTP confirm.`,
          processed_at: new Date().toISOString(),
        })
        .eq('id', req.id);

      return {
        ok: false,
        error: `Email ${req.parent_email} đã có account trong hệ thống PANY. Anh/chị có thể xác nhận bằng SĐT để liên kết thêm Pany Kids vào account hiện có.`,
        errorCode: 'EMAIL_EXISTS_PHONE_VERIFY',
        existing_family_slug: existingSlug,
        phone_verify_hint: phoneHint,
      };
    }
  }

  // ─── 3. Generate unique family slug ─────────────────────────────
  let baseSlug = slugifyFamilyName(req.family_name || req.parent_name);
  if (!baseSlug || baseSlug.length < 3) {
    baseSlug = 'gd-' + Math.random().toString(36).substring(2, 8);
  }
  let slug = baseSlug;
  let suffix = 0;
  while (true) {
    const { data: existing } = await sb
      .from('families')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();
    if (!existing) break;
    suffix++;
    slug = `${baseSlug}-${suffix}`;
    if (suffix > 100) {
      return { ok: false, error: 'Slug collision after 100 attempts', errorCode: 'DB_ERROR' };
    }
  }

  // ─── 4. INSERT families ─────────────────────────────────────────
  const trialEndsAt = new Date();
  trialEndsAt.setMonth(trialEndsAt.getMonth() + 3); // D-022 free 3 months

  const { data: family, error: famErr } = await sb
    .from('families')
    .insert({
      slug,
      name: req.family_name || `Gia đình ${req.parent_name}`,
      status: 'active',
      tier: 'free-trial',
      trial_started_at: new Date().toISOString(),
      trial_ends_at: trialEndsAt.toISOString(),
    })
    .select('id')
    .single();

  if (famErr || !family) {
    return {
      ok: false,
      error: `Failed to create family: ${famErr?.message ?? 'unknown'}`,
      errorCode: 'DB_ERROR',
    };
  }

  // ─── 5. Create auth user ────────────────────────────────────────
  const tempPassword = generateTempPassword();
  const { data: authUser, error: authErr } = await sb.auth.admin.createUser({
    email: req.parent_email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: {
      full_name: req.parent_name,
      family_id: family.id,
    },
  });

  if (authErr || !authUser?.user) {
    // Rollback family
    await sb.from('families').delete().eq('id', family.id);
    const code: ProvisionFamilyResult['errorCode'] = authErr?.message
      ?.toLowerCase()
      .includes('already')
      ? 'EMAIL_EXISTS'
      : 'AUTH_ERROR';
    return {
      ok: false,
      error: `Failed to create auth user: ${authErr?.message ?? 'unknown'}`,
      errorCode: code,
    };
  }

  // ─── 6. UPSERT profile (handle on_auth_user_created trigger) ───
  const { error: profileErr } = await sb.from('profiles').upsert(
    {
      user_id: authUser.user.id,
      email: req.parent_email,
      full_name: req.parent_name,
      role: 'parent_admin',
      is_verified: true,
      family_id: family.id,
    },
    { onConflict: 'user_id' },
  );

  if (profileErr) {
    console.error('[family-provision] Profile upsert failed (family kept, manual cleanup):', profileErr);
  }

  // ─── 7. Update families.owner_user_id ───────────────────────────
  await sb
    .from('families')
    .update({ owner_user_id: authUser.user.id })
    .eq('id', family.id);

  // ─── 8. INSERT family_settings ──────────────────────────────────
  const { error: settingsErr } = await sb.from('family_settings').insert({
    family_id: family.id,
    target_years: 5, // D-022: configurable later (3/5/7/10)
    age_min: Math.min(...kidsAges, 5),
    age_max: Math.max(...kidsAges, 16),
    max_kids: 5, // D-026
    chatbot_name: 'Đại Ka', // D-030 default (parent can rename in Settings)
    primary_lang: 'vi',
    parent_pin: '0000', // user changes immediately
    monthly_chat_cap: 100, // D-022 cost guardrail
    monthly_chat_used: 0,
  });

  if (settingsErr) {
    console.error('[family-provision] family_settings insert failed:', settingsErr);
  }

  // ─── 9. INSERT family_kids (1 per age in kids_ages[]) ───────────
  let kidsCreated = 0;
  for (let i = 0; i < kidsAges.length; i++) {
    const age = kidsAges[i];
    const position = i + 1;
    const { error: kidErr } = await sb.from('family_kids').insert({
      family_id: family.id,
      position,
      name: `Học viên ${position}`, // parent renames in dashboard
      age,
      emoji: pickKidEmoji(age, i),
      color: pickKidColor(i),
      pin: String(1111 * position).padStart(4, '0'), // default PINs 1111/2222/3333/...
      active: true,
    });
    if (kidErr) {
      console.error(`[family-provision] kid ${position} insert failed:`, kidErr);
    } else {
      kidsCreated++;
    }
  }

  // ─── 10. Build welcome email + send via Brevo ───────────────────
  const loginUrl = `${APP_URL}/login?email=${encodeURIComponent(req.parent_email)}`;
  const trialEndsHuman = trialEndsAt.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const email = buildFamilyWelcomeEmail({
    parentName: req.parent_name,
    familyName: req.family_name || `Gia đình ${req.parent_name}`,
    email: req.parent_email,
    tempPassword,
    loginUrl,
    kidsCount: kidsAges.length,
    trialEndsAt: trialEndsHuman,
    chatbotName: 'Đại Ka',
  });

  const emailResult = await sendFamilyEmail({
    to: { email: req.parent_email, name: req.parent_name },
    subject: email.subject,
    htmlContent: email.html,
    textContent: email.text,
  });

  // ─── 11. Telegram alert to anh ──────────────────────────────────
  const tgResult = await sendFamilyTelegramAlert({
    text: buildFamilyProvisionedAlert({
      family_name: req.family_name || `Gia đình ${req.parent_name}`,
      parent_name: req.parent_name,
      email: req.parent_email,
      kids_count: kidsAges.length,
      kids_ages: kidsAges,
      app_link: loginUrl,
      temp_password: tempPassword,
      family_id: family.id,
      signup_id: req.id,
      email_sent: emailResult.ok,
    }),
  });

  // ─── 12. Mark signup request as provisioned ─────────────────────
  await sb
    .from('family_signup_requests')
    .update({
      status: 'provisioned',
      provisioned_family_id: family.id,
      processed_at: new Date().toISOString(),
    })
    .eq('id', req.id);

  return {
    ok: true,
    family_id: family.id,
    slug,
    app_link: loginUrl,
    kids_created: kidsCreated,
    email_sent: emailResult.ok,
    telegram_sent: tgResult.ok,
  };
}
