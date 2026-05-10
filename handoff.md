# Handoff — Pany Kids Studio

**Last updated:** 2026-05-09 (Session 12 — extended with UI wiring)
**Resume command:** `Continue pany-kids-studio Session 13`

## Session 12 Phase 2 — UI WIRING (added 2026-05-09 evening)

After initial data delivery, anh confirmed **Option A (wire 4 banks into UI)**.

### What got wired
1. **Birthdays added**: Phúc 2015-06-26, An 2017-08-30 (web + mobile)
2. **OverviewTab → Quest hôm nay**: New gold-tinted card after KPI cards. Per-kid daily quest by age + day-of-week. Deterministic pick (same kid + same date = same quest, no random reroll on refresh). Shows pillar pill, est minutes, parent-needed badge, full bilingual title/desc/reward.
3. **QuizTab → Math mode toggle**: New 2-button toggle "📚 Quiz Trụ cột" vs "🔢 Quiz Toán". Math mode reveals 4-level filter (L1/L2/L3/L4 = Lớp lá / Lớp 4 / Lớp 6 / Cấp 2). All 1060 math questions accessible via existing question-render flow (used adapter to map `MathQuestion` → `QUIZ_BANK` shape, no rewrite of render code).
4. **LibraryTab → Bilingual Stories**: New mint-tinted card at top of tab. 4-level filter, 12-card grid, click-to-open modal with full paragraph-aligned VI ↔ EN reading + moral + vocab focus chips.
5. **English-skills**: Already wired pre-Session 12 — verified imports unchanged, K level should auto-show in CEFR pickers via `getLevelForAge(5) === 'K'`.

### Verification done
- `pnpm exec tsc --noEmit` → **exit 0** (no TypeScript errors).
- Imports clean: `Quest`, `AgeGroup`, `MathQuestion`, `MathLevel`, `Story` all type-imported.

### NOT done (anh's call)
- Did NOT touch `pks3-completedQuests` localStorage — quests don't yet persist completed state. Currently re-rolls on page reload (deterministic, but no "✅ done" indicator). Add this when anh wants gamification on Quest section.
- Did NOT migrate existing pillar-quiz `QUIZ_BANK` to use math bank as default. Both banks coexist; pillar mode still uses old `lib/quiz.ts` data.
- Did NOT add story progress tracking (`pks3-storiesRead`). Modal opens/closes only.

## What just happened (Session 12, 2026-05-09)

Anh asked: *"Pany Kids Studio: em hãy mở lại session & tiếp tục bổ xung data"*.

After clarifying age corrections, em delivered **5 file changes** in a single working block.

### Kid info correction (CRITICAL — was wrong)

Pre-session: `DEFAULT_KIDS = [Phúc 8, An 10, Y 12]` ← **wrong placeholder**
Now correct:

| Kid | Age | School (Sep 2026) | Birthday |
|-----|-----|-------------------|----------|
| Trần Hạnh Phúc | 11 | Lên lớp 6 | TBD (anh sẽ điền) |
| Trần Bình An | 9 | Lên lớp 4 | TBD (anh sẽ điền) |
| Trần Như Ý | 5 | Vào lớp lá (mầm non) | 2020-02-28 |

Files patched:
- `apps/web/components/PanyKidsStudio.tsx` line 143-145
- `apps/mobile/lib/kids.ts` line 18-22
- `apps/web/lib/claude.ts` HARD_RULES_VI (lines 29, 79) + HARD_RULES_EN (line 237) + new age-adapted language section

⚠️ **Đại Ka prompt now treats Như Ý 5t as kindergarten** — uses very simple language, suggests parent reads along.

### 4 new content banks (Sprint 2 backlog filled)

| Bank | Path | Size | Notes |
|------|------|------|-------|
| Daily Quests | `apps/web/lib/quests.ts` | 252 quests, ~600 lines | 12 pillars × 3 ages × 7 days, bilingual |
| English Skills | `apps/web/lib/english-skills.ts` | 205 vocab + 55 speak + 20 read + 32 write | NEW level "K" for Như Ý |
| Math Quiz | `apps/web/lib/math-quiz.ts` | 210 curated + 850 generated = **1060** | L1/L2/L3/L4 = lớp lá → cấp 2 |
| Bilingual Stories | `apps/web/lib/bilingual-stories.ts` | 50 stories, paragraph-aligned VI↔EN | 8 K + 14 A1 + 16 A2 + 12 B1 |

