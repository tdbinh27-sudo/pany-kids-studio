# Status — Pany Kids Studio

**Last updated:** 2026-04-30 23:00
**Current state:** v3.1-A LIVE in production

## URLs
- 🌐 Production: https://pany-kids-studio.vercel.app
- 📦 Repo (public): https://github.com/tdbinh27-sudo/pany-kids-studio
- 🛠️ Vercel project: tdbinh27-3978s-projects/pany-kids-studio

## Git history (4 commits)
```
abdd9eb  init: Pany Kids Studio v3 — bilingual education dashboard with Đại Ka chatbot
19a94b6  feat: expand age range from 8-16 to 6-16
8eb92a1  fix: add @ts-nocheck to PanyKidsStudio.tsx for v1 ship
1e7ae3e  feat(v3.1-A): full kid profiles + login UX improvements   ← latest
```

## Phase progress

| Phase | Status |
|-------|--------|
| Phase 0 — Project OS scaffold | ✅ DONE |
| Phase 1 — Local Next.js dev | ✅ DONE |
| Phase 2 — Vercel deploy + GitHub repo | ✅ DONE |
| Phase 3 — Đại Ka chatbot (Haiku 4.5 + safety) | ✅ DONE |
| Phase 4 — v3.1-A login UX + profile fields | ✅ DONE |
| Phase 5 — v3.1-B Content seeding (Sprint B) | ⏸️ PLANNED next session |
| Phase 6 — v3.1-C English 4 skills + Map+GPS + Import/Export | ⏸️ PLANNED |
| Phase 7 — v3.1-D Vercel Cron monthly auto-refresh | ⏸️ PLANNED |
| Phase 8 — Domain `panykids.io` purchase | ⏸️ Final phase |

## v3.1-A delivered features

### Login UX
- 💡 PIN hint card in LoginModal (yellow, shows all 3 default PINs)
- 👨‍👩‍👧 "Vào mode Bố/Mẹ" button at bottom of modal (direct path)
- Modal scrollable (maxHeight 90vh)

### Kid profile fields (extends DEFAULT_KIDS schema)
- birthday (date input)
- school (text)
- favoriteSubject (text)
- hobbies (textarea)
- goals (learning goals, textarea)
- bio (textarea)
- emoji (now editable in edit form)
- Profile summary card displays in Kids tab when filled

## v3.1 backlog (anh's 9-item request 2026-04-30)

### Done in v3.1-A
- ✅ (3) Login UX — PIN hint + parent mode option
- ✅ (4) Profile fields — 7 new fields editable

### Sprint B — content seeding (~10h next session)
- (1) Curated data from trusted sources for all tabs
- (7) Real VN business case studies + comparisons
- (9) Critical thinking: YouTube/Wiki/NatGeo links + reflection prompts
- + Tech tab links (Khan, Code.org, Scratch)

### Sprint C — new features (~10h)
- (5) English Listen/Speak/Read/Write full functionality
- (6) Import/Export English files
- (8) Vietnam map + GPS pin tracking

### Sprint D — automation (~3h)
- (2) Auto-update content monthly via Vercel Cron + Claude API

## Risk Watch

- 🔴 **API key exposure**: anh chưa rotate `sk-ant-api03-WRBcVGmqg0SauCnxYU2XfYApkTkvKxKN1TbckhgLJHH9uKBAXRGa-...` — đã expose trong session log. ROTATE NGAY at https://console.anthropic.com/settings/keys
- 🟡 Build cost — currently ~$5/month estimated for chatbot. Monitor in Anthropic Console.
- 🟢 Stack stable — Next.js 16 + Vercel free tier
- 🟢 Repo public — no secrets committed (.env.local gitignored)

## Active dev server
- Local: http://localhost:3475 (preview server may still be running, ID: 160bd41b-eb9d-4bad-bc08-ec0f69f177b5)
- Production: https://pany-kids-studio.vercel.app

## Next session resume command
Type: `Continue pany-kids-studio Sprint B` to start content seeding work.
