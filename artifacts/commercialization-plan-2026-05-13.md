# Pany Kids Studio — Commercialization & Feature Expansion Plan

**Created:** 2026-05-13 (Session 16)
**Status:** ✅ APPROVED + P0+P2+P3 SCAFFOLDS SHIPPED 2026-05-13 — see decisions D-020 → D-031 in `decisions.md`
**Reference pattern:** Pany Gia Phả (live `giapha.panyvn.app` 2026-05-12)
**Owner:** Trần Đức Bình

## 🚦 PHASE PROGRESS DASHBOARD (Session 16 closeout 2026-05-13 ~17:30)

| Phase | Status | Detail | Commit(s) |
|---|---|---|---|
| **P0 — Sidebar reorder** | ✅ DONE | Khám phá → position #3 (D-023), TS clean | `14bb3eb` |
| **P2 foundation libs** | ✅ DONE | age-curriculum / curated-links / claude-patch / templates / migration SQL draft | `85fd95a` |
| **P3 skeleton libs** | ✅ DONE | family-provision / family-email / family-notifications / phone-verify | `a6a03ee`, `db7fc15` |
| **P3 commercial routes** | ✅ DONE | /sell, /sell/register, /dangky, /api/sell/register, /api/sell/verify-otp, /admin/signup-requests, /api/admin/signup-requests, /api/admin/families, /welcome, /og-image.svg | `db7fc15`, `83bc69c`, (this) |
| **P3 admin analytics** | ✅ DONE | lib/family-stats.ts (4 stat helpers + dashboard payload + cost guard) | (this) |
| **P3 share kit + CTV docs** | ✅ DONE | share-kit-kids.md, ctv-agreement-template.md, vercel-env-setup-2026-05-13.md | `db7fc15`, `83bc69c` |
| **Browser test (F)** | ✅ DONE | 5/5 routes PASS localhost dev | n/a |
| **P1 schema apply** | ⏸️ BLOCKED ON ANH | SQL drafted, anh chưa apply Supabase | — |
| **P1 wire-up (env vars)** | ⏸️ BLOCKED ON ANH | Vercel env vars chưa set theo guide | — |
| **P3 SMS provider live** | ⏸️ DEFERRED | eSMS/Stringee chưa wire — đợi anh approve budget | — |
| **P4 beta launch** | ⏸️ Pending | Sau P1 wire-up + Vercel webhook fix | — |
| **P5 3-month review** | ⏸️ Pending | 2026-08-13 review trigger | — |

**Session 16 totals: 6 commits, ~6K LOC, 12 decisions (D-020 → D-031), 0 TypeScript errors, browser-tested 5/5.**

## Approval state (2026-05-13 anh chốt)

| Q | Decision | Linked |
|---|---|---|
| Q1 | Domain = `kids.panyvn.app` | D-021 |
| Q2 | **FREE 3 months, NO pricing tiers shown** — review 2026-08-13 | D-022 |
| Q3 | P0 sidebar reorder SHIPPED today | D-023 |
| Q4 | Content seed = CTV draft + bố review | D-024 |
| Q5 | Backfill Sprint 2 feedback Day 1-4 BEFORE P1 | D-025 |
| Q6 | Beta = family + friends + school class groups + FB; B2B separate enterprise | D-026 |
| Q7 | SePay only (when pricing introduced) | D-027 |
| Q8 | Đại Ka name KEEP, add per-family rename override in Settings | D-030 |
| +Cross-product | Pany Kids = separate Supabase + phone OTP scaffold for email collision | D-031 |
| +T6 | Age personalization 5-16 by SINGLE YEAR (12 tracks) using VN school + reference + advanced sources | D-028 |
| +T7 | Khám phá curated links = anh-curated personally | D-029 |

---

## 0. TL;DR

Pany Kids Studio v3.3-C đang live nhưng **chỉ phục vụ 1 gia đình** (gia đình anh, 3 con hard-coded). Đề xuất chuyển sang **multi-tenant SaaS** theo đúng pattern Pany Gia Phả vừa ship hôm qua (4 tier pricing + auto-provision + share kit + Telegram lead alert) + 4 thay đổi tính năng để mở rộng thị trường:

1. **Mở rộng độ tuổi** 6-12 → **5-16**
2. **Linh hoạt số năm chỉ tiêu** 5 năm cố định → **3/5/7/10 năm tùy phụ huynh**
3. **Tăng học viên/gia đình** 3 hard-coded → **tối đa 5**
4. **Sắp xếp lại sidebar**: "Khám Phá" lên vị trí #3 (dưới Học Viên, trên Công Cụ)

