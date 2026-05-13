# Pany Kids Studio — Tasks

## NOW (Sprint 2 — week 1 of 8, Day 4 of 7)

### Session 16 (2026-05-13) — Status sync, 3-day gap

- [x] Verified production HTTP 200 (Vercel + VPS)
- [x] Updated status.md + handoff.md to today (sync-only, no code)
- [ ] **DECISION:** debug-deps cleanup — keep `boneyard-js`+`playwright` (Path A) or revert (Path B)
- [ ] **DECISION:** Sprint 2 cadence — backfill Day 1-4 / restart Day 5 / slide schedule
- [ ] **BLOCKED ON ANH:** rotate Anthropic API key (4 days past hotfix, ~11 sessions exposed)
- [ ] **BLOCKED ON ANH:** re-link Vercel ↔ GitHub webhook (Settings → Git)

### Session 15 (2026-05-10) — 🔴 CRITICAL: math-quiz infinite loop hotfix
- [x] Diagnosed: production stuck on "Loading Pany Kids Studio..." ~90 min
- [x] Root cause: `lib/math-quiz.ts` 6 unbounded `while (wrong.size < 3)` loops, deterministic LCG seed 3003 hits genL3 algebra at x=1 where only 2 valid wrong values exist → infinite loop on module load → browser tab freeze
- [x] Fix: introduced `collectWrongs()` helper (40 RNG attempts → fallback to deterministic distinct offsets). Applied to all 6 generators (L1 add/sub, L2 mixed, L3 percent/algebra/decimal, L4 algebra/pythagoras/square)
- [x] TypeScript clean, build clean, headless browser hydrates within 12s on localhost:3000
- [x] Deployed v3.3-C via `vercel deploy --prod` (commit `8931a53`) — production verified hydrating correctly
- [ ] 🔧 **Anh fix Vercel auto-deploy webhook** — Settings → Git → re-link GitHub integration (last 3 pushes did NOT auto-deploy)

### Session 14 (2026-05-10) — CEFRLevel 'K' picker fix
- [x] Bug fixed: EnglishSkillsTab level picker now includes 'K' (was only A1/A2/B1)
- [x] Bug fixed: age description ternary handles 'K' = "4-6t · mầm non" (was falling through to "12-15t · trung cấp")
- [x] TypeScript clean (`pnpm exec tsc --noEmit` zero errors)

### Session 12+13 verification (already merged in `bcbbdb9`, 2026-05-10 08:20)
- [x] Wire `lib/quests.ts` into "Hôm nay" tab — Quest hôm nay card with deterministic daily pick
- [x] Wire `lib/math-quiz.ts` into Quiz tab — math mode toggle, all 1060 questions accessible
- [x] Wire `lib/bilingual-stories.ts` into Library tab — level filter K/A1/A2/B1 + reader modal
- [x] Quest completion persistence (pks3-completedQuests with Done/Undo button)
- [x] Story reading progress (pks3-readStories with auto-mark + counter)
- [x] SSG hang fix via dynamic import ssr:false
- [x] Turbopack root misdetection fix (stale package-lock.json)
- [x] Career Q&A system added (12 topics, 3-day cron refresh)
- [ ] `pnpm dev` smoke test — anh visually verify dashboard with 4 banks live
- [ ] Đại Ka chat thử Vietnamese — verify language adapt by age 5/9/11
- [ ] Build script: print getQuestStats() + getMathStats() + getStoryStats() + getEnglishStats() once for sanity

### Internal usage feedback (Phúc/An/Y)
- [ ] Onboarding session — anh giới thiệu 12 pillars + 4 banks mới to 3 kids
- [ ] Mỗi con setup PIN + profile (school, hobbies, goals, bio, emoji)
- [ ] Daily streak tracking — bao nhiêu ngày liên tiếp 3 con check-in
- [ ] Đại Ka chat usage logs — query patterns + hot topics
- [ ] Bố note bugs trong `artifacts/feedback-week-1.md` (chưa tạo)
- [ ] Như Ý-specific: bố ngồi cùng review K-content, ghi 5 quest dễ nhất + 5 story Như Ý thích nhất

