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
