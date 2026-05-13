/**
 * @file lib/family-email.ts
 * @description Brevo Transactional email helpers for Pany Kids Studio.
 *              Port skeleton from Gia Phả's lib/email.ts.
 *              Re-uses BREVO_API_KEY env var (separate template ID for Kids).
 * @reference D-020 (clone Gia Phả pattern), D-022 (free 3-month trial)
 * @status SKELETON — env-gated stub. Fill with real Brevo SMTP/API call in P3.
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY ?? '';
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL ?? 'noreply@panyvn.app';
const SENDER_NAME = 'Pany Kids Studio';

export type EmailContact = { email: string; name?: string };

export type EmailSendInput = {
  to: EmailContact | EmailContact[];
  subject: string;
  htmlContent: string;
  textContent?: string;
  replyTo?: EmailContact;
};

export type EmailSendResult = {
  ok: boolean;
  messageId?: string;
  error?: string;
  skipped?: boolean;
};

/**
 * Send a transactional email via Brevo.
 */
export async function sendFamilyEmail(input: EmailSendInput): Promise<EmailSendResult> {
  if (!BREVO_API_KEY) {
    console.warn('[family-email] BREVO_API_KEY missing — email skipped.');
    return { ok: false, skipped: true, error: 'BREVO_API_KEY not set' };
  }

  const recipients = Array.isArray(input.to) ? input.to : [input.to];

  const payload = {
    sender: { email: SENDER_EMAIL, name: SENDER_NAME },
    to: recipients,
    subject: input.subject,
    htmlContent: input.htmlContent,
    textContent: input.textContent,
    replyTo: input.replyTo,
  };

  try {
    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { ok: false, error: `Brevo API ${res.status}: ${errText}` };
    }

    const data = await res.json() as { messageId?: string };
    return { ok: true, messageId: data.messageId };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Build the welcome email sent on auto-provision success.
 * Kids-flavored, 3-month free trial mention.
 */
export function buildFamilyWelcomeEmail(input: {
  parentName: string;
  familyName: string;
  email: string;
  tempPassword: string;
  loginUrl: string;
  kidsCount: number;
  trialEndsAt: string;       // ISO date or human-readable
  chatbotName?: string;      // default 'Đại Ka' (D-030)
}): { subject: string; html: string; text: string } {
  const botName = input.chatbotName ?? 'Đại Ka';
  const subject = `🌸 Chào mừng ${input.familyName} đến với Pany Kids Studio — 3 tháng miễn phí`;

  const text = `
Kính chào ${input.parentName},

Pany Kids Studio đã sẵn sàng cho gia đình anh/chị!

Thông tin truy cập:
- Link đăng nhập: ${input.loginUrl}
- Email: ${input.email}
- Mật khẩu tạm thời: ${input.tempPassword}
  (Anh/chị đăng nhập xong nên đổi mật khẩu ngay trong Settings)

Gia đình đang dùng GÓI MIỄN PHÍ 3 THÁNG — hết hạn: ${input.trialEndsAt}.
Toàn bộ tính năng được mở khóa trong thời gian này.

Trong dashboard, ${input.kidsCount} học viên sẽ được tự động tạo theo độ tuổi anh/chị đã nhập.
Trợ lý AI ${botName} sẽ đồng hành cùng các con — anh/chị có thể đổi tên trợ lý
trong Settings sau khi đăng nhập.

📚 Bắt đầu nhanh:
1. Đăng nhập + đổi mật khẩu
2. Vào tab "Học viên" → cập nhật thông tin chi tiết từng con
3. Vào tab "Khám phá" → xem thư viện kiến thức tinh tuyển
4. Chat với ${botName} ngay trên dashboard

Có câu hỏi gì cứ trả lời email này hoặc liên hệ:
- Telegram: @pany_super_os_bot
- Hotline/Zalo: 0983 179 109 (Trần Đức Bình)

Trân trọng,
Pany Kids Studio team
`.trim();

  const html = `<!DOCTYPE html>
<html lang="vi"><head><meta charset="utf-8"><title>${subject}</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #2D1B4E;">
  <div style="background: linear-gradient(135deg, #FFE5F1 0%, #E5E5FF 100%); padding: 32px 24px; border-radius: 16px; text-align: center; margin-bottom: 24px;">
    <h1 style="margin: 0; font-size: 24px; color: #845EC2;">🌸 Chào mừng đến với Pany Kids Studio</h1>
    <p style="margin: 12px 0 0; color: #666;">Hành trình học tập của ${input.familyName} bắt đầu hôm nay</p>
  </div>

  <p>Kính chào <strong>${input.parentName}</strong>,</p>
  <p>Tài khoản gia đình anh/chị đã sẵn sàng. Dưới đây là thông tin truy cập:</p>

  <div style="background: #F9F4FF; padding: 16px; border-radius: 8px; margin: 16px 0;">
    <p style="margin: 4px 0;"><strong>🔗 Link đăng nhập:</strong> <a href="${input.loginUrl}" style="color: #845EC2;">${input.loginUrl}</a></p>
    <p style="margin: 4px 0;"><strong>📧 Email:</strong> ${input.email}</p>
    <p style="margin: 4px 0;"><strong>🔑 Mật khẩu tạm:</strong> <code style="background: #fff; padding: 2px 6px; border-radius: 4px;">${input.tempPassword}</code></p>
    <p style="margin: 12px 0 4px; color: #DC2626; font-size: 13px;">⚠️ Đổi mật khẩu ngay sau khi đăng nhập (Settings → Đổi mật khẩu)</p>
  </div>

  <div style="background: #FFFBEB; border-left: 4px solid #FBBF24; padding: 12px 16px; margin: 16px 0;">
    <p style="margin: 0;"><strong>🎁 Gói MIỄN PHÍ 3 tháng đang hoạt động</strong></p>
    <p style="margin: 4px 0 0; font-size: 14px; color: #92400E;">Hết hạn: ${input.trialEndsAt} — Toàn bộ tính năng mở khóa</p>
  </div>

  <h3 style="color: #845EC2;">📚 Bắt đầu nhanh:</h3>
  <ol style="line-height: 1.8;">
    <li>Đăng nhập + đổi mật khẩu</li>
    <li>Vào tab <strong>Học viên</strong> → cập nhật chi tiết ${input.kidsCount} con</li>
    <li>Vào tab <strong>Khám phá</strong> → xem thư viện kiến thức tinh tuyển</li>
    <li>Chat với <strong>${botName}</strong> ngay trên dashboard (đổi tên trợ lý trong Settings)</li>
  </ol>

  <hr style="border: none; border-top: 1px dashed #ccc; margin: 24px 0;">

  <p style="font-size: 14px; color: #666;">Có câu hỏi gì:</p>
  <ul style="font-size: 14px; line-height: 1.6;">
    <li>📱 Telegram: <a href="https://t.me/pany_super_os_bot">@pany_super_os_bot</a></li>
    <li>📞 Hotline/Zalo: 0983 179 109 (Trần Đức Bình)</li>
    <li>✉️ Trả lời email này</li>
  </ul>

  <p style="margin-top: 24px; font-size: 13px; color: #999;">
    Trân trọng,<br>
    <strong style="color: #845EC2;">Pany Kids Studio team</strong>
  </p>
</body></html>`;

  return { subject, html, text };
}
