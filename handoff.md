# Handoff — Pany Kids Studio

**Last updated:** 2026-05-15 ~12:30 GMT+7 (Session 18 — D-035 Tree of Knowledge transformation · Phase 1+2+3a LIVE · 13 commits)
**Resume command:** `Continue pany-kids-studio Library/English restructure` (Phase 3b next)
**Production:** https://pany-kids-studio.vercel.app · HEAD `25b5ba9` · all 9 routes ✅

## Session 18 (2026-05-15) — Tree of Knowledge transformation

D-035 chốt sau khi anh review 2 mô hình UX (Cây vs Tàu vũ trụ). Cây primary, Spaceship = Mature Mode (deferred 12+).
Canonical image: anh's Gemini Imagen pick saved at `public/tree-of-knowledge-hero.jpg` (1920×1072 JPG 459KB from PNG 7.6MB via ffmpeg).

### Phases delivered

| Phase | Commit | What |
|-------|--------|------|
| **Phase 0** | `8228fc1` | D-033 free-long-term + D-034 chat 20/day/family rate limit (replaces D-022 3-month trial) |
| **Phase B research** | `669727d` `7849d22` | 5-model UX research → 2-model deep dive → 4 Gemini prompts ready-to-paste |
| **Phase 1a** | `94561ea` | TreeHero component + /welcome hero dark immersive aesthetic |
| **Phase 1 canonical** | `cda7dbc` | Anh's Gemini pick LIVE at `/tree-of-knowledge-hero.jpg` |
| **Phase 1b** | `68e895b` | /sell hero + OG dynamic dark mode + FamilyForest (6 life-stages SVG) |
| **Phase 1c greeting** | `ab9ed2e` | HeroGreeting time-aware VN (5 windows) · hydration-safe SSR pattern |
| **Phase 2** | `eb20d0e` | TreeOfKnowledgeHome as Overview + photo upload per kid in FamilyForest |
| **Phase 2 hotfix** | `64aa3e9` | ReferenceError activeKid undefined fix |
| **Phase 2c** | `194c816` `852a75e` | Simplify: remove hotspots overlay + greeting inline + hide TabNav+MobileTabBar + sidebar auto-close |
| **Phase 3a** | `25b5ba9` | 27 templates grid + HTML5 drag-rearrange + browser back→Overview + footer "Made with ❤️ by ___" editable |

### Decisions logged
- **D-033** (cumulative D-022 replacement): Free long-term standard tier
- **D-034**: Chat 20 msg/day/family rate limit + Zalo upgrade CTA
- **D-035**: UI metaphor primary = 🌳 Cây phát triển + cha mẹ song hành · Spaceship = Mature Mode deferred kid 12+

### Code shipped this session
- `lib/greeting.ts` (~140 lines): 5 VN time-of-day windows + 3 user modes (kid/parent/anonymous)
- `components/HeroGreeting.tsx` (~110 lines): holographic overlay hydration-safe
- `components/TreeHero.tsx` (~150 lines): dark immersive landing hero with 3-tier image fallback
- `components/TreeOfKnowledgeHome.tsx` (~340 lines): 27-card grid + HTML5 drag + editable footer
- `components/FamilyForest.tsx` (~340 lines): 1-5 kids as SVG trees with 6 life-stages + photo upload
- `public/tree-of-knowledge-hero.jpg` (459KB): canonical brand image
- `public/tree-hero-placeholder.svg` (~3.5KB): CSS-style fallback before canonical image saved
- `app/api/sell/og/route.ts`: rewritten for D-035 dark mode palette + emoji 🌳🌸🍎🌿✨
- `app/api/chat/route.ts`: D-034 rate limit + Vietnamese rate-limited message + upgrade CTA
- 12+ landing/email/notification files: copy migration from "3 tháng" → "miễn phí dài hạn"

## Mai resume (Phase 3b — Library/English restructure)

Anh's 2026-05-15 feedback item #2 deferred for next chunk:

> "Trong template Thư Viện: em đưa phần trụ cột lên trên cùng → rồi tới hỏi đáp chuyên gia; Phần Truyện Song Ngữ → em đưa sang Template Tiếng Anh"

