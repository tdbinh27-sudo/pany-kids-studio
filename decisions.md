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



### D-036: Game Dev Track (3-tier) added as 28th nav card on Tree of Knowledge ✅ CANDIDATE (pending anh confirm)
- **Trigger** (2026-05-19, Session 19): Anh request mở lại Kids Studio + bổ sung 1 tab phát triển game · bổ trợ 2 agents `unity-architect` + `blender-addon-engineer` (đã LIVE từ 2026-04-12 bulk install agency-agents repo).
- **Research**: 5 game-dev OSS candidates evaluated (Phaser 39.6K · Godot 111K · GDevelop 23K · Kaboom/KaPlay 2.7K · Scratch 4.8K) + Pygame-CE.
- **Decision**: Add `gamedev` tab + new card to TreeOfKnowledgeHome 27→28 grid · 3-tier track theo tuổi:
  - **Tier 1** 🌱 (Y 5t mầm non): Scratch.mit.edu (web, no install) · parent-supervised · 4-week starter curriculum
  - **Tier 2** 🌿 (An 9t lớp 4): Kaboom/KaPlay (MIT, browser CDN, no install) · single-file `kaboom-starter.html` ready
  - **Tier 3** 🌳 (Phúc 11t lớp 6): Godot 4.6 (MIT, 111K⭐) + Pygame-CE (auto-installed ✅) + Blender (preinstalled ✅) · 3 projects 3-month curriculum
- **AI Agent companions** (đã có sẵn `~/.claude/agents/`):
  - `unity-architect.md` — game architecture patterns, state machines, component composition
  - `blender-addon-engineer.md` — 3D asset pipeline, Python add-ons, exporters
- **Installs done this session**:
  - ✅ `pygame-ce 2.5.7` via `pip install --user` (no admin)
  - ✅ Artifacts pack: README.md / kaboom-starter.html / pygame-hello.py / scratch-track.md / godot-first-game.md / INSTALL.md in `artifacts/game-dev-track/`
- **Installs pending anh manual click** (auto mode chặn .exe download):
  - ⏳ Godot 4.6 portable from https://godotengine.org/download/windows/ → `~/Tools/Godot/` (~120MB)
  - ⏳ GDevelop 5 installer from https://gdevelop.io/download (OPTIONAL, 200MB)
  - ❌ Unity Engine SKIP (30GB + license + unity-architect agent advisory mode đủ)
- **Skipped from research** (Decision Filter FAIL):
  - Phaser 39.6K — dev framework, không kid-tool
  - Scratch GUI self-host — AGPL conflict + use hosted scratch.mit.edu thay
  - LittleJS / Crafty / melonJS — niche, không impact
- **Code shipped** (3 file changes, ~280 LOC additions):
  - `apps/web/components/GameDevTab.tsx` (new, 232 lines) — 3-tier card UI + 4 career paths + AI agent companion box
  - `apps/web/components/PanyKidsStudio.tsx` — added import + `{activeTab === 'gamedev' && <GameDevTab lang={lang} />}` route
  - `apps/web/components/TreeOfKnowledgeHome.tsx` — added 28th nav card (id: gamedev, icon: 🎮, after badges)
- **Verification**: `tsc --noEmit` clean (EXIT=0) · Pygame import test pass · TypeScript types resolved
- **Career path mapping**: 4 careers added (Indie Game Dev / Game Designer / Tech Artist / Game Programmer) with VN salary ranges 15-100tr/m · VN studios: VNG, Sky Mavis, Wolffun, Topebox, Hiker Games, Sparx*
- **Cross-references**:
  - D-019 (60 careers) — D-036 adds 4 new under tech/creative
  - D-028 (12 single-year tracks) — Game Dev fits trụ cột Technology + Creative + Math
  - D-034 (Claude rate limit) — kids KHÔNG chat Claude directly, bố routes qua agents
  - [[reference_agency_agents]] memory — confirms unity-architect + blender-addon-engineer LIVE since 2026-04-12
- **Mid-Year Gate review (2026-06-30)**: validate engagement — anh check journal "Bao nhiêu lần 3 con vào Game Dev tab?" Nếu Phúc xây xong Project 1 Godot → ✅ keep + expand. Nếu zero engagement → defer revisit Q4/2026.

