# Handoff — Pany Kids Studio EOD 2026-05-15

**Session length:** ~5h (chiều → tối)
**Final state:** ALL GREEN — Pany Kids LIVE production end-to-end

## 🎯 Quick resume cho session sau

```
Chào em — session mới Pany Kids Studio. Reference docs/handoff-2026-05-15-EOD.md
```

## ✅ Đã đóng trong session này

1. **D-035 Phase 3d** — wire 6 Gemini Imagen tree lifecycle stages (Hạt giống → Kết trái) vào `/welcome` thành "Hành trình cây tri thức" progression strip với dark navy + cyan glow + timeline labels.
2. **Vercel webhook auto-deploy** — diagnosed + fixed. Root cause: `rootDirectory` setting missing on Vercel project + git connect đang ở repo root thay vì `apps/web/`. Fix: PATCH `/v9/projects/{id}` API với `{"rootDirectory":"apps/web"}` + `vercel git disconnect` + `vercel git connect <url>` từ apps/web. Webhook giờ auto-trigger trong ~45s mỗi commit.
3. **Custom domain `kids.panyvn.app`** — added via `vercel domains add`. Live, HTTP 200 all routes.
4. **New isolated Supabase project `pany-kids-prod`** — anh tạo thủ công trong Renzy (PRO) org, region ap-south-1 Mumbai. Ref: `sbubzbgyvozabgrggjza`. URL: `https://sbubzbgyvozabgrggjza.supabase.co`.
5. **Schema migration** — applied `artifacts/SETUP_BUNDLE.sql` (1-paste bundle: profiles prefix + family v1 + FK stitch). 7 tables created + 1 seed family (`tran-binh` + Phúc 11/An 9/Y 5).
6. **2 CHECK constraint hotfix** caught by E2E test:
   - `families.tier` += `'standard'` (D-033 code change, not reflected in v1 migration)
   - `family_signup_requests.status` += `'phone_verify_required'` (D-031 same pattern)
7. **8 production env vars** wired in Vercel: Supabase URL+anon+service_role, NEXT_PUBLIC_APP_URL, Brevo API+sender, Telegram bot+chat. All encrypted.
8. **Brevo IP allowlist** — disabled "Activate for API keys" in Brevo Security settings. Vercel uses rotating AWS IPs (saw 54.175.156.175 → 3.239.101.212 within 2 min) — IP whitelist impossible to maintain. Security still strong because API key is encrypted in Vercel.
9. **E2E full signup flow verified:** `POST /api/sell/register` → form → Supabase write (families + profile via trigger + family_kids) → Brevo welcome email → Telegram alert. Test family_id `8c725bfd-9110-4135-809b-dcbc6d5f7698` slug `gia-dinh-thanh-cong`.

## 📋 Customer-facing URLs (production-ready, anh share được khách)

| URL | Purpose |
|-----|---------|
| https://kids.panyvn.app/dangky | Form đăng ký ngắn (redirect → /sell/register) |
| https://kids.panyvn.app/welcome | Landing chính, SEO indexable |
| https://kids.panyvn.app/sell | Sales page dài, noindex |

## 🚨 Trade-offs accepted (anh chốt 2026-05-15)

1. **Option A Supabase** (new isolated project) — sacrifice D-031 cross-product login between Gia Phả ↔ Kids in exchange for clean isolation, independent backup, no cascading downtime risk. Cost 0₫ extra under Pro org-level billing.
2. **Brevo IP allowlist DISABLED** — security tradeoff documented in `feedback_brevo_ip_allowlist_gotcha` memory; mitigations: rotate `BREVO_API_KEY` quarterly + monitor Brevo dashboard for abnormal volume.

## 📦 Artifacts produced (all committed)

```
artifacts/
├── migration-00-profiles-prefix-2026-05-15.sql  # bootstrap profiles table + trigger
├── migration-family-2026-05-14.sql              # 6 family_* tables (existing)
├── SETUP_BUNDLE.sql                              # 1-paste install bundle (A+B+C)
├── hotfix-tier-constraint-2026-05-15.sql        # 2 CHECK extensions
├── setup-new-supabase-project-2026-05-15.md     # 4-phase anh-facing checklist
└── mockups/tree/                                 # 6 JFIF source + 6 JPG previews + canonical PNG
```

```
apps/web/
├── app/welcome/page.tsx                         # +Hành trình cây tri thức section (D-035 Phase 3d)
├── public/tree-stages/stage-{1..6}-*.jpg        # 6 lifecycle images live
└── lib/family-provision.ts                      # +email_error/telegram_error surface (commit fff5450, keep for ops)
```

## 🔧 Infrastructure snapshot

- **Vercel project:** `prj_cOWria3psTUu1LaUDirpbExXBrzB` (team `team_LTrDfL6BT8APbduK34FcSBiX`)
- **Vercel rootDirectory:** `apps/web` (set via REST API PATCH on 2026-05-15)
- **GitHub:** `tdbinh27-sudo/pany-kids-studio` → main branch auto-deploys via webhook
- **Supabase:** `pany-kids-prod` ref `sbubzbgyvozabgrggjza` org Renzy PRO
- **Brevo:** account `tdbinh27@gmail.com` org "PANY Super OS", free plan 300/day, IP allowlist OFF for API keys
- **Telegram:** bot `@pany_super_os_bot` id 8581163364, chat_id 6418327150 (anh)
- **Domain:** `kids.panyvn.app` → Vercel auto-assigned to latest production

## ⏭️ Next session backlog (suggestions)

1. **Test login flow** — anh dùng email + temp password từ welcome email → vào `/login` → onboarding → dashboard. Verify Cô Pany AI chat works (`/api/chat` route uses `ANTHROPIC_API_KEY` env, already set).
2. **Admin dashboard** — `/admin/signup-requests` đã có code, anh check xem display lead E2E test có đẹp không.
3. **D-035 Phase 3e** — possible follow-ups: (a) lazy-load tree progression strip below-fold for LCP, (b) animation on scroll (stage cards fade in sequentially), (c) "next stage preview" CTA microcopy variants.
4. **First real customer rollout** — anh có thể share `kids.panyvn.app/dangky` cho 1-2 phụ huynh thân thiết thử + feedback.
5. **Cleanup test family `gia-dinh-thanh-cong`** trong Supabase nếu không cần làm reference nữa (hoặc keep as historical first-signup row).
6. **Sprint 2 feedback Day 1-7 backfill** (per old handoff 2026-05-13) — feedback file vẫn empty.

## 📚 Memory entries created today

- `reference_pany_kids_prod_supabase.md` — infra reference
- `feedback_brevo_ip_allowlist_gotcha.md` — Brevo gotcha for future Vercel projects
- `feedback_vercel_rootdirectory_monorepo.md` — Vercel monorepo deploy pattern

## ⏸️ Anh chưa verify (cần check sau session)

- [ ] Welcome email arrive ở `tdbinh27@gmail.com` inbox? (subject "Chào mừng Gia dinh thanh cong...")
- [ ] Telegram `@pany_super_os_bot` có 8 messages từ 4 lần test E2E?
- [ ] Login link trong email work? Dashboard hiển thị đúng kid age 8 + emoji 🚀?
