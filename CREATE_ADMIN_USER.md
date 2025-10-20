# 🔐 Create Admin User - Step by Step

## ✅ Complete Checklist

### Part 1: Supabase Project Setup

- [ ] **1.1** Go to https://supabase.com
- [ ] **1.2** Sign up or login
- [ ] **1.3** Click "New Project"
- [ ] **1.4** Enter project details:
  - Name: `Zero-Waste-Festival-2025`
  - Database Password: (create and save it!)
  - Region: Choose closest to you
- [ ] **1.5** Click "Create new project"
- [ ] **1.6** ⏳ Wait 2-3 minutes for initialization

---

### Part 2: Database Schema

- [ ] **2.1** Click "SQL Editor" in left sidebar
- [ ] **2.2** Open `SUPABASE_SETUP.sql` from this project
- [ ] **2.3** Copy ALL contents (Ctrl+A, Ctrl+C)
- [ ] **2.4** Paste into SQL Editor in Supabase
- [ ] **2.5** Click "Run" button (bottom right)
- [ ] **2.6** Verify you see "Success. No rows returned"

---

### Part 3: Create Admin User

- [ ] **3.1** Go to "Authentication" → "Users" (left sidebar)
- [ ] **3.2** Click "Add user" button (top right)
- [ ] **3.3** Fill in the form:
  ```
  Email: admin@zerowaste.asia
  Password: [create strong password - SAVE THIS!]
  Auto Confirm User: ✅ CHECK THIS BOX
  ```
- [ ] **3.4** Click "Create user"
- [ ] **3.5** Find the user in the list and click on it
- [ ] **3.6** Scroll to "User Metadata" section
- [ ] **3.7** Find `app_metadata` (NOT user_metadata!)
- [ ] **3.8** Click "Edit" next to `app_metadata`
- [ ] **3.9** Enter this JSON exactly:
  ```json
  {
    "role": "admin"
  }
  ```
- [ ] **3.10** Click "Save"

---

### Part 4: Get Supabase Credentials

- [ ] **4.1** Go to "Settings" → "API" (left sidebar)
- [ ] **4.2** Copy "Project URL" (looks like: `https://xxxxx.supabase.co`)
- [ ] **4.3** Copy "anon/public" key (long string starting with `eyJ...`)

---

### Part 5: Configure Your App

- [ ] **5.1** In your project folder, create a new file: `.env`
- [ ] **5.2** Add these lines (replace with YOUR values):
  ```
  VITE_SUPABASE_URL=https://your-project-id.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- [ ] **5.3** Save the file

---

### Part 6: Create Storage Buckets

- [ ] **6.1** Go to "Storage" in Supabase Dashboard
- [ ] **6.2** Click "Create bucket"
- [ ] **6.3** Create first bucket:
  - Name: `posters`
  - Public: ✅ CHECK THIS
- [ ] **6.4** Click "Create bucket"
- [ ] **6.5** Repeat for second bucket:
  - Name: `logos`
  - Public: ✅ CHECK THIS

---

### Part 7: Test Admin Login

- [ ] **7.1** Stop dev server if running (Ctrl+C)
- [ ] **7.2** Start dev server: `npm run dev`
- [ ] **7.3** Open browser: `http://localhost:3005/admin/login`
- [ ] **7.4** Enter your admin credentials:
  - Email: `admin@zerowaste.asia`
  - Password: [the password you created]
- [ ] **7.5** Click "Sign In"
- [ ] **7.6** ✅ You should see the admin dashboard!

---

## 🎯 Your Admin Credentials

**Save these securely!**

```
Admin Email:    admin@zerowaste.asia
Admin Password: [your password]
Login URL:      http://localhost:3005/admin/login
```

---

## 🐛 Troubleshooting

### Problem: "Access denied. Admin privileges required"

**Cause**: The `role: admin` wasn't set correctly

**Fix**:
1. Go to Supabase Dashboard → Authentication → Users
2. Click on your admin user
3. Look at `app_metadata` (NOT `user_metadata`)
4. It should show: `{"role": "admin"}`
5. If not, edit it and add that JSON
6. Save and try logging in again

---

### Problem: "Supabase not configured"

**Cause**: `.env` file missing or incorrect

**Fix**:
1. Check `.env` file exists in project root
2. Check it has both variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Check values are correct (from Supabase Dashboard → Settings → API)
4. Restart dev server: `npm run dev`

---

### Problem: "Invalid email or password"

**Cause**: Credentials don't match

**Fix**:
1. Double-check the email you entered
2. Try resetting password in Supabase Dashboard:
   - Go to Authentication → Users
   - Click on user
   - Scroll to "Update user"
   - Enter new password
   - Save

---

### Problem: SQL script fails

**Cause**: Syntax error or partial execution

**Fix**:
1. Go to Supabase Dashboard → SQL Editor
2. Create a new query
3. Copy `SUPABASE_SETUP.sql` contents again
4. Make sure you copy EVERYTHING (top to bottom)
5. Paste and run
6. If errors appear, screenshot them and check the line numbers

---

## 🔄 Alternative Methods

### Method 2: Via SQL

If you prefer SQL, run this in the SQL Editor:

```sql
-- Create admin user with SQL
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@zerowaste.asia',
  crypt('YourStrongPassword123!', gen_salt('bf')),
  NOW(),
  '{"role": "admin"}'::jsonb,
  '{}'::jsonb,
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

**Replace** `YourStrongPassword123!` with your own strong password!

---

### Method 3: Via Supabase CLI

If you have Supabase CLI installed:

```bash
# Install CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-ref

# Create user via SQL
supabase db execute "INSERT INTO auth.users ..."
```

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] Can login at `http://localhost:3005/admin/login`
- [ ] See "Admin Panel" after login
- [ ] Can navigate to different admin pages
- [ ] Can see "Pending" / "Published" / "Archived" tabs
- [ ] User info shows in bottom left of admin sidebar
- [ ] Can click "Sign Out" successfully

---

## 📝 What's Next?

Once logged in as admin, you can:

1. **Review pending submissions**
   - Go to "Pending" tab
   - See events submitted via `/register`

2. **Edit events**
   - Click "Edit" on any event
   - Modify details
   - Update location on map

3. **Publish events**
   - Click "Publish" button
   - Event becomes visible on public site

4. **Test the full flow**
   - Submit a test event at `/register`
   - Review it in admin dashboard
   - Edit if needed
   - Publish it
   - Check it appears on `/calendar` and `/map`

---

## 🆘 Still Having Issues?

1. Check `ADMIN_SETUP.md` for detailed troubleshooting
2. Verify all environment variables are correct
3. Check browser console for errors (F12)
4. Check Supabase logs in Dashboard
5. Make sure you completed ALL steps above

---

## 🎉 Success!

If you can login and see the admin dashboard, you're done!

**Your admin portal is at:** `http://localhost:3005/admin/login`

Start managing events! 🚀

