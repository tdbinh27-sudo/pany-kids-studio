# Status — Pany Kids Studio

**Last updated:** 2026-05-02 (Session 10 — Sprint 1 COMPLETE)
**Current state:** v3.2-C deployed — Sprint 1 done (5 new pillars web + mobile scaffold). Internal usage phase begins.

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

## Git history (latest 5)
```
85cb863  feat(v3.2-C): Expo + RN mobile app scaffold (Sprint 1 Days 6-7)         ← latest
b58fbb3  feat(v3.2-B): 5 new development pillars (Sprint 1 Days 2-5)
706caab  chore: handoff + status update for Session 9 → 10 transition
dcf9b25  feat(v3.2-A): strategy v2 pivot — Đại Ka boost
9876725  fix(v3.1-I): mobile UX — horizontal scrollable tab bar < 1024px
```

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
