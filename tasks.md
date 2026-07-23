# Pany Kids Studio — Tasks

## NOW (Sprint 2 — week 1 of 8, Day 4 of 7)

### Session 16 (2026-05-13) — COMMERCIALIZATION PIPELINE BUILT

**Decisions D-020 → D-031 logged (12 decisions). 5 commits ~3.5K LOC.**

#### P0 — Sidebar reorder ✅ SHIPPED (D-023)
- [x] Move "Khám phá" tab group → position #3 (under "Học viên", above "Công cụ học")
- [x] TypeScript clean, browser-pilot verified

#### P2 foundation ✅ DONE (D-024, D-028, D-029, D-030)
- [x] `lib/age-curriculum.ts` — 12 age tracks 5→16 mapped VN grade + Đại Ka tone hint
- [x] `lib/curated-links.ts` — schema + helpers cho anh-curated links
- [x] `lib/claude.ts` patch — botName override + age-aware tone injection
- [x] `artifacts/content-templates/` — 4 CTV briefs (README + quest + story + math)
- [x] `artifacts/migration-family-2026-05-14.sql` — P1 schema draft (NOT applied)

#### P3 skeleton ✅ DONE (D-020, D-031)
- [x] `lib/family-provision.ts` — 12-step auto-provision skeleton
- [x] `lib/family-email.ts` — Brevo skeleton + welcome email VN (3-month banner)
- [x] `lib/family-notifications.ts` — Telegram bot skeleton (plain text)
- [x] `lib/phone-verify.ts` — D-031 SMS OTP scaffold (eSMS/Stringee/Twilio stubs)

#### P3 routes ✅ DONE
- [x] `/sell` — landing với 8 features + 7 FAQs, NO pricing
- [x] `/sell/register` — 3-step form (form → phone OTP → success)
- [x] `/dangky` — short URL redirect
- [x] `/api/sell/register` — env-gated POST endpoint
- [x] `/api/sell/verify-otp` — D-031 OTP verification + provision retry
- [x] `/admin/signup-requests` + `/api/admin/signup-requests` — admin UI + list/approve/decline
- [x] `public/og-image.svg` — Pany Kids brand FB/Zalo preview

#### Docs ✅ DONE
- [x] `artifacts/commercialization-plan-2026-05-13.md` — full plan đã approved
- [x] `artifacts/share-kit-kids.md` — 4 captions + email template + 6 FAQ
- [x] `artifacts/ctv-agreement-template.md` — 9 sections + 2 phụ lục
- [x] `artifacts/vercel-env-setup-2026-05-13.md` — step-by-step env guide

#### Browser test (F) ✅ DONE
- [x] `pnpm dev` localhost, browser-pilot tested 5/5 routes PASS

### Session 16 BLOCKED ON ANH (Resume Gate)
- [ ] 🔴 **#1** Rotate Anthropic API key (~2 phút)
- [ ] 🔴 **#2** Backfill Sprint 2 Day 1-4 feedback (~30 phút, D-025 gate)
- [ ] ⚠️ **#3** Re-link Vercel ↔ GitHub webhook (~2 phút)
- [ ] ⚖️ **#4** Path A/B Session 15 debug deps decision (~1 phút)
- [ ] 🟡 **#5** Tạo Supabase project mới `pany-kids-prod` (~10 phút)
- [ ] 🟡 **#6** Apply P1 migration SQL + add `phone_verified` column (~5 phút)
- [ ] 🟡 **#7** Setup Vercel env vars per `vercel-env-setup-2026-05-13.md` (~15-20 phút)

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
- [x] English vocab expansion: 68 → 210 (done, already exceeded target before this note was updated)
- [x] English reading passages: 3 → 21 (done)
- [x] English writing prompts: 9 → 30 (done)
- [x] English speaking sentences: 17 → 55 (done)
- [x] English exam-prep / "Luyện thi": NEW — 32 mock-test Qs (K/A1/A2/B1) mapped to real Cambridge YLE/KET cert names, added as 3rd mode in QuizTab (2026-07-23)
- [x] English grammar drills: NEW — 10 problems A1→B1, added as card in PracticeTab (2026-07-23)

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

## Session 19 (2026-05-19) — Game Dev Track D-036

### Completed
- [x] Read pany-kids-studio state (status/handoff)
- [x] Research GitHub: 5 game-dev OSS candidates (Phaser, Godot, GDevelop, Kaboom, Scratch) + Pygame-CE
- [x] Apply Decision Filter (5/5 PASS)
- [x] Install `pygame-ce 2.5.7` via `pip install --user` (no admin)
- [x] Create `artifacts/game-dev-track/` (6 files: README, kaboom-starter.html, pygame-hello.py, scratch-track.md, godot-first-game.md, INSTALL.md)
- [x] Build `GameDevTab.tsx` component (232 lines, 3-tier card + career paths + AI agent box)
- [x] Wire into `PanyKidsStudio.tsx` (import + activeTab route)
- [x] Add 28th nav card to `TreeOfKnowledgeHome.tsx`
- [x] TypeScript check clean (`tsc --noEmit` EXIT=0)
- [x] Append D-036 to `decisions.md`

