-- D-042 — add 'space' to content_tracks CHECK constraint
-- Run in Supabase project pany-kids-prod → SQL Editor.
-- IMPORTANT: select ALL (Ctrl+A) before Run so the ALTER statements actually execute
-- (Supabase runs only the highlighted selection — D-041 gotcha).

ALTER TABLE public.content_tracks DROP CONSTRAINT IF EXISTS content_tracks_track_check;
ALTER TABLE public.content_tracks ADD CONSTRAINT content_tracks_track_check
  CHECK (track IN ('gamedev', 'fashion', 'stem', 'glossary', 'findtrack', 'space'));

-- Verify: the CHECK array should now list 6 tracks including 'space'
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'public.content_tracks'::regclass AND contype = 'c';
