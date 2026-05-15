-- ====================================================================
-- 🎁 SETUP_BUNDLE.sql — Pany Kids new project full bootstrap
-- ====================================================================
-- Generated 2026-05-15. Paste this ENTIRE file into Supabase SQL Editor
-- of the freshly-created pany-kids-prod project. Run as one shot.
-- Contains: A) profiles prefix  B) family_* schema  C) FK stitch
-- ====================================================================

-- ====================================================================
-- Pany Kids Studio — Profiles Bootstrap Migration (PREFIX for v1)
-- ====================================================================
-- Purpose: Bootstrap `profiles` table + `handle_new_user` trigger for a
--          FRESH isolated Supabase project (pany-kids-prod).
--
-- Why this file exists: v1 migration (migration-family-2026-05-14.sql)
-- assumes `profiles` already exists (ported from Gia Phả where genealogy
-- tables created it first). For the NEW pany-kids-prod project, we apply
-- this prefix FIRST, then v1.
--
-- Apply order on the NEW project:
--   1. This file  → public.profiles + auto-create trigger
--   2. v1 migration-family-2026-05-14.sql → family_* tables + RLS
--
-- Schema differences vs Gia Phả's profiles:
--   - DROPPED: linked_person (Gia Phả-only people genealogy reference)
--   - ADDED:   family_id (Kids 1:1 family link, queried by D-031 collision check)
--   - ADDED:   phone (Kids signup captures phone, used by D-031 hint)
--   - role enum extended to include 'parent_admin' (default for Kids signups)
-- ====================================================================

BEGIN;

-- --------------------------------------------------------------------
-- 1. profiles table (Kids-flavored)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email        TEXT,
  full_name    TEXT,
  phone        TEXT,                                              -- D-031 collision hint
  role         TEXT NOT NULL DEFAULT 'parent_admin'
               CHECK (role IN ('admin', 'parent_admin', 'editor', 'viewer')),
  family_id    UUID,                                              -- FK added after families table exists (see v1)
  avatar_url   TEXT,
  is_verified  BOOLEAN NOT NULL DEFAULT false,
  is_suspended BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email   ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_family  ON public.profiles(family_id);

-- --------------------------------------------------------------------
-- 2. Auto-create profile on Supabase Auth signup
--    Mirrors Gia Phả's handle_new_user but defaults role='parent_admin'
--    (since Kids is a single-product project — every signup is a parent).
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'parent_admin'
  )
  ON CONFLICT (user_id) DO NOTHING;  -- idempotent for re-runs
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- --------------------------------------------------------------------
-- 3. updated_at auto-update for profiles
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- --------------------------------------------------------------------
-- 4. RLS — profiles can read/update their own row
-- --------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Own profile select" ON public.profiles;
CREATE POLICY "Own profile select" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Own profile update" ON public.profiles
;
CREATE POLICY "Own profile update" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

-- service_role bypasses RLS automatically; that's how provisionFamily()
-- upserts profile + family_id during signup auto-provision.

COMMIT;

-- ====================================================================
-- POST-PREFIX VERIFICATION
-- ====================================================================
-- Expected:
--   profiles table exists with 0 rows
--   trigger on_auth_user_created exists on auth.users
SELECT 'profiles' AS table_name, COUNT(*) AS row_count FROM public.profiles;
SELECT trigger_name, event_object_schema, event_object_table
  FROM information_schema.triggers
  WHERE trigger_name = 'on_auth_user_created';

-- NOW APPLY: artifacts/migration-family-2026-05-14.sql
-- AFTER that v1 is applied, run this final stitch to add FK constraint:
--   ALTER TABLE public.profiles
--     ADD CONSTRAINT fk_profiles_family
--     FOREIGN KEY (family_id) REFERENCES public.families(id) ON DELETE SET NULL;

-- ════════════════════════════════════════════════════════════════════
-- BLOCK B: family_* schema (verbatim from migration-family-2026-05-14.sql)
-- ════════════════════════════════════════════════════════════════════

-- ====================================================================
-- Pany Kids Studio — Multi-tenant Family Schema Migration (P1)
-- ====================================================================
-- Reference: D-020 (commercialize like Gia Phả) + D-022 (free 3-month trial)
--            + D-028 (12-age personalization) + D-030 (per-family chatbot name)
-- Source pattern: pany-gia-pha-app/artifacts/phase-b-stage-1-migration-v2.sql
--                 (battle-tested, live since 2026-05-12)
--
-- Status: DRAFT — DO NOT APPLY until anh reviews and rotates Anthropic API key.
--
-- Apply order:
--   1. Backup current Supabase project (snapshot before any change)
--   2. Apply this migration via Supabase SQL Editor in TRANSACTION (BEGIN/COMMIT)
--   3. Verify all SELECT statements at bottom return expected counts
--   4. Update apps/web env vars: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
--   5. Run smoke test: create new family via /api/sell/register, verify auto-provision
--
-- Rollback: see DROP block at bottom (kept for emergency only).
-- ====================================================================

