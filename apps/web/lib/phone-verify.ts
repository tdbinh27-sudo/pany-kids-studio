/**
 * @file lib/phone-verify.ts
 * @description SMS OTP scaffold for cross-product email collision resolution
 *              and future Pany ID phone-as-primary identity.
 * @decision D-031 (2026-05-13) — phone verify when email exists across products.
 * @status SKELETON — env-gated stub. Wire to real SMS provider (eSMS / Stringee
 *         / Twilio) when budget approved. Cost estimate: ~250-400 ₫/SMS.
 *
 * Provider candidates (anh chọn 1 khi sẵn sàng):
 *   - eSMS.vn       — VN domestic, brand-name SMS, ~250-350 ₫/SMS
 *   - Stringee      — VN domestic, voice + SMS, ~300-400 ₫/SMS
 *   - Twilio        — global, $0.05+ per SMS, defer for VN
 *   - Speedchat/Zalo ZNS — alternative (ZNS = Zalo OA notification, requires OA setup)
 *
 * Storage: in-memory Map (dev) → Redis/Upstash in production for OTP cache
 *          with 5-minute TTL. Production also wants per-phone rate-limit.
 */

export type PhoneVerifyResult = {
  ok: boolean;
  error?: string;
  skipped?: boolean;
  errorCode?:
    | 'INVALID_PHONE'
    | 'RATE_LIMITED'
    | 'PROVIDER_DOWN'
    | 'OTP_EXPIRED'
    | 'OTP_INCORRECT'
    | 'NOT_CONFIGURED';
  attemptsRemaining?: number;
};

const OTP_LENGTH = 6;
const OTP_TTL_MS = 5 * 60 * 1000;  // 5 minutes
const MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;  // 1 minute between OTP requests per phone

const SMS_PROVIDER = process.env.SMS_PROVIDER ?? '';        // 'esms' | 'stringee' | 'twilio' | ''
const SMS_API_KEY = process.env.SMS_API_KEY ?? '';
const SMS_SECRET = process.env.SMS_SECRET ?? '';
const SMS_BRAND_NAME = process.env.SMS_BRAND_NAME ?? 'PANY';

// In-memory cache — REPLACE with Redis/Upstash in production
type OTPRecord = {
  code: string;
  phone: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
};
const otpCache = new Map<string, OTPRecord>();

/**
 * Normalize VN phone numbers to E.164 format.
 * "0983179109" → "+84983179109"
 * "84983179109" → "+84983179109"
 * "+84983179109" → "+84983179109"
 */
export function normalizeVNPhone(input: string): string | null {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 10 && digits.startsWith('0')) {
    return '+84' + digits.slice(1);
  }
  if (digits.length === 11 && digits.startsWith('84')) {
    return '+' + digits;
  }
  if (digits.length === 12 && digits.startsWith('840')) {
    return '+84' + digits.slice(3);
  }
  if (input.startsWith('+84') && digits.length === 11) {
    return '+' + digits;
  }
  return null;
}

/**
 * Generate cryptographically OK 6-digit OTP.
 */
function generateOTP(): string {
  // For real prod use crypto.randomInt; Math.random adequate for dev stub
  let s = '';
  for (let i = 0; i < OTP_LENGTH; i++) {
    s += Math.floor(Math.random() * 10);
  }
  return s;
}

/**
 * Request an OTP for a phone number.
 * Returns { ok: true } if SMS dispatched (or stub-logged when no provider).
 */
