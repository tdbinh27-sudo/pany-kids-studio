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

## Session 8 priorities (anh's new requests 2026-04-30 end of session)

### 🔴 P0 — Tone shift: Đại Ka = bố Bình (request 1)
- Update `lib/claude.ts` HARD_RULES_VI + HARD_RULES_EN
- Old identity: "Đại Ka — anh cả AI mentor" calling kid "em"
- NEW identity: "Đại Ka — bố Bình của các bạn nhỏ" calling kid "con"
- Replace all "em" → "con" in system prompt
- Update opening greeting: "Chào con!" instead of "Chào em!"
- Sample new tone: "Con đang học gì hôm nay? Bố ngồi cùng con này"
- Update ChatBot.tsx greeting strings
- This is a meaningful identity shift — Đại Ka now speaks as DAD, not big brother

### 🔴 P1 — Profile photo + greeting (request 3)
- Profile fields: add `avatarUrl` (image URL) — file upload OR paste URL
- Profile display: show avatar circle + greeting based on time-of-day
- Greeting examples (use full name, not nickname):
  - 5-11h: "Chào buổi sáng Hạnh Phúc!" / "Good morning Hạnh Phúc!"
  - 11-13h: "Chào buổi trưa An!" / "Good noon An!"
  - 13-18h: "Chào buổi chiều Như Ý!" / "Good afternoon Như Ý!"
  - 18-22h: "Chào buổi tối Hạnh Phúc!" / "Good evening Hạnh Phúc!"
  - 22-5h: "Khuya rồi An ơi, đi ngủ nhé!" / "It's late An, go to sleep!"
- Add `fullName` field to kid schema (default = name) for the Vietnamese full names
- Default fullNames: Phúc → Hạnh Phúc, An → Bình An, Y → Như Ý
- Greeting shows on Overview tab AND when kid logs in (toast/banner)

### 🔴 P1 — Journal photo folder, max 300MB (request 2)
**Storage challenge**: 300MB exceeds localStorage (5-10MB). Options:
1. **IndexedDB** — supports ~50% of disk. Best for offline. Use `idb` library or native API.
2. **Vercel Blob** — backend storage, requires API token. Persistent across devices.
3. **Cloudinary free tier** — 25GB free + transformations.
4. **Compressed inline** — compress to <5MB then store base64 in localStorage.

**Recommendation**: IndexedDB for v1 (zero backend cost, works offline). Migrate to Vercel Blob later if multi-device sync needed.

Implementation:
- New `lib/imageStorage.ts` using IndexedDB (`idb` library — `pnpm add idb`)
- Per-kid quota: 100MB each (3 kids × 100MB = 300MB total)
- Show usage bar: "Phúc: 45MB / 100MB used"
- Upload UI: drag-drop or file picker, validates size + format (jpg/png/webp)
- Auto-resize: max 1920px wide via canvas before storing (saves space)
- Display: gallery view per journal entry with thumbnails
- Delete button per image
- Total quota warning at 80%, hard block at 100%

### Session 8 implementation order
1. Đại Ka tone (10 min — small prompt edit)
2. Greeting + avatar (1-2h — Overview banner + profile field + time-of-day logic)
3. Journal photo folder (3-4h — IndexedDB integration + upload UI + gallery)

Also still deferred from earlier:
4. English Listen/Speak/Read/Write — req 5 (Web Speech API)

## Reference files
- Source: apps/web/components/PanyKidsStudio.tsx (~3500 lines now)
- Chatbot: apps/web/components/ChatBot.tsx
- Map: apps/web/components/VietnamMap.tsx
- AI Search: apps/web/components/AISearch.tsx (NEW v3.1-E)
- Curated data: apps/web/lib/curated.ts (81 resources after v3.1-E)
- API: apps/web/app/api/chat/route.ts + apps/web/app/api/refresh-content/route.ts
- Đại Ka prompt: apps/web/lib/claude.ts ← MAJOR EDIT next session
- Cron config: apps/web/vercel.json
