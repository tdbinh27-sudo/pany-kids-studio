-- ============================================================================
-- D-041 Phase 3b CMS extension: glossary + findtrack tracks
-- ============================================================================
-- @reference D-040 (Phase 3 MVP 3 tracks) → D-041 (added 2 more)
-- @created  2026-05-23
-- @apply    Supabase SQL Editor at https://supabase.com/dashboard/project/<id>/sql
--
-- This migration:
--   1. Drops old CHECK constraint that limited track to ('gamedev','fashion','stem')
--   2. Adds new CHECK constraint allowing 5 tracks
--   3. Does NOT insert seed rows — use /admin/content UI to create rows
--      (admin UI auto-loads bundled JSON when no row exists; "Save" creates row)
--
-- Rollback:
--   ALTER TABLE public.content_tracks
--     DROP CONSTRAINT IF EXISTS content_tracks_track_check;
--   DELETE FROM public.content_tracks WHERE track IN ('glossary', 'findtrack');
--   ALTER TABLE public.content_tracks
--     ADD CONSTRAINT content_tracks_track_check
--     CHECK (track IN ('gamedev', 'fashion', 'stem'));
-- ============================================================================

-- Step 1: drop old constraint (Postgres auto-named it content_tracks_track_check)
ALTER TABLE public.content_tracks
  DROP CONSTRAINT IF EXISTS content_tracks_track_check;

-- Step 2: add new constraint with 5 valid tracks
ALTER TABLE public.content_tracks
  ADD CONSTRAINT content_tracks_track_check
  CHECK (track IN ('gamedev', 'fashion', 'stem', 'glossary', 'findtrack'));

-- Step 3: verify
SELECT
  conname AS constraint_name,
  pg_get_constraintdef(c.oid) AS definition
FROM pg_constraint c
JOIN pg_class t ON t.oid = c.conrelid
WHERE t.relname = 'content_tracks'
  AND contype = 'c';

-- Expected result row:
--   constraint_name                | definition
--   content_tracks_track_check     | CHECK ((track = ANY (ARRAY['gamedev'::text, 'fashion'::text, 'stem'::text, 'glossary'::text, 'findtrack'::text])))

-- ============================================================================
-- After running this SQL:
--   1. Open https://app-domain/admin/content?secret=<ADMIN_SECRET>
--   2. Click "📖 Từ điển AI" tab → "Save" → first row created
--   3. Click "🧭 Bắt đầu từ đâu" tab → "Save" → first row created
--   4. Verify public API:
--      curl https://app-domain/api/content/glossary  → source: "supabase"
--      curl https://app-domain/api/content/findtrack → source: "supabase"
-- ============================================================================