**Estimated ~1-2h work:**

1. Find `LibraryTab` component in `apps/web/components/PanyKidsStudio.tsx`
2. Reorder sections:
   - Section 1 NEW: 12 trụ cột phát triển (move to TOP)
   - Section 2 NEW: Hỏi đáp chuyên gia (Career Q&A — second)
   - Section 3 OLD curated resources stays
3. Find bilingual stories rendering inside LibraryTab
4. Cut → paste into `EnglishSkillsTab` (which currently has 4 skills: Vocab/Speak/Read/Write)
5. Update LibraryTab to remove story tab/section
6. Add story tab into EnglishSkillsTab as 5th skill mode (or section)
7. Test CEFRLevel K preservation (Như Ý 5t access still works)
8. TS check + commit + deploy
9. Browser-pilot verify

### Re-resume after Phase 3b
Future chunks (anh chỉ định khi cần):
- 6-stage life-cycle progression strip (cần Gemini gen 6 ảnh)
- Settings tab: parent name management (currently in footer only)
- Family Forest test với ảnh thật 3 con upload
- Kid mode: greeting tự đổi sang kid name + filter cards phù hợp tuổi

## Resume Gate (block production claim — anh-only manual)

| # | Action | Effort | Status |
|---|---|---|---|
| 1 | 🔴 Rotate Anthropic API key | 2 phút | **STILL PENDING** since Session 16 |
| 2 | 🔴 Backfill `feedback-week-1.md` Day 1-4 | 30 phút | **STILL PENDING (D-025 gate)** |
| 3 | ⚠️ Re-link Vercel ↔ GitHub webhook | 2 phút | **STILL PENDING** (manual `vercel deploy --prod` em chạy mỗi commit) |
| 4 | ⚖️ Chốt Path A/B debug-deps Session 15 | 1 phút | **STILL PENDING** |
| 5-7 | 🟡 Supabase project + migration + env vars | 30 phút | Block 2 — wire P1 backend live |

## Session 17 (2026-05-15) — polish queue cleanup

Anh mở lại sau 2 ngày. Em đã commit 4 món polish work nằm rải rác:

| Commit | Item | What |
|--------|------|------|
| `0a9b2cc` | **CC** | `app/onboarding/page.tsx` (614 dòng) — 3-step wizard UI wires Z + BB API. Auth qua `?family_id&parent_pin` từ welcome email. |
| `0a9b2cc` | **DD** | `app/admin/dashboard/page.tsx` (+105 dòng) — Section 4.5 skeleton-mode sample content preview 12 tab tuổi 5-16. Chỉ hiện khi `stats.configured=false`. |
| `0a9b2cc` | **EE** | 2 CTV templates: `career-qna-template.md` + `curriculum-entry-template.md` — brief CTV expand 80+ Q&A + 5-7 subject/age. |
| `dc7df88` | **FF** | `app/api/sell/og/route.ts` — dynamic OG image SVG cho per-share URL (FB/Zalo preview). Query: `?from`, `?kids`, `?family`, `?headline`. |

TypeScript clean (`tsc --noEmit` exit 0). Working tree clean. Local HEAD `dc7df88`, **13 commits ahead** of production HEAD `eeea893` (5/10 Session 15 hotfix).

3 hôm trước (5/14) ghost session đã làm CC+DD+EE local nhưng quên commit — em phát hiện sáng nay 5/15, review xong + commit clean với attribution alphabet đúng.

## Resume Gate vẫn còn 7 items (anh làm)

