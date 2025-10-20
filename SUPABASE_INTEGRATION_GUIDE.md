# Supabase Integration - Complete Setup Guide

This guide walks you through integrating your Zero Waste Festival 2025 app with Supabase for production-ready data management, authentication, and email notifications.

## 📋 **Pre-requisites**

- Supabase account (https://supabase.com - free tier available)
- Resend account for emails (https://resend.com - free tier: 100 emails/day)
- Node.js 18+ and npm

## 🚀 **Quick Start (5 Steps)**

### **Step 1: Create Supabase Project**

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in:
   - Name: `zero-waste-festival-2025`
   - Database Password: (secure password)
   - Region: (closest to your users)
4. Wait for project to initialize (~2 minutes)

### **Step 2: Run Database Setup**

1. Open Supabase SQL Editor
2. Copy contents of `SUPABASE_SETUP.sql`
3. Paste and click "Run"
4. Verify success message appears

This creates:
- ✅ All tables (events, organizers, partners, etc.)
- ✅ RLS policies (security rules)
- ✅ Triggers (auto-update timestamps)
- ✅ Seed data (categories, campaigns, topics)

### **Step 3: Create Storage Buckets**

1. Go to **Storage** in Supabase Dashboard
2. Click "New bucket"
3. Create `posters` bucket:
   - Name: `posters`
   - Public: ✅ **Yes**
4. Create `logos` bucket:
   - Name: `logos`
   - Public: ✅ **Yes**

### **Step 4: Install Dependencies**

```bash
npm install @supabase/supabase-js
```

### **Step 5: Configure Environment**

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key_here
VITE_ADMIN_EMAILS=admin@example.com
```

Get these from: **Settings** → **API** in Supabase Dashboard

---

## 📧 **Email Notifications Setup**

### **1. Get Resend API Key**

1. Go to https://resend.com
2. Sign up (free: 100 emails/day)
3. Verify your domain (or use test domain)
4. Go to **API Keys** → Create
5. Copy the key

### **2. Deploy Edge Function**

Using Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy function
supabase functions deploy event-mailer

# Set secrets
supabase secrets set RESEND_API_KEY=re_xxxxx
supabase secrets set FROM_EMAIL=events@zerowaste.asia
supabase secrets set ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

Or use the Dashboard:
1. Go to **Edge Functions**
2. Click "New Function"
3. Name: `event-mailer`
4. Paste contents of `supabase/functions/event-mailer/index.ts`
5. Go to **Secrets** and add the 3 secrets above

### **3. Test Email Function**

```bash
curl -X POST \
  'https://YOUR_PROJECT.supabase.co/functions/v1/event-mailer' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "submitted",
    "event": {
      "id": "test-123",
      "title": "Test Event",
      "contact_person": "John Doe",
      "contact_email": "test@example.com",
      "start_datetime": "2025-07-15T10:00:00Z",
      "end_datetime": "2025-07-15T12:00:00Z",
      "modality": "in_person",
      "city": "Manila",
      "country_code": "PH",
      "timezone": "Asia/Manila"
    },
    "adminUrl": "https://yoursite.com/admin/events/test-123",
    "publicUrl": "https://yoursite.com/event/test-123"
  }'
```

Expected: 2 emails sent (to organizer + admins)

---

## 👥 **Admin User Setup**

Admin users need `role: admin` in their JWT claims.

### **Method 1: SQL (Recommended for MVP)**

```sql
-- First, create an admin account in Supabase Auth UI
-- Then run this SQL to grant admin role:

UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@zerowaste.asia';
```

### **Method 2: Auth Hook (Production)**

Create a Postgres function that automatically sets role on sign-in based on an admin emails table.

---

## 🔄 **Migrating from JSON to Supabase**

The app currently uses JSON files in `public/festival-2025/data/`. Here's how to migrate:

### **Option A: Keep Both (Gradual Migration)**

The app detects if Supabase is configured and falls back to JSON if not.

```javascript
// In store.js
const isSupabaseAvailable = isSupabaseConfigured();

if (isSupabaseAvailable) {
  // Use Supabase API
  const data = await listPublishedEvents();
} else {
  // Use JSON files (current)
  const data = await fetch('/festival-2025/data/events.json');
}
```

### **Option B: Full Migration (Recommended)**

1. Export existing JSON data
2. Transform to Supabase format
3. Insert via SQL or API
4. Update all API calls to use `apiSupabase.js`

**Migration Script Example:**

```javascript
// scripts/migrate-to-supabase.js
import { supabase } from '../src/services/supabase.js';
import events from '../public/festival-2025/data/events.json';

async function migrate() {
  for (const event of events) {
    const { data, error } = await supabase
      .from('events')
      .insert({
        title: event.title,
        summary: event.summary,
        description: event.description,
        start_datetime: event.start_datetime,
        end_datetime: event.end_datetime,
        timezone: event.timezone,
        modality: event.modality.toLowerCase().replace('-', '_'),
        country_code: event.country,
        city: event.city,
        venue_name: event.venue_name,
        address: event.address,
        latitude: event.latitude,
        longitude: event.longitude,
        organizer_name: event.organizer_name,
        contact_person: event.organizer_name,
        contact_email: event.contact_email || 'info@zerowaste.asia',
        cover_image_url: event.poster_url,
        status: 'published', // Assume existing events are published
      });
    
    if (error) console.error('Failed:', event.title, error);
    else console.log('Migrated:', event.title);
  }
}

migrate();
```

Run with: `node scripts/migrate-to-supabase.js`

---

## 🎯 **Testing the Integration**

### **1. Test Public Event Submission**

1. Go to `/register`
2. Fill out the form
3. Click Submit
4. Check:
   - ✅ Event appears in Supabase (status: `under_review`)
   - ✅ Email sent to organizer (acknowledgment)
   - ✅ Email sent to admins (review notification)

### **2. Test Admin Login**

1. Go to `/admin/login`
2. Sign in with admin account
3. Check:
   - ✅ Redirected to `/admin`
   - ✅ See list of pending events
   - ✅ Can open event for editing

### **3. Test Admin Publish**

1. In admin dashboard, find an event
2. Click "Publish"
3. Check:
   - ✅ Event status changes to `published`
   - ✅ Event appears on public `/calendar`
   - ✅ Email sent to organizer (publication notice)

---

## 📊 **Database Schema Overview**

### **Core Tables:**
- `events` - Main event data
- `organizers` - Event organizers
- `partners` - Event partners/sponsors
- `categories` - Event types (workshop, cleanup, etc.)
- `topics` - Event topics/themes
- `campaigns` - Festival campaigns (IZWM, Plastic Free July)

### **Junction Tables:**
- `event_topics` - Many-to-many: events ↔ topics
- `event_campaigns` - Many-to-many: events ↔ campaigns
- `event_partners` - Many-to-many: events ↔ partners

### **Event Status Flow:**
```
draft → under_review → published → archived
```

### **Modality Types:**
```
in_person | online | hybrid
```

---

## 🔒 **Security (RLS Policies)**

### **Public (Anon) Can:**
- ✅ Read published events
- ✅ Read reference data (categories, campaigns, topics)
- ✅ Insert new events (as `under_review` only)

### **Public (Anon) Cannot:**
- ❌ Read events with status `under_review`, `draft`, `archived`
- ❌ Update or delete events
- ❌ Directly publish events

### **Admins (Authenticated with role=admin) Can:**
- ✅ Read ALL events (any status)
- ✅ Update events (including change status)
- ✅ Delete events
- ✅ Manage reference data

---

## 🚢 **Deployment**

### **Frontend (Vercel/Netlify)**

1. Add environment variables in dashboard:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   VITE_ADMIN_EMAILS=...
   ```

2. Deploy as usual

### **Edge Function**

Already deployed to Supabase (runs on Deno Deploy)

---

## 🐛 **Troubleshooting**

### **Issue: "Supabase not configured" error**

**Cause:** Environment variables not loaded  
**Fix:** Ensure `.env` file exists and contains correct values. Restart dev server.

### **Issue: Admin can't see events**

**Cause:** User doesn't have `role: admin` claim  
**Fix:** Run SQL to update user's `raw_app_meta_data`:
```sql
UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb WHERE email = 'admin@example.com';
```

### **Issue: Emails not sending**

**Causes:**
1. RESEND_API_KEY not set in Edge Function secrets
2. FROM_EMAIL not verified in Resend
3. ADMIN_EMAILS format incorrect (should be comma-separated)

**Fix:** 
- Check Edge Function logs in Supabase Dashboard
- Verify secrets are set correctly
- Test with Resend test domain first

### **Issue: RLS policy violations**

**Error:** "new row violates row-level security policy"  
**Cause:** Trying to insert/update without proper permissions  
**Fix:** Check that:
- Public submissions set `status = 'under_review'`
- Admin requests include valid JWT with `role = 'admin'`

### **Issue: Storage upload fails**

**Error:** "Policy violation" on storage bucket  
**Cause:** Bucket policies not set correctly  
**Fix:** 
1. Ensure buckets are public
2. Run storage policy SQL (see SUPABASE_SETUP.sql)

---

## 📈 **Next Steps**

Once basic integration works:

1. **Analytics:** Add event view tracking
2. **Search:** Implement full-text search with `ts_vector`
3. **Realtime:** Subscribe to event updates for live admin dashboard
4. **Caching:** Add Redis/Cloudflare for published events
5. **CDN:** Use Cloudflare Images for poster optimization
6. **i18n:** Multi-language email templates
7. **Webhooks:** Slack/Discord notifications for new submissions

---

## 📚 **Resources**

- [Supabase Docs](https://supabase.com/docs)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Resend Docs](https://resend.com/docs)
- [MapLibre GL JS](https://maplibre.org/)

---

## ✅ **Success Criteria**

Your Supabase integration is complete when:

- [x] Database schema created with all tables
- [x] RLS policies active and tested
- [x] Storage buckets created (posters, logos)
- [x] Environment variables configured
- [x] Public can submit events (→ `under_review`)
- [x] Emails send on submission
- [x] Admin can login and see dashboard
- [x] Admin can publish events
- [x] Emails send on publication
- [x] Published events appear on public calendar
- [x] Published events appear on map

---

**Status:** Ready for implementation!  
**Estimated Time:** 2-3 hours for full setup  
**Difficulty:** Intermediate

Let's build a production-ready Zero Waste Festival platform! 🌍♻️

