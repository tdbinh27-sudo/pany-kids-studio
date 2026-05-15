# Pany Kids Studio — Decision Log

## 2026-04-30

### D-001: Tên project = `pany-kids-studio` (NOT panyvn.app) ✅ FINAL
- **Decision**: Sử dụng tên project riêng `pany-kids-studio`
- **Why**: panyvn.app là dự án business (PANY Super OS), giáo dục là dự án cá nhân — phân tách rõ ràng
- **Impact**: Cần subdomain riêng (free Vercel) ban đầu

### D-002: Hosting = Vercel free tier + mua `panykids.io` cuối dự án ✅ FINAL
- **Decision**: 
  - Phase 1-3 (build): Deploy `pany-kids-studio.vercel.app` (free)
  - Phase 5 (cuối dự án, hoàn thiện): Mua domain `panykids.io` (~$15/năm) → map vào Vercel
- **Why**: File nhẹ + 3 users → free đủ; mua domain khi feature lock-in để không tốn $$ trong build phase
- **Skip VPS**: Vercel free đủ cho v1; VPS chỉ thêm sau nếu cần backend persistent

### D-003: Chatbot tên = `Đại Ka` ✅ FINAL
- **Decision**: Tên chatbot = **Đại Ka** (大哥 / "Big Bro Mentor")
- **Why**: 
  - Vietnamese cultural feel, các bạn nhỏ gọi quen
  - Mang vibe "anh cả/đại ca" — wise older sibling, vừa kid-friendly vừa có respect
  - Khác với "Pany-chan" anime cute → "Đại Ka" có tính character, mentor energy
- **Tone shift**: Less "kawaii", more "võ sĩ trẻ/big brother" — vẫn friendly, nhưng có gravitas của một mentor đáng nể
- **Bilingual mapping**: 
  - VN: "Đại Ka" 
  - EN: "Đại Ka" (giữ nguyên Vietnamese, exotic + memorable cho EN audience)
  - Optional EN sub: "Big Bro AI"

### D-009: API key setup = NGAY trong Phase 1 ✅ FINAL
- **Decision**: Build dashboard + chatbot trong cùng 1 lượt (NOT phase-split)
- **Why**: Anh muốn ship complete experience một lần
- **Impact**: Phase 1 + Phase 3 merge thành 1 sprint
- **Action item**: Anh input ANTHROPIC_API_KEY khi em prompt vào cuối Phase 1

### D-011: Strategy v2 — Hybrid Web + Mobile (2026-05-01) ✅ FINAL
- Source: anh's review of `PanyKidsStudio_DanhGia_ChienLuoc_VN.pdf` (17p) + `PanyKids_EducationBot_Strategy.md` (636 lines)
- See `strategy-v2.md` for full Q1-Q5 decisions
- Web v3.1-I keeps as internal backbone for 3 kids
- Mobile RN+Expo build for App Store + CH Play (target 8/2026)
- Đại Ka stays (NOT renamed to Cô Pany) — boosted to Sonnet 4.6 + $15/mo cap
- 6 old pillars + 6 new pillars = 12 total (categorized 2 dimensions)
- Timeline: 1 week internal → 2 months iterate → 1 month app store submission → public launch 8/2026

### D-012: Đại Ka boost (v3.2) ✅ FINAL
- Default model: Haiku 4.5 → **Sonnet 4.6** (3× more expensive but smarter)
- Max tokens: 400 → **800**
- Rate limit: 30/hr → **100/hr** per kid
- History context: 10 → **20 turns**
- Budget cap: $5/mo → **$15/mo**
- Knowledge expansion: psychology developmental, parenting frameworks, RIASEC junior, escalation hotlines (111 + Hội Tâm lý LS VN), VN GDPT 2018 subjects, cultural context
- Compliance: anh accepts strict-COPPA risk for family use case (parental supervision)

### D-010: Repo = Public open-source ✅ FINAL
- **Decision**: GitHub repo `pany-kids-studio` PUBLIC
- **Why**: Mục tiêu giáo dục — chia sẻ với cộng đồng phụ huynh khác cũng muốn build cho con
- **Impact**: 
  - LICENSE = MIT (recommend)
  - README cần đầy đủ (anh có thể tham khảo cho gia đình khác)
  - Secrets: KHÔNG commit API key → dùng `.env.local` + Vercel env vars
- **Contribution**: Anh có thể chia sẻ repo URL khi có ai hỏi about kid education stack

### D-004: AI model = Claude Haiku 4.5 default + Sonnet 4.6 fallback
- **Decision**: Haiku 4.5 cho 95% chats, Sonnet 4.6 cho complex reasoning
- **Why**: Cost ratio 15× cheaper than Sonnet, đủ tốt cho kid Q&A; Sonnet chỉ khi essay/code review
- **Impact**: ~$5/tháng total cost cho 3 kids × 50 chats/week
- **Skip Opus**: Quá đắt cho use case này

### D-005: Storage layer = localStorage (NOT external DB)
- **Decision**: Tất cả data save vào browser localStorage
- **Why**: 3 kids = 3 devices riêng, không cần sync; localStorage 5-10MB đủ cho years; zero backend cost
- **Tradeoff**: Mỗi máy có data riêng (không sync giữa máy bố và máy kid). Nếu cần sync → Phase 5 thêm Supabase
- **Backup**: Export JSON button trong Settings tab (đã có sẵn)

