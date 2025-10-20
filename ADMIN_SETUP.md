# Admin Site Setup Guide

This guide explains how to set up and use the Admin site for managing Zero Waste Festival 2025 event submissions.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [Admin User Creation](#admin-user-creation)
5. [Using the Admin Site](#using-the-admin-site)
6. [Email Notifications](#email-notifications)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The Admin site is a protected section of the Zero Waste Festival app where authorized administrators can:

- Review pending event submissions
- Edit event details
- Publish or archive events
- Send email notifications to organizers

**Admin Routes:**
- `/admin/login` - Admin login page
- `/admin` - Admin dashboard (lists all events)
- `/admin/events/pending` - Pending review events
- `/admin/events/published` - Published events
- `/admin/events/archived` - Archived events
- `/admin/events/:id` - Edit specific event

---

## Features

### 1. Authentication & Authorization

- **Email/password authentication** via Supabase Auth
- **Role-based access control** - only users with `role: 'admin'` can access admin routes
- **Session persistence** - stay logged in across browser sessions
- **Protected routes** - automatic redirect to login if not authenticated

### 2. Event Management Dashboard

- **Status filters**: Pending, Published, Archived
- **Search functionality**: Search by title, organizer, or city
- **Quick actions**: Publish, Archive, Edit, View
- **Visual status badges**: Color-coded event status indicators
- **Responsive design**: Works on desktop and mobile

### 3. Event Editor

- **Full event editing**: All event fields are editable
- **Interactive map picker**: Visual location selection with auto-geocoding
- **Form validation**: Required fields and data types
- **Save changes**: Update event details
- **Status actions**: Publish or archive directly from editor

### 4. Email Notifications

- **Submission acknowledgment**: Sent to organizer when they submit an event
- **Publication notification**: Sent to organizer when admin publishes their event
- **Admin alerts**: Notify admins of new submissions (optional)

---

## Setup Instructions

### Step 1: Supabase Configuration

1. **Run the SQL schema** (if not already done):
   ```bash
   # In Supabase SQL Editor, run:
   SUPABASE_SETUP.sql
   ```

2. **Configure environment variables**:
   
   Create a `.env` file in the project root:
   ```bash
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   Find these values in: **Supabase Dashboard** → **Settings** → **API**

3. **Verify RLS policies**:
   
   Ensure these policies are enabled:
   - `admin_read_events` - Admins can read all events
   - `admin_modify_events` - Admins can update events
   - `admin_insert_events` - Admins can create events

### Step 2: Create Storage Buckets

1. Go to **Supabase Dashboard** → **Storage**

2. Create two public buckets:
   - `posters` (for event posters)
   - `logos` (for organization/partner logos)

3. Set **public read access** on both buckets

### Step 3: Deploy Edge Function (Optional)

For email notifications, deploy the Edge Function:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Deploy the email function
supabase functions deploy event-mailer
```

**Edge Function file**: `supabase/functions/event-mailer/index.ts`

Configure secrets:
```bash
supabase secrets set RESEND_API_KEY=your-resend-key
supabase secrets set ADMIN_EMAIL=admin@zerowaste.asia
```

---

## Admin User Creation

### Method 1: Via Supabase Dashboard (Recommended)

1. Go to **Supabase Dashboard** → **Authentication** → **Users**

2. Click **"Add user"**

3. Enter admin email and password

4. After creation, click on the user and go to **"User Metadata"**

5. Add this JSON to **app_metadata**:
   ```json
   {
     "role": "admin"
   }
   ```

6. Save changes

### Method 2: Via SQL

```sql
-- Create admin user with role
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, raw_app_meta_data)
VALUES (
  'admin@zerowaste.asia',
  crypt('your-secure-password', gen_salt('bf')),
  now(),
  '{"role": "admin"}'::jsonb
);
```

### Method 3: Via Supabase Auth API

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://your-project.supabase.co',
  'YOUR_SERVICE_ROLE_KEY' // ⚠️ Use service_role key, not anon key
);

const { data, error } = await supabase.auth.admin.createUser({
  email: 'admin@zerowaste.asia',
  password: 'secure-password',
  email_confirm: true,
  user_metadata: { role: 'admin' }
});
```

---

## Using the Admin Site

### 1. Login

1. Navigate to `/admin/login`
2. Enter your admin email and password
3. Click **"Sign In"**

If successful, you'll be redirected to the admin dashboard.

### 2. Dashboard Overview

The dashboard shows three tabs:

- **Pending** 🕒 - Newly submitted events awaiting review
- **Published** ✅ - Live events visible on the public site
- **Archived** 📦 - Past or hidden events

**Badge indicators:**
- Yellow badge = Pending count
- Green badge = Published count
- Gray badge = Archived count

### 3. Reviewing Events

**For each pending event, you can:**

1. **View details**: Click event card to see full information
2. **Edit**: Click "Edit" to modify event details
3. **Publish**: Click "Publish" to make event live
   - Sends email to organizer
   - Makes event visible on public calendar
4. **Archive**: Click "Archive" to hide event

### 4. Editing Events

1. Click **"Edit"** on any event
2. Modify fields as needed:
   - Basic info (title, summary, description)
   - Date & time
   - Location (with map picker)
   - Organizer & contact details
   - Category & media
3. Click **"Save Changes"**

**Map Picker:**
- Click on map to set event location
- Address, city, and country auto-fill
- Drag marker to adjust position

### 5. Publishing Workflow

1. Review submission details
2. Edit if necessary
3. Click **"Publish Event"**
4. Confirm action
5. Event becomes visible on public site
6. Organizer receives email notification

### 6. Search & Filters

Use the **search box** to find events by:
- Event title
- Organizer name
- City

Switch between status tabs to filter by:
- `under_review` (pending)
- `published` (live)
- `archived` (hidden)

---

## Email Notifications

### Email Types

1. **Submission Acknowledgment** (`submitted`)
   - **To**: Event organizer
   - **When**: Event is submitted via registration form
   - **Content**: Confirmation + review timeline

2. **Publication Notice** (`published`)
   - **To**: Event organizer
   - **When**: Admin publishes event
   - **Content**: Congratulations + public event URL

3. **Admin Alert** (optional)
   - **To**: Admin team
   - **When**: New event submitted
   - **Content**: Summary + admin review link

### Email Service Setup

**Option 1: Resend (Recommended)**

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Set Supabase secret:
   ```bash
   supabase secrets set RESEND_API_KEY=re_xxx
   ```

**Option 2: Mailgun**

1. Sign up at [mailgun.com](https://mailgun.com)
2. Get API key and domain
3. Modify Edge Function to use Mailgun API

**Option 3: SMTP**

1. Use your own SMTP server
2. Modify Edge Function to use nodemailer or similar

### Testing Email Notifications

1. Submit a test event via `/register`
2. Check organizer email for acknowledgment
3. Login to admin and publish the event
4. Check organizer email for publication notice

---

## Troubleshooting

### Issue: "Access denied. Admin privileges required"

**Cause**: User doesn't have `role: 'admin'` in app_metadata

**Fix**:
1. Go to Supabase Dashboard → Authentication → Users
2. Find the user
3. Add `{"role": "admin"}` to app_metadata
4. Save and try logging in again

### Issue: "Supabase not configured"

**Cause**: Missing `.env` file or incorrect credentials

**Fix**:
1. Check `.env` file exists in project root
2. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
3. Restart dev server: `npm run dev`

### Issue: RLS Policy Error

**Cause**: Row Level Security policies not properly configured

**Fix**:
1. Re-run `SUPABASE_SETUP.sql` in SQL Editor
2. Verify policies exist:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'events';
   ```
3. Check that authenticated users have admin role claim

### Issue: Email notifications not working

**Cause**: Edge Function not deployed or secrets missing

**Fix**:
1. Deploy Edge Function:
   ```bash
   supabase functions deploy event-mailer
   ```
2. Set secrets:
   ```bash
   supabase secrets set RESEND_API_KEY=your-key
   supabase secrets set ADMIN_EMAIL=your-admin-email
   ```
3. Check Edge Function logs:
   ```bash
   supabase functions logs event-mailer
   ```

### Issue: Map picker not showing

**Cause**: MapLibre GL JS not loaded or CSS missing

**Fix**:
1. Check `maplibre-gl` is installed:
   ```bash
   npm install maplibre-gl
   ```
2. Verify CSS import in `MapPicker.jsx`:
   ```javascript
   import "maplibre-gl/dist/maplibre-gl.css";
   ```
3. Clear browser cache and reload

### Issue: Can't see admin routes

**Cause**: Router not properly configured

**Fix**:
1. Check `src/app/router.jsx` includes admin routes
2. Verify imports:
   ```javascript
   import AdminLogin from '../pages/admin/AdminLogin';
   import AdminLayout from '../pages/admin/AdminLayout';
   import AdminEvents from '../pages/admin/AdminEvents';
   import AdminEventEdit from '../pages/admin/AdminEventEdit';
   ```
3. Restart dev server

---

## Security Best Practices

### 1. Environment Variables

- ✅ **DO** keep `.env` in `.gitignore`
- ✅ **DO** use different credentials for dev and production
- ❌ **DON'T** commit `.env` to version control
- ❌ **DON'T** expose `service_role` key client-side

### 2. Admin Role Management

- ✅ **DO** use `app_metadata` for role storage (secure)
- ✅ **DO** verify admin role on every protected action
- ❌ **DON'T** store role in `user_metadata` (user-editable)
- ❌ **DON'T** rely solely on client-side checks

### 3. RLS Policies

- ✅ **DO** enable RLS on all tables
- ✅ **DO** use `auth.jwt()` to check roles in policies
- ✅ **DO** test policies with different user roles
- ❌ **DON'T** bypass RLS with `service_role` key on client

### 4. Authentication

- ✅ **DO** use strong passwords for admin accounts
- ✅ **DO** enable email confirmation
- ✅ **DO** implement password reset flow
- ❌ **DON'T** share admin credentials
- ❌ **DON'T** use default/weak passwords

---

## Next Steps

1. ✅ **Create your first admin user**
2. ✅ **Login to admin site** (`/admin/login`)
3. ✅ **Test event submission** via `/register`
4. ✅ **Review and publish** the test event
5. ✅ **Configure email notifications** (optional)
6. ✅ **Train your admin team** on the workflow

---

## Related Documentation

- [Supabase Integration Guide](./SUPABASE_INTEGRATION_GUIDE.md)
- [Database Schema](./SUPABASE_SETUP.sql)
- [Environment Setup](./ENV_SETUP.md)
- [Edge Function Guide](./supabase/functions/event-mailer/README.md)

---

**Need help?** Check the [Troubleshooting](#troubleshooting) section or contact the development team.

