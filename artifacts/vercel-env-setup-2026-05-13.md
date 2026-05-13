# Pany Kids Studio — Vercel Env Vars Setup Guide

**Created:** 2026-05-13
**Owner:** Trần Đức Bình
**For:** P1 + P3 commercial pipeline wiring (after migration applied)
**Reference:** D-020 (Gia Phả pattern), D-022 (free trial), D-030 (chatbot name), D-031 (phone verify)

---

## 📋 Tổng quan

Pany Kids cần các env vars sau để chuyển từ "skeleton mode" → "live commercial mode":

| Variable | Required | Mục đích | Khi nào cần |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Public Supabase project URL | P1 (sau khi apply migration) |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Service-role key — RLS bypass cho server-side auto-provision | P1 |
| `SUPABASE_ANON_KEY` | ✅ | Public anon key — client login | P1 |
| `ANTHROPIC_API_KEY` | ✅ | Claude API cho Đại Ka chat | Cần ROTATE NGAY (đã pending 11+ session) |
| `BREVO_API_KEY` | ✅ | Transactional email gửi welcome | P3 |
| `BREVO_SENDER_EMAIL` | ✅ | Sender domain (vd: `noreply@panyvn.app`) | P3 |
| `TELEGRAM_BOT_TOKEN` | ✅ | Alert anh khi có lead mới | P3 (reuse từ Gia Phả) |
| `TELEGRAM_CHAT_ID` | optional | Default `6418327150` (anh's chat) | P3 |
| `NEXT_PUBLIC_APP_URL` | optional | Default `https://kids.panyvn.app` | P3 |
| `ADMIN_SECRET` | ✅ | Bảo vệ `/admin/signup-requests` page | P3 |
| `SMS_PROVIDER` | optional | `esms` / `stringee` / `twilio` cho phone OTP | P4 (khi anh sẵn sàng pay SMS) |
| `SMS_API_KEY` | optional | Key của SMS provider tương ứng | P4 |
| `SMS_SECRET` | optional | Secret tương ứng (eSMS có 2 key) | P4 |
| `SMS_BRAND_NAME` | optional | Default `PANY` cho brand-name SMS | P4 |
| `CRON_SECRET` | optional | Reuse cho career-qna-refresh cron | đã có từ Sprint 1 |

---

## 🔴 BƯỚC 0 — Rotate Anthropic API key (LÀM TRƯỚC TIÊN)

**Lý do**: API key `sk-ant-api03-WRBcVGm...` đã expose trong session logs cũ từ Session 12 (2026-05-09) — 4 ngày trước. 11+ session đã reference.

### Hướng dẫn rotate:

1. Mở https://console.anthropic.com/settings/keys
2. Tìm dòng key cũ `sk-ant-api03-WRBcVGm...` → click "Disable" → confirm
3. Click "Create Key" → đặt tên `pany-kids-studio-prod-2026-05-13`
4. Set permissions:
   - ✅ Inference: All models
   - ✅ Workspace: Default (hoặc tạo workspace "Pany Kids" riêng)
5. Copy key mới (chỉ hiện 1 lần) → paste vào Vercel ngay
6. Test local nếu cần:

```powershell
$env:ANTHROPIC_API_KEY = "sk-ant-api03-NEW-KEY-HERE"
node -e "const Anthropic = require('@anthropic-ai/sdk'); const c = new Anthropic.default(); c.messages.create({model:'claude-haiku-4-5-20251001',max_tokens:10,messages:[{role:'user',content:'hi'}]}).then(r => console.log('✅', r.content[0].text))"
```

---

## 🟢 BƯỚC 1 — Setup Supabase project mới (Pany Kids riêng)

Per **D-031**: Pany Kids dùng Supabase project RIÊNG (không share Gia Phả) để tránh cross-product email collision.

### Hướng dẫn:

1. Mở https://supabase.com/dashboard → "New Project"
2. Name: `pany-kids-prod`
3. Region: **Mumbai (ap-south-1)** (cùng region Gia Phả → lowest latency cho VN)
4. Plan: Free tier (đủ tới ~50 family)
5. Database password: tạo 1 password mạnh, save vào 1Password/Bitwarden

### Sau khi project ready:

1. Vào Settings → API → copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role secret** key → `SUPABASE_SERVICE_ROLE_KEY` (giữ kín)
2. Vào SQL Editor → paste nội dung `artifacts/migration-family-2026-05-14.sql`
3. **CHẠY TRONG TRANSACTION** (file đã có `BEGIN; ... COMMIT;`)
4. Sau commit, chạy verification SELECT block ở cuối file — confirm row counts đúng

### Update P1 migration để thêm `phone_verified` column (D-031):

Trước khi anh apply file `migration-family-2026-05-14.sql`, anh thêm vào cuối block table `family_signup_requests`:

```sql
ALTER TABLE public.family_signup_requests
  ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS phone_verified_at TIMESTAMPTZ;
```

Em sẽ update file SQL ở P1 wire-up. Cho hiện tại column này chưa có nên `family-provision.ts` check `req.phone_verified === true` sẽ luôn return undefined → fall through normal flow. Khi anh ADD COLUMN → flow phone-verify hoạt động đầy đủ.

---

## 🟡 BƯỚC 2 — Brevo Transactional Email

Reuse account Brevo từ Gia Phả nhưng dùng **template ID riêng** cho Kids.

### Nếu chưa có Brevo account:

1. https://www.brevo.com → sign up free (300 email/day)
2. Verify domain `panyvn.app` (DKIM + SPF + DMARC đã add từ Gia Phả setup) — KIỂM TRA ở Brevo dashboard → Senders & IP → Domains
3. Settings → API & Integration → API Keys → "Generate a new API key"
4. Name: `pany-kids-prod-2026-05-13`
5. Copy → paste vào Vercel `BREVO_API_KEY`

### Sender email:

- Đề xuất: `noreply@panyvn.app` (giống Gia Phả)
- Hoặc: `kids@panyvn.app` (brand cleaner)
- Add sender trong Brevo → Senders → Add → verify ownership

---

## 🟡 BƯỚC 3 — Telegram Bot (reuse từ Gia Phả)

Bot `@pany_super_os_bot` đã có sẵn — reuse luôn.

```
TELEGRAM_BOT_TOKEN = (anh đã có từ Gia Phả setup — copy từ Vercel project pany-gia-pha)
TELEGRAM_CHAT_ID = 6418327150
```

**Lưu ý**: hiện `TELEGRAM_BOT_TOKEN` cũng nằm trong list 4 secrets pending rotate từ Session 16. Anh có thể rotate token Telegram cùng lúc:

1. Mở Telegram → chat với `@BotFather`
2. `/mybots` → chọn `@pany_super_os_bot` → "API Token" → "Revoke current token"
3. Copy token mới → paste vào CẢ 2 Vercel projects (Gia Phả + Kids)

---

## 🟡 BƯỚC 4 — Admin Secret cho `/admin/signup-requests`

```
ADMIN_SECRET = <generate random 32+ chars>
```

Quick generate PowerShell:

```powershell
[System.Web.Security.Membership]::GeneratePassword(32, 0) | Set-Clipboard
# Hoặc:
-join ((33..126) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

Sau khi set, anh truy cập admin URL:

```
https://kids.panyvn.app/admin/signup-requests?secret=YOUR_ADMIN_SECRET
```

(Secret được lưu vào localStorage sau lần đầu, không cần ?secret= mỗi lần.)

---

## ⏳ BƯỚC 5 (DEFER) — SMS Provider cho phone OTP

Defer đến khi có lead đầu tiên gặp email collision THỰC SỰ. Anh hỏi lead đó "gặp lỗi email đã tồn tại à?" — nếu yes → mới đầu tư SMS.

### Khi sẵn sàng (đề xuất eSMS.vn):

1. https://esms.vn → sign up
2. Mua brand name "PANY" hoặc "PanyKids" (~500k ₫/lần register, duyệt ~3 ngày)
3. Top-up account (vd 200k ₫ ban đầu = ~600-800 SMS)
4. API Key + Secret → Vercel:

```
SMS_PROVIDER = esms
SMS_API_KEY = (eSMS API Key)
SMS_SECRET = (eSMS SecretKey)
SMS_BRAND_NAME = PanyKids
```

5. Em sẽ wire `dispatchSMS()` function trong `lib/phone-verify.ts` (currently stub) → real eSMS POST call

---

## 🚀 Cách add env vars trong Vercel

### Web UI (recommend):

1. Mở https://vercel.com/dashboard
2. Chọn project `pany-kids-studio`
3. Tab **Settings** → **Environment Variables**
4. Mỗi biến: tên + value + chọn environments (**Production / Preview / Development**)
5. Đề xuất add toàn bộ vào CẢ 3 environments để dev/preview cũng wire được

### CLI (nhanh hơn):

```powershell
# Cài Vercel CLI nếu chưa có
npm i -g vercel

# Login + link project
cd C:\Users\PanyBinh\Projects\pany-kids-studio
vercel link

# Add env var (interactive)
vercel env add ANTHROPIC_API_KEY production
# (paste value khi prompt)

vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add BREVO_API_KEY production
# ... etc
```

### Sau khi add xong, redeploy:

```powershell
vercel deploy --prod
```

(Vì auto-deploy webhook đang broken — phải redeploy thủ công đến khi anh re-link Vercel ↔ GitHub.)

---

## 🔧 Vercel webhook fix (LÀM SONG SONG)

Auto-deploy đã hỏng từ Session 15 (2026-05-10). Last 4 commits (`c3f947a`, `322ac64`, `8931a53`, `eeea893` + 3 commit Session 16) đều KHÔNG auto-deploy.

### Fix:

1. Mở https://vercel.com/dashboard → `pany-kids-studio` project
2. Settings → **Git** → kiểm tra "Connected Git Repository"
3. Nếu vẫn show GitHub linked nhưng deploys không auto-trigger:
   - Click "Disconnect"
   - Re-connect → chọn lại `tdbinh27-sudo/pany-kids-studio`
   - Confirm branch `main` = production branch
4. Push 1 commit test (vd em làm session sau) → confirm auto-build trigger

---

## ✅ Verification Checklist (sau khi setup xong)

Anh chạy lần lượt từ Vercel deployed env:

- [ ] `https://kids.panyvn.app/sell` → render OK, OG image preview hiện khi share
- [ ] `https://kids.panyvn.app/dangky` → redirect sang `/sell/register`
- [ ] `https://kids.panyvn.app/sell/register` → form render đúng, submit test (email giả vd `test@example.com`)
- [ ] Sau submit:
  - Vercel Function Logs có log `[/api/sell/register]`
  - Telegram bot `@pany_super_os_bot` gửi alert "📥 Lead mới" tới chat anh
  - `family_signup_requests` table có 1 row mới (anh check Supabase Studio)
  - Email "🌸 Chào mừng" gửi tới `test@example.com` (test với email thật của anh)
- [ ] Đăng nhập admin: `https://kids.panyvn.app/admin/signup-requests?secret=YOUR_SECRET` → see lead vừa tạo
- [ ] Click "Approve" trên lead → auto-provision family + 3 kids + welcome email gửi lại
- [ ] Login với credentials trong welcome email → dashboard Pany Kids load

---

## 🆘 Troubleshooting

| Triệu chứng | Nguyên nhân có thể | Cách fix |
|---|---|---|
| `/api/sell/register` trả 503 "Supabase chưa setup" | `NEXT_PUBLIC_SUPABASE_URL` hoặc `SUPABASE_SERVICE_ROLE_KEY` thiếu | Add env + redeploy |
| Email không gửi | `BREVO_API_KEY` thiếu hoặc invalid | Check Brevo dashboard logs, regenerate key |
| Telegram alert không nhận | `TELEGRAM_BOT_TOKEN` thiếu hoặc bot bị block | Test gọi API trực tiếp: `curl -X POST "https://api.telegram.org/bot$TOKEN/getMe"` |
| OTP flow hiện UI nhưng SMS không gửi | `SMS_PROVIDER` chưa set hoặc stub mode | OK ở P3 — em chưa wire SMS, sẽ làm sau ở P4 |
| Admin page báo "Forbidden" | `ADMIN_SECRET` không match | Anh check chính xác secret, localStorage có thể cache old |
| Đăng nhập Pany Kids fail sau provision | Temp password không nhận, hoặc profiles trigger collision | Check Supabase Auth logs + profiles table; có thể manual reset password |

---

## 📞 Hỗ trợ

Khi anh stuck ở step nào, ping em với:

1. Error message exact (copy-paste)
2. Vercel Function Logs (Vercel dashboard → Project → Logs)
3. Supabase Studio SQL Editor: `SELECT * FROM family_signup_requests ORDER BY created_at DESC LIMIT 5;`

Em sẽ debug step-by-step.
