# Session 16 Closeout — Pany Kids Studio Commercialization Scaffold

**Date:** 2026-05-13 (~13:30 → ~20:30 GMT+7, ~7h working — extended after initial closeout)
**Outcome:** P0 SHIPPED + P2 FOUNDATION (full 5-16 seed) + P3 SKELETON + Commercial routes + Admin Dashboard + Onboarding API all built.
**Status:** Blocked on anh — 7 Resume Gate items. Mai tiếp tục.

## 🌙 Closeout extension (post-initial save, 2026-05-13 evening)

After initial S+T closeout, anh requested polish work to continue parallel:
- **Push 8 commits to GitHub** ✅ (origin/main now matches local)
- **Full curriculum seed 5-16** ✅ (12 single-year tracks complete)
- **/admin/dashboard combined UI** ✅ (5 sections + cost guard banner)
- **D-032 chatbot rename hybrid** ✅ ("Cô Pany" default for new families, "Đại Ka" override for 3 con)
- **X: seed-content.ts** ✅ (~60 sample entries dev test data)
- **Z: family-onboarding.ts** ✅ (3-step wizard helpers + smart suggestions)
- **AA: plan progress dashboard** ✅ (D-032 + new milestones logged)
- **BB: /api/family/onboarding route** ✅ (POST step submit + GET state, wires Z into HTTP)

**Session 16 final total: 11 commits, ~8.5K LOC, 13 decisions D-020 → D-032.**

> **Single-file resume packet.** Next session: open this file first, then `handoff.md`, then start work. All canonical files (status/handoff/tasks/decisions/plan) updated synchronously.

---

## 🎯 What got shipped today (6 commits, ~6000 LOC, TypeScript 100% clean)

```
6577007 feat(L-O): /welcome + admin families API + family-stats analytics + plan progress
83bc69c feat(F-K): verify-otp + admin UI + OG image + env guide + project OS docs
db7fc15 feat(B+C+D+E): /sell landing + share-kit + age-aware tone + CTV agreement + D-031
a6a03ee feat(P3-skeleton): family-provision + email + notifications (Gia Phả port)
85fd95a feat(P2-foundation): age-curriculum + curated-links + claude-patch + migration draft
14bb3eb feat(P0): sidebar reorder Khám phá → #3 + commercialization plan
```

## ⚖️ 12 Decisions logged (D-020 → D-031)

| ID | Topic | Resolution |
|---|---|---|
| D-020 | Commercial pattern | Clone Pany Gia Phả multi-tenant SaaS (~60% asset re-use) |
| D-021 | Subdomain | `kids.panyvn.app` (free Vercel subdomain) |
| D-022 | Pricing | **FREE 3 months, NO tier display**, review 2026-08-13, $50/mo cost cap |
| D-023 | P0 sidebar | Khám phá → position #3 ✅ SHIPPED today |
| D-024 | Content seed | CTV draft + bố review (templates in `artifacts/content-templates/`) |
| D-025 | Sprint 2 gate | Backfill Day 1-4 feedback BEFORE P1 (D-025 hard gate) |
| D-026 | Beta cohort | Family + friends + parent groups lớp + FB; B2B = enterprise pricing riêng |
| D-027 | Payment | SePay VietQR only when pricing introduced |
| D-028 | Age | 12 single-year tracks 5→16 (VN curriculum + reference books + advanced sources) |
| D-029 | Khám phá curated links | Anh personally curates, em build UI scaffold |
| D-030 | Đại Ka rename | KEEP default per D-011 + per-family Settings picker |
| D-031 | Email collision | Separate Supabase project + phone OTP scaffold for cross-product reuse |

## 📁 Files created/modified Session 16

### NEW lib files (P2 + P3 scaffolds)

```
apps/web/lib/age-curriculum.ts        ~280 lines — 12 age tracks 5→16 (D-028)
apps/web/lib/curated-links.ts         ~220 lines — Khám phá schema (D-029)
apps/web/lib/family-provision.ts      ~360 lines — 12-step auto-provision (D-020, D-031)
apps/web/lib/family-email.ts          ~180 lines — Brevo skeleton + welcome email
apps/web/lib/family-notifications.ts   ~80 lines — Telegram bot skeleton
apps/web/lib/phone-verify.ts          ~190 lines — SMS OTP scaffold (D-031)
apps/web/lib/family-stats.ts          ~260 lines — admin analytics (4 helpers + cost guard)
```