**Tổng effort ước tính:** 28-38h, chia 4 phase, 2-3 tuần.
**Cost run-rate:** 0 ₫/tháng tới ~50 family (Vercel free + Supabase free), $25/tháng từ ~100 family.

---

## 1. Phương án thương mại hóa — Adapt từ Gia Phả

### 1.1 Gia Phả đã làm gì (reference, đã ship)

| Component | File trong gia phả app | Mục đích |
|---|---|---|
| `/sell` (hidden) | `frontend/src/app/(landing)/sell/page.tsx` | Sales landing 4 tier, noindex |
| `/sell/register` (form) | `frontend/src/app/(landing)/sell/register/page.tsx` | Form đăng ký lead |
| `/dangky` (short URL) | redirect → `/sell/register` | Share SMS/Zalo |
| `/api/sell/register` | API route | Save lead → Telegram → auto-provision |
| `clan-provision.ts` | `frontend/src/lib/` | Multi-tenant UPSERT + EMAIL_EXISTS pre-check |
| `/admin/signup-requests` | Admin UI | Fallback approve manual |
| `og-image.svg` | `frontend/public/` | FB/Zalo preview |
| Brevo Transactional | `lib/email.ts` | Email confirm + magic link |
| Telegram `@pany_super_os_bot` | `lib/notifications.ts` | Alert anh khi có lead |
| `share-kit.md` | `artifacts/` | 4 captions + email template |
| Supabase RLS multi-tenant | 20 tables × `clan_id` | Per-family data isolation |

### 1.2 Mapping sang Kids Studio

| Gia Phả | Kids Studio (đổi từ vựng) |
|---|---|
| `clan` (dòng họ) | `family` (gia đình) |
| `clan_signup_requests` | `family_signup_requests` |
| `clan_settings` | `family_settings` (target_years, age_min, age_max, max_kids) |
| `clan_id` (UUID) | `family_id` (UUID) |
| Slug `ho-le`, `ho-tran` | Slug `tran-binh`, `nguyen-mai` (theo tên ba/mẹ chính) |
| Owner = trưởng họ | Owner = phụ huynh chính |
| `/ancestral-hall` demo | `/family-overview` demo (1 gia đình mẫu PANY) |
| 12 lễ giỗ âm lịch | Stays as-is on Kids — không liên quan, BỎ |
| Han-Nôm Unicode | Stays VN + EN bilingual, BỎ Han |

### 1.3 Domain & subdomain

- Đề xuất: **`kids.panyvn.app`** (giữ trong panyvn ecosystem, không cần mua domain mới)
- Alt: mua `panykids.io` ($15/năm — đã trong Sprint 2 tasks.md, defer 1 tuần test)
- Short URL: `kids.panyvn.app/dangky`

### 1.4 Pricing — FREE 3 months (no tiers shown) ✅ revised per anh

**Decision D-022**: Bỏ hoàn toàn 4 tier ban đầu. Landing page chỉ có 1 CTA: "Đăng ký miễn phí". Toàn bộ tính năng mở khóa trong **3 tháng miễn phí** (review trigger **2026-08-13**).

**Caps trong free period** (để chống cost runaway, KHÔNG hiển thị trên landing):

- Mỗi gia đình tối đa 5 học viên (D-026, default 3 con khi tạo)
- Đại Ka chat: 100 lượt/tháng/gia đình (Sonnet 4.6) → tự fallback Haiku 4.5 khi đụng cap
- localStorage + Supabase per-family DB
- Số năm chỉ tiêu: 3/5/7/10 tùy chọn (D-022 cho phép full features trial)

**Cost guardrail aggregate**:

- Anh có budget cap toàn bộ free trial = **$50/tháng** (Anthropic) → ~5,000 chat turns/month total
- Khi đụng $50: auto-switch toàn bộ Haiku 4.5 (1/5 cost) → vẫn an toàn cho ~100 gia đình
- Telegram alert anh khi spend >$30/tháng

**Review 2026-08-13** (3 tháng từ launch):

- Nếu < 20 active family → keep free, iterate features
- Nếu 20-50 active family → introduce paid tier (sẽ design pricing dựa trên usage data)
- Nếu > 50 active family + cost > $100/mo → freemium gate (chat cap → upgrade prompt)

