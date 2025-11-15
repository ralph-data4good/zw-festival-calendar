# 🧪 Testing Guide

## 🌐 Access the App
**URL:** http://localhost:3005

---

## ✅ What to Test

### 1. **Enhanced Navbar** 🎨
**Location:** Top of every page

**What's New:**
- Brand logo with emoji (🌱) and year badge
- Icons on each nav link (🏠 📅 🗺️)
- Highlight on active page
- Hamburger menu on mobile

**Test Steps:**
```
1. Click "Home" → should go to homepage
2. Click "Calendar" → calendar page loads
3. Click "Map" → map page loads
4. Click "Register Event" → form loads
5. Resize browser → hamburger menu appears below 768px
6. Click hamburger → menu slides down
7. Click any link → menu closes
```

---

### 2. **Improved Footer** 📄
**Location:** Bottom of every page

**What's New:**
- 4-column grid (desktop)
- About section with social links
- Quick navigation links
- Resource links
- Legal links
- Copyright notice

**Test Steps:**
```
1. Scroll to bottom of any page
2. Check all 4 sections are visible
3. Click social icons (🌐 🐦 📘 📷)
4. Click internal links (Home, Calendar, etc.)
5. Resize to mobile → should stack vertically
```

---

### 3. **Mini Calendar** 📅
**Location:** Calendar page sidebar

**What's New:**
- Full month view
- Previous/Next month buttons
- "Today" button
- Event indicators (dots on dates)
- Click to filter by date

**Test Steps:**
```
1. Go to Calendar page
2. See mini calendar in left sidebar
3. Click < button → previous month
4. Click > button → next month
5. Click "Today" → jumps to current month
6. Look for gold dots → days with events
7. Click any date → filters events for that day
8. Selected date should be highlighted in navy
9. Today's date should have blue background
```

---

### 4. **Calendar Page Enhancements** 🗓️
**Location:** /calendar

**What's New:**
- Mini calendar in sidebar
- Grid/List view toggle
- "Clear Filters" button
- Better results header
- Improved no results message

**Test Steps:**
```
1. Go to /calendar
2. See mini calendar on left
3. See Filters below calendar
4. Check results header shows event count
5. Click grid icon (▦) → events in grid
6. Click list icon (☰) → events in list
7. Apply any filter
8. Click "Clear Filters" → resets all
9. Filter to no results → see helpful message
```

---

### 5. **Button Functionality** 🔘
**Location:** Throughout the app

**What's Fixed:**
- All buttons now have `type="button"`
- No accidental form submissions
- All clicks work as expected

**Test Every Button:**

**Home Page:**
```
✓ Get Tickets
✓ View Lineup
✓ View Map
✓ Event cards (click to open drawer)
```

**Calendar Page:**
```
✓ Campaign chips
✓ Filter clear button
✓ View toggle buttons (grid/list)
✓ Mini calendar navigation
✓ Today button
✓ Date buttons
✓ Topic filter chips
✓ Event cards
```

**Map Page:**
```
✓ Map markers
✓ Event cards
✓ Filter controls
```

**Register Page:**
```
✓ Next button (Step 1)
✓ Back button (Step 2)
✓ Submit button
✓ Add partner button
✓ Remove partner buttons
```

**Event Drawer:**
```
✓ Close button (✕)
✓ Add to Calendar
✓ View Full Details
✓ Register Now (if link exists)
✓ Click outside → closes
✓ Press ESC → closes
```

**Event Detail Page:**
```
✓ Back button
✓ Add to Calendar
✓ Register Now
✓ Copy Link button
✓ Open in Google Maps
```

---

## 🐛 What to Watch For

### No Errors
- Open DevTools (F12)
- Check Console tab
- Should see no red errors

### Smooth Interactions
- Buttons should respond immediately
- No page reloads unless navigating
- Animations should be smooth
- No flickering or jumping

### Mobile Responsiveness
- Test at 375px width (iPhone)
- Test at 768px width (iPad)
- Test at 1920px width (Desktop)
- All layouts should adapt properly

---

## 📱 Mobile Testing Steps

1. **Open DevTools** (F12)
2. **Toggle Device Toolbar** (Ctrl+Shift+M)
3. **Select Device:**
   - iPhone 12 Pro (390×844)
   - iPad (768×1024)
   - Responsive (custom)

4. **Test Each Page:**
   ```
   ✓ Home page looks good
   ✓ Navbar shows hamburger
   ✓ Footer stacks vertically
   ✓ Calendar page readable
   ✓ Mini calendar works
   ✓ Event cards stack
   ✓ Drawer takes full width
   ✓ All buttons tappable (44px min)
   ```

---

## 🎯 Quick Smoke Test (2 minutes)

```bash
1. Load http://localhost:3005
2. Click through all nav links → all work
3. Go to Calendar
4. Use mini calendar → click a date
5. Apply a filter → events update
6. Click "Clear Filters" → resets
7. Click event card → drawer opens
8. Click "Add to Calendar" → downloads .ics
9. Close drawer → works
10. Check footer → links work
11. No console errors
```

**✅ If all 11 steps pass → App is working!**

---

## 🔍 Known Features

### Calendar Features
- **Event Dots**: Gold dots show days with events
- **Date Selection**: Click any date to filter
- **Today Highlighting**: Blue background on today
- **Selection**: Navy background on selected date
- **Month Navigation**: < > buttons to change months
- **Quick Today**: Button to jump to current month

### Filter Features
- **Text Search**: Search event titles
- **Country Filter**: Dropdown of all countries
- **Category Filter**: All event categories
- **Modality Filter**: In-person, Online, Hybrid
- **Topic Chips**: Click multiple topics
- **Date Range**: From and To dates
- **Campaign Chips**: Key moments

### View Options
- **Grid View**: Cards in responsive grid
- **List View**: Stacked vertically
- **Toggle**: Switch between views instantly

---

## 💡 Pro Testing Tips

1. **Clear Browser Cache** before testing
   - Hard refresh: `Ctrl+Shift+R`

2. **Test in Multiple Browsers**
   - Chrome
   - Firefox
   - Safari (if on Mac)
   - Edge

3. **Test Keyboard Navigation**
   - Tab through elements
   - Enter to activate
   - ESC to close modals
   - Space to toggle buttons

4. **Test with Dev Tools Console Open**
   - Watch for errors
   - Check network requests
   - Monitor performance

---

## 🎉 Success Criteria

The app is ready for production if:

- ✅ All navigation works
- ✅ No console errors
- ✅ All buttons functional
- ✅ Mini calendar interactive
- ✅ Filters work correctly
- ✅ Mobile responsive
- ✅ Keyboard accessible
- ✅ Drawers open/close properly
- ✅ Downloads work (.ics files)
- ✅ Footer links clickable

---

**Start Testing:** http://localhost:3005

**Questions?** Check IMPROVEMENTS_LOG.md for details!