All 4 banks share `getStats()` helper + age-group + CEFR conventions (cross-bank composition is 1-line).

### Decisions logged
- D-017: Kid info correction (decisions.md)
- D-018: 4-bank content expansion (decisions.md)

## What's NOT done (next session pickup)

### High priority
1. **Wire 4 banks into UI** (Sprint 2 use needs this) — currently the data files exist but Tab "Hôm nay", Tab Quiz, Tab Thư viện don't yet read from them. Need to:
   - `import { getQuestsForDay, getQuestsByAge } from '@/lib/quests'` into the relevant tabs
   - `import { getRandomMathQuiz, getMathLevelForKid } from '@/lib/math-quiz'` into Quiz tab
   - `import { getStoriesForKid } from '@/lib/bilingual-stories'` into Library/Read tab
   - English banks already wired (rewrote in place — should still work, but verify levels K/A1/A2/B1 picker shows K option)

2. **Add `pks3-completedQuests` localStorage key** so kids don't repeat finished quests next day

3. **First run with Phúc/An/Y** — onboarding session anh promised in Sprint 2 plan

### Medium priority
4. Anh điền birthday Phúc + An (current `birthday: ''` empty)
5. Visual review: Như Ý 5t có khó nhìn dashboard 22 tabs không? Có thể cần "kid mode" simplified UI khi profile.age <= 6
6. `pnpm install` mobile + scan QR Expo Go (still pending from Session 11)

### Low priority / parking
7. **Anh extend quests.ts từ 252 → 500+** — anh nói sẽ "bổ xung thêm 1 số nội dung khác". Current file structured nên dễ thêm: cứ append entries với schema đã có.
8. Domain `panykids.io` purchase (deferred per Q6)
9. **API key STILL not rotated** — `sk-ant-api03-WRBcVGm...` exposed in old logs. ROTATE NGAY at https://console.anthropic.com/settings/keys

## Compatibility notes

- `lib/english-skills.ts` type `CEFRLevel` was extended from `'A1'|'A2'|'B1'` to `'K'|'A1'|'A2'|'B1'`. **Any existing code that pattern-matched on level needs to handle 'K'**. Search for usages: `grep -rn "CEFRLevel\|level: 'A1'\|level: 'A2'\|level: 'B1'" apps/web/ apps/mobile/`
- `getLevelForAge` boundaries shifted: now `<=6→K`, `<=8→A1`, `<=11→A2`, else B1 (was `<=8→A1`, `<=11→A2`, else B1).
- `lib/bilingual-stories.ts` imports `CEFRLevel` from `english-skills.ts` — circular import risk if anh adds story types into english-skills. Keep them one-way.

## Stats baseline (capture pre-Sprint 2 use)

```
Quests:    252 (target 500+ — anh extends)
English:   205 vocab / 55 speak / 20 reading / 32 writing  
Math:      1060 effective (210 curated + 850 generated)
Stories:   50 bilingual stories
TOTAL DATA: ~1567 user-facing items across 4 banks
```

## Next session resume options

**(A) Wire 4 banks into UI** (recommended — unblocks Sprint 2):
```
Continue pany-kids-studio Session 13 wire-banks-to-tabs
```
Edit PanyKidsStudio.tsx tabs to import + render the 4 new banks. ~3-4 hours focused work.

**(B) Anh extend quests + start Sprint 2 use**:
```
Continue pany-kids-studio Session 13 quest-extension + onboarding
```
Anh review 252 quests, mark gaps, em add 250 more to reach 500+.

**(C) Mobile install + Expo Go**:
```
Continue pany-kids-studio mobile install
```
Still deferred from Session 11.

**(D) Như Ý "kid mode" simplified UI**:
```
Continue pany-kids-studio kid-mode-ui for age<=6
```
22 tabs là quá nhiều cho 5t. Build simplified 5-tab kid view auto-active khi `profile.age <= 6`.