**Why this revision (D-022 trade-off)**:

- ✅ Maximize organic adoption signal — không có pricing wall đẩy người dùng đi
- ✅ Real-usage data quyết định pricing, không phải guess pre-launch
- ✅ Hợp Pany Consulting 2026 framework — bootstrap, no FT 2026
- ⚠️ Risk: cost spike nếu viral. Mitigation: 3-layer guardrail ở trên
- ⚠️ Risk: hard to introduce paid tier sau khi free 3 tháng. Mitigation: communicate clearly upfront "Free trial 3 tháng — sau đó review"

### 1.5 Lead funnel (re-use Gia Phả's exactly)

```
Anh share giapha.panyvn.app/dangky pattern → kids.panyvn.app/dangky
↓
Phụ huynh điền form (tên, email, SĐT, số con, độ tuổi con, gói)
↓
/api/sell/register:
  1. Insert vào family_signup_requests
  2. Brevo confirm email
  3. Telegram alert @pany_super_os_bot → chat 6418327150 (anh)
  4. Try auto-provision:
     - EMAIL_EXISTS check
     - Create family + family_settings (default 3 kids, 5 years, age 5-16)
     - Magic link login → kids.panyvn.app/dashboard
↓
30 giây phụ huynh nhận email + log vào được
```

---

## 2. 4 Feature Expansions — Spec chi tiết

### 2.1 Mở rộng độ tuổi 5 → 16 + Personalization 12 single-year tracks ✅ revised per anh (D-028)

**Trục 6 mới — KHÔNG dùng 3-bucket K/P/T nữa**. Thay bằng 12 single-year tracks (age 5, 6, 7, ..., 16) khớp curriculum VN.

**Hiện trạng:**
- `PILLARS` declare `age_focus: '6-12'`
- `getLevelForAge()`: 4 buckets (K/A1/A2/B1)
- `AgeGroup` type: `K | P | T | all` — quá thô

**Thay đổi (revised scope, ~29h total):**

| File | Change | Effort |
|---|---|---|
| `lib/age-curriculum.ts` **NEW** | Map age → VN grade → curriculum modules. Schema: `{ age: 5..16, grade: 'lớp lá'..'lớp 10', subjects: [{ name, textbook_source, reference_books[], advanced_links[] }] }` | 4h schema + 6h seed |
| `lib/english-skills.ts` | +CEFR `B2` (15-16t); `getLevelForAge(age)`: `5→K, 6-8→A1, 9-11→A2, 12-14→B1, 15-16→B2` + age-specific vocab buckets | 2h + 60 từ B2 |
| `lib/quests.ts` | Tag quests với `primaryAge: 5\|6\|...\|16` + `ageRange: [min, max]` fallback. Backward-compat với `ageGroup` field | 1h schema + 6h seed quests per grade |
| `lib/math-quiz.ts` | +L5 (lớp 7-9 hình học/đại số), +L6 (lớp 10 nâng cao); ~200 questions tagged per VN grade | 4h |
| `lib/careers-v2.ts` | +15 teen careers + age-band tags (5-8: nghề trực quan, 9-12: nghề có dự án thực, 13-16: nghề định hướng đại học) | 2h |
| `lib/career-qna.ts` | +6 topics teen (định hướng đại học/du học, ngoại ngữ thứ 2, screen-time tuổi teen, sex ed cơ bản, tài chính cá nhân teen, AI literacy) | 3h |
| `PILLARS.age_focus` | `'6-12'` → `'5-16'` | 5 phút |
| Add Kid form | Min/max age 5-16 validation + grade picker | 1h |
| Content templates `artifacts/content-templates/` | CTV draft templates per pillar × per age (D-024 enforces CTV scope) | 1h |

**Nguồn dữ liệu CTV (D-028)**:

- **Layer 1 — Sách giáo khoa VN** (free public): Cánh Diều / Kết Nối Tri Thức / Chân Trời Sáng Tạo — TOC scrape thành mapping
- **Layer 2 — Sách tham khảo**: Vinschool / VAS / Olympic / Toán Hoàng Lê / Anh ngữ ICP — list curated
- **Layer 3 — Nguồn nâng cao**: Khan Academy, Brilliant, Coursera Kids, AoPS (math olympiad), HOCMAI, NEU-Quora khoa học

**Total Trục 6: ~29h** (content-heavy 70%, CTV handles 80% of content writing, bố reviews)

