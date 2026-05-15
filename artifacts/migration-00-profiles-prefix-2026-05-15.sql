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