### D-006: Safety = COPPA-compliant prompting + client filters
- **Decision**: System prompt with hard rules + pre/post message scanning
- **Why**: Claude API yêu cầu user 18+, các bạn dùng qua dashboard nên bố là "operator", chatbot là tool an toàn cho con
- **Hard rules**: No direct homework answers, no inappropriate topics, max 80 words, lang auto-match, escalate self-harm to bố

### D-007: Bilingual = native (NOT translation layer)
- **Decision**: Mỗi field có `vi_xxx` và `en_xxx`, helper `L(vi, en)` chọn theo state
- **Why**: Translation API costs + delays + inaccurate cho terms như "lãi kép" (compound interest); native data đảm bảo quality
- **Impact**: Maintenance cao hơn (2× content) nhưng quality tốt hơn

### D-008: Visual style = anime/funny (NOT editorial)
- **Decision**: Fredoka + Quicksand + Caveat fonts, pastel palette, emoji-rich, animations
- **Why**: Audience là kids 6-16 (mở rộng 2026-04-30 — Year 1 phù hợp 6 tuổi với content đơn giản hơn), anime style attract follow; v2 editorial cho adults
- **Tradeoff**: Less "professional looking" cho người lớn nhìn → giải pháp: bố mode có thể toggle styles trong v4 nếu cần

## 2026-05-02

### D-013: 12-Pillar Architecture = 6 Skills + 6 Development (Sprint 1) ✅ FINAL
- **Decision**: Sidebar có 2 nhóm pillars song song
  - **Skills track** (6 trụ cũ): Tech · English · Finance · Thinking · Business · Life
  - **Development track** (6 trụ mới): Theo dõi · Sáng tạo · Vận động · Tự khám phá · La bàn nghề · Gia đình
- **Why**: Strategy-v2.md Q4 chốt — kỹ năng (cognitive/skill-based) tách khỏi phát triển con người (whole-child)
- **Implementation**: Sprint 1 build 5/6 trụ mới (Theo dõi đã có sẵn trong skills track). Tất cả tích hợp vào sidebar PHÁT TRIỂN group.
- **Data**: 60 careers (10 per RIASEC type), 84 RIASEC questions (36 + 48), 30 ask-parent prompts, 21 creative prompts, 12 exercise challenges
- **Storage**: 8 new pks3-* keys (creativeWorks/exerciseLog/moodLog/riasecAnswers/riasecCompleted/savedCareers/familyJournal/weeklyReviews)

### D-014: Mobile stack = Expo SDK 53 + RN 0.79 + RN Navigation v7 ✅ FINAL
- **Decision**: Mobile app = Expo managed workflow, NOT bare React Native
- **Why**: 
  - Expo Go cho QR-scan testing instant trên phone của 3 con — zero device setup
  - EAS Build handles iOS code signing + Play AAB → less ops cost cho solo dev
  - Same TypeScript codebase as web (~80% lib code is portable)
  - Expo SDK 53 stable, mature, supported through 2026
- **Sharing strategy**: 
  - Phase 1 (now): COPY pure-data lib files (riasec-junior, careers-v2, family-prompts) between apps/web/lib và apps/mobile/lib
  - Phase 2 (Sprint 2-3): Extract to packages/shared/ pnpm workspace
- **Storage parity**: AsyncStorage keys IDENTICAL to web localStorage (pks3-*) → JSON export/import cross-platform
- **API parity**: Mobile calls existing /api/chat (Vercel) — no new backend code
- **Bundle ID**: io.panykids.app (iOS + Android)
- **Submission target**: 8/2026 per strategy-v2.md Q5

### D-015: Đại Ka chat — same endpoint, different clients ✅ FINAL
- **Decision**: Web + Mobile + future Telegram bot all hit `https://pany-kids-studio.vercel.app/api/chat`
- **Why**: Single source of truth for system prompt + safety rules + rate limit + model selection — no drift across clients
- **Trade-off**: Vercel cron + edge function costs scale with users; if costs spike post-launch, move /api/chat to VPS (already running)
- **Override**: `apiBaseUrl` in mobile app.json `extra` allows local dev / staging deploys

## 2026-05-03

### D-016: English 4 skills = Web Speech API + Đại Ka grading (Phase 8) ✅ FINAL
- **Decision**: Listen/Speak use browser-native `window.speechSynthesis` + `SpeechRecognition`; Write uses dedicated `/api/grade-english` endpoint with Sonnet 4.6 + structured JSON output
- **Why**:
  - Web Speech API = $0 cost, instant, no extra deps. Whisper API ($0.006/min) is overkill for kid-length sentences
  - Server-side ASR would require audio upload → privacy concern. Browser ASR keeps audio local.
  - Đại Ka grading uses same model as chat for tone consistency (warm Vietnamese feedback)