**Migration safe**: Cũ K/P/T tagged content giữ nguyên, new content thêm primaryAge + range fallback. Đại Ka system prompt cập nhật: `kid.age` truyền nguyên số → prompt switch curriculum context.

### 2.2 Số năm chỉ tiêu linh hoạt (3/5/7/10)

**Hiện trạng:**
- `YEAR_PLANS` array hard-coded 5 năm (Y1-Y5) trong `PanyKidsStudio.tsx`
- Mỗi năm có 4 quarters, mỗi quarter có objectives + skills + pillar

**Thay đổi cần:**

| Action | Spec | Effort |
|---|---|---|
| Tách `YEAR_PLANS` thành `lib/year-plans.ts` với hàm `generateRoadmap(years: 3\|5\|7\|10, ageStart, ageEnd, pillars)` | Generator deterministic theo seed (kid_id) | 4h |
| Setting picker UI (Settings tab) | Slider 3-10 năm + preview | 2h |
| Persist `targetYears` trong `pks3-familySettings` localStorage + sync API | New schema field | 1h |
| Roadmap tab refresh khi đổi | Re-render YEAR_PLANS via generator | 1h |
| Default tier-based: Free=1y, Basic=5y, Pro=3-10y, Premium=10y+custom | Tier guard | 1h |

**Total: ~9h**

**Risk:** YEAR_PLANS hiện đang manual-crafted (mỗi quarter có objectives Việt-Anh đầy đủ). Generator sẽ phải dùng template + biến thể theo age range. Đề nghị approach:
- Y1 = "Khởi động/Foundations" (luôn có)
- Yn (cuối) = "Tổng kết & định hướng" (luôn có)
- Y giữa = generated theo template { Q1: pillar A intro, Q2: pillar B project, Q3: pillar C real-world, Q4: review + showcase }

### 2.3 Max 5 học viên/gia đình

**Hiện trạng:**
- `DEFAULT_KIDS` array có 3 phần tử
- `showAddKid` state cho phép add — KHÔNG có cap
- Sidebar group "Học viên" hiển thị toàn bộ kids array

**Thay đổi cần:**

| Action | Spec | Effort |
|---|---|---|
| Hard cap `MAX_KIDS_FREE=1, MAX_KIDS_BASIC=3, MAX_KIDS_PRO=5, MAX_KIDS_PREMIUM=5` | Lấy từ family.tier | 30 phút |
| Add Kid button: disable + tooltip khi đủ cap | "Anh đã đạt giới hạn 3 con của gói Basic. Nâng cấp Pro để thêm 2 con nữa →" | 1h |
| Test: thêm 5 con, UI sidebar không vỡ (currently 3 con fit gọn) | Manual | 30 phút |
| Migration script `family_settings.max_kids` default theo tier | SQL | 30 phút |

**Total: ~2.5h**

### 2.4 Khám phá tab — Anh-curated knowledge links ✅ Trục 7 new (D-029)

**Decision D-029**: Tab Khám phá (Library + AI Search + Quiz) sẽ có **section "Liên kết tinh tuyển"** ở đầu LibraryTab — anh personally curates premium links.

**Schema (`lib/curated-links.ts` NEW):**

```ts
type CuratedLink = {
  id: string;
  title_vi: string;
  title_en: string;
  url: string;
  description_vi: string;
  description_en: string;
  ageRange: [number, number];  // e.g., [10, 16]
  pillar?: 'tech' | 'english' | 'finance' | 'thinking' | 'business' | 'life' | 'creative' | 'movement' | 'discovery' | 'career' | 'family';
  source_authority: string;   // "Khan Academy" / "Bộ GD VN" / "Vinschool" / etc.
  type: 'video' | 'article' | 'course' | 'tool' | 'book' | 'app';
  language: 'vi' | 'en' | 'bilingual';
  cost: 'free' | 'freemium' | 'paid';
  addedBy: string;   // anh's name or other admin
  addedDate: string; // YYYY-MM-DD
  tags: string[];
  priority?: number; // 1=top, 10=normal
};
```

**Effort: ~3h** (scaffold + admin form):

| Action | Spec | Effort |
|---|---|---|
| `lib/curated-links.ts` skeleton | Type def + seed empty array + helper `getLinksForKid(age, pillar?)` | 1h |
| LibraryTab "Liên kết tinh tuyển" section | Render filtered list (by current kid age + optional pillar filter) above existing content | 1h |
| Settings → Curated Links admin form | Parent-mode-only — add/edit/delete + reorder by priority | 1h |

