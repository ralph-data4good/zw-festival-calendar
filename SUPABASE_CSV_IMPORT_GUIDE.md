# Supabase CSV Import Guide

## Overview
This guide explains how to import the sample events CSV into your Supabase database.

## Sample Data Included

The `sample_events_supabase_import.csv` file contains **15 diverse sample events**:

1. **Zero Waste Workshop** (Manila, Philippines) - In-person beginner workshop
2. **International Zero Waste Summit** (Quezon City, Philippines) - Hybrid 3-day conference
3. **Beach Cleanup** (Cebu, Philippines) - Community cleanup event
4. **Composting 101** (Jakarta, Indonesia) - Hands-on composting workshop
5. **Zero Waste Business Webinar** (Singapore) - Online business training
6. **Plastic-Free July Festival** (Bangkok, Thailand) - Large public festival
7. **Clothing Swap & Repair Café** (Kuala Lumpur, Malaysia) - Fashion sustainability event
8. **Zero Waste Campus Launch** (Ho Chi Minh City, Vietnam) - Hybrid student initiative
9. **Documentary Screening** (Manila, Philippines) - Film + panel discussion
10. **Corporate Training** (Jakarta, Indonesia) - Professional development
11. **Kids' Eco Camp** (Petaling Jaya, Malaysia) - Week-long children's program
12. **Urban Farming Workshop** (Bangkok, Thailand) - Food waste reduction
13. **Zero Waste Wedding Workshop** (Singapore) - Hybrid lifestyle event
14. **Community Repair Fair** (Quezon City, Philippines) - Free repair event
15. **Policy Webinar on EPR** (Online) - Policy discussion

## CSV Columns Explained

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `title` | TEXT | Event title | "Zero Waste Workshop: Getting Started" |
| `summary` | TEXT | Short description | "Learn the basics of zero waste living" |
| `description` | TEXT | Full description with formatting | Long text with line breaks |
| `start_datetime` | TIMESTAMPTZ | Start date/time in ISO 8601 | "2025-07-05T09:00:00Z" |
| `end_datetime` | TIMESTAMPTZ | End date/time in ISO 8601 | "2025-07-05T11:00:00Z" |
| `timezone` | TEXT | IANA timezone name | "Asia/Manila" |
| `all_day` | BOOLEAN | Is it an all-day event? | false |
| `modality` | ENUM | Event type | "in_person", "online", or "hybrid" |
| `country_code` | TEXT | ISO 2-letter country code | "PH" |
| `city` | TEXT | City name | "Manila" |
| `venue_name` | TEXT | Venue/location name | "EcoHub Manila" |
| `address` | TEXT | Full street address | "123 Green Street, Makati City" |
| `latitude` | NUMERIC | Latitude coordinate | 14.554729 |
| `longitude` | NUMERIC | Longitude coordinate | 121.024445 |
| `registration_url` | TEXT | Sign-up link | "https://example.com/register" |
| `livestream_url` | TEXT | Online stream link | "https://zoom.us/j/example123" |
| `organizer_name` | TEXT | Organization name | "Green Future Philippines" |
| `affiliation` | ENUM | Organizer type | "GAIA Member", "Ally/Partner", "Public", "Other" |
| `contact_person` | TEXT | Contact name | "Maria Santos" |
| `contact_email` | TEXT | Contact email (required) | "maria@greenfuture.ph" |
| `contact_phone` | TEXT | Contact phone | "+63-917-123-4567" |
| `languages` | ARRAY | Languages offered | "{English,Filipino}" |
| `accessibility` | ARRAY | Accessibility features | "{wheelchair-accessible,sign-language}" |
| `audience` | ARRAY | Target audience | "{beginners,families}" |
| `cost_type` | ENUM | Pricing type | "free", "paid", or "donation" |
| `cost_amount` | NUMERIC | Price amount | 5000 |
| `currency` | TEXT | ISO currency code | "PHP" |
| `cover_image_url` | TEXT | Event image URL | "https://images.unsplash.com/..." |
| `tags` | ARRAY | Event tags | "{workshop,beginner-friendly}" |
| `verification` | ENUM | Verification status | "unverified", "verified_org", "verified_gaia", "community" |
| `status` | ENUM | Event status | "draft", "under_review", "published", "archived" |

## How to Import into Supabase

### Method 1: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to your project at https://app.supabase.com
   - Navigate to **Table Editor** in the left sidebar

2. **Select the Events Table**
   - Click on the `events` table

3. **Import CSV**
   - Click the **"Insert"** dropdown → Select **"Import data from CSV"**
   - Upload `sample_events_supabase_import.csv`
   - Match the CSV columns to the database columns
   - Click **"Import"**

4. **Verify Import**
   - Check that all 15 events appear in the table
   - Verify that dates, arrays, and coordinates are correctly formatted

### Method 2: Using SQL Editor

If you prefer SQL, you can copy the SQL insert statements instead:

```sql
-- First, ensure you have categories (prerequisite)
INSERT INTO public.categories (name, icon) VALUES
  ('workshop', '🛠️'),
  ('conference', '🎤'),
  ('cleanup', '🧹'),
  ('webinar', '💻'),
  ('film-screening', '🎬'),
  ('campaign-launch', '🚀'),
  ('training', '📚')
ON CONFLICT (name) DO NOTHING;

-- Then import events using CSV upload or manual INSERT statements
```

