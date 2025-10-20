# 🔧 Fix Admin Login - Quick Guide

## ✅ Diagnosis Complete

Your Supabase connection is **working correctly**! The issue is:

**❌ Admin user is not set up properly**

---

## 🚀 Fix It in 5 Minutes

### **Step 1: Verify Database Schema** (1 min)

1. Go to: https://supabase.com/dashboard/project/knwuiysddqdtjqsarayo/sql

2. Run this query:
   ```sql
   SELECT COUNT(*) FROM events;
   ```

3. **If you get an error** "relation does not exist":
   - Open `SUPABASE_SETUP.sql` from your project
   - Copy ALL the contents
   - Paste into SQL Editor
   - Click "Run"
   - Wait for "Success"

4. **If you get a number** (0 or more):
   - ✅ Schema is already set up!
   - Skip to Step 2

---

### **Step 2: Create Admin User** (3 min)

#### **A. Create the User**

1. Go to: https://supabase.com/dashboard/project/knwuiysddqdtjqsarayo/auth/users

2. Click **"Add user"** button (top right corner)

3. Fill in the form:
   ```
   Email:              admin@zerowaste.asia
   Password:           [YOUR_STRONG_PASSWORD]
   Auto Confirm User:  ✓ CHECK THIS BOX!
   ```

4. Click **"Create user"**

---

#### **B. Set Admin Role** (CRITICAL!)

5. In the users list, **click on the user you just created**

6. Scroll down to the **"User Metadata"** section

7. You'll see two metadata boxes:
   - `user_metadata` ← NOT this one!
   - `app_metadata` ← **USE THIS ONE!**

8. Click **"Edit"** next to `app_metadata`

9. You'll see something like: `{}`

10. **Replace it with EXACTLY this:**
    ```json
    {
      "role": "admin"
    }
    ```

11. Click **"Save"**

12. ✅ Done! Your admin user is ready.

---

### **Step 3: Start Dev Server** (30 seconds)

In your terminal:

```bash
npm run dev
```

Wait for:
```
➜  Local:   http://localhost:3005/
```

---

### **Step 4: Test Login** (30 seconds)

1. Open browser: **http://localhost:3005/admin/login**

2. Enter credentials:
   - **Email**: `admin@zerowaste.asia`
   - **Password**: [the password you created]

3. Click **"Sign In"**

4. **Expected result**:
   - ✅ You see the admin dashboard
   - ✅ Sidebar shows "Admin Panel"
   - ✅ You see tabs: Pending / Published / Archived

---

## 🐛 Still Not Working?

### **Check Browser Console**

1. Press **F12** (or right-click → Inspect)
2. Go to **Console** tab
3. Look for error messages

### **Common Errors & Fixes**

#### Error: "Access denied. Admin privileges required"
**Fix**: The `app_metadata` doesn't have `{"role": "admin"}`
- Go back to Step 2B
- Make sure you edited **app_metadata** (not user_metadata)
- Make sure the JSON is exact: `{"role": "admin"}`

#### Error: "Invalid email or password"
**Fix**: 
- Double-check the email you entered
- Try resetting the password in Supabase Dashboard:
  - Authentication → Users → Click user → "Update user" section

#### Error: "Supabase not configured"
**Fix**: 
- Check `.env` file exists
- Restart dev server: `npm run dev`

#### Error: Network error or timeout
**Fix**:
- Check your internet connection
- Check Supabase project is not paused
- Go to: https://supabase.com/dashboard/project/knwuiysddqdtjqsarayo

---

## 📸 Visual Guide

### Where to find app_metadata:

```
Supabase Dashboard → Authentication → Users → [Click User]

Scroll down to see:

┌─────────────────────────────────────┐
│ User Metadata                       │
├─────────────────────────────────────┤
│                                     │
│ user_metadata                       │
│ { ... }                        Edit │ ← NOT THIS!
│                                     │
│ app_metadata                        │
│ { ... }                        Edit │ ← CLICK HERE!
│                                     │
└─────────────────────────────────────┘

In the edit modal, enter:
{
  "role": "admin"
}
```

---

## ✅ Success Checklist

After completing all steps, you should:

- [ ] See "Admin Panel" in the sidebar
- [ ] See your email in the bottom left
- [ ] See "Pending", "Published", "Archived" tabs
- [ ] Can click "Sign Out" button
- [ ] Can navigate to different admin pages

---

## 🎯 Quick Test

Once logged in, test the full flow:

1. **Submit test event**:
   - Open new tab: http://localhost:3005/register
   - Fill out form
   - Click map to set location
   - Submit

2. **Review in admin**:
   - Go back to admin tab
   - Should see event in "Pending" tab
   - Click "Publish"

3. **Verify on public site**:
   - Open: http://localhost:3005/calendar
   - Your event should appear!

---

## 📞 Need More Help?

1. **Run diagnostic again**:
   ```bash
   node test-admin-login.js
   ```

2. **Check full documentation**:
   - `CREATE_ADMIN_USER.md` - Detailed steps
   - `ADMIN_SETUP.md` - Complete admin guide

3. **Screenshot the error**:
   - Take a screenshot of the error message
   - Share it for specific help

---

**Your Supabase Project**: https://supabase.com/dashboard/project/knwuiysddqdtjqsarayo

**Quick Links**:
- [SQL Editor](https://supabase.com/dashboard/project/knwuiysddqdtjqsarayo/sql)
- [Authentication → Users](https://supabase.com/dashboard/project/knwuiysddqdtjqsarayo/auth/users)
- [Storage](https://supabase.com/dashboard/project/knwuiysddqdtjqsarayo/storage)

---

**Good luck! You're just a few clicks away from a working admin site!** 🚀