### D-037: Fashion Design Track (3-tier) added as 29th nav card 👗 ✅ CANDIDATE
- **Trigger** (2026-05-19, Session 19 cont.): Anh request sản phẩm thiết kế thời trang trẻ em + mô phỏng môi trường (nhà/xe/công viên).
- **Stack OSS chọn**: Open Peeps (CC0 public domain, 584,688 combinations by Pablo Stanley) + DiceBear 8.7K⭐ MIT (30+ avatar styles) + Avataaars Generator 3K⭐ MIT (React SVG output) + Figma free tier.
- **Decision**: Add `fashion` tab + new card (id: fashion, icon: 👗) sau gamedev trên TreeOfKnowledgeHome (29 cards total).
- **3-tier**:
  - Tier 1 👶 (Y 5t): DiceBear Playground → randomize → save PNG Portfolio · parent-supervised 15 phút/buổi
  - Tier 2 🧒 (An 9t): Avataaars Generator → customize Top/Hair/Clothes/Accessories/Eyes/Mouth → SVG download · 30 phút/buổi
  - Tier 3 👨‍🎨 (Phúc 11t): Open Peeps SVG + Figma free + 8 PANY scene backdrops (house/car/park/school/cafe/beach/forest/future) → composite scene → PNG @2x export
- **8 scenes curated**: 🏠 Nhà / 🚗 Xe / 🌳 Công viên / 🏫 Trường học / ☕ Café / 🏖️ Bãi biển / 🌲 Rừng / 🚀 Tương lai (sources: unDraw, Storyset, Open Peeps complementary, Pexels CC0)
- **Career path mapping**: 4 careers added — Fashion Designer (20-100tr/m), Costume Designer (15-40tr/m), Character Illustrator (15-60tr/m VNG/Colorful), UI/UX Designer (20-150tr/m MoMo/Tiki/Shopee). VN brands: Canifa/IVY moda/Yody/Coolmate/Routine/Owen/Elise/Saigon Garment.
- **AI Agent companions**: UI Designer + Brand Guardian + Inclusive Visuals Specialist (all đã LIVE [[reference_agency_agents]]). Complex visuals route Claude Design ([[preference_claude_design]]).
- **Code shipped**: `components/FashionDesignTab.tsx` (NEW, ~280 LOC) + import + activeTab route in PanyKidsStudio.tsx + 29th card in TreeOfKnowledgeHome.tsx + `artifacts/fashion-design-track/README.md`
- **Skipped**: Self-host scene composer UI (Phase 2 nếu engagement cao) — Tier 3 hiện dùng Figma free đủ
- **Decision Filter 4.5/5 PASS** (bandwidth marginal: Tier 3 Figma workflow cần parent guidance Phúc giai đoạn đầu)
- **Mid-Year Gate 2026-06-30 review**: kiểm tra Portfolio Y/An có entry fashion không? Phúc đã làm Figma scene chưa? Engagement zero → defer · high → build Phase 2 in-app scene composer

### D-038: STEM Lab Track (PhET 18 simulations curated) added as 30th nav card 🔬 ✅ CANDIDATE
- **Trigger** (2026-05-19, Session 19 cont.): Anh request sản phẩm STEM cho học sinh + đầy đủ nội dung kiến thức bổ sung.
- **Stack OSS chọn**: PhET Interactive Simulations (University of Colorado Boulder, 125+ HTML5, CC-BY 3.0, 121 ngôn ngữ bao gồm Tiếng Việt ✅, 25M+ users globally).
- **Decision**: Add `stem` tab + new card (id: stem, icon: 🔬) sau fashion trên TreeOfKnowledgeHome (30 cards total).
- **6 môn × 3 sims = 18 curated**:
  - 🔢 Toán: Fractions Intro · Area Builder · Graphing Lines
  - ⚛️ Lý: Forces & Motion · Energy Skate Park · Balloons Static Electricity
  - 🧪 Hóa: Build a Molecule · States of Matter Basics · Balancing Equations
  - 🧬 Sinh: pH Scale · Natural Selection · Gene Expression
  - 🌍 Trái đất: My Solar System · Greenhouse Effect · Plate Tectonics
  - 🛠️ Kỹ thuật: Bending Light · Wave Interference · Circuit Construction
