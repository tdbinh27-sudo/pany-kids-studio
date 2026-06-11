# Handoff — Pany Kids Studio

## Session D-042 (2026-06-11) — Space Explorer zone (Khám Phá Vũ Trụ)

**Decision D-042:** Add a new kid zone "Khám Phá Vũ Trụ / Space Explorer" as the **6th Supabase-CMS track**
(alongside gamedev / fashion / stem / glossary / findtrack). Embeds the MIT `locphamnguyen/solar-system-3d`
simulation via `<iframe>` (self-loads Three.js + textures from CDN → 0 new npm deps), wrapped in a rich
bilingual React discovery zone. Full design: `docs/D-042-space-explorer-design.md`.

### What was built (local, NOT yet pushed)

**New files**
- `apps/web/components/SpaceExplorerTab.tsx` — the zone (hero · 🔭 3D observatory iframe · 🌍 planet cards ·
  🚀 3 astronaut missions w/ per-kid checkboxes · 🎮 10-Q quiz · 🧩 order mini-game · 💼 careers · 🛰️ tools).
  Quiz pass (≥8/10) and a solved order-game auto-complete mission milestones `space-m2-quiz` / `space-m2-order`.
- `apps/web/lib/space-data.json` — anh-editable content (planets, missions, quiz, order_game, careers, tools).
- `apps/web/public/space/` — `solar-system.html`, `solar-system.vi.html`, `Audio_Solar_system_3d.MP3`, `LICENSE` (MIT).
- `artifacts/migration-d042-space-track.sql` — adds `'space'` to the `content_tracks` CHECK constraint.
- `docs/D-042-space-explorer-design.md` — approved v1 design/spec.

**Edited files**
- `lib/useContent.ts` — +import, +`'space'` in `Track`, +FALLBACKS.
- `app/api/content/[track]/route.ts` — +import +FALLBACKS +VALID_TRACKS.
- `app/api/admin/content/[track]/route.ts` — +VALID_TRACKS `'space'`.
- `app/admin/content/page.tsx` — +`'space'` Track + TRACKS row + text 5→6 tabs.
- `components/PanyKidsStudio.tsx` — +import, +`spaceProgress` state/loader/`setSpaceProgressP`, +`activeTab==='space'` branch.
- `components/TreeOfKnowledgeHome.tsx` — +NavItem 🪐 in DEFAULT_NAV.
- NOT touched: TabNav / MobileTabBar (cherry-picked tracks live only in the home grid — per D-041).

### Verification (all PASS)
- `npx tsc --noEmit` → exit 0.
- `pnpm build` (Next 16 Turbopack) → exit 0, 21 routes.
- Dev server (port 3111) + browser-pilot screenshot → zone renders fully; **3D iframe live** (Sun + planets,
  CDN textures load); planet cards / quiz / mini-game / missions / careers all present. No login gate.
- `GET /space/solar-system.vi.html` → 200 text/html (Next 16 serves nested public/*.html ✓).
- `GET /api/content/space` → `ok:true, source:bundle, planets:9` (Supabase-not-configured fallback ✓).
- Console: only 2 pre-existing React SVG warnings (`stop-color`/`stop-opacity`) from an older component — not D-042.

### Trạng thái go-live (Level 2)

**✅ Bước 1 — ĐÃ PUSH + LIVE:** commit `4923110` pushed → Vercel deploy LIVE (kids.panyvn.app/space/* → 200, /api/content/space → ok code mới). Lệnh đã chạy:
```
cd C:\Users\PanyBinh\Projects\pany-kids-studio
git push origin main
```

**✅ Bước 2 — Migration ĐÃ CHẠY (2026-06-11):** project `sbubzbgyvozabgrggjza` (pany-kids-prod), CHECK content_tracks giờ có 6 track gồm `'space'` (verified qua Supabase MCP). CMS sẵn sàng. SQL gốc (đã chạy, idempotent):
SQL Editor → paste `artifacts/migration-d042-space-track.sql` → **Ctrl+A trước khi Run** (gotcha D-041) →
verify CHECK array có 6 track gồm `'space'`. *Chưa chạy migration thì route tự fallback JSON bundle — vẫn chạy.*

**Bước 3 (tùy chọn) — CMS admin:**
`/admin/content?secret=<ADMIN_SECRET>` → tab 🪐 Khám Phá Vũ Trụ → Save → version 1 (sửa nội dung không cần code).

### Resume command
```
"Continue Pany Kids Studio — D-042 verify after anh pushed + applied space migration. Read handoff.md."
```

---
*Session 2026-06-11 · D-042 Space Explorer built + verified local · awaiting anh push + Supabase migration.*
