-- ============================================================================
-- D-046: Kid long-term memory — learning_summary column + wiring
-- ============================================================================
-- @reference D-045 (Draw Studio) follow-up — "AI gia sư riêng cho từng bé" idea
--            audited against HKUDS/DeepTutor (SKIP-import, borrow architecture
--            idea only: distilled L2 facts in system prompt >> raw history dump).
-- @created 2026-09-22
-- @apply   Supabase SQL Editor at https://supabase.com/dashboard/project/<id>/sql
--
-- What this does:
--   1. Adds `learning_summary` JSONB to family_kids — small, server-computed,
--      auto-updating distillation of what a kid is learning/good at/struggling
--      with. Read by /api/chat to personalize Đại Ka; written by
--      /api/family/progress after each synced progress event.
--   2. family_progress and family_chat_history tables ALREADY EXIST (migration
--      2026-05-14) but were never wired into the running app — this migration
--      does not touch them, only adds the missing piece on family_kids.
--
-- Rollback:
--   ALTER TABLE public.family_kids DROP COLUMN IF EXISTS learning_summary;
-- ============================================================================

ALTER TABLE public.family_kids
  ADD COLUMN IF NOT EXISTS learning_summary JSONB;

COMMENT ON COLUMN public.family_kids.learning_summary IS
  'D-046: server-computed distilled facts {strengths[], struggles[], recent_topics[], streak_days, total_completed, updated_at}. Rule-based, no extra LLM call — recomputed by /api/family/progress on each sync.';

-- Verify
SELECT id, name, hobbies, goals, favorite_subject, learning_summary
FROM public.family_kids
ORDER BY position;
