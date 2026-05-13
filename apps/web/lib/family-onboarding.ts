/**
 * @file lib/family-onboarding.ts
 * @description Wizard helper for new family first-time setup.
 *              Server-side validation + state machine for 3-step onboarding:
 *              Step 1: profile + PIN per kid
 *              Step 2: chatbot name pick (Cô Pany / Đại Ka / Anh AI / Bạn AI / custom)
 *              Step 3: target_years + 12-pillar intro
 *
 *              Called from /api/family/onboarding API route (to be built P4).
 *
 * @decision D-022 (target_years 3/5/7/10), D-026 (max 5 kids),
 *           D-028 (age 5-16), D-030 + D-032 (chatbot rename),
 *           D-029 (curated links — anh-only at onboarding)
 *
 * @status SKELETON — pure validation + helpers. UI wires later in P4.
 */

import { LEGACY_BOT_NAME, DEFAULT_BOT_NAME } from './claude';

// ─── Types ─────────────────────────────────────────────────────────

export type OnboardingStep = 1 | 2 | 3 | 'done';

export type KidSetupInput = {
  position: number;        // 1..5
  name: string;            // non-empty
  age: number;             // 5..16
  emoji?: string;          // optional override (else auto-pick by age)
  color?: string;          // optional override
  pin: string;             // 4-digit numeric, unique per kid within family
  bio?: string;
  school?: string;
  favorite_subject?: string;
  hobbies?: string;
  goals?: string;
};

export type ChatbotNameOption = {
  name: string;
  archetype_vi: string;
  archetype_en: string;
  recommended_for_ages: number[];
  is_default: boolean;
  is_legacy: boolean;
};

export type Step1Input = {
  kids: KidSetupInput[];
  parent_pin: string;     // 4-digit numeric parent PIN
};

export type Step2Input = {
  chatbot_name: string;
  chatbot_name_en?: string;
  primary_lang: 'vi' | 'en';
};

export type Step3Input = {
  target_years: 3 | 5 | 7 | 10;
  age_min: number;
  age_max: number;
  focus_pillars?: string[];  // optional — anh can pre-pick top 3 pillars
};

export type ValidationError = {
  field: string;
  message_vi: string;
  message_en?: string;
};

// ─── Constants ────────────────────────────────────────────────────

export const CHATBOT_PRESETS: ChatbotNameOption[] = [
  {
    name: DEFAULT_BOT_NAME,            // 'Cô Pany'
    archetype_vi: 'Cô giáo trẻ ấm áp, kiên nhẫn — gắn với brand PANY',
    archetype_en: 'Warm, patient young teacher figure — linked to PANY brand',
    recommended_for_ages: [5, 6, 7, 8, 9, 10],
    is_default: true,
    is_legacy: false,
  },
  {
    name: LEGACY_BOT_NAME,             // 'Đại Ka'
    archetype_vi: 'Anh cả mentor, có gravitas — gia đình Pany Kids Sprint 1 dùng',
    archetype_en: 'Big-brother mentor with gravitas — Pany Kids Sprint 1 original',
    recommended_for_ages: [9, 10, 11, 12, 13, 14, 15, 16],
    is_default: false,
    is_legacy: true,
  },
  {
    name: 'Anh AI',
    archetype_vi: 'Bạn lớn AI thân mật, gần gũi',
    archetype_en: 'Friendly older AI buddy',
    recommended_for_ages: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    is_default: false,
    is_legacy: false,
  },
  {
    name: 'Bạn AI',
    archetype_vi: 'Bạn ngang hàng AI, không phân cấp',
    archetype_en: 'Equal-peer AI friend, non-hierarchical',
    recommended_for_ages: [9, 10, 11, 12, 13, 14, 15, 16],
    is_default: false,
    is_legacy: false,
  },
];

export const TARGET_YEARS_OPTIONS: { value: 3 | 5 | 7 | 10; label_vi: string; description_vi: string }[] = [
  { value: 3, label_vi: '3 năm — Ngắn hạn', description_vi: 'Phù hợp con chuyển cấp (vd: lớp 4→7, lớp 9→12). Tập trung milestone gần.' },
  { value: 5, label_vi: '5 năm — Tiêu chuẩn (Pany Kids default)', description_vi: 'Phù hợp con tiểu học (vd: lớp 2→6, lớp 5→10). Đủ thời gian build pillars.' },
  { value: 7, label_vi: '7 năm — Dài hạn', description_vi: 'Phù hợp con mầm non/lớp 1 (vd: 5t→12t). Trải nghiệm đầy đủ giai đoạn phát triển.' },
  { value: 10, label_vi: '10 năm — Toàn cấp', description_vi: 'Phù hợp con 5-6t đến tốt nghiệp THPT (5→15 hoặc 6→16). Trục dài dạng "second brain gia đình".' },
];

// ─── Validators ────────────────────────────────────────────────────

const PIN_REGEX = /^\d{4}$/;