| # | Action | Effort | Status | Tool/URL |
|---|---|---|---|---|
| 1 | 🔴 Rotate Anthropic API key | 2 phút | **STILL PENDING** | `console.anthropic.com/settings/keys` |
| 2 | 🔴 Backfill `feedback-week-1.md` Day 1-4 với 3 con | 30 phút | **STILL PENDING (D-025 gate)** | `artifacts/feedback-week-1.md` |
| 3 | ⚠️ Re-link Vercel ↔ GitHub webhook | 2 phút | **STILL PENDING** | Vercel → Settings → Git |
| 4 | ⚖️ Chốt Path A/B cho debug deps (boneyard-js + playwright) | 1 phút | **STILL PENDING** | `package.json` |
| 5 | 🟡 Tạo Supabase project `pany-kids-prod` (Mumbai) | 10 phút | pending | `vercel-env-setup-2026-05-13.md` BƯỚC 1 |
| 6 | 🟡 Apply `migration-family-2026-05-14.sql` + `phone_verified` col | 5 phút | pending | Supabase SQL Editor |
| 7 | 🟡 Setup Vercel env vars | 15-20 phút | pending | env-setup guide |

Khi anh xong **#1-4** (block production claim) → ping em "Bắt đầu P1" → em pickup P1 wire-up.
Khi anh xong **#5-7** (P1 wire-up gate) → em test `/sell/register` end-to-end live.

**Quan trọng:** Anh chưa push origin/main → 13 commits Session 16+17 đang ở local. Khi anh ready, có 2 path:
- **Path A (recommended):** Fix Vercel webhook trước → `git push` → auto-deploy mọi commits từ giờ
- **Path B (immediate):** Manual `vercel deploy --prod` để deploy 13 commits ngay, fix webhook sau

## Mai resume

Đọc 3 file theo thứ tự để có full context:

1. `artifacts/session-16-closeout-2026-05-13.md` — single-file resume packet (canonical Session 16 plan)
2. `decisions.md` — 13 decisions D-020 → D-032 (đặc biệt D-032 chatbot rename hybrid)
3. `handoff.md` (file này) — Resume Gate 7 items below

Sau khi anh hoàn thành 4 Block 1 items → ping em "Bắt đầu P1" → em wire end-to-end live.

## Session 16 RESUME GATE (anh làm trước khi em chạy P1 wire-up)

| # | Action | Effort | Status |
|---|---|---|---|
| 1 | 🔴 Rotate Anthropic API key tại `console.anthropic.com/settings/keys` | 2 phút | pending |
| 2 | 🔴 Backfill `artifacts/feedback-week-1.md` Day 1-4 với 3 con | 30 phút | pending (D-025 gate) |
| 3 | ⚠️ Re-link Vercel ↔ GitHub webhook tại Settings → Git | 2 phút | pending |
| 4 | ⚖️ Chốt Path A/B cho Session 15 debug deps (`boneyard-js` + `playwright` + 3 PNGs) | 1 phút | pending |
| 5 | 🟡 Tạo Supabase project mới `pany-kids-prod` (theo `vercel-env-setup-2026-05-13.md` BƯỚC 1) | 10 phút | pending |
| 6 | 🟡 Apply `artifacts/migration-family-2026-05-14.sql` + add `phone_verified` column | 5 phút | pending |
| 7 | 🟡 Setup Vercel env vars (theo env-setup guide) | 15-20 phút | pending |

Khi anh xong **#1-4** (block production claim) → ping em "Bắt đầu P1" → em pickup P1 wire-up.
Khi anh xong **#5-7** (P1 wire-up gate) → em test `/sell/register` end-to-end live.

## Session 16 (2026-05-13) — Commercialization pipeline shipped

Anh mở lại dự án sau 3 ngày yên. Em check state:

| Check | Result |
|-------|--------|
| Production web | ✅ HTTP 200, title "Pany Kids Studio" |
| VPS 24/7 | ✅ HTTP 200 |
| Git branch | `main`, 0 commits ahead of `eeea893` (5/10 EOD) |
| Local uncommitted | 2 modified (`package.json`, `pnpm-lock.yaml`) + 3 untracked (debug PNG×2 + `boneyard.config.json`) |
| Sprint 2 feedback Day 1-4 | 🔴 ALL EMPTY (`artifacts/feedback-week-1.md`) |
| API key rotation | 🔴 Still pending, ~11 sessions |
| Vercel webhook | ⚠️ Still broken (manual `vercel deploy --prod` only) |

**3 open decisions for anh:**

