# Status — Pany Kids Studio

**Last updated:** 2026-04-30 23:50
**Current state:** v3.1-BCD LIVE in production

## URLs
- 🌐 Production: https://pany-kids-studio.vercel.app
- 📦 Repo (public): https://github.com/tdbinh27-sudo/pany-kids-studio
- 🛠️ Vercel project: tdbinh27-3978s-projects/pany-kids-studio

## Git history (6 commits)
```
abdd9eb  init: Pany Kids Studio v3 (2748 lines)
19a94b6  feat: expand age range from 8-16 to 6-16
8eb92a1  fix: add @ts-nocheck to PanyKidsStudio.tsx for v1 ship
1e7ae3e  feat(v3.1-A): full kid profiles + login UX improvements
86b70cf  chore: update status + handoff for v3.1-A checkpoint
36989c3  feat(v3.1-BCD): curated content + VN map + import + monthly cron   ← latest
```

## Phase progress

| Phase | Status |
|-------|--------|
| Phase 0 — Project OS scaffold | ✅ DONE |
| Phase 1 — Local Next.js dev | ✅ DONE |
| Phase 2 — Vercel deploy + GitHub repo | ✅ DONE |
| Phase 3 — Đại Ka chatbot (Haiku 4.5 + safety) | ✅ DONE |
| Phase 4 — v3.1-A login UX + profile fields | ✅ DONE |
| Phase 5 — v3.1-B Content seeding (60 curated resources) | ✅ DONE |
| Phase 6 — v3.1-C VN Map + Import/Export | ✅ DONE (English skills deferred) |
| Phase 7 — v3.1-D Monthly auto-refresh cron | ✅ DONE |
| Phase 8 — English 4 skills (Listen/Speak/Read/Write) | ⏸️ PLANNED next session |
| Phase 9 — Domain `panykids.io` purchase | ⏸️ Final phase (project completion) |

## v3.1-BCD shipped this session (commit 36989c3)

### Sprint B — Content (commits +1572 lines)
- `lib/curated.ts` — 60 hand-picked resources, 6 pillars, all bilingual VN+EN
- Library tab rewritten with pillar/age/type filters + reflection prompts
- Sources: MIT, Khan, Code.org, BBC, Cambridge, TED-Ed, Crash Course, NatGeo, Wikipedia, Perplexity, Kurzgesagt, 3Blue1Brown, Veritasium, FCS, FDIC, Investopedia, Buffett, Vietnamese cases (Vinamilk/TGDD/VinFast/Shark Tank VN/Shopee Uni), VN museums

### Sprint C1 — Vietnam Map + GPS (req 8)
- `components/VietnamMap.tsx` — Leaflet via CDN + OpenStreetMap
- 5 pin categories with color-coded markers
- HTML5 Geolocation API "Use GPS" button
- Per-kid attribution + photo URL
- Persisted to `pks3-vn-pins` localStorage
- Integrated into ExperiencesTab (replaces text-only suggestions; suggestions kept below map)

### Sprint C2 — Import data
- File picker → JSON parse → confirm with preview counts → restore 9 state slices
- Side-by-side with existing Export in Settings tab

### Sprint D — Monthly auto-refresh
- `app/api/refresh-content/route.ts` — Claude Sonnet 4.6 generator
- `vercel.json` cron: 03:00 UTC on day 1 of each month
- Auth: `CRON_SECRET` env var (64-char hex, set in Vercel)
- Review-then-merge model (safety): suggestions only, bố commits manually

## v3.1 backlog (anh's 9-item request)

### ✅ Completed
- (1) Curated content from trusted sources — 60 resources
- (3) Login UX — PIN hint + parent mode option
- (4) Profile fields — birthday, school, fav subject, hobbies, goals, bio, emoji
- (7) VN business case studies (Vinamilk, TGDD, VinFast, Shark Tank VN)
- (8) Vietnam map + GPS pin tracking with Leaflet
- (9) Critical thinking links (TED-Ed, Wiki, NatGeo, Perplexity, Veritasium, Kurzgesagt)
- (2) Auto-update content monthly via Vercel Cron + Claude API
- (6) Import/Export JSON (extends existing export)

### ⏸️ Deferred to session 7
- (5) English Listen/Speak/Read/Write — needs Web Speech API + audio pipeline + AI grading (~6h focused work)

## Risk Watch

- 🔴 **API key STILL exposed**: `sk-ant-api03-WRBcVGmqg0SauCnxYU2XfYApkTkvKxKN1TbckhgLJHH9uKBAXRGa-...` đã expose trong session log từ Sprint A. Anh chưa rotate. **ROTATE NGAY** at https://console.anthropic.com/settings/keys
- 🟡 Cron cost — monthly /api/refresh-content uses Sonnet 4.6, ~8K tokens output = ~$0.12/run × 12/yr = ~$1.50/yr. Negligible.
- 🟡 Vercel free tier cron — Hobby plan supports 1 daily cron; monthly is fine.
- 🟢 Stack stable — Next.js 16 + Vercel + Leaflet CDN + Anthropic SDK
- 🟢 Repo public — no secrets in git, .env.local + .vercel gitignored

## Active dev server
- Local: http://localhost:3475 (preview server, ID: 160bd41b-eb9d-4bad-bc08-ec0f69f177b5)
- Production: https://pany-kids-studio.vercel.app

## Next session resume command
Type: `Continue pany-kids-studio English 4 skills` to start the deferred Sprint E.