**Anh sẽ tự bổ sung entries** — em chỉ build UI scaffold, schema, và admin form. Anh paste/type vào.

**Phase placement**: Ship along with P2 features (2026-05-17 → 2026-05-24 window).

### 2.5 Q8 — Đại Ka chatbot rename ✅ KEEP (D-030)

**Verdict**: KHÔNG global rename. Tôn trọng D-011 (2026-05-01) + grep cho thấy 197 references / 28 files / 40 system prompt refs.

**Thay vào**: thêm **per-family rename option** trong Settings.

**Effort: ~2h** total.

| Action | Spec | Effort |
|---|---|---|
| `family_settings.chatbot_name` field | Default `'Đại Ka'`, max 20 chars | 30 phút schema + migration |
| Settings UI picker | 4 presets (Đại Ka / Cô Pany / Anh AI / Bạn AI) + custom text input | 1h |
| System prompt injection | `claude.ts`: replace hard-coded "Đại Ka" với `${botName}` từ family_settings | 30 phút |

**Mặc định cho gia đình mới**: Onboarding wizard Step 3 hỏi "Đặt tên cho trợ lý AI của các con" — preset gợi ý "Đại Ka". Anh muốn brand PANY thì set marketing copy default "Cô Pany" cho landing page nhưng vẫn cho user override.

**Migration zero-risk cho 3 con của anh**: existing kids giữ nguyên 'Đại Ka' (default value), không cần migration data.

### 2.6 Sidebar reorder — Khám Phá lên #3 ✅ SHIPPED 2026-05-13 (D-023)

**Hiện trạng (line 1212 PanyKidsStudio.tsx):**

```
1. Tổng quan       (Overview/Roadmap/Calendar/SkillTree/Career)
2. Học viên        (Kids/Badges/Journal/Portfolio/Leaderboard)
3. Công cụ học     (Hardware/Software/English/EnglishSkills/Finance/Thinking)
4. Phát triển      (StudioCreative/BodyMovement/SelfDiscovery/CareerCompass/FamilyBridge)
5. Hoạt động       (Rewards/Experiences/Publish)
6. Khám phá        (Library/AISearch/Quiz)   ← hiện ở vị trí 6
7. Hệ thống        (Report/Settings)
```

**Thay đổi (anh yêu cầu):**

```
1. Tổng quan
2. Học viên
3. Khám phá        ← MOVED UP from #6
4. Công cụ học
5. Phát triển
6. Hoạt động
7. Hệ thống
```

**Effort:** **2 phút** — di chuyển 1 object trong `tabGroups` array.

```diff
  const tabGroups = [
    { vi: 'Tổng quan', ... },
    { vi: 'Học viên', ... },
+   { vi: 'Khám phá', en: 'Explore', items: [
+     { id: 'library',  label: t('library'),  em: '📚' },
+     { id: 'aisearch', label: t('aiSearch'), em: '🔍' },
+     { id: 'quiz',     label: t('quiz'),     em: '🧩' },
+   ]},
    { vi: 'Công cụ học', ... },
    { vi: 'Phát triển', ... },
    { vi: 'Hoạt động', ... },
-   { vi: 'Khám phá', en: 'Explore', items: [...] },   // old position
    { vi: 'Hệ thống', ... },
  ];
```

**Also update:** `MobileTabBar` ordering (nếu mirror sidebar groups) — check `apps/mobile/` for consistency.

---

## 3. Phasing & Schedule ✅ revised với Trục 6 + 7