- **Curriculum mapping VN**: trùng chương trình SGK lớp 4-12 KHTN/Lý/Hóa/Sinh (đã document trong stem-track/README.md)
- **Age cadence**: Y 5t = 1 sim/tuần parent-supervised (15-20 phút), An 9t = 2 sims/tuần (30 phút), Phúc 11t = 3 sims/tuần + 1 mini-project/tháng
- **Implementation**: External link mở PhET tab mới (Vietnamese URL pattern `https://phet.colorado.edu/vi/simulations/<slug>`) — iframe embed defer Phase 2 nếu cần keep user inside app
- **Resources bổ sung**: VioEdu, OLM.vn, Khan Academy Tiếng Việt, GeoGebra, Code.org, CK-12, MIT OCW, Crash Course YouTube. Hardware kit roadmap (Micro:bit / Arduino / Raspberry Pi Pico / Snap Circuits) anh-decide Q3 budget.
- **Career path mapping**: 6 careers — Bác sĩ/Dược sĩ (30-100tr/m), Kỹ sư điện (20-60tr/m), Data Scientist (30-150tr/m), Biotech (15-40tr/m), Kỹ sư hàng không (30-80tr/m), Robotics/IoT (25-70tr/m). VN employers: VinFast/Viettel R&D/FPT/Vinmec/Tâm Anh/Bách Khoa/Vingroup AI Lab.
- **AI Agent companions**: AI Engineer + Civil Engineer + Corporate Training Designer (all LIVE [[reference_agency_agents]])
- **Code shipped**: `components/STEMTab.tsx` (NEW, ~340 LOC) + import + activeTab route in PanyKidsStudio.tsx + 30th card in TreeOfKnowledgeHome.tsx + `artifacts/stem-track/README.md`
- **Decision Filter 5/5 PASS** — STEM is foundational mission match, iframe embed minimal effort, PhET battle-tested 25M users
- **Mid-Year Gate 2026-06-30 review**: Phúc complete bao nhiêu sims? Mini-project nào? An có streak làm sim/tuần? Y enjoy parent-supervised không?

### D-039: Data Architecture Phase 1+2 — JSON content files + per-kid progress tracking ✅ SHIPPED
- **Trigger** (2026-05-19, Session 19 final): Anh hỏi "phần dữ liệu sẽ được cập nhật ra sao cho 3 tab này". Em propose 3 phases (JSON / Progress tracking / CMS+AI). Anh chốt build Phase 1 + Phase 2 luôn.
- **Phase 1 (JSON content):** Tách hardcoded TIERS/CAREER_PATHS/ENVIRONMENTS/SUBJECTS từ 3 file .tsx → 3 JSON files:
  - `apps/web/lib/gamedev-data.json` (tiers + 10 milestones + careers + vn_studios + ai_agents)
  - `apps/web/lib/fashion-data.json` (tiers + 9 milestones + environments + careers + vn_brands + ai_agents)
  - `apps/web/lib/stem-data.json` (6 subjects × 3 sims = 18 sims + curriculum_map + careers + ai_agents)
- **Anh update workflow mới:** Edit JSON → git push → Vercel auto-deploy. KHÔNG cần biết React/TypeScript. CTV cũng update JSON được qua git access.
- **Phase 2 (Per-kid progress):** Build `lib/track-progress.ts` helper với 6 functions:
  - `toggleProgress(progress, kidId, itemId)` — mark/unmark with ISO date
  - `isCompleted(progress, kidId, itemId)` — boolean check
  - `completedOn(progress, kidId, itemId)` — display tooltip date
  - `countCompleted(progress, kidId, itemIds)` — count for badge
  - `percentComplete(progress, kidId, itemIds)` — for progress bar
  - `badgeTier(count)` — auto-tier (🌱 starter / 🥉 1+ / 🥈 3+ / 🥇 6+ / 🏆 10+)
