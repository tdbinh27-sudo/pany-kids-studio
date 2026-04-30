# Pany Kids Studio

**Type:** Software Product (educational dashboard)
**Status:** Active — Build phase
**Created:** 2026-04-30
**Owner:** Bố Bình (Trần Đức Bình)
**Users:** Phúc (8) · An (10) · Y (12)

## Objective

Xây dựng một dashboard giáo dục 24/7 cho 3 con trong gia đình (mở rộng cho trẻ 6-16 tuổi), làm "trung tâm điều phối" cho:

1. **Lộ trình học 5 năm** (2026—2031) — 6 trụ cột phát triển
2. **Hướng nghiệp** — khám phá 10 nghề tương lai dựa trên năng lực thực tế
3. **Training & learning** — quiz, journal, portfolio, badges, streak
4. **Chatbot AI mentor** — tương tác bằng tiếng Việt + tiếng Anh, văn phong anime/funny

Đây không phải lớp học. Đây là **studio gia đình** — bố và các con cùng làm thật, học thật, sai thật, sửa thật. AI là cộng tác viên, không phải thầy giáo.

## Scope

### In scope (v3.0)
- Dashboard 22 tabs (đã build trong artifacts/PanyKidsStudio_Dashboard_v3.jsx)
- Bilingual VN ↔ EN
- Anime/funny visual style (Fredoka + Quicksand + Caveat fonts, pastel palette)
- 16 achievement badges + auto-unlock
- 10 career paths với scoring tự động
- 12-question quiz bank (filter theo pillar + age)
- PIN-based kid login (4 chữ số)
- localStorage persistence
- Deploy Vercel với subdomain riêng (NOT panyvn.app — đó là business project)

### In scope (v3.1 — chatbot integration)
- Floating chat widget (bottom-right, persistent)
- AI Claude API integration
- Bilingual (auto-detect VN/EN)
- Safety filter (COPPA-compliant prompting)
- Context-aware (biết kid đang ở tab nào, tiến độ ra sao)

### Out of scope
- Multi-family support (chỉ cho gia đình Pany)
- Mobile native app (responsive web là đủ)
- Real-time multiplayer
- Voice input (v4.0+)
- Tích hợp panyvn.app domain (business project riêng)

## Success Criteria

- 3 bạn truy cập dashboard 24/7 mà không cần bố mở
- Mỗi bạn check-in streak ít nhất 5 ngày/tuần trong tháng đầu
- Mỗi bạn viết journal ít nhất 3 lần/tuần
- Sau 3 tháng: ít nhất 30% objectives Year 1 hoàn thành
- Chatbot trả lời > 50 lượt/tuần qua API

## Resources

- **Design**: artifacts/PanyKidsStudio_Dashboard_v3.jsx (2748 lines, complete)
- **Memory**: MemPalace wing `pany-kids-studio` (5 drawers + diary)
- **Hardware**: 3 máy của các bạn (chưa định cấu hình)
- **API**: Claude Anthropic (key bố sẽ input ở phase chatbot)
- **Hosting**: Vercel free tier (deploy từ Git) + optional VPS Contabo

## Constraints

- **Bootstrap only** — không có budget riêng, dùng tools free hoặc bố trả
- **60h cap/tuần** của bố cho mọi việc → build modular, deploy 1 lần dùng nhiều năm
- **Claude 18+ rule** — bố là người duy nhất chat với Claude Code; chatbot trên dashboard dùng Anthropic API trực tiếp với guardrails
- **VN+EN required** — không phải nice-to-have, là core