export function validateStep1(input: Step1Input): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!input.kids || input.kids.length === 0) {
    errors.push({ field: 'kids', message_vi: 'Cần ít nhất 1 học viên.', message_en: 'At least 1 student required.' });
    return errors;
  }
  if (input.kids.length > 5) {
    errors.push({ field: 'kids', message_vi: 'Tối đa 5 học viên/gia đình (D-026).', message_en: 'Max 5 students per family.' });
  }

  const pinsSeen = new Set<string>();
  pinsSeen.add(input.parent_pin);

  if (!PIN_REGEX.test(input.parent_pin)) {
    errors.push({ field: 'parent_pin', message_vi: 'PIN phụ huynh phải là 4 chữ số.', message_en: 'Parent PIN must be 4 digits.' });
  }

  for (let i = 0; i < input.kids.length; i++) {
    const kid = input.kids[i];
    const prefix = `kids[${i}]`;

    if (!kid.name || kid.name.trim().length < 1) {
      errors.push({ field: `${prefix}.name`, message_vi: `Học viên ${i + 1}: tên không được trống.` });
    }
    if (typeof kid.age !== 'number' || kid.age < 5 || kid.age > 16) {
      errors.push({ field: `${prefix}.age`, message_vi: `Học viên ${i + 1}: tuổi phải từ 5-16 (D-028).` });
    }
    if (!PIN_REGEX.test(kid.pin)) {
      errors.push({ field: `${prefix}.pin`, message_vi: `Học viên ${i + 1}: PIN phải là 4 chữ số.` });
    } else if (pinsSeen.has(kid.pin)) {
      errors.push({ field: `${prefix}.pin`, message_vi: `Học viên ${i + 1}: PIN trùng với học viên khác hoặc phụ huynh.` });
    } else {
      pinsSeen.add(kid.pin);
    }
    if (kid.position < 1 || kid.position > 5) {
      errors.push({ field: `${prefix}.position`, message_vi: `Học viên ${i + 1}: vị trí phải 1-5.` });
    }
  }

  return errors;
}

export function validateStep2(input: Step2Input): ValidationError[] {
  const errors: ValidationError[] = [];
  const name = input.chatbot_name?.trim() ?? '';

  if (!name) {
    errors.push({ field: 'chatbot_name', message_vi: 'Cần đặt tên trợ lý AI.' });
  } else if (name.length > 20) {
    errors.push({ field: 'chatbot_name', message_vi: 'Tên trợ lý ≤ 20 ký tự.' });
  } else if (!/^[\p{L}\p{N}\s]+$/u.test(name)) {
    errors.push({ field: 'chatbot_name', message_vi: 'Tên trợ lý chỉ chứa chữ + số + khoảng trắng.' });
  }

  if (input.primary_lang !== 'vi' && input.primary_lang !== 'en') {
    errors.push({ field: 'primary_lang', message_vi: 'Ngôn ngữ chính phải vi hoặc en.' });
  }

  return errors;
}

export function validateStep3(input: Step3Input): ValidationError[] {
  const errors: ValidationError[] = [];

  if (![3, 5, 7, 10].includes(input.target_years)) {
    errors.push({ field: 'target_years', message_vi: 'Số năm chỉ tiêu phải là 3/5/7/10 (D-022).' });
  }
  if (typeof input.age_min !== 'number' || input.age_min < 5 || input.age_min > 16) {
    errors.push({ field: 'age_min', message_vi: 'Tuổi min phải từ 5-16.' });
  }
  if (typeof input.age_max !== 'number' || input.age_max < 5 || input.age_max > 16) {
    errors.push({ field: 'age_max', message_vi: 'Tuổi max phải từ 5-16.' });
  }
  if (input.age_min > input.age_max) {
    errors.push({ field: 'age_range', message_vi: 'Tuổi min phải ≤ tuổi max.' });
  }

  if (input.focus_pillars && input.focus_pillars.length > 6) {
    errors.push({ field: 'focus_pillars', message_vi: 'Chọn tối đa 6 trụ cột ưu tiên.' });
  }

  return errors;
}

// ─── Suggestion helpers (UI-side hints) ────────────────────────────

/**
 * Suggest target_years based on average kid age:
 *   - Average age ≤ 7  → recommend 10 năm (toàn cấp)
 *   - Average age 8-11 → recommend 7 năm
 *   - Average age 12-14 → recommend 5 năm
 *   - Average age ≥ 15 → recommend 3 năm (chuẩn bị tốt nghiệp)
 */
export function suggestTargetYears(kidsAges: number[]): 3 | 5 | 7 | 10 {
  if (!kidsAges.length) return 5;
  const avg = kidsAges.reduce((a, b) => a + b, 0) / kidsAges.length;
  if (avg <= 7) return 10;
  if (avg <= 11) return 7;
  if (avg <= 14) return 5;
  return 3;
}

/**
 * Suggest chatbot preset based on average kid age + brand preference.
 * Default behavior: Cô Pany for all (brand consistency).
 * If average age ≥ 12: gently suggest Đại Ka (mentor gravitas resonates with teens).
 */