- **State schema:** `{ [kidId]: { [itemId]: ISODate } }` — same pattern as existing englishProgress/portfolio/journal.
- **Wired in PanyKidsStudio.tsx:**
  - 3 new useState: `gamedevProgress`, `fashionProgress`, `stemProgress`
  - 3 new setXP helpers: `setGamedevProgressP`, `setFashionProgressP`, `setStemProgressP`
  - 3 new keys in load() array + 3 if checks for restoration from localStorage (`pks3-` prefix matches existing pattern)
  - Props passed to 3 tabs: `kids, activeKidId, progress, setProgressP`
- **UI changes in 3 components:**
  - Header: progress bar + badge ("🥈 Phúc · 5/10 mốc · Bạc · 50%")
  - Tier/Subject cards: mini progress bar per tier ("3/5 done · 60%")
  - Expanded view: milestone checkboxes (⬜/✅) clickable → toggleProgress
  - If no activeKidId: show prompt "Chọn học viên (tab Học viên)" instead of progress
  - All progress bars use amber-300 on translucent white over solid gradient hero (matches D-035 Tree of Knowledge palette)
- **STEM-specific:** Each PhET sim has "Đánh dấu Phúc đã làm" button below external link (separates "open sim" action from "mark done" action — kid can browse without marking, only mark after actual completion)
- **Files changed (8 total, +1500 LOC, -450 LOC):**
  - NEW: `apps/web/lib/gamedev-data.json` + `fashion-data.json` + `stem-data.json` + `track-progress.ts`
  - MODIFIED: `GameDevTab.tsx` (full rewrite consuming JSON + progress), `FashionDesignTab.tsx` (same), `STEMTab.tsx` (same), `PanyKidsStudio.tsx` (+12 lines state + props wiring)
- **TypeScript clean** (tsc --noEmit EXIT=0)
- **Backward compat:** progress field optional (default `{}`) — works whether kids loaded or not, gracefully degrades to "no progress tracking" mode when activeKidId is null.
- **Phase 3 (CMS + AI auto-update) DEFERRED to Q3/Q4 2026** — trigger conditions: CTV pool ≥3, 50+ kid users, revenue model confirmed, 12h dedicated build block.
- **Cross-references:**
  - [[session_kids_studio_gamedev_2026_05_19]] — Session 19 full context
  - D-019 (60 careers) — game/fashion/stem tabs add 14 new careers (4+4+6)
  - D-034 (Claude rate limit) — kids KHÔNG chat directly, parent routes
  - D-035 (Tree of Knowledge dark hero) — progress bar matches amber-300 palette
- **Mid-Year Gate 2026-06-30 review criteria:**
  - Engagement per kid (count completed milestones across 3 tracks)
  - Anh có tự update JSON content được không (anh comfort level)
  - CTV onboard có contribute JSON được không
  - Trigger Phase 3 CMS build hay defer Q4?

### D-040: Phase 3 MVP — Supabase CMS for 3 tracks content ✅ SHIPPED (migration pending anh apply)
- **Trigger** (2026-05-19, Session 19 final cont.): Anh confirm Supabase Pro tier active → build Phase 3 luôn thay vì defer Q3/Q4.
- **Scope MVP** (4-6h actual): Simple polymorphic table + admin UI JSON editor + API + hook. Phase 3b (versioning, CTV roles, AI auto-update, schema validation) DEFERRED to next session.
- **Schema** (`migration-content-tracks-2026-05-19.sql`):
  - Table `public.content_tracks (id uuid, track text UNIQUE CHECK IN ('gamedev','fashion','stem'), payload jsonb, version int, updated_by text, updated_at timestamptz, published bool)`
  - Trigger `bump_content_tracks_version` auto-increment version + timestamp on UPDATE
  - RLS enabled · `service_role_full_access` policy (deny anon, server-only access)
  - Index on `(track) WHERE published` for fast lookup
  - Seed: 3 rows from current JSON snapshot (gamedev/fashion/stem)
- **API routes** (2 new):
  - `GET /api/content/[track]` — public, ISR cached 60s, returns payload with fallback to bundled JSON if Supabase fails or row missing
  - `GET+PATCH /api/admin/content/[track]` — admin-only via ADMIN_SECRET (query `?secret=` or `x-admin-secret` header, same pattern as `/api/admin/families`)
