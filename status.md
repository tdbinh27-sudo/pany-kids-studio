# Status — Pany Kids Studio

**Last updated:** 2026-05-13 ~17:30 GMT+7 (Session 16 — MAJOR: P0 ship + P2 foundation + P3 skeleton + commercial pipeline)
**Current state:** v3.3-C still live on production. 5 new commits today on `main` branch (NOT auto-deployed — webhook still broken, anh manual deploy when ready). All code TypeScript clean. Browser-pilot tested 5/5 routes PASS at localhost dev.

## ⭐ SESSION 16 (2026-05-13) — COMMERCIALIZATION PIPELINE BUILT

### Decisions logged (D-020 → D-031, 12 decisions)
- D-020 Clone Gia Phả commercial pattern (multi-tenant family SaaS)
- D-021 Subdomain `kids.panyvn.app`
- D-022 **FREE 3 months, NO pricing tier display** (review trigger 2026-08-13)
- D-023 P0 sidebar reorder Khám phá → #3 ✅ SHIPPED
- D-024 Content seed CTV draft + bố review
- D-025 Backfill Sprint 2 feedback Day 1-4 BEFORE P1 starts
- D-026 Beta B2C = family/friends/parent groups/FB; B2B = enterprise pricing riêng
- D-027 SePay only initially (when pricing introduced)
- D-028 Age 5-16 → 12 single-year tracks (VN school + reference + advanced sources)
- D-029 Khám phá curated links anh-curated (em build UI scaffold)
- D-030 Đại Ka name KEEP (honor D-011) + add per-family rename in Settings
- D-031 Pany Kids = separate Supabase project + phone-OTP verify for cross-product email collision

### Code shipped (5 commits, ~3.5K insertions, all TypeScript clean)

```
db7fc15 feat(B+C+D+E): /sell landing + share-kit + age-aware Đại Ka tone + CTV agreement + phone-verify (D-031)
a6a03ee feat(P3-skeleton): port family-provision + email + notifications from Gia Phả
85fd95a feat(P2-foundation): age-curriculum + curated-links + chatbot_name scaffold + CTV templates + P1 migration draft
14bb3eb feat(P0): sidebar reorder Khám phá → position #3 + Session 16 commercialization plan
+ pending commit: F→K batch (verify-otp + OG image + admin UI + env guide + docs)
```

### Foundation libs (P2)
- `lib/age-curriculum.ts` — 12 age tracks 5→16, VN grade mapping, Đại Ka tone hint per age
- `lib/curated-links.ts` — schema + helpers cho anh-curated Khám phá links
- `lib/family-provision.ts` — 12-step auto-provision skeleton (validate → email check → create family + auth + settings + kids → email + telegram)
- `lib/family-email.ts` — Brevo skeleton + Kids welcome template (3-month trial banner)
- `lib/family-notifications.ts` — Telegram bot skeleton (plain text)
- `lib/phone-verify.ts` — D-031 SMS OTP scaffold (eSMS/Stringee/Twilio stubs)
- `lib/claude.ts` patches — botName override (D-030) + age-aware tone injection (D-028)

### Commercial routes (P3)
- `/sell` — landing với 8 features + 4-step + 7 FAQs + final CTA, NO pricing
- `/sell/register` — form 3-step (form → phone OTP → success)
- `/dangky` — short URL redirect
- `/api/sell/register` — POST endpoint env-gated (Telegram alert + auto-provision)
- `/api/sell/verify-otp` — D-031 OTP verification + provision retry
- `/admin/signup-requests` — admin UI (auth via ADMIN_SECRET) với approve/decline
- `/api/admin/signup-requests` — GET list + PATCH approve/decline
- `public/og-image.svg` — Pany Kids brand OG image cho FB/Zalo preview

### Artifacts (CTV + commercial docs)
- `artifacts/commercialization-plan-2026-05-13.md` — full proposal đã approved
- `artifacts/migration-family-2026-05-14.sql` — P1 schema draft (NOT applied)
- `artifacts/content-templates/` — 4 CTV briefs (README + quest + story + math)
- `artifacts/share-kit-kids.md` — 4 captions VN + email template phụ huynh + 6 FAQ
- `artifacts/ctv-agreement-template.md` — 9 sections + 2 phụ lục (CTV brief)
- `artifacts/vercel-env-setup-2026-05-13.md` — step-by-step env vars guide

