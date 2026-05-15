-- ====================================================================
-- HOTFIX 2026-05-15: 2 CHECK constraints out of sync with code
-- ====================================================================
-- Bugs caught by E2E signup test 2026-05-15:
--
-- 1) families.tier CHECK missing 'standard'
--    D-033 (2026-05-15) supersedes D-022. family-provision.ts:274 now uses
--    tier='standard' but v1 migration (2026-05-14) CHECK rejects it.
--
-- 2) family_signup_requests.status CHECK missing 'phone_verify_required'
--    D-031 added this status for cross-product email collision OTP path.
--    family-provision.ts:224 sets this status when collision happens, but
--    v1 migration CHECK only allows ('pending','provisioned','rejected','email_exists').
--
-- Fix: drop + recreate both CHECK constraints with extended enum.
-- ====================================================================

BEGIN;

-- ─── 1. families.tier ─────────────────────────────────────────────
ALTER TABLE public.families
  DROP CONSTRAINT IF EXISTS families_tier_check;

ALTER TABLE public.families
  ADD CONSTRAINT families_tier_check
  CHECK (tier IN ('free-trial', 'basic', 'pro', 'premium', 'enterprise', 'standard'));

-- ─── 2. family_signup_requests.status ────────────────────────────
ALTER TABLE public.family_signup_requests
  DROP CONSTRAINT IF EXISTS family_signup_requests_status_check;

ALTER TABLE public.family_signup_requests
  ADD CONSTRAINT family_signup_requests_status_check
  CHECK (status IN ('pending', 'provisioned', 'rejected', 'email_exists', 'phone_verify_required'));

COMMIT;

-- Verify both constraints
SELECT rel.relname AS table_name, con.conname, pg_get_constraintdef(con.oid)
  FROM pg_constraint con
  JOIN pg_class rel ON rel.oid = con.conrelid
  WHERE rel.relname IN ('families', 'family_signup_requests')
    AND con.conname IN ('families_tier_check', 'family_signup_requests_status_check');