### Pending (anh manual)
- [ ] Tải Godot 4.6 portable từ https://godotengine.org/download/windows/ → extract `~/Tools/Godot/`
- [ ] (Optional) Tải GDevelop 5 từ https://gdevelop.io/download
- [ ] Test deploy: `vercel deploy --prod` để verify GameDevTab live trên https://pany-kids-studio.vercel.app
- [ ] Cùng An mở `artifacts/game-dev-track/kaboom-starter.html` trong browser → con thử đổi gravity trong Notepad
- [ ] Cùng Phúc chạy `python artifacts/game-dev-track/pygame-hello.py` → con build từ template

### Deferred (Mid-Year Gate 2026-06-30 review)
- [ ] Engagement check: 3 con vào Game Dev tab bao nhiêu lần trong tháng 6?
- [ ] Phúc Project 1 Godot Lava Floor: completed/not?
- [ ] An Scratch projects: completed at least 2?
- [ ] If engagement zero → defer revisit Q4/2026; nếu high → expand Tier 4 add Unity Hub install

## Session 19 cont. (2026-05-19) — Fashion Design + STEM Lab D-037 + D-038

### Completed
- [x] Research Fashion OSS (Open Peeps CC0 · DiceBear 8.7K⭐ MIT · Avataaars 3K⭐ MIT)
- [x] Research STEM PhET (125 sims · 6 subjects · Vietnamese support ✅ · CC-BY 3.0)
- [x] Decision Filter — Fashion 4.5/5 · STEM 5/5 both PASS
- [x] Build `FashionDesignTab.tsx` (~280 LOC, 3-tier card + 8 scenes + 4 careers + 3 AI agents)
- [x] Build `STEMTab.tsx` (~340 LOC, 6 subjects × 3 sims + curriculum mapping + 6 careers)
- [x] Wire 2 imports + 2 activeTab routes in `PanyKidsStudio.tsx`
- [x] Add 2 cards (29th 👗 + 30th 🔬) in `TreeOfKnowledgeHome.tsx`
- [x] TypeScript check clean (`tsc --noEmit` EXIT=0)
- [x] Create `artifacts/fashion-design-track/README.md` (3-tier detailed guide + scenes + careers)
- [x] Create `artifacts/stem-track/README.md` (18 curated sims + curriculum mapping + resources)
- [x] Append D-037 + D-038 to `decisions.md`

### Pending (anh manual)
- [ ] Review + git commit: `git add -A && git status` → if OK: `feat(D-037+D-038): Fashion + STEM tabs + 2 components + 2 artifacts`
- [ ] Deploy: `vercel deploy --prod` → verify tabs 👗 + 🔬 LIVE on https://pany-kids-studio.vercel.app
- [ ] Cuối tuần với 3 con:
  - Y: cùng bố mở https://www.dicebear.com/playground/ → randomize Open Peeps 5 lần → chọn 1 nhân vật
  - An: mở https://getavataaars.com/ → tạo 5 nhân vật family (bố/mẹ/Phúc/An/Y)
  - Phúc: mở 1 PhET sim https://phet.colorado.edu/vi/simulations/forces-and-motion-basics → trải nghiệm 30 phút

### Phase 2 deferred (sau Mid-Year Gate)
- [ ] Build 8 PANY scene backdrops SVG pack tại `/public/fashion-scenes/`
- [ ] In-app PhET iframe embed (thay vì external link)
- [ ] Drag-drop scene composer UI cho Fashion Tier 3 (thay Figma external)
- [ ] STEM journal auto-link mỗi sim Phúc làm xong
- [ ] Hardware kit decision Micro:bit / Arduino budget Q3

### 🔴 UX/perf audit findings (2026-07-23) — chưa fix, cần quyết định
- [ ] **CRITICAL — silent data loss risk:** `lib/storage.ts` nuốt lỗi quota im lặng (`/* quota exceeded — silent for now */`, dòng ~20) — khi localStorage đầy, MỌI save sau đó (quiz progress, journal, badges...) fail âm thầm, không cảnh báo ai. Driver chính: `StudioCreativeTab` lưu tranh vẽ dạng PNG base64 KHÔNG nén (`canvasRef.current?.toDataURL('image/png')`, PanyKidsStudio.tsx:4064) vào mảng `creativeWorks` không giới hạn số lượng — 3 con vẽ hằng ngày trong vài tuần có thể chạm quota trình duyệt (5-10MB/origin). Fix đề xuất: (a) đổi sang `image/jpeg` quality~0.7 hoặc resize canvas trước khi export, (b) cap mảng `creativeWorks`/`write`/`speak` log (giữ N gần nhất), (c) storage.set() log warning + báo UI khi quota exceeded thay vì nuốt lỗi.
- [ ] **Bundle size:** không dùng `next/dynamic` ở đâu cả — mọi tab component (GameDev/Fashion/STEM/AIGlossary/FindYourTrack/SpaceExplorer/Practice/VocabWordle/ChatBot/VietnamMap...) bundle chung 1 chunk JS ~752KB raw cho route `/`, dù 1 bé chỉ dùng vài tab. Fix: `next/dynamic(() => import(...), {ssr:false})` cho các tab nặng/ít dùng.
- [ ] Các mảng progress khác cũng append-forever không cap: `write` (PanyKidsStudio.tsx:5603, lưu cả full text bài viết + AI feedback), `speak` (:5381, lưu cả transcript) — nhẹ hơn creativeWorks nhưng cùng pattern, nên fix chung 1 lượt.
