# Handoff — Pany Kids Studio

**Last session:** Session 10 — 2026-05-02 (Sprint 1 COMPLETE + deployed)
**Current chapter:** v3.2-C LIVE on Vercel + VPS, mobile scaffold ready for `pnpm install`
**Next session:** Sprint 2 (5/8 - 7/8/2026) — Phúc/An/Y daily usage feedback

---

## 🎯 RESUME COMMAND for next session

Type to Claude Code:
```
Continue pany-kids-studio Sprint 2 — Phúc/An/Y daily usage feedback
```

Claude Code will:
1. Read `strategy-v2.md` (canonical source-of-truth)
2. Read `decisions.md` (15 decisions including D-013 12-pillar + D-014 mobile stack + D-015 chat endpoint)
3. Read this `handoff.md` (current snapshot)
4. Read `tasks.md` for Sprint 2 backlog
5. Open feedback collection for the 3 kids

---

## 📦 What was accomplished Session 10 (2026-05-02)

Sprint 1 fully delivered in one mega-session:

### Day 1 (already done in Session 9, 5/1)
v3.2-A: strategy-v2.md saved + Đại Ka boost (Sonnet 4.6 + 800 tokens + 100/hr + 20-turn history) + child psych/parenting/RIASEC/escalation knowledge expansion. Commit `dcf9b25`.

### Days 2-5 (this session, 5/2)
v3.2-B: 5 new development pillars on web (commit `b58fbb3`):
- **Studio Sáng tạo** — HTML5 canvas drawing + 21 daily creative prompts + per-kid artwork gallery
- **Cơ thể & Vận động** — 12 exercise challenges with circular timer + 1-min mindful breathing animation + 7-day bar chart
- **Tự khám phá** — mood journal (5 weather emojis + 7-day history) + RIASEC Junior quiz (36q ages 8-12, 48q ages 13-15) + results view with top-3 + bar chart
- **La bàn nghề** — 60 careers (10 per RIASEC type) with VN context (salary/example/path) + Career-of-Day rotation + 3 views (Explore/Recommended/Saved) + age & RIASEC filters + full detail modal
- **Cầu nối Gia đình** — daily ask-parent prompt (30 questions) + weekly Show & Tell + weekly family activity + shared notebook with parent/kid author distinction + 6-question Sunday weekly review

3 new lib files: `riasec-junior.ts` (84 questions + 6 RIASEC types), `careers-v2.ts` (60 careers + 18 mini-projects), `family-prompts.ts` (30+15+15+6 prompts).

### Days 6-7 (this session, 5/2)
v3.2-C: Mobile app scaffold (commit `85cb863`):
- **22 files, ~2300 lines** under `apps/mobile/`
- **Stack**: Expo SDK 53 + RN 0.79 + React 19 + TypeScript strict + React Navigation v7 bottom-tabs + AsyncStorage
- **4 starter screens**: Home (welcome + kid selector + streak + mood + tip), Discovery (mood + full RIASEC quiz), Chat (Đại Ka with KeyboardAvoidingView calling live `/api/chat`), Settings (lang toggle + privacy + about)
- **4 atom components**: Card / Btn / Pill / KidSelector
- **AsyncStorage parity**: identical `pks3-*` keys with web → JSON export/import cross-platform
- **Bundle ID**: `io.panykids.app` (iOS + Android)
- Pure-data libs (riasec-junior, careers-v2, family-prompts) **copied** from web → extract to `packages/shared/` in v0.2

### Deployment (this session)
- ✅ Web pushed to GitHub `main` (2 commits: `b58fbb3` + `85cb863`)
- ✅ Vercel production deploy — `https://pany-kids-studio-jrm7y2dpe-tdbinh27-3978s-projects.vercel.app` aliased to `pany-kids-studio.vercel.app` (HTTP 200, 990ms)
- ✅ JS bundle verified contains new pillar code (`studioCreative` found in chunk)
- ✅ VPS deploy via `scripts/deploy-vps.py` (HTTP 200, 38ms)

### Project OS docs updated
- ✅ `decisions.md` +D-013 (12-pillar architecture) +D-014 (mobile stack Expo SDK 53) +D-015 (chat endpoint single source)
- ✅ `status.md` rewritten — Sprint 1 complete inventory + 4 next-session resume options
- ✅ `handoff.md` (this file) — full Session 10 record

---

## ⚠️ Critical context for next session

### Identity
- **Đại Ka** stays — bố Bình's AI representative, calls kids "con", uses Sonnet 4.6 by default
- 3 kids: Phúc 8 (🌟), An 10 (🚀), Y 12 (🎨)

### URLs (all verified live)
- **Web Vercel**: https://pany-kids-studio.vercel.app (HTTP 200, ~1s)
- **VPS 24/7**: http://61.14.233.122/ (HTTP 200, ~40ms)
- **GitHub public**: https://github.com/tdbinh27-sudo/pany-kids-studio
- **Domain panykids.app**: NOT bought yet (defer until 1-week internal test confirms 12-pillar UX works)