- **Browser compat trade-off**: Firefox lacks SpeechRecognition. Acceptable since family uses Chrome/Edge by default. UI shows clear warning card if unsupported.
- **Levels**: 3 CEFR levels (A1/A2/B1) auto-pick from kid age (6-8 → A1, 9-11 → A2, 12-15 → B1). Manual override available.
- **Rate limit**: Separate bucket from `/api/chat` — 30 grades/hour/kid (writing is heavier than chat)
- **Pronunciation scoring**: Levenshtein on lowercased normalized text → 0-100 match. Not phoneme-level (browser ASR doesn't expose phonemes), but good enough for kid practice motivation.
- **Persist**: `pks3-englishProgress` with `{kidId: {listen: {right,total}, speak: [...], read: {passageId}, write: [...]}}` — cross-platform JSON export ready
- **Content bank v1**: 68 vocab words + 17 sentences + 3 reading passages + 9 writing prompts. Sprint 2 expand to 200+ vocab + 20 passages + 30 prompts based on actual usage by Phúc/An/Y.

## 2026-05-09

### D-017: Kid info correction (Phúc 11/An 9/Y 5) ✅ FINAL
- **Decision**: Hard-corrected kid ages and bios across DEFAULT_KIDS (web + mobile) + Đại Ka system prompt (VI + EN)
  - Trần Hạnh Phúc: 11 tuổi → tháng 9/2026 lên lớp 6
  - Trần Bình An: 9 tuổi → tháng 9/2026 lên lớp 4
  - Trần Như Ý: 5 tuổi (sinh 28/02/2020) → tháng 9/2026 vào lớp lá (mầm non)
- **Why**: Previous data hard-coded 8/10/12 was wrong (likely placeholder from Sprint 1). Corrected per anh's input on 2026-05-09.
- **Impact** (large):
  - Như Ý dropped from "12 tuổi capable RIASEC + advanced English B1" to "5 tuổi mầm non — needs picture-heavy K-level content + parent-supervised reading"
  - 12-pillar architecture must accommodate 3 distinct cohorts: K (4-6) / P (7-11) / T (12-15)
  - Đại Ka prompt now has explicit age-adapted language rules (basic/concrete for K, simple sentences for P, abstract reasoning for T)
- **Files changed**:
  - `apps/web/components/PanyKidsStudio.tsx` line 143-145
  - `apps/mobile/lib/kids.ts` line 18-22
  - `apps/web/lib/claude.ts` lines 29, 79, 237 (HARD_RULES_VI + HARD_RULES_EN intros)

### D-018: Content data 4-bank expansion ✅ FINAL
- **Decision**: Add 4 new lib files filling Sprint 2 content backlog (per `tasks.md` NEXT block):
  - `lib/quests.ts` — 252 daily quests (12 pillars × 3 age groups × 7-day rotation), v1 foundation, anh extends to 500+
  - `lib/english-skills.ts` — expanded to 205+ vocab / 55 speak sentences / 20 reading passages / 32 writing prompts; added new `K` CEFR level for Như Ý
  - `lib/math-quiz.ts` — 210 curated + 850 generated = 1060 effective questions across L1 (lớp lá) / L2 (lớp 4) / L3 (lớp 6) / L4 (cấp 2)
  - `lib/bilingual-stories.ts` — 50 VN↔EN stories paragraph-aligned across K/A1/A2/B1, with 8 genre tags + moral + vocab focus
- **Why**: Sprint 2 internal use with 3 kids needs content depth > UX features. Without bank content, dashboard is 12 empty pillars.
- **Design decisions**:
  - Procedural generators (math) use seeded RNG for deterministic output → no client-side surprises
  - Story-level localization is paragraph-aligned (parallel VI ↔ EN) so "show both" UI is trivial
  - All 4 banks export `getStats()` helper for dashboard meta-display
  - All 4 banks share `CEFRLevel` / age-group conventions so cross-bank queries (e.g., "give Như Ý 1 K-story + 5 K-vocab + 1 L1-math + 1 K-quest") are 1-line composes
- **Trade-off**: Did NOT hand-write 1000 math questions (would burn 10+ hours). Used generators for arithmetic patterns, hand-curated 210 word-problems + edge cases. Each generated question is unique and deterministic.
- **Total LOC added**: ~2300 lines across 4 files; estimated 2-3 weeks of active rotation content for 3 kids.


### D-019: Expert Q&A Bank + 3-day cron auto-refresh ✅ FINAL
- **Decision** (2026-05-09 Session 13): Build a verified expert Q&A subsystem feeding both library UI + Đại Ka chatbot context.
- **Trigger**: VnExpress article "Con đường sự nghiệp từ ngành học đến ngành nghề" (Mỹ Hà / Fulbright) prompted anh to add expert-grade career-guidance content to the dashboard.
- **Architecture**:
  - Static seed: `lib/career-qna.ts` — 25 verified entries across 12 topics, 10+ named experts, real source URLs (Fulbright, Harvard, Stanford, UCLA, OECD, Vinschool, VAS, MindX, HOCMAI, VOV, AAVN, RIASEC research papers).
  - Dynamic: `app/api/career-qna-refresh/route.ts` — Sonnet 4.6 endpoint. Picks 2 underrepresented topics per run, drafts 1-2 NEW Q&A entries with strict JSON output. Returns suggestions for human review.
  - Cron: `0 3 */3 * *` in `vercel.json` (every 3 days at 03:00 UTC).
  - UI: New "💬 Hỏi & Đáp Chuyên gia" card at top of LibraryTab — topic filter, click-to-open modal showing full bilingual answer + expert profile + verified source links + tags.
  - Future: `getContextForChatbot(query, age, 3)` helper in same lib — when wired into `/api/chat`, lets Đại Ka cite the same expert opinions instead of generating from scratch.
- **Why review-then-commit (not auto-merge)**:
  - Education Q&A needs URL verification (no hallucinated experts).
  - Human-in-loop preserves trust for kid-facing content.
  - Audit trail in git.
- **Trade-offs**:
  - Vercel cron sends a Bearer token — endpoint also accepts `?secret=` query for manual runs.
  - 3-day cycle = 10/month = ~$0.30/month at Sonnet 4.6 prices (well under $15 cap).
  - Suggestions are non-persistent — anh must manually paste chosen entries into `SEED_QNA[]` after review. Future: GitHub Actions automation possible if anh wants.
- **Companion deliverable**: `docs/career-philosophy.md` — 3-tier framework (Discovery 4-10t / Exploration 11-13t / Specialization 14-18t), Pany Kids Loop weekly workflow, 4 parenting trust pillars, 4-layer data organization, 5-year roadmap 2026-2031.

## 2026-05-13 — Session 16: Commercialization scope locked

### D-020: Commercial pattern = clone Pany Gia Phả multi-tenant SaaS ✅ FINAL
- **Decision**: Adapt Gia Phả's commercial assets (live since 2026-05-12) into Kids Studio. Port `clan_*` → `family_*`, re-use Brevo + Telegram bot + auto-provision pipeline.
- **Why**: Gia Phả already battle-tested with 1 real customer (Mai/họ Lê) → ~60% code re-use, eliminates 15h dev work, proven UX flow.
- **Source assets to fork**: `lib/clan-provision.ts` → `family-provision.ts`, `(landing)/sell/`, `(landing)/sell/register/`, `(public)/dangky/`, `admin/signup-requests/`, `lib/email.ts`, `lib/notifications.ts`, `og-image.svg`, `share-kit.md`.

### D-021: Subdomain = `kids.panyvn.app` ✅ FINAL (Q1)
- **Decision**: Use `kids.panyvn.app` (free Vercel subdomain) — defer `panykids.io` $15/yr purchase to post-3-month review.
- **Why**: Ship fast, stay in panyvn.app ecosystem with Gia Phả + Super OS for unified branding.

### D-022: Pricing = FREE for first 3 months, no tiers ✅ FINAL (Q2 revised by anh)
- **Decision**: Landing page nicely built like Gia Phả + auto-register, BUT **REMOVE all tier pricing display**. Free download/use trial period = **3 months** (review trigger 2026-08-13). All features unlocked during trial. After 3 months: review usage data → decide pricing model.
- **Why**: Anh's instinct — get organic adoption signal first, defer monetization decisions until real usage proves which features are sticky.
- **Trade-off**: Cost risk during free trial = Anthropic API spend. Mitigation: per-family Đại Ka cap (100 turns/month default) + Haiku 4.5 fallback if cost > $50/mo aggregate.
- **Review trigger**: 2026-08-13 — decide between (a) keep free, (b) introduce paid tier, (c) freemium with usage cap.

### D-023: P0 sidebar reorder shipped same day ✅ FINAL (Q3)
- **Decision**: Move "Khám phá" tab group from position #6 to position #3 (under "Học viên", above "Công cụ học").
- **Why**: Per anh's request — Khám phá (Library + AI Search + Quiz) is high-engagement content, deserves promotion above tooling tabs.
- **Impact**: 1 file change (`PanyKidsStudio.tsx` lines 1227-1255), 5 ins / 5 del, TypeScript clean. Mobile MobileTabBar unchanged (only 4 main tabs).

### D-024: Content seed via CTV draft + bố review ✅ FINAL (Q4)
- **Decision**: Phase 2 content expansion (age 5-16 personalization + B2 English + L5 math + teen careers) → CTV writes draft using template, bố reviews + approves.
- **Why**: Anh's 60h cap is tight; CTV draft saves ~70% writing time; bố review preserves quality + tone control.
- **Implementation**: Templates in `artifacts/content-templates/` (TBD), CTV checklist with rejection criteria, per-batch approval log.

### D-025: Backfill Sprint 2 feedback Day 1-4 before P1 starts ✅ FINAL (Q5)
- **Decision**: Anh sits 30min with 3 con today (2026-05-13) to backfill `artifacts/feedback-week-1.md` Day 1-4 with actual observations before Phase 1 (multi-tenant schema) work begins.
- **Why**: No usage signal = no validation that commercial product solves real problem. Risk of building 28h for the wrong shape.
- **Gate**: If Day 1-4 backfill reveals < 60% kid engagement (each kid uses < 3 tabs voluntarily), defer commercialization 2 weeks for UX iteration first.

### D-026: Beta cohort = family + friends + school groups + FB; B2B separate enterprise pricing ✅ FINAL (Q6)
- **Decision**: Beta cohort for free 3-month trial = anh em họ + bạn bè + parent groups of các con's class (Phúc lớp 6, An lớp 4, Y lớp lá) + targeted FB parent groups.
- **B2B carve-out**: Schools, education centers, enterprise tutoring services → SEPARATE quote-based enterprise tier (NOT free trial). To be priced individually based on student count + features.
- **Why**: B2C trial generates organic signal; B2B is different sales motion + different cost profile + different LTV expectation. Conflating them dilutes both.
- **Acquisition channels**:
  - Primary: WhatsApp/Zalo personal share with anh em họ + 2-3 close friends
  - Secondary: FB parent groups (3-5 communities anh đã active)
  - Tertiary: Kid school class groups via teacher/parent rep intro (Phúc class, An class)
  - B2B inbound only: queries via giapha.panyvn.app contact → route to enterprise pipeline

### D-027: Payment = SePay VietQR only initially ✅ FINAL (Q7)
- **Decision**: When pricing introduced (post-3-month review), use SePay VietQR as sole payment rail. MoMo/ZaloPay/credit card defer until MRR justifies integration cost.
- **Why**: SePay already integrated in PANY biz stack; VietQR has ~95% Vietnamese parent adoption; no card processing PCI scope.
- **Review trigger**: Add MoMo/ZaloPay when MRR ≥ 5M ₫/month sustained 2 months.

### D-028: Age personalization 5-16 by single-year granularity ✅ FINAL (Trục 6 new)
- **Decision**: Move from 3-bucket age groups (K=4-6, P=7-11, T=12-15) to **12 single-year age tracks** (5, 6, 7, ..., 16). Content sourced from:
  - **Layer 1 — School textbook tracking**: Bộ Giáo dục VN curriculum per grade (lớp lá, lớp 1-12)
  - **Layer 2 — Reference book corpus**: VN reference book series (Cánh Diều, Kết Nối Tri Thức, Chân Trời Sáng Tạo)
  - **Layer 3 — Advanced knowledge sources**: International (Khan Academy, Brilliant, Coursera Kids, AoPS) + Vietnamese (HOCMAI, Vinschool, VAS curricula)
- **Why**: 3-bucket forced same content for 5t and 6t (mầm non lớp chồi vs lá very different), 7t and 11t (lớp 2 vs lớp 5 huge gap), 12t and 15t (lớp 6 vs lớp 10 nearly different worlds). Single-year tracks let Đại Ka + content adapt precisely.
- **Implementation**:
  - `lib/age-curriculum.ts` NEW — map age → VN grade level → curriculum modules → recommended content per pillar
  - `getContentForAge(age, pillar)` helper → returns age-specific quests/quiz/stories/career-qna
  - Migration: existing K/P/T tagged content keeps backward-compat; new content tagged with primary age + range fallback
  - Tooling: scripts to ingest VN curriculum tables of contents → seed mapping
- **Effort estimate**: +15h on top of original 14h estimate for Section 2.1 of plan = ~29h total for age expansion + personalization.
- **CTV scope (D-024)**: CTV produces content per grade (lớp 1, 2, ..., 12) following templates. Bố approves per batch.

### D-029: Khám phá tab knowledge links — anh-curated ✅ FINAL (Trục 7 new)
- **Decision**: Anh personally curates premium knowledge links for Khám phá tab (Library + AI Search + Quiz subtabs). Em provides UI scaffold + admin form (or `lib/curated-links.ts` schema) for anh to drop entries in.
- **Why**: Quality of educational links is a trust signal anh wants to control directly, not delegate to AI generation or CTV.
- **Implementation**:
  - `lib/curated-links.ts` NEW — schema: `{ id, title_vi, title_en, url, description, ageRange: [min,max], pillar, source_authority, addedBy, addedDate, tags[] }`
  - LibraryTab renders these curated entries above existing content
  - Admin form at Settings → "Curated Links" (parent mode only) for anh to add/edit
  - Future: peer parent sharing — admin from other families can submit, anh approves

### D-030: Đại Ka chatbot name = KEEP, add per-family rename override ✅ FINAL (Q8)
- **Decision**: DO NOT global-rename "Đại Ka" → "Cô Pany". Honor D-011 (2026-05-01 "Đại Ka stays NOT renamed to Cô Pany"). Instead, **add Settings option** so each family can rename their chatbot.
- **Why**:
  - 197 occurrences across 28 files + 40 system prompt refs in `claude.ts` = ~6h pure rename effort + retune risk on tone calibration
  - D-011 explicit decision documented with reasoning (mentor-energy vs kawaii) — overturning needs new strong reason
  - "Cô Pany" works for commercial branding alignment with PANY — but forcing it kills brand neutrality for non-PANY families
- **Implementation** (~2h):
  - Add `family_settings.chatbot_name` (default `'Đại Ka'`)
  - Add `family_settings.chatbot_pronoun` (default `'Đại Ka'`, alternatives: `'Cô Pany'`, `'Anh AI'`, `'Bạn AI'`, custom)
  - Inject into system prompt: `const botName = familySettings.chatbot_name; ... "Bạn là ${botName}..."`
  - Settings UI tab: "Tên trợ lý AI" picker — 4 presets + custom text input
  - PANY-branded marketing copy can use "Cô Pany" as PANY-house default while users override
- **Migration**: No-op for existing kids (default = 'Đại Ka' preserved). New families during onboarding wizard see picker as Step 3.

### D-031: Pany Kids = separate Supabase project + phone-verify scaffold for cross-product collision ✅ FINAL
- **Trigger** (2026-05-13): Anh raised real concern — leads thường dùng cùng 1 email cho nhiều sản phẩm PANY (vd: email X đăng ký Gia Phả, sau lại dùng cho Pany Kids). Hiện skeleton `family-provision.ts` reject thẳng khi EMAIL_EXISTS → sẽ block customer hợp lệ.
- **Decision (short-term)**: Pany Kids dùng Supabase project RIÊNG (NOT shared với Gia Phả). Kết quả: 2 product's `auth.users` tables tách biệt → cùng 1 email có thể tồn tại độc lập ở 2 product → KHÔNG có collision ban đầu.
- **Decision (code scaffold today)**: Thêm errorCode mới `EMAIL_EXISTS_PHONE_VERIFY` + phone-OTP flow stub vào `family-provision.ts`. Khi P1 schema apply + collision phát hiện trong-product (cùng project Pany Kids), system suggest phone verify thay vì reject thẳng.
- **Decision (long-term Q3 2026+)**: Build "Pany ID" central identity service. Phone số = primary identifier (Vietnamese context). Email + Telegram = secondary. 1 customer → multi-product memberships (giapha, kids, super-os) via shared Pany ID. SSO across ecosystem.
- **Why phone as primary ID for VN**:
  - 95% người Việt có số điện thoại; nhiều người không có email "chuẩn" (dùng email cho mỗi product riêng)
  - Số điện thoại là 1-to-1 với người thật (KYC banking đã verify)
  - SMS OTP là pattern quen thuộc với người dùng VN (banking, ride-hailing)
- **SMS provider candidates** (defer until Pany ID build):
  - eSMS.vn — ~250-350 ₫/SMS, brand-name SMS available
  - Stringee — ~300-400 ₫/SMS, có cả call verify
  - Twilio (international fallback) — đắt hơn nhưng global
  - Cost estimate at 100 family/month signups × 2 SMS avg = ~60k ₫/tháng (trivial)
- **Implementation today (P3 skeleton)**:
  - `family-provision.ts` new errorCode `EMAIL_EXISTS_PHONE_VERIFY`
  - `lib/phone-verify.ts` NEW skeleton — `requestOTP(phone)` + `verifyOTP(phone, code)` env-gated stubs
  - `family_signup_requests` table get new column `phone_verified BOOLEAN DEFAULT FALSE` (will add in P1 migration update)
- **UX flow when collision detected**:
  1. Form submit → API detects existing email
  2. Response: `{ ok: false, errorCode: 'EMAIL_EXISTS_PHONE_VERIFY', existing_product: 'pany-kids' }`
  3. UI shows: "Email này đã có account Pany Kids. Anh/chị có thể xác nhận bằng SĐT để khôi phục access, hoặc dùng email khác."
  4. Phone OTP flow (when SMS provider live) → success → link existing family OR allow new product signup
- **Cross-reference**: D-020 (clone Gia Phả pattern), D-022 (free 3mo trial), D-026 (B2B separate enterprise pricing — B2B can opt into shared Pany ID earlier).

### D-032: "Cô Pany" = DEFAULT for new families + "Đại Ka" override for 3 con của anh ✅ FINAL
- **Trigger** (2026-05-13): Anh tái cân nhắc Q8 sau khi review impact matrix 262 occurrences. Chọn Option A (hybrid default+override).
- **Decision**: Set `DEFAULT_BOT_NAME = "Cô Pany"` cho new families đăng ký qua /dangky. Founding family (slug `tran-binh`, Phúc/An/Y) override explicitly với `family_settings.chatbot_name = 'Đại Ka'` để giữ familiarity từ Sprint 1+2.
- **Why this overrides D-011 + D-030 partially**:
  - D-011 (2026-05-01) said "Đại Ka stays NOT renamed to Cô Pany" — applied to ENTIRE product. Now D-032 narrows to: "Đại Ka stays for FOUNDING FAMILY ONLY; default for new families is Cô Pany".
  - D-030 (2026-05-13) added per-family rename override mechanism. D-032 = apply D-030 at scale với default flip.
- **Brand rationale**: "Cô Pany" link mạnh với PANY brand mỗi lần con chat → phụ huynh nhớ PANY ecosystem → cross-sell Gia Phả/Super OS dễ hơn. Mất gravitas "mentor võ sĩ trẻ" của Đại Ka nhưng được brand cohesion.
- **3 con's preservation**: Phúc 11t + An 9t đã chat nhiều với Đại Ka trong Sprint 1+2. Y 5t đặc biệt dễ confuse nếu đổi tên giữa chừng. Founding family override = zero disruption.
- **Implementation (~30 phút)**:
  - `lib/claude.ts`:
    - Add `LEGACY_BOT_NAME = "Đại Ka"` constant (what HARD_RULES literally contain)
    - Change `DEFAULT_BOT_NAME = "Cô Pany"` (what new families get)
    - Update `applyBotNameOverride()`: rewrite Đại Ka → newName UNLESS newName === LEGACY_BOT_NAME (no-op for founding family)
    - "bố Đại Ka" idiom → drop "bố " prefix, become standalone newName (already handled)
  - `artifacts/migration-family-2026-05-14.sql`:
    - `chatbot_name TEXT NOT NULL DEFAULT 'Cô Pany'` (was 'Đại Ka')
    - Founding family INSERT explicit `chatbot_name = 'Đại Ka'` to preserve override
  - Marketing copy in /sell, /welcome, share-kit-kids.md, family-email welcome template: mention "Cô Pany"
- **Reversibility**: nếu sau 2-3 tháng usage data cho thấy phụ huynh prefer "Đại Ka" hơn (vd: feedback từ beta cohort), 1-line revert DEFAULT_BOT_NAME = "Đại Ka". Migration KHÔNG cần data change (founding family explicit override always wins).
- **EN bilingual**: "Cô Pany" giữ nguyên trong EN (don't translate "Cô"). EN audience hơi awkward 1 lần đầu — nhưng PANY brand exotic VN charm consistent với philosophy D-003 + D-007.


### D-033: Standard tier = FREE LONG-TERM (supersedes D-022 3-month trial) ✅ FINAL
- **Trigger** (2026-05-15, Session 18): Anh thấy "FREE 3 tháng" tạo urgency giả + lo trial expiry friction. Khẳng định lại brand promise: PANY có công nghệ + thời gian → mở bản chuẩn miễn phí dài hạn cho gia đình Việt, không giới hạn ngày.
- **Decision**: Bỏ toàn bộ copy "MIỄN PHÍ 3 THÁNG" + "trial expires 2026-08-13". Mọi nơi (landing /sell, /welcome, /sell/register, onboarding wizard done card, OG image static + dynamic, welcome email, Telegram alert, admin dashboard Section 2 title): đổi sang variants của "Miễn phí dài hạn · Giáo án cập nhật mỗi tuần".
- **Why this overrides D-022**:
  - D-022 (2026-05-13) said "FREE 3 months, NO tier display, review trigger 2026-08-13, $50/mo cost cap". D-033 keeps the cost cap signal + B2B carve-out (D-026) + cost guard `family-stats.ts:isOverCostBudget()`, but flips the time-bounded framing into permanent-bounded resource framing.
  - Resource bound = D-034 (20 chat/day/family) instead of time bound (3 months). Conserves Anthropic budget while removing artificial deadline.
- **Implementation map**:
  - Copy changes across 7 files: `app/sell/page.tsx` (badge + hero CTA + how-it-works #4 + FAQ #1 + final CTA), `app/welcome/page.tsx` (description + trust signal + story #2 + CTA + subtitle), `app/sell/register/page.tsx` (h1 + submit btn), `app/onboarding/page.tsx` (done step banner), `app/admin/dashboard/page.tsx` (Section 2 title + subtitle), `public/og-image.svg` (badge), `app/api/sell/og/route.ts` (default badge string).
  - Email + Telegram template updates: `lib/family-email.ts` welcome subject + body banner, `lib/family-notifications.ts` new-lead alert trial line.
  - Schema-level behavior: `lib/family-provision.ts` — `trial_ends_at` set to `+10 years` (effectively unlimited) instead of `+3 months`, `tier` initial value changed `'free-trial'` → `'standard'`. Migration SQL not changed (backward compat with old families' trial_ends_at field).
- **Upgrade path positioning**: Standard = unlimited time + 20 chat/day/family + content cập nhật mỗi tuần. Upgrade (manual contact via Zalo 0983 179 109) = gia sư AI riêng từng con + lộ trình tùy chỉnh + analytics chuyên sâu + chat không giới hạn.
- **Admin dashboard impact**: Section "⏰ Trial expiring" relabeled "📈 Active families monitoring (D-033)" — same widget tracks legacy families pre-D-033 to spot upgrade candidates (high usage = candidate for personal-tier upsell).
- **Reversibility**: If business model needs to reintroduce trial later, flip `trialEndsAt.setFullYear(+10)` back to `setMonth(+3)` in family-provision.ts + revert copy. 1 commit reversible.
- **Cross-reference**: D-022 (3-month trial — SUPERSEDED), D-026 (B2B enterprise carve-out — still valid), D-034 (rate limit replaces time bound), D-035 (UI dashboard restructure — to be decided in Phase B research).

### D-034: Chat rate limit 20 messages/day per family + upgrade CTA ✅ FINAL
- **Trigger** (2026-05-15, Session 18): Anh yêu cầu chatbot giới hạn ~20 dòng/ngày/khách + định hướng nâng cấp nếu cần cá nhân hóa. Spec drives cost containment under D-033 free-long-term promise.
- **Decision**: `/api/chat` enforces 20 messages/day per family (sliding 24h window). Pre-D-034 limit was 100 msg/hour PER KID (~500/h theoretical max for 5-kid family → unsustainable under D-033).
- **Bucket key strategy**:
  - Multi-tenant production: `ChatContext.familyId` (UUID from Supabase `families.id`)
  - Solo single-family fallback (anh's current setup, pre-P1 wire): `"default-family"` shared bucket — all kids in anh's family share 20/day quota
  - This is conservative: 20 msg ÷ 3 kids ≈ 6-7 msg/kid/day. Sufficient cho hướng dẫn dùng dashboard; encourages kids to dùng Quest/Math/Stories thay vì coi chatbot là chat toy.
- **Rate-limit exceeded response (HTTP 429)**:
  - Vietnamese + English variants matched to `ctx.lang`
  - Reset time hint: "Reset khoảng N tiếng nữa" (computed from oldest timestamp in bucket)
  - 4 redirect suggestions: Quest hôm nay / Math Quiz (1060 câu) / Bilingual Stories (50 truyện) / La bàn 60 nghề
  - Upgrade CTA: "Cần gia sư AI riêng + chat không giới hạn? Nhắn Zalo PANY 0983 179 109"
  - `X-RateLimit-Limit` / `X-RateLimit-Remaining` / `X-RateLimit-Reset` HTTP headers exposed for client telemetry
  - Successful response also includes `quota.remaining` so frontend can display soft warning before hitting limit
- **Why per-family not per-kid**: Per-kid (20×5=100/day/family) would defeat budget control. Per-family forces parent to coordinate with kids on quota use → reinforces "Cô Pany = guidance, not entertainment" positioning.
- **Storage**: In-memory `Map<familyKey, timestamps[]>` (process-local). Acceptable for skeleton + low-traffic phase. Edge case: serverless cold start resets bucket — slight over-allowance, not a security risk. When traffic grows OR multi-region instances → swap to Supabase `family_chat_quota` table with VN-midnight reset (Block 2 wire candidate).
- **System prompt budget bonus**: 20 msg/day × ~3K tokens/msg × $3/Mtok input + ~500 tok output × $15/Mtok ≈ **$0.27/family/day max**. 100 families = $27/day = $810/mo within D-022's original $50/mo cap WHEN families are 5x more numerous — i.e., this scales with 5x headroom.
- **Cross-reference**: D-022 (cost cap concept — preserved), D-033 (free long-term framing — partner decision), D-031 (Pany Kids separate Supabase project — quota table goes there).


### D-035: UI metaphor primary = 🌳 CÂY PHÁT TRIỂN + CHA MẸ SONG HÀNH · Spaceship = Mature Mode deferred ✅ FINAL
- **Trigger** (2026-05-15, Session 18 Phase B): Anh dashboard + landing đang rối + thiếu visual identity. Em research 5 metaphor (file ux-metaphor-research-2026-05-15.md) → anh pivot 2 mô hình focused (Cây vs Tàu vũ trụ, file ux-metaphor-2-models-2026-05-15.md). Anh chốt Cây.
- **Decision**: Toàn bộ workflow + system Pany Kids visualize qua metaphor cây phát triển 6 giai đoạn (🌰 Hạt giống → 🌱 Mầm non → 🌿 Cây non → 🌳 Trưởng thành → 🌸 Ra hoa → 🍎 Kết trái). 12 trụ cột phát triển = 12 cành. Cha mẹ = "tia mặt trời" tưới ánh sáng cho cây mỗi ngày.
- **Endgame**: Cây kết trái (16+ tuổi) = career fork (60 hoa từ D-019 → 1-3 trái chín = nghề chọn).
- **Family view**: 3 cây cạnh nhau (Phúc 11 lớn nhất / An 9 medium / Như Ý 5 mầm non) trong "Vườn Trần family".
- **Mature Mode unlock (kid 12+ lv ≥30)**: Layer "Tàu vũ trụ" overlay — narrative bridge "build spaceship from materials grown on the tree". Tàu vũ trụ NOT primary metaphor — deferred until usage data shows teens 12-16t engagement drop on Cây.
- **Why chose Cây over Tàu (scoring matrix in ux-metaphor-2-models)**:
  - VN cultural fit ⭐⭐⭐⭐⭐ vs ⭐⭐⭐ (Tàu sci-fi không native VN)
  - 3 con anh (Phúc 11, An 9, Y 5) audience match 100% (Tàu hợp teen 12+)
  - Parent narrative warmth ⭐⭐⭐⭐⭐ ("Cây Phúc nay ra 3 lá" share Zalo dễ)
  - Build cost 50-60h (Tàu 60-70h) — ship faster, validate sooner
  - Reversible: nếu Cây fail teen engagement → activate Spaceship Mature Mode (already designed)
- **Build phases**:
  - **Phase 1 (Week 1-2, ~30-40h)**: Landing /welcome + /sell hero replace với Tree illustration. Dashboard `/` sidebar refactor — Tree center stage thay 29 tabs.
  - **Phase 2 (Week 3, ~15-20h)**: Parent view "Vườn ươm gia đình" 3-tree side-by-side. Daily watering interaction layer (parent tap 'Tưới' button).
  - **Phase 3 (Week 4, ~10-15h)**: Streak/season state machine (background đổi mùa khi life-stage progression). Endgame "Cây kết trái" career fork ceremony.
- **Asset pipeline**: Anh tạo Gemini Imagen master prompt (commit pending) → derive 6 viewport variants (landing hero, dashboard tree, 6-stage strip, family forest, parent watering, endgame fruiting). Stored `artifacts/mockups/tree/`.
- **Cross-references**:
  - D-019 (60 careers) — 60 hoa = 60 career candidates, 1-3 trái chín = career fork
  - D-028 (12 single-year tracks) — 12 cành mapping
  - D-022 → D-033 (free long-term) — không có "trial pressure" trong cây
  - D-034 (20 chat/day) — Cô Pany xuất hiện trong cây như "gardener helper" / "fairy of garden"

