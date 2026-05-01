# Handoff — Pany Kids Studio

**Last session:** 2026-04-30 (extended multi-chapter session)
**Current chapter:** v3.1-BCD shipped to prod, English skills deferred

## What was accomplished this session (chronological)

### Build phase (Phase 0-3)
1. Read existing v2 JSX + researched 8 GitHub LMS projects
2. Built v3 dashboard: 22 tabs, bilingual VN+EN, anime/funny style — 2748 lines
3. Set up Project OS at Projects/pany-kids-studio/
4. Anh approved 5 questions (name, hosting, chatbot "Đại Ka", API key now, Vercel-only)
5. Init Next.js 16 + TS + Tailwind + Anthropic SDK
6. Built Đại Ka chatbot widget + /api/chat route with COPPA-compliant prompt
7. Created public GitHub repo, deployed to Vercel
8. Verified Đại Ka working (Socratic mode, bilingual, 80-word limit)

### v3.1-A phase (login + profiles)
9. Anh requested 9 v3.1 features
10. Em classified Sprint A/B/C/D, executed Sprint A:
    - Login UX: PIN hint card + parent mode button
    - Profile: 7 new fields (birthday, school, hobbies, goals, bio, fav subject, emoji)

### v3.1-BCD phase (content + map + cron)
11. Sprint B: Wrote `lib/curated.ts` with 60 hand-picked resources from authoritative sources
12. Library tab rewritten with pillar/age/type filters + reflection prompts
13. Sprint C1: Built `components/VietnamMap.tsx` with Leaflet + Geolocation + 5 pin categories, integrated into ExperiencesTab
14. Sprint C2: Added Import data feature (file picker + confirm dialog + state restore)
15. Sprint D: Built `/api/refresh-content` cron route + `vercel.json` config + CRON_SECRET env
16. Deployed v3.1-BCD to production, verified live

## To resume work

Type: `Continue pany-kids-studio English 4 skills` and Claude Code will:
1. Read plan.md + status.md + handoff.md
2. Build the English Listen/Speak/Read/Write feature (Phase 8)
3. Use Web Speech API for speech recognition + speech synthesis
4. Integrate with Đại Ka for grading
5. Add file upload for kid recordings

## Critical context (don't lose)

### Decisions made (10 total in decisions.md)
- Project name: pany-kids-studio (NOT panyvn.app — that's business)
- Hosting: Vercel free tier → buy panykids.io at end of project
- Chatbot: "Đại Ka" (Vietnamese mentor vibe)
- AI model: Haiku 4.5 default + Sonnet 4.6 fallback
- Storage: localStorage only (no DB), JSON export/import
- Safety: COPPA prompt + keyword filter + 30 msg/hr rate limit
- Bilingual: native VN+EN (no translation API)
- Visual: anime/funny pastel
- Repo: PUBLIC open-source MIT
- Age range: 6-16
- Cron: review-then-merge model (NOT auto-write to repo)

### Kids
- Phúc (age 8, 🌟, PIN 1111)
- An (age 10, 🚀, PIN 2222)
- Y (age 12, 🎨, PIN 3333)
- Profile fields: birthday, school, fav subject, hobbies, goals, bio
- Editable in Kids tab Edit form

### URLs
- Live: https://pany-kids-studio.vercel.app
- Repo: https://github.com/tdbinh27-sudo/pany-kids-studio (public, MIT)

### Vercel env vars (set)
- `ANTHROPIC_API_KEY` — for Đại Ka chatbot + cron content refresh
- `CRON_SECRET` — 64-char hex for Vercel Cron auth

### Cron schedule
- Path: `/api/refresh-content`
- Schedule: `0 3 1 * *` (03:00 UTC on 1st of each month)
- Output: JSON suggestions only — bố reviews + commits manually

## ⚠️ ACTION ITEMS for anh (urgent)

1. **🔐 ROTATE API key** — `sk-ant-api03-WRBcVGmqg0SauCnxYU2XfYApkTkvKxKN1TbckhgLJHH9uKBAXRGa-...` đã expose trong chat. Vào https://console.anthropic.com/settings/keys, delete + create new, paste back để em update both ANTHROPIC_API_KEY and CRON_SECRET in Vercel.
2. **💰 Set billing limit** at https://console.anthropic.com/settings/billing → $10-20/month spend cap
3. **🧪 Test với các bạn thật**:
   - Phúc, An, Y mở https://pany-kids-studio.vercel.app
   - Library tab → filter theo trụ cột → click open links
   - Trải nghiệm tab → click "Use GPS" → pin nơi đang ở
   - Settings → Import/Export backup JSON test
4. **📅 (Optional) Test cron NOW** — GET `https://pany-kids-studio.vercel.app/api/refresh-content?secret=<CRON_SECRET>` to force-run without waiting

## Session 7 priorities (English 4 skills - req 5)

When anh ready, build:
- **Listen**: TED-Ed embed player + comprehension Q&A from Đại Ka
- **Speak**: Web Speech API (SpeechRecognition) → kid speaks → API analyzes pronunciation → Đại Ka feedback
- **Read**: Curated short stories per age + comprehension prompts
- **Write**: Text input → Đại Ka grades grammar + suggests improvements
- File import for parent-curated content (PDF reading materials, MP3 audio)
- Persistence: per-kid English progress in `pks3-english-{kidId}`

## Reference files
- Source: apps/web/components/PanyKidsStudio.tsx (~3000 lines now)
- Chatbot: apps/web/components/ChatBot.tsx
- Map: apps/web/components/VietnamMap.tsx
- Curated data: apps/web/lib/curated.ts (60 resources)
- API: apps/web/app/api/chat/route.ts + apps/web/app/api/refresh-content/route.ts
- Đại Ka prompt: apps/web/lib/claude.ts
- Cron config: apps/web/vercel.json
