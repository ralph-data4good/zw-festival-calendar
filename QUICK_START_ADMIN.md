# 🚀 Quick Start: Admin Site

Get your admin site running in 5 minutes!

## ✅ Checklist

### Step 1: Create Supabase Project (5 min)

```bash
# 1. Go to https://supabase.com
# 2. Create new project
# 3. Wait for database to initialize
# 4. Go to SQL Editor
# 5. Copy & paste contents of SUPABASE_SETUP.sql
# 6. Click "Run"
```

---

### Step 2: Create Storage Buckets (2 min)

```bash
# In Supabase Dashboard:
# 1. Go to Storage
# 2. Create "posters" bucket → Make public
# 3. Create "logos" bucket → Make public
```

---

### Step 3: Configure Environment (1 min)

```bash
# Create .env file in project root
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY

# Get these from: Supabase Dashboard → Settings → API
```

---

### Step 4: Create Admin User (2 min)

**In Supabase Dashboard:**

1. Go to **Authentication** → **Users**
2. Click **"Add user"**
   - Email: `admin@zerowaste.asia` (or your email)
   - Password: `[create strong password]`
   - Click **"Create user"**
3. Click on the newly created user
4. Scroll to **"User Metadata"** section
5. Click **"Edit"** on `app_metadata`
6. Add this JSON:
   ```json
   {
     "role": "admin"
   }
   ```
7. Click **"Save"**

---

### Step 5: Test It! (1 min)

```bash
# Restart dev server (if running)
npm run dev

# Open browser
http://localhost:3005/admin/login

# Login with admin credentials
# You should see the admin dashboard!
```

---

## 🎯 Test the Full Flow

1. **Submit test event**:
   - Go to `http://localhost:3005/register`
   - Fill out form
   - Click map to set location
   - Submit

2. **Review in admin**:
   - Login to admin
   - See event in "Pending" tab
   - Click "Edit" to modify
   - Click "Publish"

3. **Verify on public site**:
   - Go to `http://localhost:3005/calendar`
   - Event should appear!
   - Go to `http://localhost:3005/map`
   - Event should show on map!

---

## 🐛 Troubleshooting

### "Supabase not configured"
- Check `.env` file exists
- Check credentials are correct
- Restart dev server

### "Access denied"
- Make sure user has `{"role": "admin"}` in `app_metadata`
- Not `user_metadata` (wrong place!)

### "Can't see events"
- Check SQL schema ran successfully
- Check RLS policies are enabled
- Try viewing in Supabase Table Editor

### Map not loading
- Check `maplibre-gl` is installed: `npm install maplibre-gl`
- Clear browser cache

---

## 📚 Full Documentation

- [Admin Setup Guide](./ADMIN_SETUP.md) - Comprehensive guide
- [Supabase Integration](./SUPABASE_INTEGRATION_COMPLETE.md) - What was built
- [Troubleshooting](./ADMIN_SETUP.md#troubleshooting) - Detailed fixes

---

## 🆘 Quick Support

**Issue**: Can't login
**Fix**: Check `app_metadata` has `{"role": "admin"}`

**Issue**: Events not showing
**Fix**: Run `SUPABASE_SETUP.sql` again

**Issue**: Environment variables not working
**Fix**: Restart dev server (`npm run dev`)

---

**Done?** You're ready to manage events! 🎉

Open `/admin/login` and start reviewing submissions!