1. **Debug-deps cleanup** — Session 15 hotfix verify added `boneyard-js@1.8.1` (runtime) + `playwright@1.59.1` (dev) + 2 hydration screenshots + 1 boneyard config. Two paths:
   - **A) Keep:** commit `boneyard-js` + `playwright` as legitimate verify tooling, gitignore the PNGs + boneyard config
   - **B) Strip:** revert `package.json` + `pnpm-lock.yaml`, delete 3 untracked files — back to pristine post-hotfix state
2. **Sprint 2 cadence reset** — Feedback file Day 1-4 empty. Options: (a) anh sit with 3 kids 30min today to backfill Day 1-4 with what you remember, (b) abandon Day 1-4 and start clean Day 5 (Thứ 4 5/14), (c) extend Week 1 by 3 days (slide schedule).
3. **API key rotation** — 4 days past hotfix, exposed in old logs since Session 12. Anh chỉ cần 2 phút click rotate ở `console.anthropic.com/settings/keys` + paste new key vào Vercel + VPS env.

## Session 14 (2026-05-10, this session) — patch on top of v3.3-A

`apps/web/components/PanyKidsStudio.tsx` lines 4962, 4968-4970:

- **Bug**: EnglishSkillsTab level picker only rendered `['A1', 'A2', 'B1']`. Effect: when Như Ý (5t) was selected, `getLevelForAge(5)` correctly auto-set `level = 'K'` and the K-content (vocab/speak/read/write) was loaded — BUT user had no way to manually switch to K from the UI, and if they switched away, no way back.
- **Bug**: Age-description ternary was `level === 'A1' ? '6-8t · vỡ lòng' : level === 'A2' ? '9-11t · sơ cấp' : '12-15t · trung cấp'`. Effect: K level silently fell through to "12-15t · trung cấp" — display said Như Ý's level was "intermediate teens" while content was kindergarten. Bonus: A1 description "6-8t" overlapped with K's correct 4-6t range.
- **Fix**: Picker now `['K', 'A1', 'A2', 'B1']`. Description switch now: K→"4-6t · mầm non / kindergarten", A1→"7-8t · vỡ lòng / beginner" (corrected from 6-8), A2→"9-11t · sơ cấp / elementary", B1→"12-15t · trung cấp / intermediate".
- **Verification**: `pnpm exec tsc --noEmit` exits 0. No other CEFRLevel exhaustive switches found via `grep -rn "\['A1', 'A2', 'B1'\]"` — LibraryTab story-level picker (line 2218) was already correct with K.

## Already-shipped state — v3.3-A (`bcbbdb9`, 2026-05-10 08:20)

Session 12 + 13 work merged in one commit:

| Item | File(s) | Status |
|------|---------|--------|
| Kid ages corrected (Phúc 11 / An 9 / Y 5) | `apps/web/components/PanyKidsStudio.tsx`, `apps/mobile/lib/kids.ts`, `apps/web/lib/claude.ts` | ✅ |
| Birthdays added: Phúc 2015-06-26, An 2017-08-30 | `apps/web/components/PanyKidsStudio.tsx`, `apps/mobile/lib/kids.ts` | ✅ |
| `lib/quests.ts` (252 quests, 12 pillars × 3 ages × 7 days) | NEW | ✅ |
| `lib/english-skills.ts` (205 vocab / 55 speak / 20 read / 32 write + K level) | REWRITE | ✅ |
| `lib/math-quiz.ts` (210 curated + 850 generated = 1060) | NEW | ✅ |
| `lib/bilingual-stories.ts` (50 stories, paragraph-aligned VI↔EN) | NEW | ✅ |
| `lib/career-qna.ts` + `app/api/career-qna-refresh/route.ts` (12 topics, 3-day cron) | NEW | ✅ |
| OverviewTab "Quest hôm nay" card (deterministic daily pick) | wired | ✅ |
| QuizTab math mode toggle + L1-L4 filter | wired | ✅ |
| LibraryTab bilingual stories grid + reader modal + K filter | wired | ✅ |
| pks3-completedQuests persistence + Done/Undo button | NEW | ✅ |
| pks3-readStories persistence + counter | NEW | ✅ |
| SSG hang fix via `dynamic(..., { ssr: false })` | `app/page.tsx` | ✅ |
| Turbopack root misdetection fix (stale package-lock.json) | repo root | ✅ |
| TypeScript clean (`tsc --noEmit` exit 0) | — | ✅ |

