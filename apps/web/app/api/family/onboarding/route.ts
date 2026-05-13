/**
 * @file app/api/family/onboarding/route.ts
 * @description Wires lib/family-onboarding.ts into HTTP API. 3-step wizard.
 *
 *   GET  ?family_id=...&parent_pin=...  → current onboarding state
 *   POST { family_id, parent_pin, step: 1|2|3, payload: Step1Input|Step2Input|Step3Input }
 *
 * @reference D-022 (target_years), D-026 (max 5 kids), D-028 (age 5-16),
 *            D-030 + D-032 (chatbot rename), Z (family-onboarding.ts)
 *
 * @auth Skeleton: family_id + parent_pin gate. Production: Supabase RLS via
 *       authenticated session (parent_admin role) — wire in P4.
 *
 * @flow
 *   Step 1 (kids + parent_pin):
 *     - Validate via validateStep1
 *     - Wipe existing family_kids for this family_id (idempotent re-onboard)
 *     - INSERT family_kids[] from payload
 *     - UPDATE family_settings.parent_pin
 *     - Mark family_settings.onboarding_step = 2
 *
 *   Step 2 (chatbot_name + lang):
 *     - Validate via validateStep2
 *     - UPDATE family_settings.chatbot_name, chatbot_name_en, primary_lang
 *     - Mark onboarding_step = 3
 *
 *   Step 3 (target_years + age range):
 *     - Validate via validateStep3
 *     - UPDATE family_settings.target_years, age_min, age_max
 *     - Mark onboarding_step = 'done', onboarding_completed_at = NOW()
 *     - Return final summary + suggested next actions
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  validateStep1,
  validateStep2,
  validateStep3,
  composeFamilyKidsInserts,
  getNextStep,
  suggestTargetYears,
  suggestChatbotName,
  suggestAgeRange,
  type Step1Input,
  type Step2Input,
  type Step3Input,
  type OnboardingStep,
} from '@/lib/family-onboarding';

export const runtime = 'nodejs';

// ─── Helpers ───────────────────────────────────────────────────────

type AuthCheck = { ok: true; family_id: string } | { ok: false; status: number; error: string };

async function authenticate(req: Request): Promise<AuthCheck> {
  const url = new URL(req.url);
  let family_id = url.searchParams.get('family_id');
  let parent_pin = url.searchParams.get('parent_pin');

  // Allow body-based auth for POST (preferred — avoids leaking PIN in URL)
  if (req.method === 'POST') {
    try {
      const clone = req.clone();
      const body = await clone.json().catch(() => null);
      if (body && typeof body === 'object') {
        family_id = body.family_id ?? family_id;
        parent_pin = body.parent_pin ?? parent_pin;
      }
    } catch {
      // ignore parse error — caller will hit validation later
    }
  }

  if (!family_id || !parent_pin) {
    return { ok: false, status: 400, error: 'Thiếu family_id hoặc parent_pin.' };
  }

  const sb = getSupabase();
  if (!sb) {
    return { ok: false, status: 503, error: 'Supabase chưa setup. Skeleton mode — apply P1 migration trước.' };
  }

  const { data: settings, error } = await sb
    .from('family_settings')
    .select('family_id, parent_pin')
    .eq('family_id', family_id)
    .maybeSingle();

  if (error) return { ok: false, status: 500, error: error.message };
  if (!settings) return { ok: false, status: 404, error: 'Gia đình không tồn tại.' };
  if (settings.parent_pin !== parent_pin) {
    return { ok: false, status: 401, error: 'PIN phụ huynh không đúng.' };
  }

  return { ok: true, family_id };
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// ─── GET — current onboarding state ────────────────────────────────

export async function GET(req: Request) {
  const auth = await authenticate(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  const sb = getSupabase()!; // guaranteed by authenticate()

  const [{ data: family }, { data: settings }, { data: kids }] = await Promise.all([
    sb.from('families').select('id, slug, name, tier, trial_ends_at').eq('id', auth.family_id).maybeSingle(),
    sb.from('family_settings').select('*').eq('family_id', auth.family_id).maybeSingle(),
    sb.from('family_kids').select('id, position, name, age, emoji, color, active').eq('family_id', auth.family_id).order('position', { ascending: true }),
  ]);

  if (!family) {
    return NextResponse.json({ ok: false, error: 'Gia đình không tồn tại.' }, { status: 404 });
  }

  const kidsAges = (kids ?? []).filter(k => k.active).map(k => k.age);
  const currentStep: OnboardingStep = (settings?.onboarding_step as OnboardingStep) ?? 1;

  return NextResponse.json({
    ok: true,
    family,
    settings,
    kids: kids ?? [],
    current_step: currentStep,
    completed: currentStep === 'done',
    // Suggestions to help UI pre-fill forms
    suggestions: {
      target_years: suggestTargetYears(kidsAges),
      chatbot_name: suggestChatbotName(kidsAges),
      age_range: suggestAgeRange(kidsAges, settings?.target_years ?? 5),
    },
  });
}

// ─── POST — submit a step ──────────────────────────────────────────

type StepBody =
  | { family_id: string; parent_pin: string; step: 1; payload: Step1Input }
  | { family_id: string; parent_pin: string; step: 2; payload: Step2Input }
  | { family_id: string; parent_pin: string; step: 3; payload: Step3Input };

export async function POST(req: Request) {
  const auth = await authenticate(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  let body: StepBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
  }

  if (!body.step || (body.step !== 1 && body.step !== 2 && body.step !== 3)) {
    return NextResponse.json({ ok: false, error: 'step phải là 1, 2 hoặc 3.' }, { status: 400 });
  }

  const sb = getSupabase()!;
  const family_id = auth.family_id;

  // ─── Step 1: kids + parent_pin ───────────────────────────────────
  if (body.step === 1) {
    const errors = validateStep1(body.payload);
    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Wipe existing kids (idempotent re-onboard)
    const { error: delErr } = await sb.from('family_kids').delete().eq('family_id', family_id);
    if (delErr) {
      return NextResponse.json({ ok: false, error: `Wipe failed: ${delErr.message}` }, { status: 500 });
    }

    // INSERT kids[]
    const inserts = composeFamilyKidsInserts(family_id, body.payload);
    const { error: insErr } = await sb.from('family_kids').insert(inserts);
    if (insErr) {
      return NextResponse.json({ ok: false, error: `Insert failed: ${insErr.message}` }, { status: 500 });
    }

    // UPDATE settings.parent_pin + auto-bump age range
    const ages = body.payload.kids.map(k => k.age);
    const { error: updErr } = await sb
      .from('family_settings')
      .update({
        parent_pin: body.payload.parent_pin,
        age_min: Math.min(...ages, 5),
        age_max: Math.max(...ages, 16),
        onboarding_step: 2,
      })
      .eq('family_id', family_id);
    if (updErr) {
      return NextResponse.json({ ok: false, error: `Settings update failed: ${updErr.message}` }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      step_completed: 1,
      next_step: getNextStep(1),
      kids_inserted: inserts.length,
      suggestions: {
        chatbot_name: suggestChatbotName(ages),
        target_years: suggestTargetYears(ages),
      },
    });
  }

  // ─── Step 2: chatbot_name + lang ─────────────────────────────────
  if (body.step === 2) {
    const errors = validateStep2(body.payload);
    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const { error } = await sb
      .from('family_settings')
      .update({
        chatbot_name: body.payload.chatbot_name.trim(),
        chatbot_name_en: body.payload.chatbot_name_en?.trim() ?? null,
        primary_lang: body.payload.primary_lang,
        onboarding_step: 3,
      })
      .eq('family_id', family_id);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // Suggest target_years based on existing kid ages for Step 3 UI
    const { data: kids } = await sb.from('family_kids').select('age').eq('family_id', family_id).eq('active', true);
    const ages = (kids ?? []).map(k => k.age);

    return NextResponse.json({
      ok: true,
      step_completed: 2,
      next_step: getNextStep(2),
      suggestions: {
        target_years: suggestTargetYears(ages),
        age_range: suggestAgeRange(ages, 5),
      },
    });
  }

  // ─── Step 3: target_years + age range ────────────────────────────
  if (body.step === 3) {
    const errors = validateStep3(body.payload);
    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const { error } = await sb
      .from('family_settings')
      .update({
        target_years: body.payload.target_years,
        age_min: body.payload.age_min,
        age_max: body.payload.age_max,
        onboarding_step: 'done',
      })
      .eq('family_id', family_id);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // Fetch final state for response summary
    const [{ data: family }, { data: settings }, { data: kids }] = await Promise.all([
      sb.from('families').select('slug, name, tier').eq('id', family_id).maybeSingle(),
      sb.from('family_settings').select('*').eq('family_id', family_id).maybeSingle(),
      sb.from('family_kids').select('position, name, age, emoji').eq('family_id', family_id).eq('active', true).order('position'),
    ]);

    return NextResponse.json({
      ok: true,
      step_completed: 3,
      next_step: 'done',
      onboarding_completed: true,
      summary: {
        family,
        settings,
        kids,
        next_actions_vi: [
          'Vào tab "Học viên" → mỗi con setup avatar + bio chi tiết',
          'Vào tab "Khám phá" → xem quest hôm nay + thư viện',
          'Chat lần đầu với trợ lý AI (' + (settings?.chatbot_name ?? 'Cô Pany') + ')',
          'Mở tab "Tổng quan" → xem lộ trình ' + (settings?.target_years ?? 5) + ' năm',
        ],
      },
    });
  }

  // unreachable
  return NextResponse.json({ ok: false, error: 'Unknown step.' }, { status: 400 });
}
