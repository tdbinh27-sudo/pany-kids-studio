# D-042 — Space Explorer (Khám Phá Vũ Trụ) — 6th CMS Track

**Date:** 2026-06-11 · **Status:** Approved v1 → building · **Owner:** Bố Bình
**Source asset:** `locphamnguyen/solar-system-3d` (MIT, Three.js r128, NASA-credited textures) — embedded, not rebuilt.

## Goal
Add a new kid-facing zone "Khám Phá Vũ Trụ / Space Explorer" as the **6th Supabase-CMS track**
(alongside gamedev / fashion / stem / glossary / findtrack). Bilingual VN↔EN, anime/pastel style,
feeds the existing per-kid badge/streak progress system.

## Decision
- Embed the MIT solar-system-3d simulation via `<iframe>` (it self-loads Three.js + textures from
  CDN over HTTPS → 0 new npm deps, no `node_modules` change). VN + EN HTML both exist upstream.
- Build a rich React discovery zone AROUND the 3D viewer, mirroring the GameDevTab CMS-track pattern.

## Zone sections (`SpaceExplorerTab.tsx`)
1. Hero + per-kid progress bar (badgeTier).
2. 🔭 3D Observatory — iframe, `src` switches by `lang` (`/space/solar-system.vi.html` | `.html`).
3. 🌍 Planet cards — 8 planets + Sun, bilingual fun-facts + quick stats, click to expand.
4. 🚀 Astronaut missions — 3 tiers × milestones, per-kid checkbox progress (track-progress helpers).
5. 🎮 Quiz (~10 Q, scored, confetti) + mini-game "order planets from the Sun" (pure React).
6. 💼 Space careers + AI-agent companions (light, matches gamedev shape).

## Data: `lib/space-data.json` (anh-editable JSON, same convention)
`$schema_version`, `$editable`, `iframe{vi,en}`, `planets[]`, `missions[]` (tiers analog),
`quiz[]`, `order_game{}`, `careers[]`, `ai_agents[]`.

## Files changed
**New:** `lib/space-data.json`, `components/SpaceExplorerTab.tsx`, `public/space/*` (4 MIT files),
`artifacts/migration-d042-space-track.sql`.
**Edited:** `lib/useContent.ts`, `app/api/content/[track]/route.ts`,
`app/api/admin/content/[track]/route.ts`, `app/admin/content/page.tsx`,
`components/PanyKidsStudio.tsx` (import + `spaceProgress` state/loader/setter + activeTab branch),
`components/TreeOfKnowledgeHome.tsx` (+1 NavItem 🪐).
**NOT touched:** TabNav / MobileTabBar — cherry-picked tracks live only in the home nav grid (per D-041).

## Manual steps for anh (Level 2, after push)
1. Run `migration-d042-space-track.sql` in Supabase `pany-kids-prod` (adds `'space'` to CHECK).
2. (Optional) `/admin/content?secret=…` → 🪐 Khám Phá Vũ Trụ → Save → version 1.
   Until then, route falls back to bundled `space-data.json` automatically.

## Risks
- R1 jsdelivr/cloudflare CDN blocked in VN → textures fail (sim still runs, gray planets). OK for v1.
- R2 Next 16 serving nested `public/*.html` — verified via build/dev.

## v1 YAGNI cut
No voice, no 3D editing, no per-planet deep pages, no multiplayer. Mini-game = 1 ordering game + quiz.