Decisions logged: D-017 (kid info), D-018 (4-bank expansion). See `decisions.md`.

## What's NOT done (next session pickup)

### High priority
1. **`pnpm dev` smoke test** — anh visually verify dashboard renders Phúc 11 / An 9 / Y 5 + 4 banks live. Quick eyeball test, not full QA.
2. **Đại Ka chat smoke test** — verify language adapts by age (Y 5t gets very simple, Phúc 11t gets richer). One Vietnamese question per kid.
3. **First-run with 3 kids** — onboarding session anh promised in Sprint 2 plan: introduce 12 pillars + 4 new banks, set PIN/profile per kid.

### Medium priority
4. **Sprint 2 daily usage feedback** — bố Bình + 3 con use dashboard 1-2 tuần, log bugs/gaps in `artifacts/feedback-week-1.md` (file not yet created).
5. **Như Ý-specific review** — bố ngồi cùng review K-content, ghi 5 quest dễ nhất + 5 story Như Ý thích nhất.
6. **Mobile first run** — `cd apps/mobile && pnpm install` + add placeholder PNGs (icon/splash/adaptive-icon/favicon) + `pnpm start` + scan QR with Expo Go.

### Low priority / parking
7. **Anh extend quests.ts từ 252 → 500+** — schema is open for append.
8. **Domain `panykids.io`** purchase after 1 week internal confidence (per D-006).
9. **🔴 API key STILL not rotated** — `sk-ant-api03-WRBcVGm...` exposed in old session logs. ROTATE at https://console.anthropic.com/settings/keys.

## Compatibility notes

- `CEFRLevel` union is `'K' | 'A1' | 'A2' | 'B1'`. Any new exhaustive switch must handle K. Search: `grep -rn "CEFRLevel\|level: 'A1'\|level: 'A2'\|level: 'B1'" apps/web/ apps/mobile/`. Currently safe — only LibraryTab + EnglishSkillsTab pickers reference all 4 levels, both correct.
- `getLevelForAge` boundaries: `<=6→K`, `<=8→A1`, `<=11→A2`, else `B1`.
- `lib/bilingual-stories.ts` imports `CEFRLevel` from `english-skills.ts`. Do NOT add story types back into `english-skills.ts` (circular import).

## Stats baseline (post-Session 13)

```
Quests:    252 (target 500+ — anh extends)
English:   205 vocab / 55 speak / 20 reading / 32 writing
Math:      1060 effective (210 curated + 850 generated)
Stories:   50 bilingual stories (8 K + 14 A1 + 16 A2 + 12 B1)
Q&A:       seeded across 12 topics, 3-day cron-refreshed
TOTAL DATA: ~1567 user-facing items across 5 banks
```

## URLs

- 🌐 Production web: https://pany-kids-studio.vercel.app (auto-deploys from `main`)
- 🖥️ VPS 24/7: http://61.14.233.122/
- 📦 Repo (public): https://github.com/tdbinh27-sudo/pany-kids-studio
- 📱 Mobile: not yet on App Store / Play (target 8/2026)

## Next session resume options

**(A) Sprint 2 daily usage feedback** (recommended — unblocks real iteration):
```
Continue pany-kids-studio Sprint 2 — Phúc/An/Y daily usage feedback
```
Anh + 3 con dùng dashboard hằng ngày 1-2 tuần → log UX bugs + feature gaps → fix iteratively.

**(B) Mobile first run**:
```
Continue pany-kids-studio mobile install + Expo Go test
```
`pnpm install` + add placeholder assets + `pnpm start` + scan QR with phone của bố.

**(C) Domain purchase**:
```
Continue pany-kids-studio domain panykids.io
```
Sau 1 tuần test nội bộ → mua domain + map vào Vercel + iOS bundle id update.

**(D) Quest extension 252 → 500+**:
```
Continue pany-kids-studio quest-extension
```
Anh mark gaps, em append entries với schema đã có.