BEGIN;

-- --------------------------------------------------------------------
-- 1. Core: families table
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.families (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,                -- 'tran-binh', 'nguyen-mai', ...
  name          TEXT NOT NULL,                       -- 'Gia đình Trần Đức Bình'
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status        TEXT NOT NULL DEFAULT 'active'
                CHECK (status IN ('active', 'suspended', 'archived')),
  tier          TEXT NOT NULL DEFAULT 'free-trial'
                CHECK (tier IN ('free-trial', 'basic', 'pro', 'premium', 'enterprise')),
  trial_started_at  TIMESTAMPTZ DEFAULT NOW(),
  trial_ends_at     TIMESTAMPTZ DEFAULT NOW() + INTERVAL '3 months',  -- D-022 free 3mo
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_families_slug         ON public.families(slug);
CREATE INDEX IF NOT EXISTS idx_families_owner        ON public.families(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_families_trial_ends   ON public.families(trial_ends_at);

-- --------------------------------------------------------------------
-- 2. family_settings (1:1 with families)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.family_settings (
  family_id          UUID PRIMARY KEY REFERENCES public.families(id) ON DELETE CASCADE,
  target_years       INTEGER NOT NULL DEFAULT 5
                     CHECK (target_years IN (3, 5, 7, 10)),         -- D-022 configurable
  age_min            INTEGER NOT NULL DEFAULT 5
                     CHECK (age_min BETWEEN 5 AND 16),
  age_max            INTEGER NOT NULL DEFAULT 16
                     CHECK (age_max BETWEEN 5 AND 16),
  max_kids           INTEGER NOT NULL DEFAULT 5
                     CHECK (max_kids BETWEEN 1 AND 5),              -- D-026 max 5
  chatbot_name       TEXT NOT NULL DEFAULT 'Cô Pany',               -- D-032 new-family default (D-030 per-family rename)
  chatbot_name_en    TEXT,                                          -- optional EN variant
  primary_lang       TEXT NOT NULL DEFAULT 'vi'
                     CHECK (primary_lang IN ('vi', 'en')),
  onboarding_step    TEXT NOT NULL DEFAULT '1'                      -- BB: family-onboarding wizard state
                     CHECK (onboarding_step IN ('1', '2', '3', 'done')),
  onboarding_completed_at TIMESTAMPTZ,
  parent_pin         TEXT NOT NULL DEFAULT '0000',                  -- 4-digit hash recommended in prod
  monthly_chat_cap   INTEGER NOT NULL DEFAULT 100,                  -- D-022 cost guardrail
  monthly_chat_used  INTEGER NOT NULL DEFAULT 0,
  cap_reset_at       TIMESTAMPTZ NOT NULL DEFAULT date_trunc('month', NOW()) + INTERVAL '1 month',
  custom_branding    JSONB,                                         -- enterprise tier only
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_age_range CHECK (age_min <= age_max)
);

-- --------------------------------------------------------------------
-- 3. family_kids (1:N — max 5 enforced via family_settings.max_kids + trigger)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.family_kids (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id     UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  position      INTEGER NOT NULL DEFAULT 1,           -- display order 1..5
  name          TEXT NOT NULL,
  age           INTEGER NOT NULL CHECK (age BETWEEN 5 AND 16),  -- D-028 single-year
  birthday      DATE,
  emoji         TEXT,
  color         TEXT,
  pin           TEXT NOT NULL DEFAULT '0000',
  school        TEXT,
  hobbies       TEXT,
  goals         TEXT,
  bio           TEXT,
  favorite_subject TEXT,
  active        BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (family_id, position)
);

CREATE INDEX IF NOT EXISTS idx_family_kids_family ON public.family_kids(family_id);

-- Trigger: enforce max_kids cap from family_settings
CREATE OR REPLACE FUNCTION public.enforce_max_kids()
RETURNS TRIGGER AS $$
DECLARE
  current_count INTEGER;
  cap_value INTEGER;
BEGIN
  SELECT COUNT(*) INTO current_count
  FROM public.family_kids
  WHERE family_id = NEW.family_id AND active = TRUE;

  SELECT max_kids INTO cap_value
  FROM public.family_settings
  WHERE family_id = NEW.family_id;

  IF current_count >= COALESCE(cap_value, 5) THEN
    RAISE EXCEPTION 'Đã đạt giới hạn % học viên cho gia đình này.', cap_value;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_enforce_max_kids ON public.family_kids;
CREATE TRIGGER trg_enforce_max_kids
  BEFORE INSERT ON public.family_kids
  FOR EACH ROW
  WHEN (NEW.active = TRUE)
  EXECUTE FUNCTION public.enforce_max_kids();

-- --------------------------------------------------------------------
-- 4. family_signup_requests (lead capture, mirrors Gia Phả pattern)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.family_signup_requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name     TEXT NOT NULL,
  parent_email    TEXT NOT NULL,
  parent_phone    TEXT,
  family_name     TEXT,                                -- optional 'họ' or family label
  kids_count      INTEGER NOT NULL DEFAULT 1,
  kids_ages       INTEGER[] NOT NULL DEFAULT '{}',     -- e.g., '{5, 9, 11}'
  source          TEXT,                                -- 'fb', 'zalo', 'friend-ref', 'dangky-direct'
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'provisioned', 'rejected', 'email_exists')),
  provisioned_family_id UUID REFERENCES public.families(id),
  error_message   TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at    TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_signup_status ON public.family_signup_requests(status);
