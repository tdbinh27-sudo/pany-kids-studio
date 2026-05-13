/**
 * @file lib/family-notifications.ts
 * @description Telegram bot alerts for family signup events.
 *              Port skeleton from Gia Phả's lib/notifications.ts.
 *              Re-uses bot @pany_super_os_bot (same token via env vars).
 * @reference D-020 (clone Gia Phả pattern), D-022 (free 3-month trial)
 * @status SKELETON — env-gated stub. Fill with real Telegram API call in P3.
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? '6418327150'; // anh's chat (default from Gia Phả)

export type TelegramAlertResult = {
  ok: boolean;
  error?: string;
  skipped?: boolean;
};

/**
 * Send a plain-text Telegram alert to anh.
 * No Markdown to avoid parse errors (Gia Phả learned this the hard way).
 */
export async function sendFamilyTelegramAlert(input: {
  text: string;
  chatId?: string;
}): Promise<TelegramAlertResult> {
  if (!TELEGRAM_BOT_TOKEN) {
    console.warn('[family-notifications] TELEGRAM_BOT_TOKEN missing — alert skipped.');
    return { ok: false, skipped: true, error: 'TELEGRAM_BOT_TOKEN not set' };
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: input.chatId ?? TELEGRAM_CHAT_ID,
    text: input.text,
    // No parse_mode — plain text only (Gia Phả lesson)
    disable_web_page_preview: true,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errText = await res.text();
      return { ok: false, error: `Telegram API ${res.status}: ${errText}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Build alert text for a successful family provisioning.
 */
export function buildFamilyProvisionedAlert(input: {
  family_name: string;
  parent_name: string;
  email: string;
  kids_count: number;
  kids_ages: number[];
  app_link: string;
  temp_password: string;
  family_id: string;
  signup_id: string;
  email_sent: boolean;
}): string {
  return [
    '✅ GIA ĐÌNH MỚI ĐÃ TẠO',
    '━━━━━━━━━━━━━━━━━━━',
    '',
    `🏡 ${input.family_name}`,
    `👤 ${input.parent_name}`,
    `📧 ${input.email}`,
    `👶 ${input.kids_count} học viên: tuổi [${input.kids_ages.join(', ')}]`,
    `🔗 ${input.app_link}`,
    `🔑 Mật khẩu tạm: ${input.temp_password}`,
    '',
    `📨 Email gửi: ${input.email_sent ? 'OK' : 'FAILED'}`,
    `⏳ Free trial 3 tháng từ hôm nay`,
    '',
    `🆔 Family: ${input.family_id}`,
    `🆔 Lead: ${input.signup_id}`,
  ].join('\n');
}

/**
 * Build alert text for a new lead capture (before auto-provision).
 */
export function buildNewLeadAlert(input: {
  parent_name: string;
  email: string;
  phone?: string;
  kids_count: number;
  kids_ages: number[];
  source?: string;
}): string {
  return [
    '📥 LEAD MỚI Pany Kids',
    '━━━━━━━━━━━━━━━━━━━',
    '',
    `👤 ${input.parent_name}`,
    `📧 ${input.email}`,
    input.phone ? `📞 ${input.phone}` : '',
    `👶 ${input.kids_count} con: tuổi [${input.kids_ages.join(', ')}]`,
    input.source ? `🌐 Nguồn: ${input.source}` : '',
    '',
    'Hệ thống đang auto-provision...',
  ].filter(Boolean).join('\n');
}