### Architecture (current v3.2-C)
- **Web**: Next.js 16 + React 19 + Tailwind + TypeScript on Vercel + VPS
- **Mobile** (new): Expo SDK 53 + RN 0.79 + React Navigation v7 + AsyncStorage
- **Storage**: localStorage (web) ↔ AsyncStorage (mobile), SAME `pks3-*` keys, JSON cross-compat
- **Đại Ka API**: Single `/api/chat` endpoint at Vercel + VPS, called by both web + mobile + future Telegram

### Decisions chốt (15 total)
- D-001 to D-009: project name, hosting, chatbot name, AI model, etc.
- D-010: Repo public MIT
- D-011: Hybrid web + mobile (Q1 strategy v2)
- D-012: Đại Ka boost Sonnet 4.6 + $15/mo cap
- D-013 NEW: 12-pillar architecture (6 skills + 6 development)
- D-014 NEW: Mobile stack = Expo SDK 53 + RN 0.79 + RN Navigation v7
- D-015 NEW: Đại Ka single endpoint serving all clients (web + mobile + future)

### Known issues / Risks
- 🔴 **API key STILL exposed** in old session logs — anh chưa rotate after 10 sessions
- 🟡 **Sonnet 4.6 cost** — capped $15/month, monitor weekly
- 🟡 **Mobile not pnpm-installed yet** — anh cần `cd apps/mobile && pnpm install && pnpm start` to test on Expo Go
- 🟡 **Mobile assets missing** — placeholder PNG required (icon/splash/adaptive-icon/favicon) before EAS build
- 🟢 Both web deploys clean and serving the new pillars

### Cost tracking
- Vercel: free tier (sufficient for 3 kids + 5-15 family beta)
- VPS: 6GB RAM, 40GB SSD, paid through 2026-07-25
- Anthropic: $15/month cap (Sonnet 4.6 default)

---

## 📋 Reference files

### Source code
- `apps/web/components/PanyKidsStudio.tsx` — main dashboard (~4200 lines, 17 tabs)
- `apps/web/lib/riasec-junior.ts` — 84 RIASEC questions + scoring + 6 types
- `apps/web/lib/careers-v2.ts` — 60 careers + 18 day-in-life mini-projects
- `apps/web/lib/family-prompts.ts` — 30 ask-parent + 6 weekly review + 15 show-tell + 15 family activities
- `apps/mobile/App.tsx` — 4-tab navigator
- `apps/mobile/screens/*.tsx` — 4 starter screens
- `apps/mobile/lib/*.ts` — design/storage/api/i18n/kids + 3 copied data files

### Project OS
- `strategy-v2.md` — ⭐ source-of-truth for v3.2+
- `decisions.md` — 15 decisions logged (D-001 through D-015)
- `status.md` — Sprint 1 complete inventory
- `plan.md` — original architecture (still relevant)
- `tasks.md` — Sprint 2 backlog
- `knowledge.md` — schema + design tokens
- `README.md` — public-facing repo intro

### Scripts
- `scripts/deploy-vps.py` — paramiko SSH automated VPS deploy (used this session)
- `scripts/fix-vps-env.py` — env corruption fixer

---

## 🎬 Sprint 2 plan (5/8 - 7/8/2026, 2 months)

**Goal**: 3 kids use the dashboard daily. Bố Bình collects UX bugs + feature gaps + content gaps. Iterate without adding new pillars.

### Week 1-2 (5/8 - 5/22)
- [ ] Phúc/An/Y onboarding session — anh giới thiệu 12 pillars, mỗi con login + setup PIN/profile
- [ ] Daily usage tracking via streak counter + Đại Ka chat logs
- [ ] Bố note bugs trong `feedback-week-X.md` files dưới `artifacts/`
- [ ] Mid-week sync: 30-min family demo → mỗi con show 1 thing they made

### Week 3-4 (5/22 - 6/5)
- [ ] First feature ask round — mỗi con request 1 feature
- [ ] Implement top 3 requests (whoever's request lands first gets dev priority)
- [ ] Mobile pnpm install + Expo Go testing trên phone của 3 con

### Month 2 (6/5 - 7/8)
- [ ] Content seeding: 300 quests, fill out remaining skills track quarters
- [ ] Career mini-projects refinement based on which RIASEC types mỗi con drift toward
- [ ] Begin mobile screen expansion: add Calendar, Library, Career Compass screens
- [ ] Decide on shared package extraction (`packages/shared/`)
- [ ] Domain `panykids.io` purchase decision after 1-week confidence

### Mid-sprint gate (6/15)
Either:
- (A) Continue → Sprint 3 mobile mature → App Store submission target 7/2026
- (B) Pivot → if 3 kids don't engage, redesign UX before scaling

---

## 🎬 Quick-start checklist for Session 11+

When anh resumes:

1. ☐ Read this handoff.md first
2. ☐ Check live URLs still HTTP 200 (Vercel + VPS)
3. ☐ Open `pany-kids-studio.vercel.app` and walk through PHÁT TRIỂN sidebar group with 3 kids
4. ☐ Note any UX issue immediately into `artifacts/feedback-week-1.md`
5. ☐ Mobile install + Expo Go test (deferred but available)

Bootstrap command:
```
Continue pany-kids-studio Sprint 2
```