- **Admin UI** (`/admin/content`):
  - Auth flow: paste secret → save localStorage → URL clean
  - 3 tab buttons (Game Dev / Fashion / STEM)
  - Metadata bar: track + version + last update timestamp + reload button
  - Inline JSON textarea editor (monospace, ~60vh, parse validation client-side)
  - Save button → PATCH API → success message with new version
  - Schema cheatsheet sidebar warning về NOT removing `milestones[].id` / `phet_slug` (breaks progress tracking D-039)
  - Logout button to clear localStorage secret
- **Client hook** (`lib/useContent.ts`):
  - Module-level cache (60s TTL, survives re-renders within session)
  - Falls back to bundled JSON if API fails or returns error
  - Returns `{ data, loading, source: 'bundle'|'supabase'|'bundle-fallback'|'cache', version }`
- **Server lib** (`lib/supabase-admin.ts`):
  - `getSupabaseAdmin()` — lazy-cached client using SERVICE_ROLE_KEY
  - `checkAdminAuth(req)` — extracted helper matching existing admin route pattern
- **Component refactor** (3 files):
  - Import becomes `import bundledData from '@/lib/X-data.json'; import { useContent } from '@/lib/useContent'`
  - Replace static `data` constant with `const { data } = useContent<XPayload>('X')`
  - Move TIERS/SUBJECTS computation INSIDE component body
  - Defensive `|| []` for null payload during loading flicker
  - Type: `type XPayload = typeof bundledData` for full type safety from JSON shape
- **Update workflow comparison**:
  - OLD (Phase 1): edit JSON file → git push → Vercel rebuild (3-5 min)
  - NEW (Phase 3): admin UI → save → cache refresh 60s (no rebuild, no git)
- **Backward compatibility**:
  - Bundled JSON files retained as fallback (NOT deleted)
  - If migration not applied yet → API returns bundled JSON (source: 'bundle')
  - If Supabase down → hook fallback to bundled JSON automatically
  - Components NEVER crash on missing data (default `[]` everywhere)
- **Files shipped (8 new + 3 modified, ~700 LOC):**
  - NEW: migration SQL, supabase-admin.ts, useContent.ts, 2 API routes, admin page, runbook MD
  - MODIFIED: GameDevTab.tsx, FashionDesignTab.tsx, STEMTab.tsx
- **TS clean** (tsc --noEmit EXIT=0)
- **Pending anh** (3 manual steps, ~10 min):
  1. Apply migration in Supabase SQL Editor (pany-kids-prod)
  2. Verify env vars NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY + ADMIN_SECRET on Vercel
  3. Test `/admin/content?secret=YOUR_ADMIN_SECRET` LIVE
- **Cross-references:**
  - [[D-039]] (Phase 1+2 JSON+progress) — content schema reused
  - [[D-031]] (Supabase pany-kids-prod isolated project) — same DB
  - [[D-022]] (admin auth ADMIN_SECRET pattern) — same auth
  - artifacts/admin-content-runbook-2026-05-19.md — full operational guide
- **Phase 3b future enhancements** (defer until trigger):
  - Version history table + diff viewer (when content_tracks UPDATE >50 times)
  - Per-CTV auth + role table (when CTV pool ≥3)
  - AI suggestion queue (Claude agent scans GitHub/PhET RSS → propose updates)
  - Multi-language editor split (vi/en separate fields)
  - Schema JSONSchema validation client-side
  - CDN webhook for instant cache invalidation (currently 60s ISR)

### D-043: Practice Corner tab (Góc Luyện Tập 🎯) — embedded free OSS learning tools ✅ SHIPPED
Standalone nav card for bé Phúc's July 2026 study plan. Lang-only tab (no per-kid progress), embeds free open-source interactive tools via lazy iframe: iSpeakerReact (Apache-2.0, English speaking), QuickQWERTY (MIT, typing), GeoGebra 3D + 2D (free embed, geometry) + 6 curated free links (Cambridge A2 Key/B1 Preliminary, Write & Improve, ELSA, Khan Toán 6, ReadTheory). Wiring mirrors D-042 'space': components/PracticeTab.tsx + NAV_ITEMS in TreeOfKnowledgeHome + render switch in PanyKidsStudio. next build + tsc + browser QA pass, 0 app console errors. No CSP in app; external targets confirmed iframe-able. Family use.
