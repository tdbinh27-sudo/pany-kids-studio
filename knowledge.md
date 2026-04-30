# Pany Kids Studio — Knowledge Base

## Curriculum Foundation

5-year roadmap (2026-2031) with 6 pillars:
1. **Tech & AI** (Cpu, sky blue) — Scratch → Python → AI/ML
2. **English** (Globe, pink) — Storytelling → Cambridge KET/PET
3. **Finance** (DollarSign, mint) — 3 jars → Compound interest
4. **Critical Thinking** (Brain, purple) — 3-Why → Logical fallacies
5. **Business** (TrendingUp, sunny) — First sale → Real startup
6. **Life Experience** (MapPin, coral) — Trips → Volunteering

5 years, 4 quarters each = 20 quarters, 60+ objectives.

## Visual Design Tokens

```js
const C = {
  bg: 'linear-gradient(135deg, #FFE5F1 0%, #E5F3FF 50%, #FFF9E5 100%)',
  pink: '#FF6B9D', sky: '#4DABF7', sunny: '#FFD43B',
  mint: '#51CF66', purple: '#845EC2', coral: '#FF8787',
  gold: '#FFB800',
  ink: '#2D1B4E', sub: '#6B5B95', mute: '#9B8FB8',
};
```

Fonts: Fredoka (display) + Quicksand (body) + Caveat (handwritten).

## Animations Library

- `fadeIn 0.4s` — tab enter
- `pop 0.4s` — modal/badge unlock
- `float 3s infinite` — emoji decorations
- `wiggle 0.4s` — interactive emoji on hover
- `confetti-fall 1.5-2.7s` — celebration burst (40 emojis)
- `pulse-glow 2s` — CTAs
- `shimmer 3s` — badge gradient sweep

## 22 Tabs Reference

| # | Tab | Purpose |
|---|-----|---------|
| 1 | Overview | KPI cards + radar chart + 7 pillars + philosophy |
| 2 | Roadmap | 5-year plan, 20 quarters, expandable |
| 3 | Calendar | Daily check-in + streak + weekly tasks |
| 4 | SkillTree | 6-pillar tree visualization |
| 5 | Career | 10 career paths with auto-scoring |
| 6 | Kids | Manage students + PIN + edit |
| 7 | Badges | 16 achievements + auto-unlock |
| 8 | Journal | 3-question daily entries |
| 9 | Portfolio | Image/video showcase gallery |
| 10 | Leaderboard | Friendly comparison across kids |
| 11 | Hardware | Tools by age (4 tiers) |
| 12 | Software | Stack by age (5 categories) |
| 13 | English | 3-stage learning method |
| 14 | Finance | 3-stage skills + 3-jar system |
| 15 | Thinking | 6 critical thinking practices |
| 16 | Rewards | Week/Month/Quarter/Year/Bonus |
| 17 | Experiences | Trips, camps, volunteer |
| 18 | Publish | Internal → Semi → Public → Pro |
| 19 | Library | 19 resources (books/videos/tools/sites) |
| 20 | Quiz | 12-question bank, filter pillar+age |
| 21 | Report | Per-kid summary + export Markdown/JSON |
| 22 | Settings | Language, data mgmt, about |

## Badge Rule Types (16 badges)

```
type: 'objectives' — count completed across all
type: 'streak' — longest streak ≥ N days
type: 'quarter' — specific year+quarter 100%
type: 'year' — full year 100%
type: 'pillar' — N goals in specific pillar
type: 'overall' — % of total 5-year
type: 'journal' — N journal entries
type: 'portfolio' — N portfolio items
type: 'all_pillars' — 1+ goal in every pillar
```

## Storage Schema (localStorage keys)

```
pks3-lang        → 'vi' | 'en'
pks3-kids        → Kid[] (id, name, age, color, emoji, pin)
pks3-progress    → { 'kidId-yN-qN-oN': boolean }
pks3-evals       → { 'kidId-yN-qN': { notes, rating, savedAt } }
pks3-streaks     → { kidId: { count, longest, lastDate, history } }
pks3-journal     → { 'kidId-YYYY-MM-DD': { learned, hard, happy } }
pks3-portfolio   → { kidId: PortfolioItem[] }
pks3-tasks       → { 'kidId-YYYY-WNN': Task[] }
pks3-badges      → { kidId: { badgeId: ISODate } }
pks3-chat        → { kidId: ChatMessage[] }  // future, Phase 3
```

## Career Path Match Algorithm

```js
score = average(career.pillars.map(p => kid.pillarProgress[p].pct))
```

Top 3 careers get ⭐ "match" badge. Pure linear avg, no other heuristics. 10 careers from AI Engineer to Multi-potential.

## Lessons from Build

### Edit anchor bug (avoid)
- Never use `function X() {` as Edit old_string anchor when new_string also starts with `function Y() {`
- Original X declaration gets overwritten, body becomes orphaned
- Detection: `grep "^function "` count must match component usage
- Safe alternative: anchor on closing `}` of prior function, or unique comment markers
