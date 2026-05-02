# 🌸 Pany Kids Studio

> Một dashboard giáo dục 5 năm cho 3 con nhà Pany — và cho bất kỳ gia đình nào muốn xây hệ thống học tập tại nhà.
>
> A 5-year family learning dashboard built for the Pany kids — and for any family who wants a homemade learning OS.

[![License: MIT](https://img.shields.io/badge/License-MIT-FFD43B.svg)](LICENSE)
[![Web: Next.js 16](https://img.shields.io/badge/Web-Next.js_16-black)](https://nextjs.org)
[![Mobile: Expo SDK 53](https://img.shields.io/badge/Mobile-Expo_SDK_53-1E1E2E)](https://expo.dev)
[![Bilingual](https://img.shields.io/badge/lang-VN_·_EN-FF6B9D)](README.md)
[![AI](https://img.shields.io/badge/AI-Claude_Sonnet_4.6-845EC2)](https://anthropic.com)

**Production**: [pany-kids-studio.vercel.app](https://pany-kids-studio.vercel.app) · VPS mirror: http://61.14.233.122/

---

## ✨ 12-Pillar Architecture (v3.2, May 2026)

Two parallel tracks of growth — skills and whole-person development.

### 🎓 Skills track (6 pillars)
| Pillar | Focus |
|---|---|
| 💻 Tech & AI | Scratch → Python → AI tools, hardware/software literacy |
| 🌍 English | Storytelling, listening, reading, writing |
| 💰 Finance | Compound interest, budgeting, real businesses |
| 🧠 Critical Thinking | Scientific method, debate, research |
| 📈 Business | First sale, P&L, pitching, customer development |
| 🌳 Life | Real-world experiences, volunteering, mentoring |

### 🌱 Development track (6 pillars)
| Pillar | Focus |
|---|---|
| 📊 Theo dõi & Đào tạo | Existing 6-skills tracking, daily quests, badges, streaks |
| 🎨 Studio Sáng tạo | HTML5 canvas drawing + 21 daily creative prompts + per-kid gallery |
| 🤸 Cơ thể & Vận động | 12 exercise challenges + circular timer + 1-min mindful breathing |
| 🔮 Tự khám phá | Mood journal (5 emoji weather) + RIASEC Junior quiz (36/48 questions) |
| 🧭 La bàn nghề | 60 careers (10 per RIASEC type) with VN context + day-in-the-life projects |
| 👨‍👩‍👧 Cầu nối Gia đình | Shared notebook + weekly review + ask-parent + Show & Tell prompts |

**Total**: 17 web tabs · 4 mobile screens · all bilingual VN/EN · 100% client-side localStorage.

---

## 🌸 Đại Ka — AI Mentor

> "Đại Ka" = "anh cả" / "elder brother" — bố Bình's AI representative for the kids.

- **Model**: Claude Sonnet 4.6 default · capped at $15/month
- **Knowledge**: child psychology (Piaget/Erikson/Dweck), parenting frameworks, RIASEC junior, GDPT 2018 subjects, VN cultural context
- **Safety**: COPPA-compliant system prompt + keyword filter + 100 msg/hour rate limit + self-harm escalation hotlines (111, vapcl.org.vn)
- **Tone**: Socratic (no homework answers), encouraging, max 80 words
- **Bilingual**: auto-matches user's message language
- **Single endpoint**: web + mobile + future Telegram bot all hit `/api/chat`

---

## 🚀 Quick Start

### Web app
```bash
git clone https://github.com/tdbinh27-sudo/pany-kids-studio.git
cd pany-kids-studio/apps/web
pnpm install
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local
pnpm dev
# → http://localhost:3000
```

### Mobile app (Expo SDK 53)
```bash
cd pany-kids-studio/apps/mobile
pnpm install
pnpm start
# Scan QR with Expo Go app on phone
```

> Mobile is in v0.1 with 4 starter screens (Home / Discovery / Chat / Settings). Full screen parity with web targeted for Sprint 3 (July 2026), App Store + Google Play submission August 2026.

---

## 🏗️ Architecture

```
pany-kids-studio/
├── apps/
│   ├── web/                       # Next.js 16 + TS + Tailwind 4
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   └── api/
│   │   │       ├── chat/          # Đại Ka chat endpoint (Sonnet 4.6)
│   │   │       └── refresh-content/  # Monthly Vercel cron
│   │   ├── components/
│   │   │   └── PanyKidsStudio.tsx # Main dashboard (~4200 lines, 17 tabs)
│   │   └── lib/
│   │       ├── claude.ts          # Đại Ka system prompt + safety
│   │       ├── storage.ts         # localStorage shim
│   │       ├── riasec-junior.ts   # 84 RIASEC questions + scoring
│   │       ├── careers-v2.ts      # 60 careers with VN context
│   │       └── family-prompts.ts  # 30 ask-parent + 6 weekly review
│   └── mobile/                    # Expo SDK 53 + RN 0.79 + RN Nav v7
│       ├── App.tsx                # 4-tab BottomTabNavigator
│       ├── lib/                   # design / storage / api / i18n / kids
│       ├── components/            # Card / Btn / Pill / KidSelector
│       └── screens/               # Home / Discovery / Chat / Settings
├── scripts/
│   └── deploy-vps.py              # paramiko SSH automated VPS deploy
├── artifacts/                     # Onboarding scripts, feedback templates
└── *.md                           # Project OS (decisions, plan, status, etc.)
```

**Web stack**: Next.js 16 · React 19 · TypeScript · Tailwind 4 · @anthropic-ai/sdk · lucide-react · Leaflet (CDN)

**Mobile stack**: Expo SDK 53 · React Native 0.79 · React 19 · TypeScript strict · React Navigation v7 · AsyncStorage

**Storage**: 100% client-side. Web `localStorage` and mobile `AsyncStorage` share **identical `pks3-*` keys** → JSON exports cross-platform.

**API parity**: Mobile calls the same `/api/chat` endpoint as web — single source of truth for Đại Ka system prompt and safety rules.

---

## 🎓 Triết lý / Philosophy

> Pany Kids Studio không phải lớp học. Đây là **studio gia đình** — bố và các con cùng làm thật, học thật, sai thật, sửa thật. AI là cộng tác viên, không phải thầy giáo.

> Pany Kids Studio is not a classroom. It's a **family studio** — parent and kids build real, learn real, fail real, fix real. AI is a collaborator, not a teacher.

### 6 nguyên tắc / 6 principles

1. 🤝 **Đồng hành** / Together — parent sits with kid, no AI babysitting
2. 🛠️ **Build thật** / Build real — final products have actual users
3. 🌏 **Song ngữ** / Bilingual — English is the environment, not a subject
4. 💰 **Giá trị thật** / Real value — learn through small businesses
5. 🧠 **Hỏi trước, tra sau** / Think first — 3 attempts before AI
6. 📓 **Ghi chép tay** / Write by hand — paper notebook stays beside the laptop

---

## 📦 Deploy

### Vercel (auto)
```bash
cd apps/web
vercel deploy --prod
# Set ANTHROPIC_API_KEY + CRON_SECRET env vars in Vercel dashboard
```

### VPS (24/7 mirror)
```bash
# Run from repo root:
PYTHONIOENCODING=utf-8 python scripts/deploy-vps.py --anthropic-key=$ANTHROPIC_API_KEY
# Pulls main, npm install + build, PM2 cluster restart
```

### Mobile builds (after EAS init)
```bash
cd apps/mobile
eas build --platform ios       # Apple Developer $99/year
eas build --platform android   # Google Play Console $25 once
eas submit --platform ios
eas submit --platform android
```

---

## 🗺️ Roadmap

| Phase | Status | Date |
|---|---|---|
| v1 — Web v1, Project OS, 22 tabs | ✅ Done | Apr 2026 |
| v3 — Đại Ka chatbot + safety + bilingual | ✅ Done | Apr 2026 |
| v3.1 — Curated content (81 resources) + VN map + monthly cron | ✅ Done | Apr 2026 |
| **v3.2** — 12-pillar architecture + Sonnet 4.6 + mobile scaffold | ✅ **Done May 2026** |
| v4 — Mobile feature parity + EAS builds | ⏳ Sprint 3 (Jul 2026) |
| v5 — App Store + Google Play submission | ⏳ Sprint 4 (Aug 2026) |
| Public launch | ⏳ 8/16/2026 |
| Cross-device sync (Supabase) | 📅 Future |
| Voice input (Whisper API) | 📅 Future |

---

## 🤝 Contribute

Đây là dự án giáo dục mở. Nếu anh/chị có gia đình và muốn dùng/cải thiện cho con mình, fork về làm thoải mái. PRs welcome.

This is an open education project. If you have a family and want to fork/improve for your kids, go ahead. PRs welcome.

---

## 📜 License

MIT — see [LICENSE](LICENSE).

Made with 💖 by **bố Bình** for **Phúc · An · Y** · 2026—2031
