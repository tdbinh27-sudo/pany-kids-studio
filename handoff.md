# Handoff — Pany Kids Studio

**Last session:** Session 9 — 2026-05-02
**Current chapter:** v3.2-A LIVE (strategy v2 pivot complete)
**Next session:** Sprint 1 Day 2 — Build 6 new pillars

---

## 🎯 RESUME COMMAND for next session

Type to Claude Code:
```
Continue pany-kids-studio Sprint 1 Day 2 — build 6 new pillars (Sáng tạo / Vận động / Tự khám phá first)
```

Claude Code will:
1. Read `strategy-v2.md` (canonical source-of-truth, ~10K)
2. Read `decisions.md` (12 decisions including D-011 Hybrid + D-012 Đại Ka boost)
3. Read this `handoff.md` (current snapshot)
4. Read `tasks.md` for active queue
5. Begin Sprint 1 Day 2 implementation

---

## 📦 What was accomplished Session 9 (2026-05-02)

### Strategy v2 pivot
Anh approved 5 quyết định Q1-Q5 sau khi review 2 tài liệu:
- `Downloads/files/PanyKidsStudio_DanhGia_ChienLuoc_VN.pdf` (17 trang)
- `Downloads/files/PanyKids_EducationBot_Strategy.md` (636 lines)

**Q1 — Hybrid web + mobile**
**Q2 — Đại Ka GIỮ** (NOT renamed Cô Pany), bố Bình representative, boost API budget $5→$15
**Q3 — Web + App song song**, App Store + CH Play target 8/2026
**Q4 — Map cũ→mới**: 6 old pillars + 6 new pillars = 12 total
**Q5 — Timeline**: 1 week internal → 2 months iterate → 1 month submit → 8/2026 launch
**Q6 — Trademark/domain** mua sau 1 tuần test

### v3.2-A shipped (commit `dcf9b25`)
- ✅ `strategy-v2.md` saved (full pivot doc, 10K chars)
- ✅ `decisions.md` +D-011 (hybrid), +D-012 (Đại Ka boost)
- ✅ `status.md` pivot summary
- ✅ Đại Ka boost in `lib/claude.ts`:
  - Default Haiku 4.5 → **Sonnet 4.6** (3× more intelligent)
  - max_tokens 400 → **800**
  - History 10 → **20 turns**
  - Rate limit 30 → **100/hour/kid**
- ✅ Knowledge expansion (~170 lines):
  - Child psychology — 8 common issues handling pattern
  - RIASEC Junior 8-10/11-12/13-15 with table mapping
  - Escalation hotlines (111 + Bệnh viện Nhi Đồng + vapcl.org.vn)
  - GDPT 2018 subjects coverage
  - VN cultural context guidelines
  - 7 hard stop rules
- ✅ Dual deploy: Vercel + VPS LIVE
- ✅ Verified live: 2 test queries (psychology + RIASEC) — Sonnet 4.6 active

---

## 🚧 Sprint 1 — 7 days plan (5/1 - 5/8/2026)

### ✅ Day 1 done (5/1, Session 9)
Strategy + Đại Ka boost + Project OS docs

### 🎯 Day 2-3 (Session 10) — 6 new pillars data
Build data structures + UI for 6 new pillars from strategy-v2.md:

1. **Studio Sáng tạo** (canvas vẽ, video upload, prompt sáng tạo daily)
2. **Cơ thể & Vận động** (timer thử thách, exercise log, mindfulness 1-min)
3. **Tự khám phá** (mood journal expanded, RIASEC Junior 36-question quiz)

**Files to create/modify:**
- `apps/web/lib/pillars-v2.ts` — new pillars data structure
- `apps/web/components/pillars/StudioCreative.tsx` (canvas + prompt)
- `apps/web/components/pillars/BodyMovement.tsx` (timer + log)
- `apps/web/components/pillars/SelfDiscovery.tsx` (RIASEC Junior + mood)
- `apps/web/lib/riasec-junior.ts` — 36 questions adapted for 8-12 + 48 for 13-15
- Update `PanyKidsStudio.tsx` sidebar: 12 pillars grouped 2 categories

### Day 4-5 (Session 11)
- **La bàn Nghề nghiệp** (60 career cards with VN context)
- **Cầu nối Gia đình** (sổ tay chung, weekly review template)
- Map cũ→mới migration logic

**Files:**
- `apps/web/lib/careers-v2.ts` — 60 career cards
- `apps/web/components/pillars/CareerCompass.tsx`
- `apps/web/components/pillars/FamilyBridge.tsx`

