# Status — Pany Kids Studio

**Last updated:** 2026-05-10 (Session 15 — CRITICAL: math-quiz infinite loop hotfix)
**Current state:** v3.3-C live on production via manual `vercel deploy --prod` (auto-deploy webhook broken, see ⚠️ below). Production was stuck on "Loading Pany Kids Studio..." for ~90 minutes due to deterministic infinite loop in `lib/math-quiz.ts` module-load. Fix: bounded `collectWrongs()` helper applied to all 6 generator branches. Verified live at https://pany-kids-studio.vercel.app/ — full app hydrates, zero console errors. Session 14 picker fix included.

⚠️ **Vercel auto-deploy webhook broken** — pushes `c3f947a` (Session 14 fix), `322ac64` (docs), `8931a53` (Session 15 hotfix) did NOT auto-deploy. Used `vercel deploy --prod` manually. Anh check Vercel project → Settings → Git → re-link GitHub integration when convenient.

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
| **Sprint 2** — Iterate w/ Phúc/An/Y (2 months, 5/8 - 7/8) | ⏳ STARTING |
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
