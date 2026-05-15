/**
 * @file lib/greeting.ts
 * @description Time-aware + user-aware Vietnamese greeting helpers for D-035 Tree of Knowledge hero.
 *
 * @greeting-windows (Vietnam timezone GMT+7)
 *   05:00–10:59 → "Chào buổi sáng"
 *   11:00–12:59 → "Chào buổi trưa"
 *   13:00–17:59 → "Chào buổi chiều"
 *   18:00–21:59 → "Chào buổi tối"
 *   22:00–04:59 → "Chào đêm khuya"
 *
 * @user-modes
 *   kid_logged_in  → "Chào buổi sáng, Phúc! 🌸"
 *   parent_mode    → "Chào buổi sáng, bố Bình! ☀️"
 *   anonymous      → "Chào mừng đến Pany Kids 🌳"
 */

export type GreetingMode = 'kid' | 'parent' | 'anonymous';

export type GreetingInput = {
  /** ISO timestamp or Date — defaults to now() */
  at?: Date | string | number;
  /** Override Vietnam timezone calculation (advanced) */
  hourOverride?: number;
  /** User context */
  mode: GreetingMode;
  /** Display name (kid full name OR parent name with role prefix) */
  displayName?: string;
  /** Emoji suffix override (optional). Default: 🌸 kid · ☀️ parent · 🌳 anonymous */
  emoji?: string;
};

export type GreetingOutput = {
  /** Time-of-day greeting prefix, e.g. "Chào buổi sáng" */
  timePrefix: string;
  /** Subject part, e.g. "Phúc" / "bố Bình" / "" */
  subject: string;
  /** Suffix emoji */
  emoji: string;
  /** Full assembled greeting, e.g. "Chào buổi sáng, Phúc! 🌸" */
  full: string;
  /** Window key for analytics/theming, e.g. "morning" */
  windowKey: 'morning' | 'noon' | 'afternoon' | 'evening' | 'night';
};

/** Compute Vietnam-local hour (GMT+7) regardless of server/browser tz. */
function vietnamHour(at: Date | string | number = Date.now()): number {
  const d = typeof at === 'string' || typeof at === 'number' ? new Date(at) : at;
  // Convert to VN timezone by adding offset to UTC time.
  const utcMs = d.getTime() + d.getTimezoneOffset() * 60 * 1000;
  const vnMs = utcMs + 7 * 60 * 60 * 1000;
  return new Date(vnMs).getUTCHours();
}

export function getGreeting(input: GreetingInput): GreetingOutput {
  const hour = input.hourOverride ?? vietnamHour(input.at);

  let timePrefix: string;
  let windowKey: GreetingOutput['windowKey'];

  if (hour >= 5 && hour < 11) {
    timePrefix = 'Chào buổi sáng';
    windowKey = 'morning';
  } else if (hour >= 11 && hour < 13) {
    timePrefix = 'Chào buổi trưa';
    windowKey = 'noon';
  } else if (hour >= 13 && hour < 18) {
    timePrefix = 'Chào buổi chiều';
    windowKey = 'afternoon';
  } else if (hour >= 18 && hour < 22) {
    timePrefix = 'Chào buổi tối';
    windowKey = 'evening';
  } else {
    timePrefix = 'Chào đêm khuya';
    windowKey = 'night';
  }

  const defaultEmoji =
    input.mode === 'kid' ? '🌸' : input.mode === 'parent' ? '☀️' : '🌳';
  const emoji = input.emoji ?? defaultEmoji;

  let subject = '';
  let full = '';

  if (input.mode === 'anonymous' || !input.displayName?.trim()) {
    subject = '';
    full = `${timePrefix} · Chào mừng đến Pany Kids ${emoji}`;
  } else {
    subject = input.displayName.trim();
    full = `${timePrefix}, ${subject}! ${emoji}`;
  }

  return { timePrefix, subject, emoji, full, windowKey };
}

/**
 * Convenience: build a parent-mode greeting with role prefix.
 *
 *   getParentGreeting({ parentName: 'Bình', role: 'bố' }) → "Chào buổi sáng, bố Bình! ☀️"
 *   getParentGreeting({ parentName: 'Lan',  role: 'mẹ' }) → "Chào buổi tối, mẹ Lan! ☀️"
 */
export function getParentGreeting(args: {
  parentName: string;
  role?: 'bố' | 'mẹ' | 'phụ huynh';
  at?: Date | string | number;
}): GreetingOutput {
  const role = args.role ?? 'bố';
  const displayName = `${role} ${args.parentName}`.trim();
  return getGreeting({ mode: 'parent', displayName, at: args.at });
}

/** Convenience: kid greeting */
export function getKidGreeting(args: {
  kidName: string;
  at?: Date | string | number;
}): GreetingOutput {
  return getGreeting({ mode: 'kid', displayName: args.kidName, at: args.at });
}

/** Greeting for anonymous landing visitors */
export function getAnonymousGreeting(args?: {
  at?: Date | string | number;
}): GreetingOutput {
  return getGreeting({ mode: 'anonymous', at: args?.at });
}