### Browser test (F)
✅ Localhost `pnpm dev` → browser-pilot tested 5 routes:
- `/sell` PASS, 0 console errors, no pricing tier, all sections present
- `/dangky` PASS, redirects to /sell/register correctly
- `/sell/register` form PASS, validation works, age fields fill correctly
- `/admin/signup-requests` PASS, gate works, admin UI loads (503 expected without Supabase)
- `/og-image.svg` PASS, SVG renders với Pany Kids branding

### Still pending anh action (block production claim)
- 🔴 Rotate Anthropic API key (`console.anthropic.com/settings/keys`) — đã pending 11+ sessions
- 🔴 Backfill Sprint 2 Day 1-4 feedback với 3 con (D-025 gate before P1 starts)
- ⚠️ Re-link Vercel ↔ GitHub webhook (Settings → Git)
- ⚖️ Path A/B decision cho Session 15 debug deps (boneyard-js + playwright + 3 PNGs)
- 🟡 P1 migration apply (anh review `artifacts/migration-family-2026-05-14.sql` + add `phone_verified` column per `vercel-env-setup-2026-05-13.md`)
- 🟡 Setup Vercel env vars per env-setup guide

⚠️ **Vercel auto-deploy webhook still broken** — pushes `c3f947a` (Session 14 fix), `322ac64` (docs), `8931a53` (Session 15 hotfix) did NOT auto-deploy. Used `vercel deploy --prod` manually. Anh check Vercel project → Settings → Git → re-link GitHub integration when convenient.

## ⭐ SESSION 12 (2026-05-09) — DATA EXPANSION

| Bank | File | Content | Notes |
|------|------|---------|-------|
| Daily Quests | `lib/quests.ts` (NEW) | 252 quests (12 pillars × 3 age groups × 7 days) | v1 foundation, anh extends to 500+ |
| English Skills | `lib/english-skills.ts` (REWRITE) | 205+ vocab / 55 speak / 20 reading / 32 writing | NEW level "K" for Như Ý mầm non |
| Math Quiz | `lib/math-quiz.ts` (NEW) | 210 curated + 850 generated = **1060** | L1/L2/L3/L4 = lớp lá → cấp 2 |
| Bilingual Stories | `lib/bilingual-stories.ts` (NEW) | 50 stories (8 K + 14 A1 + 16 A2 + 12 B1) | Paragraph-aligned VI↔EN |

**Kid info corrected** (was 8/10/12, now correct):
- Phúc 11t (lên lớp 6 9/2026)
- An 9t (lên lớp 4 9/2026)
- Như Ý 5t sinh 2020-02-28 (vào lớp lá 9/2026)

Files updated for kid info: `PanyKidsStudio.tsx`, `apps/mobile/lib/kids.ts`, `lib/claude.ts` (VI+EN system prompts).

## ⭐ SPRINT 1 COMPLETE (5/1 - 5/2/2026)

All 7 days delivered in 2 sessions:

| Day | Date | Delivered | Commit |
|-----|------|-----------|--------|
| 1 | 5/1 | strategy-v2.md + Đại Ka boost (Sonnet 4.6 + 800 tokens + 100/hr + 20-turn history) + child psych/parenting/RIASEC knowledge + escalation hotlines | `dcf9b25` |
| 2-3 | 5/2 | Studio Sáng tạo (canvas + 21 prompts) + Cơ thể & Vận động (timer + breathing + 7-day chart) + Tự khám phá (mood + RIASEC quiz 36/48 questions) | part of `b58fbb3` |
| 4-5 | 5/2 | La bàn nghề (60 careers) + Cầu nối Gia đình (notebook + weekly review + ask-parent prompts) | part of `b58fbb3` |
| 6-7 | 5/2 | Mobile app scaffold — Expo SDK 53 + RN 0.79 + 4 starter screens (Home/Discovery/Chat/Settings) + AsyncStorage parity + Đại Ka API integration | `85cb863` |