CREATE INDEX IF NOT EXISTS idx_signup_email  ON public.family_signup_requests(parent_email);

-- --------------------------------------------------------------------
-- 5. family_progress (1 row per family-kid-day, append-only)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.family_progress (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id   UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  kid_id      UUID NOT NULL REFERENCES public.family_kids(id) ON DELETE CASCADE,
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  data        JSONB NOT NULL DEFAULT '{}',  -- streak, mood, quest_completed[], etc.
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (family_id, kid_id, date)
);

CREATE INDEX IF NOT EXISTS idx_progress_family_kid ON public.family_progress(family_id, kid_id);

-- --------------------------------------------------------------------
-- 6. family_chat_history (Đại Ka conversation log, for cap enforcement)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.family_chat_history (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id     UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  kid_id        UUID REFERENCES public.family_kids(id) ON DELETE SET NULL,
  role          TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content       TEXT NOT NULL,
  model         TEXT,                       -- 'haiku-4-5' / 'sonnet-4-6' / 'opus-4-7'
  token_count   INTEGER,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_family_date ON public.family_chat_history(family_id, created_at DESC);

-- --------------------------------------------------------------------
-- 7. Helper function: user_family_id() — used by RLS
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.user_family_id()
RETURNS UUID
LANGUAGE SQL STABLE
AS $$
  SELECT id FROM public.families
  WHERE owner_user_id = auth.uid()
  LIMIT 1;
$$;

-- --------------------------------------------------------------------
-- 8. RLS — enable + policies
-- --------------------------------------------------------------------
ALTER TABLE public.families               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_settings        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_kids            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_signup_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_progress        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_chat_history    ENABLE ROW LEVEL SECURITY;

-- Owners can SELECT/UPDATE their own family
CREATE POLICY family_owner_select ON public.families
  FOR SELECT USING (owner_user_id = auth.uid());

CREATE POLICY family_owner_update ON public.families
  FOR UPDATE USING (owner_user_id = auth.uid());

-- family_settings: scoped by family_id
CREATE POLICY fsettings_owner_all ON public.family_settings
  FOR ALL USING (family_id = public.user_family_id());

-- family_kids: scoped by family_id
CREATE POLICY fkids_owner_all ON public.family_kids
  FOR ALL USING (family_id = public.user_family_id());

-- family_progress: scoped
CREATE POLICY fprogress_owner_all ON public.family_progress
  FOR ALL USING (family_id = public.user_family_id());

-- family_chat_history: scoped
CREATE POLICY fchat_owner_all ON public.family_chat_history
  FOR ALL USING (family_id = public.user_family_id());

-- family_signup_requests: insert open (anon), read restricted to admin role
CREATE POLICY signup_anon_insert ON public.family_signup_requests
  FOR INSERT TO anon
  WITH CHECK (TRUE);

CREATE POLICY signup_admin_read ON public.family_signup_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.families
      WHERE slug = 'pany-admin'
        AND owner_user_id = auth.uid()
    )
  );

-- --------------------------------------------------------------------
-- 9. Auth trigger — auto-create families row on signup (when invoked via API)
-- --------------------------------------------------------------------
-- Note: We do NOT auto-create a family on every signup. The provisionFamily()
-- function in lib/family-provision.ts (port of Gia Phả clan-provision.ts)
-- handles the explicit family creation flow after lead form submission.

