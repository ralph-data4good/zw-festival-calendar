-- ============================================================================
-- ZERO WASTE FESTIVAL 2025 - SUPABASE DATABASE SCHEMA
-- ============================================================================
-- Run this SQL in your Supabase SQL Editor to set up the complete database
-- ============================================================================

-- Create schema
CREATE SCHEMA IF NOT EXISTS public;

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE event_status AS ENUM ('draft', 'under_review', 'published', 'archived');
CREATE TYPE verification_level AS ENUM ('unverified', 'verified_org', 'verified_gaia', 'community');
CREATE TYPE modality AS ENUM ('in_person', 'online', 'hybrid');
CREATE TYPE affiliation AS ENUM ('GAIA Member', 'Ally/Partner', 'Public', 'Other');

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Organizers table
CREATE TABLE IF NOT EXISTS public.organizers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('NGO', 'School', 'LGU', 'National Agency', 'Alliance', 'Private', 'Community', 'Other')),
  country_code TEXT CHECK (char_length(country_code) = 2),
  city TEXT,
  address TEXT,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Partners table
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  country_code TEXT CHECK (char_length(country_code) = 2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Topics table (hierarchical)
CREATE TABLE IF NOT EXISTS public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  emoji TEXT,
  description TEXT,
  start_date DATE,
  end_date DATE,
  color TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Events table (main)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT,
  description TEXT,
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL,
  all_day BOOLEAN DEFAULT false,
  modality modality NOT NULL,
  country_code TEXT CHECK (char_length(country_code) = 2),
  city TEXT,
  venue_name TEXT,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  registration_url TEXT,
  livestream_url TEXT,
  organizer_id UUID REFERENCES public.organizers(id) ON DELETE SET NULL,
  organizer_name TEXT,
  affiliation affiliation,
  contact_person TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  languages TEXT[] DEFAULT '{}',
  accessibility TEXT[] DEFAULT '{}',
  audience TEXT[] DEFAULT '{}',
  cost_type TEXT CHECK (cost_type IN ('free', 'paid', 'donation')),
  cost_amount NUMERIC,
  currency TEXT,
  cover_image_url TEXT,
  poster_url TEXT, -- Legacy field for compatibility
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  verification verification_level DEFAULT 'unverified',
  status event_status NOT NULL DEFAULT 'under_review',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- JUNCTION TABLES
-- ============================================================================

-- Event-Topics (many-to-many)
CREATE TABLE IF NOT EXISTS public.event_topics (
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, topic_id)
);

-- Event-Campaigns (many-to-many)
CREATE TABLE IF NOT EXISTS public.event_campaigns (
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, campaign_id)
);

-- Event-Partners (many-to-many with ordering)
CREATE TABLE IF NOT EXISTS public.event_partners (
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
  position INT DEFAULT 0,
  PRIMARY KEY (event_id, partner_id)
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Updated timestamp function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS trg_events_updated ON public.events;
CREATE TRIGGER trg_events_updated 
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_organizers_updated ON public.organizers;
CREATE TRIGGER trg_organizers_updated 
  BEFORE UPDATE ON public.organizers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_partners_updated ON public.partners;
CREATE TRIGGER trg_partners_updated 
  BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- EVENTS POLICIES
-- ============================================================================

-- Public can read published events
CREATE POLICY "read_published_events"
ON public.events FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Anonymous users can insert new events (will be under_review)
CREATE POLICY "anon_insert_under_review"
ON public.events FOR INSERT
TO anon
WITH CHECK (status = 'under_review');

-- Admins can read all events
CREATE POLICY "admin_read_all_events"
ON public.events FOR SELECT
TO authenticated
USING (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- Admins can update events
CREATE POLICY "admin_update_events"
ON public.events FOR UPDATE
TO authenticated
USING (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- Admins can insert events
CREATE POLICY "admin_insert_events"
ON public.events FOR INSERT
TO authenticated
WITH CHECK (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- Admins can delete events
CREATE POLICY "admin_delete_events"
ON public.events FOR DELETE
TO authenticated
USING (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- ============================================================================
-- REFERENCE DATA POLICIES (Categories, Campaigns, Topics)
-- ============================================================================

-- Everyone can read categories
CREATE POLICY "read_categories"
ON public.categories FOR SELECT
TO anon, authenticated
USING (true);

-- Admins can manage categories
CREATE POLICY "admin_manage_categories"
ON public.categories FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- Everyone can read campaigns
CREATE POLICY "read_campaigns"
ON public.campaigns FOR SELECT
TO anon, authenticated
USING (true);

-- Admins can manage campaigns
CREATE POLICY "admin_manage_campaigns"
ON public.campaigns FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- Everyone can read topics
CREATE POLICY "read_topics"
ON public.topics FOR SELECT
TO anon, authenticated
USING (true);

-- Admins can manage topics
CREATE POLICY "admin_manage_topics"
ON public.topics FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- ============================================================================
-- ORGANIZERS & PARTNERS POLICIES
-- ============================================================================

-- Everyone can read organizers
CREATE POLICY "read_organizers"
ON public.organizers FOR SELECT
TO anon, authenticated
USING (true);

-- Admins can manage organizers
CREATE POLICY "admin_manage_organizers"
ON public.organizers FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- Everyone can read partners
CREATE POLICY "read_partners"
ON public.partners FOR SELECT
TO anon, authenticated
USING (true);

-- Admins can manage partners
CREATE POLICY "admin_manage_partners"
ON public.partners FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- ============================================================================
-- JUNCTION TABLES POLICIES
-- ============================================================================

-- Public can read event_topics for published events
CREATE POLICY "read_event_topics"
ON public.event_topics FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.events e
    WHERE e.id = event_id AND e.status = 'published'
  )
);

-- Admins can manage event_topics
CREATE POLICY "admin_manage_event_topics"
ON public.event_topics FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- Public can read event_campaigns for published events
CREATE POLICY "read_event_campaigns"
ON public.event_campaigns FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.events e
    WHERE e.id = event_id AND e.status = 'published'
  )
);

-- Admins can manage event_campaigns
CREATE POLICY "admin_manage_event_campaigns"
ON public.event_campaigns FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- Public can read event_partners for published events
CREATE POLICY "read_event_partners"
ON public.event_partners FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.events e
    WHERE e.id = event_id AND e.status = 'published'
  )
);

