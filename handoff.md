# Handoff — Pany Kids Studio

**Last session:** 2026-04-30 (extended session, multiple chapters)
**Current chapter:** v3.1-A shipped to prod, awaiting anh's choice of Sprint B/C/D for next session

## What was accomplished this session (chronological)

### Build phase (Phase 0-3)
1. Read existing PanyKidsStudio_Dashboard_v2.jsx + researched 8 GitHub LMS projects
2. Built v3 dashboard: 22 tabs, bilingual VN+EN, anime/funny style, 16 badges, 10 career paths, quiz, Đại Ka chatbot — 2748 lines
3. Set up Project OS with 7 canonical files in Projects/pany-kids-studio/
4. Anh approved 5 questions: name, hosting, chatbot name "Đại Ka", API key timing, Vercel-only
5. Init Next.js 16 + TS + Tailwind + Anthropic SDK in apps/web/
6. Built ChatBot floating widget + /api/chat route with COPPA-compliant Đại Ka system prompt
7. Created GitHub public repo, pushed 4 commits, deployed to Vercel
8. Verified Đại Ka working (Socratic mode, bilingual, 80-word limit, 1-2 emoji)

### v3.1-A phase
9. Anh requested 9 v3.1 features (login bug, profile, content seeding, English skills, import/export, business cases, VN map, thinking links, monthly auto-refresh)
10. Em classified into Sprint A/B/C/D, executed Sprint A:
    - Login UX: added PIN hint card + parent mode button
    - Profile: added 7 new fields (birthday, school, hobbies, goals, bio, fav subject, emoji)
11. Committed (1e7ae3e), pushed, deployed v3.1-A to production

## To resume work

Type: `Continue pany-kids-studio Sprint B` and Claude Code will:
1. Read plan.md + status.md + handoff.md
2. Begin curating content from trusted educational sources for Tech, Business, Thinking pillars
3. Set up data structure for monthly auto-refresh (Sprint D dependency)

## Critical context (don't lose)

### Decisions made (8 total in decisions.md)
- Project name: pany-kids-studio (NOT panyvn.app — that's business)
- Hosting: Vercel free tier → buy panykids.io at end of project
- Chatbot: "Đại Ka" (Vietnamese mentor vibe, NOT Pany-chan anime cute)
- AI model: Haiku 4.5 default + Sonnet 4.6 fallback for complex
- Storage: localStorage only (no DB), JSON export/import in Settings
- Safety: COPPA prompt + keyword filter + 30 msg/hr rate limit + self-harm escalation
- Bilingual: native VN+EN (no translation API)
- Visual: anime/funny pastel (Fredoka + Quicksand + Caveat fonts)
- Repo: PUBLIC open-source (MIT)
- API key: anh setup NGAY, not phase-split
- Age range: 6-16 (extended 2026-04-30, was 8-16)

### Kids
- Phúc (age 8, 🌟, PIN 1111)
- An (age 10, 🚀, PIN 2222)
- Y (age 12, 🎨, PIN 3333)
- Ages can now be edited 6-16 in Kids tab Edit form
- Profile fields available: birthday, school, fav subject, hobbies, goals, bio

### URLs
- Live: https://pany-kids-studio.vercel.app
- Repo: https://github.com/tdbinh27-sudo/pany-kids-studio (public, MIT)
- Vercel project: pany-kids-studio (org: tdbinh27-3978s-projects)

## ⚠️ ACTION ITEMS for anh (urgent)

1. **🔐 ROTATE API key** — `sk-ant-api03-WRBcVGmqg0SauCnxYU2XfYApkTkvKxKN1TbckhgLJHH9uKBAXRGa-...` đã expose trong chat. Vào https://console.anthropic.com/settings/keys, delete + create new, paste back để em update Vercel env var.
2. **💰 Set billing limit** — https://console.anthropic.com/settings/billing → $10-20/month spend cap
3. **🧪 Test với các bạn thật** — Phúc, An, Y mở https://pany-kids-studio.vercel.app, login với PIN, chat với Đại Ka, báo bug

## Reference files
- Source: apps/web/components/PanyKidsStudio.tsx (2748 lines + 130 new lines for v3.1-A)
- Chatbot: apps/web/components/ChatBot.tsx
- API: apps/web/app/api/chat/route.ts
- Đại Ka prompt: apps/web/lib/claude.ts
- v2 archive: artifacts/PanyKidsStudio_Dashboard_v3.jsx (initial standalone version)