| Phase | Scope | Effort | Earliest start | Earliest done |
|---|---|---|---|---|
| **P0 — Sidebar reorder** | Section 2.6 only ✅ DONE | 0.5h | 2026-05-13 | **DONE 2026-05-13 14:30** |
| **P1 — Schema + multi-tenant** | Supabase migration, `families` table, RLS 15 tables × `family_id`, auth trigger, `family_settings` (chatbot_name, target_years, max_kids, age_min, age_max) | 8-10h | 2026-05-14 | 2026-05-16 |
| **P2 — Feature expansions core** | 2.1 (age 5-16 + 12 tracks personalization Trục 6) + 2.2 (year span 3/5/7/10) + 2.3 (max 5 kids) | **~42h** (content-heavy Trục 6) | 2026-05-17 | 2026-05-30 |
| **P2.5 — Khám phá curated links + chatbot rename** | 2.4 (curated-links scaffold + admin form) + 2.5 (chatbot_name picker in Settings) | 5h | 2026-05-25 | 2026-05-30 |
| **P3 — Commercial pipeline** | `/sell` landing (NO pricing, big "Đăng ký miễn phí 3 tháng" CTA) + `/dangky` + `/api/sell/register` + auto-provision + Brevo + Telegram + share-kit.md + cost guardrail $50/mo | 8-10h | 2026-05-31 | 2026-06-03 |
| **P4 — Beta launch + CTV content batches** | Anh em họ + bạn bè + 2-3 parent group lớp + FB; CTV draft content lớp 1-12 theo template, bố review weekly | open-ended | 2026-06-04 | 2026-08-13 (review trigger) |
| **P5 — 3-month review** | Usage data → keep free / introduce paid tier / freemium gate; B2B enterprise pricing finalize | 4h analysis + 2h decision | 2026-08-13 | 2026-08-20 |

**Total dev effort: ~68h trong 7 tuần** (~10h/tuần, vừa 60h cap).

**Trục 6 effort breakdown (P2 chính):**

- ~10h bố + em: schema + helpers + Đại Ka prompt rewire
- ~32h CTV: content per VN grade (lớp 1-12), template-driven, bố review per batch

**Critical path**: P0 ✅ done → Sprint 2 feedback backfill (anh tonight) → P1 (schema) → P2 parallel (em codes scaffold, CTV writes content) → P2.5 → P3 → beta launch.

**Critical dependencies:**
- Phase 1 needs anh **rotate Anthropic API key** trước (đã pending 11+ session — block production claim "secure")
- Phase 1 needs anh **re-link Vercel ↔ GitHub webhook** trước
- Phase 3 needs Brevo template + Telegram bot **reuse từ Gia Phả** (đã có sẵn)
- Phase 5 needs **SePay tài khoản** (đã có cho biz, có thể tách subaccount)

---

## 4. Asset re-use từ Gia Phả

Copy nguyên file rồi rename `clan → family`:

| Gia Phả file | Kids file (target) | Modifications |
|---|---|---|
| `lib/clan-provision.ts` | `lib/family-provision.ts` | rename + add tier-based defaults (max_kids, target_years) |
| `app/api/sell/register/route.ts` | giữ path identical | adapt form fields (sốCon, độTuổiCon thay vì têndòng họ) |
| `app/(landing)/sell/page.tsx` | giữ path identical | rewrite content cho Kids context (4 tier, child-centric copy) |
| `app/(landing)/sell/register/page.tsx` | giữ path identical | thêm fields ages-of-kids |
| `lib/email.ts` (Brevo) | re-use as-is | new template ID cho Kids welcome |
| `lib/notifications.ts` (Telegram) | re-use as-is | message template Kids |
| `og-image.svg` | new design | Pany Kids visual (Phúc/An/Y emoji theme) |
| `artifacts/share-kit.md` | new file | 4 captions VN-tailored cho phụ huynh |
| `migration-clan-signup-requests.sql` | adapt schema | `family_signup_requests` table |
| `phase-b-stage-1-migration-v2.sql` | adapt | 15 Kids tables × `family_id` + RLS |
| `admin/signup-requests/page.tsx` | re-use as-is | label "gia đình" thay "dòng họ" |

**Saving from re-use: ~60% of P1+P3 effort** vs build from scratch.

---

## 5. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Anthropic cost blow-up khi 50+ family chat | Medium | High | Per-family monthly cap; tier-based rate limit; Haiku 4.5 fallback for Free tier |
| YEAR_PLANS generator output kém quality vs hand-crafted | High | Medium | Y1 + Yn hand-crafted always; mid years template + manual QA before ship |
| Phụ huynh không tự setup nổi (5 phút) | Medium | High | Auto-provision như Gia Phả + onboarding wizard 3-step |
| Conflict với content COPPA (US) khi mở quốc tế | Low (target VN) | Medium | Defer COPPA; chỉ launch VN trước, opt-in parent consent gate |
| Anh's 60h cap vỡ vì Phase 2 content seed | Medium | Medium | Split content seed thành 4 weekly batches, đan với Sprint 2 feedback iteration |
| Sprint 2 feedback đang trống (Day 1-4 chưa fill) — không có signal trước khi commercialize | High | High | Backfill Day 1-4 với 3 con trước Phase 1; nếu Phúc/An/Y không thấy hay → defer commercial |

