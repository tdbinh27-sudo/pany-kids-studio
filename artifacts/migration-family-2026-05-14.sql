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
  chatbot_name       TEXT NOT NULL DEFAULT 'Đại Ka',                -- D-030 per-family rename
  chatbot_name_en    TEXT,                                          -- optional EN variant
  primary_lang       TEXT NOT NULL DEFAULT 'vi'
                     CHECK (primary_lang IN ('vi', 'en')),
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

INSERT INTO public.family_settings (family_id, target_years, age_min, age_max, max_kids, chatbot_name, primary_lang, monthly_chat_cap)
SELECT id, 5, 5, 16, 5, 'Đại Ka', 'vi', 1000  -- founding family has 10× cap
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