### Day 6-7 (Session 12) — Internal Sprint 1 wrap
- React Native + Expo project scaffold (parallel branch)
- Initial mobile app rendering shared components
- Internal usage feedback từ 3 con tuần đầu
- Bug fixes + UX iterate

---

## ⚠️ Critical context for next session

### Identity
- **Đại Ka** stays (NOT Cô Pany) — bố Bình's AI representative
- Calls kids "con" (NOT "anh/chị")
- Now uses **Sonnet 4.6** by default
- 3 kids: Hạnh Phúc 8 (Phúc, 🌟), Bình An 10 (An, 🚀), Như Ý 12 (Y, 🎨)

### URLs
- **Web Vercel**: https://pany-kids-studio.vercel.app (HTTP 200)
- **VPS 24/7**: http://61.14.233.122/ (HTTP 200, 0.07s)
- **GitHub public**: https://github.com/tdbinh27-sudo/pany-kids-studio
- **Domain panykids.app**: NOT bought yet (anh defer to after 1-week internal test)

### Architecture (current v3.2-A)
- Frontend: Next.js 16 + React 19 + Tailwind + TypeScript
- Backend API: Next.js API routes on both Vercel + VPS
- Storage: localStorage (kids data), no DB
- Bot stack: `lib/claude.ts` + `app/api/chat/route.ts` + `components/ChatBot.tsx`
- Deploy: Vercel auto-deploy on push, VPS manual via `scripts/deploy-vps.py`

### Decisions chốt
- D-011: Hybrid web (current backbone) + mobile (RN+Expo, target 8/2026)
- D-012: Đại Ka boost Sonnet 4.6 + $15/mo cap
- D-010: Repo public MIT
- D-009: API key one-time setup (anh chưa rotate, risk kéo dài)

### Known issues / Risks
- 🔴 **API key STILL exposed** in session log (anh chưa rotate after 9 sessions)
- 🟡 Sonnet 4.6 cost 3× Haiku — monitor billing weekly
- 🟡 Compliance: Đại Ka chats with kids directly. Anh accepts strict-COPPA risk for family use case.
- 🟢 Stack stable, dual deploy working

### Cost tracking
- Vercel: free tier (sufficient for 3 kids + 5-15 family beta)
- VPS: 6GB RAM, 40GB SSD, active đến 2026-07-25 (paid)
- Anthropic: $15/month cap (Sonnet 4.6 default)

---

## 📋 Reference files

### Source code
- `apps/web/components/PanyKidsStudio.tsx` — main dashboard (~3500 lines)
- `apps/web/components/ChatBot.tsx` — Đại Ka floating widget (draggable)
- `apps/web/components/VietnamMap.tsx` — Leaflet GPS map
- `apps/web/components/AISearch.tsx` — Perplexity/ChatGPT/Claude/Gemini portal
- `apps/web/lib/claude.ts` — Đại Ka system prompt + model picker (HAIKU/SONNET/OPUS)
- `apps/web/lib/curated.ts` — 81 curated resources
- `apps/web/lib/quiz.ts` — 70 quiz questions
- `apps/web/app/api/chat/route.ts` — Đại Ka API endpoint (rate limit 100/hr)
- `apps/web/app/api/refresh-content/route.ts` — Vercel Cron monthly content gen
- `apps/web/vercel.json` — Cron schedule

### Project OS
- `strategy-v2.md` — ⭐ source-of-truth for v3.2+
- `decisions.md` — 12 decisions logged
- `status.md` — pivot summary + Sprint 1 progress
- `plan.md` — original architecture
- `tasks.md` — task queue
- `knowledge.md` — schema + design tokens
- `README.md` — public-facing repo intro

### Scripts
- `scripts/deploy-vps.py` — paramiko SSH automated VPS deploy
- `scripts/fix-vps-env.py` — env corruption fixer (used once 5/1)

---

## 🎬 Quick-start checklist for Session 10

When anh resumes:

1. ☐ Read this handoff.md first
2. ☐ Check `strategy-v2.md` Section "6 Pillars Mới" for spec
3. ☐ Verify Vercel + VPS are still HTTP 200 (curl test)
4. ☐ Check Anthropic billing (anh review weekly)
5. ☐ Begin Day 2-3 work: build StudioCreative + BodyMovement + SelfDiscovery components

Bootstrap command:
```
Continue pany-kids-studio Sprint 1 Day 2
```