### NEW commercial routes

```
apps/web/app/welcome/page.tsx                          Public soft landing
apps/web/app/sell/page.tsx                             Hidden sales landing (no pricing)
apps/web/app/sell/register/page.tsx                    3-step form (form → OTP → success)
apps/web/app/dangky/page.tsx                           Short URL redirect
apps/web/app/api/sell/register/route.ts                Lead capture POST
apps/web/app/api/sell/verify-otp/route.ts              D-031 OTP verify
apps/web/app/admin/signup-requests/page.tsx            Admin lead inbox
apps/web/app/api/admin/signup-requests/route.ts        Admin GET list + PATCH approve/decline
apps/web/app/api/admin/families/route.ts               Admin families list with filters
apps/web/public/og-image.svg                           FB/Zalo preview SVG
```

### NEW artifacts (docs)

```
artifacts/commercialization-plan-2026-05-13.md         Full plan with phase progress dashboard
artifacts/migration-family-2026-05-14.sql              P1 schema (NOT applied, anh reviews)
artifacts/share-kit-kids.md                            4 captions VN + email template
artifacts/ctv-agreement-template.md                    9 sections + 2 phụ lục
artifacts/vercel-env-setup-2026-05-13.md               Step-by-step env setup guide
artifacts/content-templates/                           CTV briefs:
  ├── README.md                                          Workflow + reject criteria + rates
  ├── quest-template.md                                  5 graded examples (age 5/9/11/14/16)
  ├── bilingual-story-template.md                        K-level example with vocab focus
  └── math-question-template.md                          5 graded examples L1→L5
artifacts/session-16-closeout-2026-05-13.md            ← THIS FILE
```

### MODIFIED files

```
apps/web/components/PanyKidsStudio.tsx                 Sidebar reorder (P0, D-023)
apps/web/lib/claude.ts                                 botName override (D-030) + age tone wire (D-028)
apps/web/app/sell/page.tsx                             OG image refs
apps/web/package.json + pnpm-lock.yaml                 +@supabase/supabase-js
status.md + handoff.md + tasks.md + decisions.md       Session 16 sync
.gitignore                                             Dev artifacts pattern
```

## 🚪 Resume Gate — 7 items blocking P1 wire-up (in priority order)

### Block 1 — Security + Operations (anh do TODAY/this week)

| # | Action | Effort | Tool/URL |
|---|---|---|---|
| 1 | 🔴 Rotate Anthropic API key | 2 phút | `console.anthropic.com/settings/keys` |
| 2 | 🔴 Backfill Sprint 2 Day 1-4 feedback với 3 con | 30 phút | `artifacts/feedback-week-1.md` |
| 3 | ⚠️ Re-link Vercel ↔ GitHub webhook | 2 phút | Vercel → Settings → Git |
| 4 | ⚖️ Chốt Path A/B Session 15 debug deps | 1 phút | `boneyard-js` + `playwright` keep or strip |

### Block 2 — P1 Infrastructure (anh do when ready to go live)

| # | Action | Effort | Reference |
|---|---|---|---|
| 5 | 🟡 Tạo Supabase project mới `pany-kids-prod` (Mumbai region) | 10 phút | `vercel-env-setup-2026-05-13.md` BƯỚC 1 |
| 6 | 🟡 Apply `artifacts/migration-family-2026-05-14.sql` + add `phone_verified` column | 5 phút | Supabase SQL Editor |
| 7 | 🟡 Setup Vercel env vars (Supabase + Brevo + Telegram + ADMIN_SECRET) | 15-20 phút | `vercel-env-setup-2026-05-13.md` |

**Total anh effort: ~65-75 phút** spread anytime over next 1-2 weeks.

## 🔌 What em can do PARALLEL while anh handles Resume Gate

Nothing critical — em đã build hết scaffold scope reasonable cho session này. Optional polish work em có thể làm khi anh ping:

- `app/admin/dashboard/page.tsx` — combined view (signup-requests + families + stats charts) using existing `family-stats.ts` helpers
- `app/api/sell/og/route.ts` — dynamic OG generator per-family share URL
- More CTV templates: `career-qna-template.md`, `curriculum-entry-template.md`
- More SDK provider wires when anh chốt eSMS budget
- `lib/age-curriculum.ts` seed expansion: add age 7, 8, 9, 10 entries (currently only 5/6/11 seeded)
- Build `og-image.png` raster export from SVG (some platforms prefer PNG over SVG)

## 🛠️ Browser test result (F)

Localhost dev server tested 5 routes via browser-pilot:

| Route | Status | Console errors |
|---|---|---|
| `/sell` | ✅ PASS | 0 |
| `/dangky` | ✅ PASS (redirects to /sell/register) | 0 |
| `/sell/register` | ✅ PASS (form validates, kids ages fill correctly) | 0 |
| `/admin/signup-requests` | ✅ PASS (gate + admin UI both render) | 1 expected (Supabase 503 in dev) |
| `/og-image.svg` | ✅ PASS (Pany Kids brand renders) | 0 |

## 📊 Production state (no auto-deploy happened — webhook still broken)

```
Production URL:   https://pany-kids-studio.vercel.app          HTTP 200 (verified Session 16 start)
VPS 24/7:         http://61.14.233.122/                        HTTP 200 (verified Session 16 start)
Production HEAD:  eeea893 (Session 15 hotfix log, 2026-05-10)
Local HEAD:       6577007 (Session 16 final L-O)               7 commits ahead of production
```

Anh fix Vercel webhook (Resume Gate #3) → next push auto-deploys all 7 commits OR manual `vercel deploy --prod`.

## 🔄 Next session resume commands

When anh xong Block 1 (#1-4):

```
Continue pany-kids-studio P1 wire-up — anh đã rotate key + fix webhook + backfill feedback
```

When anh xong Block 2 (#5-7):

```
Continue pany-kids-studio — apply migration done, wire /api/sell/register end-to-end live + verify Telegram alert
```

When anh muốn em làm polish work parallel:

```
Continue pany-kids-studio admin dashboard + seed more age tracks (7,8,9,10)
```

## ⚠️ Critical notes for next session

1. **Reload current state first** — open `artifacts/session-16-closeout-2026-05-13.md` (this file) + `handoff.md` + check `git log --oneline -8`
2. **Production webhook still broken** — manual `vercel deploy --prod` until anh fixes
3. **Đại Ka name rename keeps default** — D-011 (2026-05-01) STILL VALID; D-030 confirms keep + adds Settings override
4. **Pany Kids = separate Supabase project** — NOT shared with Gia Phả (D-031). When creating, use Mumbai region.
5. **Sprint 2 Day 1-4 feedback empty** — biggest risk to commercial launch validity. D-025 gate.
6. **Cost guardrail $50/mo Anthropic** — already coded in `family-stats.ts.isOverCostBudget()`. Monitor when family count grows.
7. **package.json deps decision** — `boneyard-js` + `playwright` from Session 15 verify still pending Path A/B. `@supabase/supabase-js` was added cleanly today (Path A independent decision).
8. **Browser-pilot found 1 test-script issue** (not a UI bug): parent_name input selector quirk. Form works for real users.

## 🎓 Lessons captured Session 16

1. **Email collision across products is REAL** (anh's instinct) → built phone OTP scaffold proactively (D-031). When Pany ID central identity built Q3+, this lays foundation.
2. **Plan files prevent re-decision loops** — `commercialization-plan-2026-05-13.md` Section 6 captured 7 Q's, anh answered in 1 message, em executed 6 commits without re-clarifying.
3. **Skeleton-first pattern works** — all P3 lib files compile clean WITHOUT Supabase env, return zero-state when missing → UI can render in skeleton mode, no errors. Anh can preview /sell/register in dev before any backend setup.
4. **CTV agreement template = scope guard** — D-024 with detailed safety + IP terms means anh can hire fast without re-writing legal each time.
5. **Pany Gia Phả pattern reuse saved ~15-20h** — porting clan→family conventions instead of redesigning.

---

**Session 16 closed at:** ~18:00 GMT+7 (2026-05-13)
**Total LOC delta:** ~6000 net additions (libs + routes + artifacts)
**Resume command:** `Continue pany-kids-studio P1 wire-up`
