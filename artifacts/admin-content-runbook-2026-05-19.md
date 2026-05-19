# 🔐 Admin Content Runbook — D-040 Phase 3 CMS

**Created:** 2026-05-19
**Status:** Code shipped · Migration pending anh apply
**Production URL:** https://kids.panyvn.app/admin/content

---

## Step 1 — Apply migration to Supabase pany-kids-prod

Anh mở Supabase dashboard → SQL Editor → paste + run file:

```
artifacts/migration-content-tracks-2026-05-19.sql
```

**Cách lấy file:** Mở trong VS Code → copy all → paste vào Supabase SQL Editor → click "Run"

**Expected result:**
- Table `public.content_tracks` created
- 3 rows seeded (gamedev, fashion, stem) with current JSON snapshot
- RLS enabled (service_role only)
- Trigger `bump_content_tracks_version` active

**Verify:**
```sql
SELECT track, version, updated_at, jsonb_array_length(payload->'tiers') as tier_count
  FROM public.content_tracks
  ORDER BY track;
```

Mong đợi:
| track | version | tier_count |
|---|---|---|
| fashion | 1 | 3 |
| gamedev | 1 | 3 |
| stem | 1 | (null - dùng 'subjects' không phải 'tiers') |

---

## Step 2 — Verify env vars on Vercel

Anh check 2 env vars TỒN TẠI (đã setup từ Session 16):

- `NEXT_PUBLIC_SUPABASE_URL` — pany-kids-prod URL
- `SUPABASE_SERVICE_ROLE_KEY` — service role (NEVER expose client)
- `ADMIN_SECRET` — random string (anh đã set)

Vercel → Project Settings → Environment Variables. Nếu thiếu → add → redeploy.

---

## Step 3 — Test admin UI

1. Mở `https://kids.panyvn.app/admin/content?secret=YOUR_ADMIN_SECRET`
2. Secret auto-saved vào localStorage (1 lần, không cần paste lại)
3. URL tự clean về `/admin/content` (không leak secret trong history)
4. UI hiện 3 tabs Game Dev / Fashion / STEM
5. Click tab → JSON editor load nội dung từ Supabase
6. Edit JSON → click "💾 Save" → version bump + timestamp update

---

## Step 4 — Edit content workflow

### Cách 1: Admin UI (UPDATED workflow) ⭐

1. Mở `/admin/content`
2. Click track muốn sửa (🎮 / 👗 / 🔬)
3. Edit JSON inline trong textarea
4. Click "💾 Save"
5. Cache refresh trong 60s (ISR revalidate)
6. 3 con thấy content mới khi refresh dashboard

**Pros:** Không cần git push · CTV access qua share secret · audit trail (version field)

### Cách 2: JSON file + git (legacy fallback)

Vẫn hoạt động khi muốn bulk edit hoặc anh prefer git workflow:

1. Edit `apps/web/lib/{gamedev,fashion,stem}-data.json`
2. `git push origin main`
3. Vercel rebuilds → bundled JSON updated → DB NOT updated (bundle is fallback only)

⚠️ **Lưu ý:** Sau khi DB seeded, components ưu tiên DB content. JSON files chỉ là fallback nếu API fails. Để sync JSON ↔ DB, anh dùng admin UI thay vì edit JSON.

---

## Step 5 — CTV onboarding (future)

Khi có CTV (cộng tác viên):

1. Anh tạo CTV-specific secret riêng (advanced — Phase 3b)
2. Hiện tại: share chung `ADMIN_SECRET` với CTV trusted (Mai, ...)
3. Audit trail: trường `updated_by` track ai sửa (anh nên đặt convention: "anh", "mai-ctv", "phuc-test"...)
4. Mid-Year Gate review: nếu CTV scale → build per-user auth + role table (Phase 3b)

---

## Data structure cheatsheet