-- Admins can manage event_partners
CREATE POLICY "admin_manage_event_partners"
ON public.event_partners FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role' = 'admin') OR
  (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
);

-- ============================================================================
-- SEED DATA (Optional - for initial setup)
-- ============================================================================

-- Insert default categories
INSERT INTO public.categories (name, icon) VALUES
  ('Workshop', '🛠️'),
  ('Cleanup', '🧹'),
  ('Webinar', '💻'),
  ('Conference', '🎤'),
  ('Campaign Launch', '🚀'),
  ('Marketplace', '🛍️'),
  ('Film Screening', '🎬'),
  ('Training', '📚')
ON CONFLICT (name) DO NOTHING;

-- Insert campaigns
INSERT INTO public.campaigns (slug, title, emoji, description, start_date, end_date, featured) VALUES
  ('izwm-2025', 'International Zero Waste Month 2025', '🌍', 'The flagship global campaign celebrating zero waste throughout July', '2025-07-01', '2025-07-31', true),
  ('plastic-free-july', 'Plastic Free July', '🚫', 'Challenge yourself to refuse single-use plastics', '2025-07-01', '2025-07-31', true),
  ('world-ocean-day', 'World Ocean Day', '🌊', 'Protecting our oceans from plastic pollution', '2025-06-08', '2025-06-08', true),
  ('zero-waste-week', 'Zero Waste Week', '♻️', 'Annual week of waste reduction action', '2025-09-01', '2025-09-07', false)
ON CONFLICT (slug) DO NOTHING;

-- Insert topics
INSERT INTO public.topics (slug, name) VALUES
  ('waste-reduction', 'Waste Reduction'),
  ('composting', 'Composting'),
  ('recycling', 'Recycling'),
  ('plastic-free', 'Plastic-Free Living'),
  ('circular-economy', 'Circular Economy'),
  ('upcycling', 'Upcycling'),
  ('sustainable-fashion', 'Sustainable Fashion'),
  ('food-waste', 'Food Waste'),
  ('eco-friendly-products', 'Eco-Friendly Products'),
  ('community-engagement', 'Community Engagement'),
  ('zero-waste-lifestyle', 'Zero Waste Lifestyle'),
  ('ocean-conservation', 'Ocean Conservation')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- HELPFUL VIEWS (Optional - for admin dashboard)
-- ============================================================================

-- View for events with full details
CREATE OR REPLACE VIEW public.events_full AS
SELECT 
  e.*,
  c.name as category_name,
  o.name as organizer_full_name,
  ARRAY_AGG(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL) as topic_names,
  ARRAY_AGG(DISTINCT camp.title) FILTER (WHERE camp.title IS NOT NULL) as campaign_names,
  ARRAY_AGG(DISTINCT p.name) FILTER (WHERE p.name IS NOT NULL) as partner_names
FROM public.events e
LEFT JOIN public.categories c ON e.category_id = c.id
LEFT JOIN public.organizers o ON e.organizer_id = o.id
LEFT JOIN public.event_topics et ON e.id = et.event_id
LEFT JOIN public.topics t ON et.topic_id = t.id
LEFT JOIN public.event_campaigns ec ON e.id = ec.event_id
LEFT JOIN public.campaigns camp ON ec.campaign_id = camp.id
LEFT JOIN public.event_partners ep ON e.id = ep.event_id
LEFT JOIN public.partners p ON ep.partner_id = p.id
GROUP BY e.id, c.name, o.name;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Zero Waste Festival 2025 database schema created successfully!';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Create Storage buckets: posters, logos (with public read access)';
  RAISE NOTICE '2. Set up admin users with role=admin in app_metadata';
  RAISE NOTICE '3. Deploy the Edge Function for email notifications';
  RAISE NOTICE '4. Update your .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY';
  RAISE NOTICE '';
END $$;

