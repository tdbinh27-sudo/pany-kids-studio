# 🌸 Pany Kids Studio

> Một dashboard giáo dục 5 năm cho 3 con nhà Pany — và cho bất kỳ gia đình nào muốn xây hệ thống học tập tại nhà.
>
> A 5-year family learning dashboard built for the Pany kids — and for any family who wants a homemade learning OS.

[![License: MIT](https://img.shields.io/badge/License-MIT-FFD43B.svg)](LICENSE)
[![Built with Next.js 16](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Bilingual](https://img.shields.io/badge/lang-VN_·_EN-FF6B9D)](README.md)
[![AI](https://img.shields.io/badge/AI-Claude_Haiku_4.5-845EC2)](https://anthropic.com)

---

## ✨ Tính năng / Features

| 🇻🇳 Tiếng Việt | 🇬🇧 English |
|---|---|
| 5 năm lộ trình · 20 quý · 60+ mục tiêu | 5-year roadmap · 20 quarters · 60+ goals |
| 6 trụ cột: Tech, English, Finance, Thinking, Business, Life | 6 pillars: Tech, English, Finance, Thinking, Business, Life |
| 16 huy hiệu auto-unlock | 16 auto-unlocking badges |
| 10 hướng nghiệp với match scoring | 10 career paths with match scoring |
| Streak tracker + lịch điểm danh 14 ngày | Streak tracker + 14-day check-in calendar |
| Nhật ký học tập (3 câu hỏi/ngày) | Learning journal (3 daily questions) |
| Portfolio gallery | Portfolio gallery |
| Quiz generator (12 câu, lọc theo trụ cột + tuổi) | Quiz generator (12 questions, filter by pillar + age) |
| Báo cáo PDF/Markdown export | PDF/Markdown report export |
| Chatbot **Đại Ka** (Claude AI) | **Đại Ka** chatbot (Claude AI) |
| Đăng nhập PIN cho từng bé | PIN login per kid |

22 tabs tổng cộng. 100% bilingual. Chạy được offline (localStorage).

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/<your-username>/pany-kids-studio.git
cd pany-kids-studio/apps/web

# Install
pnpm install

# Setup AI (optional — chỉ cần khi muốn dùng chatbot Đại Ka)
cp .env.local.example .env.local
# Edit .env.local → ANTHROPIC_API_KEY=sk-ant-...

# Run
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Architecture

```
pany-kids-studio/
├── apps/web/                  # Next.js 16 + TS + Tailwind
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── api/chat/route.ts  # Đại Ka API endpoint
│   ├── components/
│   │   ├── PanyKidsStudio.tsx # Main dashboard (2748 lines)
│   │   └── ChatBot.tsx        # Floating widget
│   └── lib/
│       ├── storage.ts         # localStorage shim
│       └── claude.ts          # Anthropic SDK + Đại Ka prompt
├── artifacts/                 # Source materials
└── *.md                       # Project OS docs
```

**Stack**: Next.js 16 · React 19 · TypeScript · Tailwind 4 · @anthropic-ai/sdk · lucide-react

**Storage**: 100% client-side `localStorage` — no backend, no DB. Each device = own data. Export/import JSON in Settings.

---

## 🌸 Đại Ka — AI Chatbot

> "Đại Ka" = "anh cả" / "elder brother" — wise mentor character, tone giữa friendly và respectable.

- **Model**: Claude Haiku 4.5 default ($1/M tokens), Sonnet 4.6 fallback for complex requests
- **Cost**: ~$5/month for 3 kids × 50 chats/week
- **Safety**: COPPA-compliant prompt + keyword filter + 30 msg/hour rate limit + self-harm escalation
- **Tone**: Socratic (no homework answers), encouraging, max 80 words, max 2 emoji
- **Bilingual**: Auto-matches user's message language

Set `ANTHROPIC_API_KEY` env var. Without it, Đại Ka shows a friendly "missing key" message — dashboard still works fully.

---

## 🎓 Triết lý / Philosophy

> Pany Kids Studio không phải lớp học. Đây là **studio gia đình** — bố và các con cùng làm thật, học thật, sai thật, sửa thật. AI là cộng tác viên, không phải thầy giáo.

> Pany Kids Studio is not a classroom. It's a **family studio** — parent and kids build real, learn real, fail real, fix real. AI is a collaborator, not a teacher.

6 nguyên tắc / 6 principles:

1. 🤝 **Đồng hành** / Together — bố ngồi cùng, không thả tự AI
2. 🛠️ **Build thật** / Build real — sản phẩm cuối có người dùng
3. 🌏 **Song ngữ** / Bilingual — tiếng Anh là môi trường
4. 💰 **Giá trị thật** / Real value — học qua kinh doanh nhỏ
5. 🧠 **Hỏi trước, tra sau** / Think first — 3 lần thử trước khi dùng AI
6. 📓 **Ghi chép tay** / Write by hand — notebook giấy luôn đi cùng laptop

---

## 📦 Deploy

### Vercel (recommended)

```bash
# In repo root:
npx vercel
# When prompted: root directory = apps/web
# Add env var: ANTHROPIC_API_KEY (Settings → Env Vars)
```

### Self-host

Any Node 20+ host. Run `pnpm build && pnpm start`. Reverse proxy with Nginx/Caddy.

---

## 🗺️ Roadmap

- [x] v3.0 — 22 tabs, bilingual, anime style, Đại Ka chatbot
- [ ] v3.1 — Voice input (Whisper)
- [ ] v3.2 — Daily summary email to parent
- [ ] v3.3 — Cross-device sync (Supabase)
- [ ] v4.0 — Mobile PWA + native iOS/Android

---

## 🤝 Contribute

Đây là dự án giáo dục mở. Nếu anh/chị có gia đình và muốn dùng/cải thiện cho con mình, fork về làm thoải mái. PRs welcome.

This is an open education project. If you have a family and want to fork/improve for your kids, go ahead. PRs welcome.

---

## 📜 License

MIT — see [LICENSE](LICENSE).

Made with 💖 by **bố Bình** for **Phúc · An · Y** · 2026—2031
