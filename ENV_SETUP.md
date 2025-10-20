# Environment Variables Setup

## Local Development

Create a `.env` file in the project root with the following variables:

```env
# SUPABASE CONFIGURATION
# Get these from: https://app.supabase.com/project/YOUR_PROJECT/settings/api
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key_here

# ADMIN EMAILS (comma-separated, for notifications)
VITE_ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

## Edge Function Secrets

Set these in the Supabase Dashboard:
https://app.supabase.com/project/YOUR_PROJECT/settings/secrets

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=events@zerowaste.asia
ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

## How to Get Supabase Credentials

1. Go to https://app.supabase.com
2. Create a new project or select existing
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## How to Get Resend API Key

1. Go to https://resend.com/
2. Sign up for an account (free tier available)
3. Verify your domain or use Resend's test domain
4. Go to **API Keys** → **Create API Key**
5. Copy the key → `RESEND_API_KEY`

## Setting Admin Users

Admin users need the `role: admin` claim in their JWT. Set this in Supabase:

### Option 1: Via SQL (Recommended)
```sql
-- Update a user's app_metadata to include admin role
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@example.com';
```

### Option 2: Via Auth Hook (Advanced)
Create a database hook that sets the role on user creation/sign-in.

## Storage Buckets

Create these buckets in Supabase Storage:

1. **posters** (public read, authenticated write)
   - For event poster images
   
2. **logos** (public read, authenticated write)
   - For organization/partner logos

### Creating Buckets:
1. Go to **Storage** in Supabase Dashboard
2. Click **New bucket**
3. Name: `posters`, Public: ✅
4. Repeat for `logos`

### Setting Bucket Policies:
```sql
-- Allow public read
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'posters');

-- Allow authenticated insert
CREATE POLICY "Authenticated insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'posters');

-- Repeat for 'logos' bucket
```