export async function requestPhoneOTP(rawPhone: string): Promise<PhoneVerifyResult> {
  const phone = normalizeVNPhone(rawPhone);
  if (!phone) {
    return { ok: false, errorCode: 'INVALID_PHONE', error: 'Số điện thoại không hợp lệ. Dùng định dạng VN (0xxx hoặc +84xxx).' };
  }

  // Rate limit: 1 OTP request per phone per 60s
  const existing = otpCache.get(phone);
  if (existing && (Date.now() - existing.createdAt) < RATE_LIMIT_WINDOW_MS) {
    return {
      ok: false,
      errorCode: 'RATE_LIMITED',
      error: 'Vui lòng đợi 1 phút trước khi yêu cầu OTP mới.',
    };
  }

  const code = generateOTP();
  otpCache.set(phone, {
    code,
    phone,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
    createdAt: Date.now(),
  });

  // Dispatch SMS via provider
  if (!SMS_PROVIDER || !SMS_API_KEY) {
    console.warn(`[phone-verify] SMS provider not configured — OTP for ${phone}: ${code} (logged only, not sent)`);
    return { ok: true, skipped: true };
  }

  try {
    const dispatched = await dispatchSMS(phone, code);
    if (!dispatched.ok) {
      otpCache.delete(phone);
      return { ok: false, errorCode: 'PROVIDER_DOWN', error: dispatched.error };
    }
    return { ok: true };
  } catch (e) {
    otpCache.delete(phone);
    return { ok: false, errorCode: 'PROVIDER_DOWN', error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Verify OTP submitted by user.
 * Returns { ok: true } if code matches and not expired.
 */
export async function verifyPhoneOTP(rawPhone: string, submittedCode: string): Promise<PhoneVerifyResult> {
  const phone = normalizeVNPhone(rawPhone);
  if (!phone) {
    return { ok: false, errorCode: 'INVALID_PHONE', error: 'Số điện thoại không hợp lệ.' };
  }

  const record = otpCache.get(phone);
  if (!record) {
    return { ok: false, errorCode: 'OTP_EXPIRED', error: 'OTP đã hết hạn hoặc chưa yêu cầu. Vui lòng gửi lại.' };
  }
  if (Date.now() > record.expiresAt) {
    otpCache.delete(phone);
    return { ok: false, errorCode: 'OTP_EXPIRED', error: 'OTP đã hết hạn (>5 phút). Vui lòng gửi lại.' };
  }
  if (record.attempts >= MAX_ATTEMPTS) {
    otpCache.delete(phone);
    return { ok: false, errorCode: 'RATE_LIMITED', error: 'Đã sai OTP 5 lần. Vui lòng gửi mã mới.' };
  }

  record.attempts++;
  if (record.code !== submittedCode.trim()) {
    return {
      ok: false,
      errorCode: 'OTP_INCORRECT',
      error: 'OTP không đúng.',
      attemptsRemaining: MAX_ATTEMPTS - record.attempts,
    };
  }

  // Success — invalidate OTP
  otpCache.delete(phone);
  return { ok: true };
}

/**
 * Provider dispatch — currently stub. Wire to real SMS API when anh approves provider.
 */
async function dispatchSMS(phone: string, code: string): Promise<{ ok: boolean; error?: string }> {
  const message = `[${SMS_BRAND_NAME}] Mã xác thực Pany Kids: ${code}. Hiệu lực 5 phút. KHÔNG chia sẻ mã này.`;

  switch (SMS_PROVIDER) {
    case 'esms': {
      // TODO P3 wire-up: POST to https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/
      console.warn('[phone-verify] eSMS provider not implemented yet:', { phone, message });
      return { ok: false, error: 'eSMS provider stub — not implemented' };
    }
    case 'stringee': {
      // TODO P3 wire-up: Stringee SMS API
      console.warn('[phone-verify] Stringee provider not implemented yet:', { phone, message });
      return { ok: false, error: 'Stringee provider stub — not implemented' };
    }
    case 'twilio': {
      // TODO P3 wire-up: Twilio SMS API (fallback only — expensive for VN)
      console.warn('[phone-verify] Twilio provider not implemented yet:', { phone, message });
      return { ok: false, error: 'Twilio provider stub — not implemented' };
    }
    default: {
      return { ok: false, error: `Unknown SMS_PROVIDER: ${SMS_PROVIDER}` };
    }
  }
}

/**
 * Convenience helper for upstream code (e.g., /api/sell/register POST).
 * Returns true if env is configured. Use to gate phone-verify UI flow on/off.
 */
export function isPhoneVerifyConfigured(): boolean {
  return Boolean(SMS_PROVIDER && SMS_API_KEY);
}