---

## 6. Decision points — ✅ ALL CHỐT 2026-05-13

| # | Question | Anh's decision | Log |
|---|---|---|---|
| Q1 | Subdomain | `kids.panyvn.app` (free Vercel subdomain) | D-021 |
| Q2 | Pricing | **FREE 3 tháng, BỎ tier display.** Review 2026-08-13. Cost guardrail $50/mo. | D-022 |
| Q3 | P0 ship | **Ship ngay hôm nay** — DONE 2026-05-13 14:30 | D-023 |
| Q4 | Content seed | CTV draft + bố review (template-based) | D-024 |
| Q5 | Sprint 2 feedback | Backfill Day 1-4 TRƯỚC Phase 1 | D-025 |
| Q6 | Beta cohort | Anh em họ + bạn bè + parent group lớp các con + FB; B2B = enterprise pricing riêng | D-026 |
| Q7 | Payment | SePay VietQR only (khi pricing introduced) | D-027 |
| Q8 | Đại Ka rename | **KEEP** (honor D-011) + thêm per-family rename option in Settings | D-030 |
| Trục 6 | Age personalization | **12 single-year tracks 5→16**, sourced từ SGK + tham khảo + nâng cao | D-028 |
| Trục 7 | Khám phá knowledge links | Anh personally curates — em build UI scaffold + admin form | D-029 |

---

## 7. Files affected (production code touch list)

```
apps/web/components/PanyKidsStudio.tsx      ← sidebar reorder + MAX_KIDS gate + roadmap re-render
apps/web/lib/english-skills.ts              ← +B2 level, +40 từ
apps/web/lib/quests.ts                       ← +TT ageGroup, +28 quests
apps/web/lib/math-quiz.ts                    ← +L5, +150 questions
apps/web/lib/careers-v2.ts                   ← +15 teen careers
apps/web/lib/career-qna.ts                   ← +TT ageGroup Q&A
apps/web/lib/year-plans.ts                   ← NEW (tách từ inline)
apps/web/lib/family-provision.ts             ← NEW (port từ Gia Phả)
apps/web/lib/family-settings.ts              ← NEW (tier, target_years, max_kids)
apps/web/app/(landing)/sell/page.tsx         ← NEW (port từ Gia Phả)
apps/web/app/(landing)/sell/register/page.tsx← NEW (port từ Gia Phả)
apps/web/app/api/sell/register/route.ts      ← NEW (port từ Gia Phả)
apps/web/app/(public)/dangky/page.tsx        ← NEW (redirect)
apps/web/app/admin/signup-requests/page.tsx  ← NEW (port từ Gia Phả)
apps/web/public/og-image.svg                 ← NEW (Kids visual)
artifacts/share-kit.md                       ← NEW (4 captions + email)
artifacts/migration-family-2026-05-XX.sql    ← NEW (15 tables × family_id + RLS)
apps/mobile/lib/kids.ts                      ← MAX_KIDS + age 5-16
apps/mobile/ ...                             ← MobileTabBar reorder mirror
project.md, plan.md, decisions.md, tasks.md  ← Sprint 2 → Sprint 2.5 commercial branch update
```

---

## 8. Decision log placeholder

Khi anh chốt, em log vào `decisions.md`:
- **D-019**: Commercialization scope — multi-tenant family-tier SaaS (chọn 1 trong 7 Q ở section 6)
- **D-020**: Subdomain choice (Q1)
- **D-021**: Pricing tiers (Q2)
- **D-022**: Phase ordering (Q3)
- **D-023**: Content seeding ownership (Q4)
- **D-024**: Sprint 2 feedback gate (Q5)
- **D-025**: Beta cohort (Q6)
- **D-026**: Payment gateway scope (Q7)

---

## 9. Reference

- Gia Phả status: `Projects/pany-gia-pha/status.md`
- Gia Phả share-kit: `Projects/pany-gia-pha/artifacts/share-kit.md`
- Gia Phả sales page source: `Projects/pany-gia-pha-app/frontend/src/app/(landing)/sell/page.tsx`
- Kids strategy v2: `Projects/pany-kids-studio/strategy-v2.md`
- Pany Consulting 2026 Decision Filter: `Projects/pany-consulting-2026/artifacts/decision-filter-card.md`
- PANY VN Pack v2 (potential upsell từ Kids customers): `Projects/pany-vn-pack-v2/`