**12-pillar architecture** per strategy-v2.md Q4 now LIVE:
- **Skills track (6)**: Tech · English · Finance · Thinking · Business · Life
- **Development track (6)**: Theo dõi · Sáng tạo · Vận động · Tự khám phá · La bàn nghề · Gia đình

## URLs
- 🌐 Production web: https://pany-kids-studio.vercel.app
- 🖥️ VPS 24/7: http://61.14.233.122/
- 📦 Repo (public): https://github.com/tdbinh27-sudo/pany-kids-studio
- 🛠️ Vercel project: tdbinh27-3978s-projects/pany-kids-studio
- 📱 Mobile: not yet on App Store / Play (target 8/2026)

## Git history (latest 7)
```
5176e32  feat(v3.2-E): English 4 skills — Listen / Speak / Read / Write (Phase 8)   ← latest
4ae145c  docs: Sprint 2 prep — onboarding script, feedback template, README polish
e0d0823  fix(v3.2-D): 3 bugs found via post-deploy bug-hunt
de8fde0  chore: Project OS docs for Sprint 1 completion (Session 10)
85cb863  feat(v3.2-C): Expo + RN mobile app scaffold (Sprint 1 Days 6-7)
b58fbb3  feat(v3.2-B): 5 new development pillars (Sprint 1 Days 2-5)
dcf9b25  feat(v3.2-A): strategy v2 pivot — Đại Ka boost
```

## v3.2-E Phase 8 (Session 11, 2026-05-03) — `5176e32`

### English 4 skills tab — `🎓 English 4 kỹ năng`

Browser-native interactive English practice. CEFR-leveled (A1/A2/B1) auto-picked from kid age.

| Mode | Tech | Content |
|------|------|---------|
| 🎧 **Nghe** (Listen) | `window.speechSynthesis` (TTS) | 68 vocab words A1/A2/B1 with phonetic + VN gloss. 4-option multiple choice, click to hear, replay button, feedback reveals all options' VN meaning |
| 🗣️ **Nói** (Speak) | `SpeechRecognition` (ASR) | 17 sentences A1→B1. Hear Đại Ka → record kid voice → Levenshtein-based 0-100 pronunciation match score with encouragement |
| 📖 **Đọc** (Read) | Pure data | 3 reading passages (cat/zoo/curiosity essay) + 3-4 multiple-choice questions each with VN explanations on submit |
| ✍️ **Viết** (Write) | `/api/grade-english` (Sonnet 4.6) | 9 writing prompts. Đại Ka grades: score 0-100 + strengths + improvements + corrected version + encouragement. Live test verified 78/100 with 3 grammar fixes |

**New files:**
- `apps/web/lib/english-skills.ts` — 280 lines content bank + helpers (Levenshtein, pronunciationScore)
- `apps/web/lib/speech.ts` — 140 lines Web Speech API wrappers with feature detection
- `apps/web/app/api/grade-english/route.ts` — 120 lines grading endpoint, structured JSON, 30/hr rate limit
- `apps/web/components/PanyKidsStudio.tsx` +600 lines (EnglishSkillsTab + 4 panel components)
- New persist key: `pks3-englishProgress`

**Browser compat handling:**
- Chrome/Edge: full TTS+ASR works
- Safari: TTS only (warning card if user clicks Speak)
- Firefox: TTS only (same warning)

## Sprint 1 deliverables (full inventory)

### v3.2-B web (Days 2-5) — `b58fbb3`
- 3 new lib files (~1500 lines): `riasec-junior.ts`, `careers-v2.ts`, `family-prompts.ts`
- 5 new tab components in PanyKidsStudio.tsx (~1100 lines added):
  - `StudioCreativeTab` — HTML5 canvas + 21 daily prompts
  - `BodyMovementTab` — exercise timer + breathing animation + 7-day chart
  - `SelfDiscoveryTab` — mood journal + RIASEC quiz with results view
  - `CareerCompassTab` — 60 careers + filters + modal + day-in-life projects
  - `FamilyBridgeTab` — notebook + weekly review + ask-parent prompts