export function suggestChatbotName(kidsAges: number[]): string {
  if (!kidsAges.length) return DEFAULT_BOT_NAME;
  const avg = kidsAges.reduce((a, b) => a + b, 0) / kidsAges.length;
  if (avg >= 12) return LEGACY_BOT_NAME; // suggest Đại Ka for teen-heavy families
  return DEFAULT_BOT_NAME;
}

/**
 * Suggest age_min/max based on kids' actual ages, padded for future growth.
 * - age_min = min(kids) - 1 (clamped to 5)
 * - age_max = max(kids) + max(3, target_years) (clamped to 16)
 */
export function suggestAgeRange(kidsAges: number[], targetYears: number = 5): { age_min: number; age_max: number } {
  if (!kidsAges.length) return { age_min: 5, age_max: 16 };
  const minKid = Math.min(...kidsAges);
  const maxKid = Math.max(...kidsAges);
  const headroom = Math.max(3, targetYears);
  return {
    age_min: Math.max(5, minKid - 1),
    age_max: Math.min(16, maxKid + headroom),
  };
}

// ─── State machine — next step transition ──────────────────────────

export function getNextStep(currentStep: OnboardingStep): OnboardingStep {
  switch (currentStep) {
    case 1: return 2;
    case 2: return 3;
    case 3: return 'done';
    case 'done': return 'done';
    default: return 1;
  }
}

// ─── Apply step results to family_settings + family_kids ───────────

/**
 * Compose the final family_settings record from accumulated step inputs.
 * Used by API route to UPDATE family_settings after onboarding done.
 */
export function composeFamilySettingsUpdate(
  step1: Step1Input,
  step2: Step2Input,
  step3: Step3Input,
): {
  parent_pin: string;
  chatbot_name: string;
  chatbot_name_en?: string;
  primary_lang: 'vi' | 'en';
  target_years: 3 | 5 | 7 | 10;
  age_min: number;
  age_max: number;
  max_kids: number;
} {
  return {
    parent_pin: step1.parent_pin,
    chatbot_name: step2.chatbot_name.trim(),
    chatbot_name_en: step2.chatbot_name_en?.trim(),
    primary_lang: step2.primary_lang,
    target_years: step3.target_years,
    age_min: step3.age_min,
    age_max: step3.age_max,
    max_kids: 5,
  };
}

/**
 * Compose family_kids[] inserts from Step 1.
 */
export function composeFamilyKidsInserts(family_id: string, step1: Step1Input) {
  return step1.kids.map(kid => ({
    family_id,
    position: kid.position,
    name: kid.name.trim(),
    age: kid.age,
    emoji: kid.emoji,
    color: kid.color,
    pin: kid.pin,
    bio: kid.bio?.trim(),
    school: kid.school?.trim(),
    favorite_subject: kid.favorite_subject?.trim(),
    hobbies: kid.hobbies?.trim(),
    goals: kid.goals?.trim(),
    active: true,
  }));
}

// ─── Welcome tour (12 pillars intro at Step 3) ─────────────────────

export const PILLAR_TOUR_VI = [
  { id: 'tech', emoji: '💻', name: 'Công nghệ & AI', oneliner: 'Code, AI tools, kỹ năng số' },
  { id: 'english', emoji: '🌍', name: 'Tiếng Anh', oneliner: 'CEFR K → B2 theo tuổi' },
  { id: 'finance', emoji: '💰', name: 'Tài chính', oneliner: 'Tiêu - tiết kiệm - đầu tư' },
  { id: 'thinking', emoji: '🧠', name: 'Tư duy phản biện', oneliner: 'Logic, lập luận, debate' },
  { id: 'business', emoji: '📊', name: 'Kinh doanh', oneliner: 'Bán hàng, marketing, mô hình' },
  { id: 'life', emoji: '🌳', name: 'Trải nghiệm thực', oneliner: 'Nấu ăn, dọn dẹp, sống tự lập' },
  { id: 'creative', emoji: '🎨', name: 'Studio Sáng tạo', oneliner: 'Canvas, prompts, sản phẩm' },
  { id: 'movement', emoji: '🤸', name: 'Cơ thể & Vận động', oneliner: 'Tập thể dục, breathing' },
  { id: 'discovery', emoji: '🔮', name: 'Tự khám phá', oneliner: 'Mood, RIASEC, journal' },
  { id: 'career', emoji: '🧭', name: 'La bàn nghề', oneliner: '60 nghề + day-in-life' },
  { id: 'family', emoji: '👨‍👩‍👧', name: 'Cầu nối Gia đình', oneliner: 'Weekly review, ask-parent' },
  { id: 'monitor', emoji: '📊', name: 'Theo dõi', oneliner: 'Streak, badge, progress' },
];

// ─── Stats helper ──────────────────────────────────────────────────

export function getOnboardingStats() {
  return {
    chatbot_presets: CHATBOT_PRESETS.length,
    target_years_options: TARGET_YEARS_OPTIONS.length,
    pillars: PILLAR_TOUR_VI.length,
  };
}
