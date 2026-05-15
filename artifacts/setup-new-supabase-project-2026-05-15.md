# 🆕 Setup Pany Kids — New Isolated Supabase Project

**Created:** 2026-05-15 — Decision: Option A (new project, sacrifice D-031 cross-product login for clean isolation)
**Status:** READY TO EXECUTE — waiting on anh to create the project on Supabase dashboard

## Phase 1 — Anh tạo Supabase project (5 phút, manual)

1. Vào https://supabase.com/dashboard
2. Đang trong org **Renzy (PRO)** → bấm **New project**
3. Điền:
   - **Name:** `pany-kids-prod`
   - **Database Password:** generate strong (lưu vào password manager — anh sẽ không thấy lại)
   - **Region:** `Southeast Asia (Singapore) – ap-southeast-1` ⭐ (gần VN nhất + chung region với khách)
     - Nếu không có Singapore → chọn `South Asia (Mumbai) – ap-south-1` (giống pany-super-os)
   - **Compute size:** `Micro` (Pro plan free included)
4. Đợi ~2 phút project initialize
5. Vào **Settings → API** copy 3 giá trị:
   - Project URL: `https://<xxxxx>.supabase.co`
   - `anon` `public` key (long JWT)
   - `service_role` `secret` key (long JWT) ⚠️ **KHÔNG share lên public**

## Phase 2 — Apply 2 migrations (em làm khi anh paste keys vào chat hoặc anh tự paste vào SQL Editor)

### Migration A: Profiles prefix
File: `artifacts/migration-00-profiles-prefix-2026-05-15.sql`
- Tạo `public.profiles` table (Kids-flavored, có `family_id` + `phone`)
- Trigger `on_auth_user_created` tự tạo profile row khi user signup qua Supabase Auth
- RLS basic policies

### Migration B: Family schema (v1, đã có)
File: `artifacts/migration-family-2026-05-14.sql`
- Tạo 6 tables: `families`, `family_settings`, `family_kids`, `family_signup_requests`, `family_progress`, `family_chat_history`
- RLS + triggers
- Seed data: family `tran-binh` + 3 kids (Phúc/An/Như Ý)

### Migration C: FK stitch (chạy SAU khi A+B xong)
```sql
ALTER TABLE public.profiles
  ADD CONSTRAINT fk_profiles_family
  FOREIGN KEY (family_id) REFERENCES public.families(id) ON DELETE SET NULL;
```

**Apply method (chọn 1):**
- **Option 1 (em recommend):** Anh paste cả 3 vào **SQL Editor** (Supabase dashboard) — chạy lần lượt. Em verify result qua REST API.
- **Option 2:** Em chạy qua `psql` CLI nếu anh cấp `DATABASE_URL` (connection string từ Settings → Database)

## Phase 3 — Wire 7 env vars to Vercel (em làm)

```bash
cd /c/Users/PanyBinh/Projects/pany-kids-studio/apps/web

vercel env add NEXT_PUBLIC_SUPABASE_URL production       # paste project URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production  # paste anon key
vercel env add SUPABASE_SERVICE_ROLE_KEY production      # paste service_role
vercel env add NEXT_PUBLIC_APP_URL production            # https://kids.panyvn.app
vercel env add BREVO_API_KEY production                  # từ brevo.com → SMTP & API → API keys
vercel env add BREVO_SENDER_EMAIL production             # noreply@panyvn.app
vercel env add TELEGRAM_BOT_TOKEN production             # reuse @pany_super_os_bot token
vercel env add TELEGRAM_CHAT_ID production               # 6418327150 (anh's chat)
```

Sau đó `git commit --allow-empty -m "chore: trigger redeploy after env wiring"` + `git push` → webhook auto-deploy.

## Phase 4 — E2E smoke test

1. Submit fake lead qua https://kids.panyvn.app/dangky với email `tdbinh27+kidstest1@gmail.com` + SĐT thật của anh + 1 con tuổi 8
2. Verify expected outcomes:
   - ✅ Welcome email arrives in inbox (Brevo) với login URL + tempPassword
   - ✅ Telegram alert ở @pany_super_os_bot: "📥 Lead mới" + "✅ Family đã provisioned"
   - ✅ Click login URL → vào `/onboarding`
   - ✅ Supabase SQL Editor query `SELECT * FROM public.families;` thấy 2 rows: `tran-binh` (seed) + `tran-duc-binh` (test)
3. Test phụ:
   - Submit lead thứ 2 cùng email → expect `EMAIL_EXISTS` (vì D-031 phone OTP path stuck — anh sẽ thấy thông báo "Email đã tồn tại")
   - Anh duyệt manual trong `/admin/signup-requests` (anh đã build admin page rồi)

## Open trade-offs đã chấp nhận khi chọn Option A

| Mất | Lý do chấp nhận |
|-----|-----------------|
| D-031 cross-product login (khách Gia Phả không tự liên kết Kids cùng email) | Anh nói "khó khăn ban đầu nhưng nhẹ nhàng về sau" — khách Kids khác phân khúc với khách Gia Phả, ít chồng lấp |
| Backup quota share giữa 2 projects (Pro tier 1GB backup tổng org) | Kids data growth chậm, không lo |

## Anh cần action ngay

1. **Tạo project Supabase** theo Phase 1 (~5 phút)
2. **Share lại 3 giá trị** (URL + anon + service_role) vào chat
3. Em sẽ chạy Phase 2 + 3 + 4 song song

Hoặc nếu anh muốn TỰ làm hết: em prepare full SQL bundle (`SETUP_BUNDLE.sql` gộp A+B+C) anh paste 1 lần.