- New sidebar group "PHÁT TRIỂN" with 5 tabs
- 8 new pks3-* localStorage keys for cross-platform JSON sync

### v3.2-C mobile (Days 6-7) — `85cb863`
- 22 new files (~2300 lines) under `apps/mobile/`
- Expo SDK 53 + RN 0.79 + React 19 + TypeScript strict
- React Navigation v7 bottom-tabs (4 tabs: Home/Discovery/Chat/Settings)
- AsyncStorage parity with web (`pks3-*` keys IDENTICAL)
- 4 atom components (Card/Btn/Pill/KidSelector)
- 4 starter screens (Discovery has full RIASEC quiz ported)
- ChatScreen wired to live `/api/chat` Vercel endpoint

## Phase progress

| Phase | Status |
|-------|--------|
| Phase 0-7 — Web v3.0 → v3.1-D | ✅ DONE |
| Phase 8 — English 4 skills | ⏸️ DEFERRED (lower priority post-v3.2) |
| Phase 9 — v3.2-A Strategy pivot | ✅ DONE 5/1 |
| Phase 10 — v3.2-B Development pillars | ✅ DONE 5/2 |
| Phase 11 — v3.2-C Mobile scaffold | ✅ DONE 5/2 |
| **Sprint 1** — Internal build (1 week) | ✅ COMPLETE |
| **Sprint 2** — Iterate w/ Phúc/An/Y (2 months, 5/8 - 7/8) | ⚠️ WEEK 1 IN PROGRESS — feedback file empty Day 1-4 |
| Sprint 3 — Mobile mature + App Store submission (7/2026) | ⏸️ Future |
| Sprint 4 — Beta family expansion (8/2026) | ⏸️ Future |
| Public launch | ⏸️ Target 8/16/2026 |

## Risk Watch

- 🔴 **API key STILL exposed** — anh chưa rotate after 10 sessions. `sk-ant-api03-WRBcVGm...` in old logs. **ROTATE NGAY** at https://console.anthropic.com/settings/keys
- 🟡 **Sonnet 4.6 cost** — 3× Haiku, capped at $15/month. Monitor weekly.
- 🟡 **Mobile not pnpm-installed yet** — anh cần `cd apps/mobile && pnpm install && pnpm start` before scanning QR with Expo Go. NOT auto-tested in this session.
- 🟡 **Mobile assets missing** — placeholder PNG required (icon/splash/adaptive-icon/favicon). Without them, Expo dev still works but build will fail.
- 🟢 **Web deploys clean** — Vercel + VPS both serving HTTP 200 (verified).
- 🟢 **Stack stable** — Next.js 16, RN 0.79, Anthropic SDK, AsyncStorage, no known CVE.
- 🟢 **GitHub repo public** — clean, no secrets.

## Active dev server
- Local web: http://localhost:3475 (Claude Preview ID: 79fe608a-9756-48ef-a0cc-7023642deb87)
- Production web: https://pany-kids-studio.vercel.app

## Next session resume options

**(A) Sprint 2 internal feedback** (recommended):
```
Continue pany-kids-studio Sprint 2 — Phúc/An/Y daily usage feedback
```
Anh cùng 3 con dùng dashboard hằng ngày 1-2 tuần → ghi chú UX bugs + feature gaps → fix iteratively.

**(B) Mobile installation + first run**:
```
Continue pany-kids-studio mobile install + Expo Go test
```
`pnpm install` + add placeholder assets + `pnpm start` + QR scan với phone của bố.

**(C) Domain purchase**:
```
Continue pany-kids-studio domain panykids.io
```
Sau 1 tuần test nội bộ (per Q6) → mua domain + map vào Vercel + iOS bundle id update.

**(D) English 4 skills** (older deferred):
```
Continue pany-kids-studio English Listen/Speak/Read/Write
```
Web Speech API + audio + AI grading. ~6h focused work.