### Method 3: Using Supabase CLI

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to your account
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Import CSV using a SQL script
supabase db push
```

## Important Notes

### Array Fields Format
Arrays in CSV use PostgreSQL array format: `{item1,item2,item3}`

Example:
- Languages: `{English,Filipino}`
- Tags: `{workshop,beginner-friendly,hands-on}`
- Accessibility: `{wheelchair-accessible,sign-language}`

### Date/Time Format
All dates are in ISO 8601 format with UTC timezone:
- Format: `YYYY-MM-DDTHH:MM:SSZ`
- Example: `2025-07-05T09:00:00Z`

### Country Codes
Use ISO 3166-1 alpha-2 country codes:
- PH = Philippines
- ID = Indonesia
- SG = Singapore
- TH = Thailand
- MY = Malaysia
- VN = Vietnam

### Enum Values
Make sure these match exactly (case-sensitive):

**Modality:**
- `in_person`
- `online`
- `hybrid`

**Affiliation:**
- `GAIA Member`
- `Ally/Partner`
- `Public`
- `Other`

**Cost Type:**
- `free`
- `paid`
- `donation`

**Verification:**
- `unverified`
- `verified_org`
- `verified_gaia`
- `community`

**Status:**
- `draft`
- `under_review`
- `published`
- `archived`

## After Import

### 1. Link Categories
The CSV doesn't include `category_id` references. You'll need to update events with category IDs:

```sql
-- Update events with category IDs
UPDATE public.events 
SET category_id = (SELECT id FROM public.categories WHERE name = 'workshop' LIMIT 1)
WHERE title LIKE '%Workshop%';

UPDATE public.events 
SET category_id = (SELECT id FROM public.categories WHERE name = 'conference' LIMIT 1)
WHERE title LIKE '%Summit%';

-- Repeat for other categories
```

### 2. Link Topics
Add topic relationships in the `event_topics` junction table:

```sql
-- Example: Link composting workshop to composting topic
INSERT INTO public.event_topics (event_id, topic_id)
SELECT e.id, t.id
FROM public.events e, public.topics t
WHERE e.title LIKE '%Composting%' 
  AND t.slug = 'composting';
```

### 3. Link Campaigns
Connect events to campaigns:

```sql
-- Example: Link July events to International Zero Waste Month
INSERT INTO public.event_campaigns (event_id, campaign_id)
SELECT e.id, c.id
FROM public.events e, public.campaigns c
WHERE c.slug = 'izwm-2025'
  AND EXTRACT(MONTH FROM e.start_datetime) = 7;
```

### 4. Create Organizers
If you want to link events to organizers instead of just using `organizer_name`:

```sql
-- Create organizers
INSERT INTO public.organizers (name, type, country_code, city) VALUES
  ('Green Future Philippines', 'NGO', 'PH', 'Manila'),
  ('GAIA Asia Pacific', 'Alliance', 'PH', 'Quezon City'),
  ('Ocean Warriors Cebu', 'NGO', 'PH', 'Cebu'),
  ('Komunitas Berkebun Jakarta', 'Community', 'ID', 'Jakarta')
ON CONFLICT DO NOTHING;

-- Link events to organizers
UPDATE public.events 
SET organizer_id = (SELECT id FROM public.organizers WHERE name = organizer_name LIMIT 1)
WHERE organizer_name IS NOT NULL;
```

## Troubleshooting

### Issue: Array fields not importing correctly
**Solution:** Ensure arrays are formatted as `{item1,item2}` without quotes around individual items (unless items contain commas or special characters)

### Issue: Date/time showing wrong timezone
**Solution:** Verify all timestamps end with `Z` for UTC, and the `timezone` column is set correctly

### Issue: Enum values rejected
**Solution:** Double-check enum values match exactly (case-sensitive)

### Issue: "violates foreign key constraint"
**Solution:** Import prerequisite tables first (categories, topics, campaigns, organizers) before importing events

## Customizing Sample Data

To modify the sample data:

1. Open `sample_events_supabase_import.csv` in a spreadsheet program (Excel, Google Sheets)
2. Edit any fields as needed
3. Export as CSV (UTF-8 encoding)
4. Re-import into Supabase

**Tips:**
- Keep header row intact
- Preserve array format `{item1,item2}`
- Use ISO date format
- Test with 1-2 rows first

## Additional Resources

- [Supabase CSV Import Documentation](https://supabase.com/docs/guides/database/import-data)
- [PostgreSQL COPY Command](https://www.postgresql.org/docs/current/sql-copy.html)
- [ISO 8601 Date Format](https://en.wikipedia.org/wiki/ISO_8601)
- [ISO 3166 Country Codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)

## Need More Sample Data?

If you need more events, you can:

1. Run the test data generator script:
   ```bash
   node scripts/generate-test-data.js
   ```

2. Use the generated `events.json` and convert to CSV format

3. Or duplicate existing rows in the CSV and modify the details

---

**Created:** October 28, 2024  
**For:** Zero Waste Festival 2025 - Supabase Integration  
**Status:** ✅ Ready to Import