### Mobile app first run
- [ ] `cd apps/mobile && pnpm install`
- [ ] Add placeholder PNG assets (icon/splash/adaptive-icon/favicon)
- [ ] `pnpm start` → scan QR with Expo Go on phone
- [ ] Test 4 starter screens trên thiết bị thật của anh
- [ ] Verify Đại Ka chat works calling Vercel `/api/chat`

## NEXT (Sprint 2 weeks 1-4)

### Content seeding
- [ ] Quest hằng ngày: 500+ (12 pillars × 4 ages × 7 days) — current 0
- [ ] Voucher phần thưởng: 30+ designs in-house
- [ ] Truyện song ngữ thư viện: 50 entries
- [ ] Quiz Toán: 1000 questions × 4 cấp (currently has QUIZ_BANK with smaller set)
- [ ] English vocab expansion: 68 → 200+ (more A2/B1 words)
- [ ] English reading passages: 3 → 20+ (mix VN context + general)
- [ ] English writing prompts: 9 → 30+ (per level)
- [ ] English speaking sentences: 17 → 50+ (longer + dialogue)

### UX iteration based on feedback
- [ ] Top 3 features per kid request
- [ ] Mobile screen expansion: Calendar, Library, Career Compass screens
- [ ] Dark mode (anh's request from earlier)
- [ ] Voice input for Phúc (8t chưa gõ nhanh) via Web Speech API or Whisper

### Mobile asset production (via Claude Design)
- [ ] Logo PNG 1024×1024 (cherry blossom + Pany Kids wordmark)
- [ ] Splash 1284×2778 with gradient + tagline
- [ ] Adaptive icon (Android, 25% padding)
- [ ] Favicon 48×48

## NEXT (Sprint 2 month 2)

### Mid-sprint gate (6/15/2026)
- [ ] Decision: Continue → Sprint 3 mobile mature, OR Pivot → UX redesign
- [ ] If Continue: begin packages/shared/ extraction

### Domain decision (after 1-week confidence)
- [ ] Buy `panykids.io` ($15/year via Vercel registrar)
- [ ] DNS setup: app.panykids.io for web, optional api.panykids.io for VPS
- [ ] Update mobile app.json with custom api base URL
- [ ] Trademark research (low priority pre-launch)

## BLOCKED

- [ ] **API key rotation** — anh chưa rotate after 10 sessions, current key still active. Block: anh's manual action at https://console.anthropic.com/settings/keys
- [ ] Mobile EAS init — needs anh's Apple Developer account ($99/year) + Google Play Console ($25 once) before first build

## IMPROVE (after Sprint 2)

- [ ] Sync data web ↔ mobile via Supabase (replaces JSON export/import)
- [ ] Voice input with Whisper API for younger kids
- [ ] Daily summary email to bố Bình
- [ ] Sibling messaging in family notebook
- [ ] Generate weekly progress PDF auto via /api/refresh-content extension
- [ ] PWA install icon for web
- [ ] Studio Sáng tạo on mobile via `react-native-skia`
- [ ] Body Movement timer with `expo-haptics` for tick feedback
- [ ] Telegram bot integration for Đại Ka (after pilot Q3/2026)

## RECURRING

- Weekly: 3 con review usage data + adjust pillar focus + content gaps
- Weekly: bố Bình review Anthropic billing dashboard
- Monthly: backup localStorage → JSON via Settings tab
- Monthly: Vercel cron `/api/refresh-content` already running (day 1, 03:00 UTC)
- Quarterly: family Demo Day — mỗi con show what they made

## DONE — Sprint 1 (5/1 - 5/2/2026)

### Day 1 — `dcf9b25` (Session 9)
- [x] Strategy v2 pivot — strategy-v2.md saved with Q1-Q5 decisions
- [x] Đại Ka boost — Sonnet 4.6 default, 800 tokens, 100/hr, 20-turn history
- [x] Knowledge expansion — child psych, parenting, RIASEC junior, escalation hotlines, GDPT subjects
- [x] decisions.md +D-011 (hybrid) +D-012 (Đại Ka boost)

### Days 2-5 — `b58fbb3` (Session 10)
- [x] `lib/riasec-junior.ts` — 36+48 questions, 6 types, scoring
- [x] `lib/careers-v2.ts` — 60 careers + 18 mini-projects
- [x] `lib/family-prompts.ts` — 30 ask-parent + 6 weekly review + 15 show-tell + 15 activities
- [x] `StudioCreativeTab` — HTML5 canvas + 21 prompts + gallery
- [x] `BodyMovementTab` — 12 challenges + timer + breathing + 7-day chart
- [x] `SelfDiscoveryTab` — mood + RIASEC quiz + results
- [x] `CareerCompassTab` — 60 cards + 3 views + filters + modal
- [x] `FamilyBridgeTab` — notebook + weekly review + ask-parent prompts
- [x] Sidebar PHÁT TRIỂN group — 5 new tabs
- [x] 8 new pks3-* localStorage keys + persistence
- [x] MobileTabBar + i18n vi+en

### Phase 8 — `5176e32` (Session 11, 2026-05-03) — English 4 skills
- [x] `lib/english-skills.ts` — 68 vocab + 17 sentences + 3 passages + 9 writing prompts + scoring helpers
- [x] `lib/speech.ts` — Web Speech API wrappers (speak/listen/feature detection)
- [x] `app/api/grade-english/route.ts` — Sonnet 4.6 grading endpoint with structured JSON output
- [x] `EnglishSkillsTab` + 4 sub-panels (ListenPanel/SpeakPanel/ReadPanel/WritePanel)
- [x] Mode switcher (🎧 Nghe / 🗣️ Nói / 📖 Đọc / ✍️ Viết) + CEFR level picker (A1/A2/B1)
- [x] Browser support warning cards for unsupported browsers
- [x] Sidebar PHÁT TRIỂN... wait actually under "Công cụ học" group + MobileTabBar
- [x] `pks3-englishProgress` persist with per-skill structure
- [x] Live API verified: 78/100 grade for sample text with 3 grammar fixes + warm VN encouragement
- [x] D-016 logged (Web Speech API + Đại Ka grading approach)

### Days 6-7 — `85cb863` (Session 10)
- [x] `apps/mobile/` Expo SDK 53 scaffold (package.json, app.json, tsconfig, babel, metro)
- [x] `lib/design.ts` — color tokens mirroring web
- [x] `lib/storage.ts` — AsyncStorage with web-compatible API
- [x] `lib/api.ts` — `/api/chat` fetch helper
- [x] `lib/i18n.ts` — vi/en translations
- [x] `lib/kids.ts` — Kid type + DEFAULT_KIDS
- [x] Copy 3 pure-data lib files from web
- [x] 4 atom components: Card / Btn / Pill / KidSelector
- [x] HomeScreen — welcome + kid selector + streak + mood + tip
- [x] DiscoveryScreen — mood + full RIASEC quiz + results
- [x] ChatScreen — Đại Ka with KeyboardAvoidingView + live API
- [x] SettingsScreen — lang toggle + privacy + about
- [x] App.tsx — NavigationContainer + 4-tab bar with emoji icons
- [x] README + assets/README documenting setup + Sprint 2 TODOs

### Deployment (Session 10)
- [x] Push 2 commits to GitHub `main`
- [x] Vercel production deploy → https://pany-kids-studio.vercel.app HTTP 200
- [x] VPS deploy via `scripts/deploy-vps.py` → http://61.14.233.122/ HTTP 200
- [x] Verify new pillar code in Vercel JS bundle
- [x] decisions.md +D-013 +D-014 +D-015
- [x] status.md, handoff.md, tasks.md updated
- [x] MemPalace checkpoints (3 entries: diary + drawer + KG triples)