### Game Dev + Fashion (cùng schema)
```json
{
  "$schema_version": "1.0",
  "$last_updated": "2026-05-19",
  "tiers": [
    {
      "id": 1,
      "emoji": "🌱",
      "age_band": "K (5-6t)",
      "kid_target": "Y · mầm non",
      "title_vi": "...",
      "title_en": "...",
      "tools": [{ "name": "...", "license": "...", "stars": "..." }],
      "next_step_vi": "...",
      "next_step_en": "...",
      "artifact_file": "artifacts/...",
      "links": [{ "label": "...", "url": "..." }],
      "milestones": [
        { "id": "unique-id", "label_vi": "...", "label_en": "..." }
      ]
    }
  ],
  "careers": [...],
  "vn_studios": [...],   // gamedev only
  "vn_brands": [...],    // fashion only
  "environments": [...], // fashion only
  "ai_agents": [...]
}
```

### STEM
```json
{
  "subjects": [
    {
      "id": "math",
      "emoji": "🔢",
      "title_vi": "...",
      "title_en": "...",
      "age_recommend": "P+T",
      "pillar_match": "...",
      "career_intro_vi": "...",
      "career_intro_en": "...",
      "simulations": [
        {
          "name_vi": "...",
          "name_en": "...",
          "phet_slug": "fractions-intro",
          "age": "P"
        }
      ]
    }
  ],
  "curriculum_map_vn": [...],
  "careers": [...],
  "vn_employers": "...",
  "ai_agents": [...]
}
```

⚠️ **KHÔNG xóa hoặc đổi `milestones[].id` hoặc `simulations[].phet_slug`** — đây là keys cho progress tracking (D-039 Phase 2). Đổi sẽ làm mất progress 3 con!

---

## Rollback / Disaster Recovery

### Nếu admin UI breaks
- Vẫn render được — components fallback về bundled JSON files
- Edit JSON files trong code → git push để khôi phục

### Nếu Supabase down
- ISR cache 60s buffer
- Sau 60s: `useContent` hook fallback bundled JSON
- 3 tabs vẫn show content (snapshot 2026-05-19)

### Rollback migration
```sql
DROP TABLE IF EXISTS public.content_tracks CASCADE;
```
→ Components tự fall back to bundled JSON, không downtime.

### Khôi phục version cũ từ DB
Hiện tại schema chỉ giữ current version (không có history table). Phase 3b sẽ add `content_tracks_history` table.

---

## Future enhancements (Phase 3b deferred)

- [ ] Version history table + diff viewer
- [ ] Per-CTV auth + role (parent/ctv/viewer)
- [ ] AI suggestion queue (Claude agent quét GitHub trending → propose new tools)
- [ ] PhET RSS feed auto-import (new sims weekly)
- [ ] Multi-language editor (currently anh edit cả vi + en cùng lúc)
- [ ] Schema validation client-side (block save if invalid JSON shape)
- [ ] Public read endpoint pagination (currently full payload returned)
- [ ] CDN cache invalidation webhook (instant refresh thay vì 60s ISR)

---

## File summary D-040 Phase 3 MVP

**New files (5):**
- `artifacts/migration-content-tracks-2026-05-19.sql` — Schema + seed
- `apps/web/lib/supabase-admin.ts` — Server-side client helper
- `apps/web/lib/useContent.ts` — Client hook with fallback
- `apps/web/app/api/content/[track]/route.ts` — Public GET endpoint
- `apps/web/app/api/admin/content/[track]/route.ts` — Admin GET+PATCH
- `apps/web/app/admin/content/page.tsx` — Admin CMS UI

**Modified files (3):**
- `GameDevTab.tsx` + `FashionDesignTab.tsx` + `STEMTab.tsx` — Switch to useContent

**Total:** ~700 LOC added.

---

**Last updated:** 2026-05-19
**Decision ID:** D-040
**Cross-ref:** D-039 (JSON+progress), D-031 (Supabase pany-kids-prod), D-022 (admin auth pattern)