-- --------------------------------------------------------------------
-- 10. Seed: founding family (anh Bình)
-- --------------------------------------------------------------------
INSERT INTO public.families (slug, name, owner_user_id, status, tier, trial_ends_at)
VALUES (
  'tran-binh',
  'Gia đình Trần Đức Bình',
  NULL,  -- will be linked when anh signs in via auth
  'active',
  'premium',  -- founding family bypasses trial
  NULL
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.family_settings (family_id, target_years, age_min, age_max, max_kids, chatbot_name, primary_lang, monthly_chat_cap, onboarding_step, onboarding_completed_at)
SELECT id, 5, 5, 16, 5, 'Đại Ka', 'vi', 1000, 'done', NOW()
  -- D-032: founding family explicit override keeps 'Đại Ka' (zero-disruption for Phúc/An/Y from Sprint 1+2); cap 10×
  -- BB: founding family pre-marked onboarding_step='done' (already configured manually in Sprint 1)
FROM public.families
WHERE slug = 'tran-binh'
ON CONFLICT (family_id) DO NOTHING;

-- Seed 3 con of anh Bình
INSERT INTO public.family_kids (family_id, position, name, age, birthday, emoji, color, pin, bio, school)
SELECT id, 1, 'Phúc', 11, '2015-06-26', '🌟', '#FF6B9D', '1111', 'Trần Hạnh Phúc', 'Lên lớp 6 (9/2026)' FROM public.families WHERE slug = 'tran-binh'
ON CONFLICT DO NOTHING;

INSERT INTO public.family_kids (family_id, position, name, age, birthday, emoji, color, pin, bio, school)
SELECT id, 2, 'An', 9, '2017-08-30', '🚀', '#4DABF7', '2222', 'Trần Bình An', 'Lên lớp 4 (9/2026)' FROM public.families WHERE slug = 'tran-binh'
ON CONFLICT DO NOTHING;

INSERT INTO public.family_kids (family_id, position, name, age, birthday, emoji, color, pin, bio, school)
SELECT id, 3, 'Y', 5, '2020-02-28', '🎨', '#51CF66', '3333', 'Trần Như Ý', 'Vào lớp lá (9/2026)' FROM public.families WHERE slug = 'tran-binh'
ON CONFLICT DO NOTHING;

-- --------------------------------------------------------------------
-- 11. updated_at auto-update triggers
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_families_updated_at        BEFORE UPDATE ON public.families        FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_fsettings_updated_at       BEFORE UPDATE ON public.family_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_fkids_updated_at           BEFORE UPDATE ON public.family_kids     FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_fprogress_updated_at       BEFORE UPDATE ON public.family_progress FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

COMMIT;

-- ====================================================================
-- POST-MIGRATION VERIFICATION (run as SELECT after COMMIT)
-- ====================================================================
-- Expected row counts:
--   families:               1 (founding tran-binh)
--   family_settings:        1
--   family_kids:            3 (Phúc, An, Y)
--   family_signup_requests: 0
--   family_progress:        0
--   family_chat_history:    0

SELECT 'families' AS t, COUNT(*) FROM public.families
UNION ALL SELECT 'family_settings', COUNT(*) FROM public.family_settings
UNION ALL SELECT 'family_kids', COUNT(*) FROM public.family_kids
UNION ALL SELECT 'family_signup_requests', COUNT(*) FROM public.family_signup_requests
UNION ALL SELECT 'family_progress', COUNT(*) FROM public.family_progress
UNION ALL SELECT 'family_chat_history', COUNT(*) FROM public.family_chat_history;

-- Verify trigger works (should fail with our 5-cap):
-- INSERT INTO public.family_kids (family_id, position, name, age)
-- SELECT id, 6, 'Test', 10 FROM public.families WHERE slug = 'tran-binh';

-- ====================================================================
-- ROLLBACK BLOCK — emergency only
-- ====================================================================
-- BEGIN;
-- DROP TRIGGER IF EXISTS trg_enforce_max_kids ON public.family_kids;
-- DROP FUNCTION IF EXISTS public.enforce_max_kids();
-- DROP FUNCTION IF EXISTS public.user_family_id();
-- DROP FUNCTION IF EXISTS public.set_updated_at();
-- DROP TABLE IF EXISTS public.family_chat_history;
-- DROP TABLE IF EXISTS public.family_progress;
-- DROP TABLE IF EXISTS public.family_signup_requests;
-- DROP TABLE IF EXISTS public.family_kids;
-- DROP TABLE IF EXISTS public.family_settings;
-- DROP TABLE IF EXISTS public.families;
-- COMMIT;

-- ════════════════════════════════════════════════════════════════════
-- BLOCK C: FK stitch (profiles.family_id → families.id)
-- ════════════════════════════════════════════════════════════════════
BEGIN;
ALTER TABLE public.profiles
  ADD CONSTRAINT fk_profiles_family
  FOREIGN KEY (family_id) REFERENCES public.families(id) ON DELETE SET NULL;
COMMIT;

-- ════════════════════════════════════════════════════════════════════
-- POST-BUNDLE VERIFY: expect 7 tables (profiles + 6 family_*)
-- ════════════════════════════════════════════════════════════════════
SELECT table_name FROM information_schema.tables
  WHERE table_schema='public' AND table_name IN
  ('profiles','families','family_settings','family_kids',
   'family_signup_requests','family_progress','family_chat_history')
  ORDER BY table_name;
