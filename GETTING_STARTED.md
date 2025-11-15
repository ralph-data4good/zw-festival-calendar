# 🚀 Getting Started

## ⚡ 60-Second Setup

```bash
# 1️⃣ Install
npm install

# 2️⃣ Run
npm run dev

# 3️⃣ Visit
http://localhost:3000
```

**Done! You're now running the app.** 🎉

---

## 🎯 What You'll See

### Home Page (`/`)
- Hero section with stats
- Key moments chips
- "Happening This Week" events
- "Newly Added" events

### Calendar (`/calendar`)
- All events in grid view
- Filters sidebar (country, category, modality, topics, dates)
- Click any event for quick preview

### Map (`/map`)
- Interactive map with event markers
- Gallery view below
- Filter events geographically

### Register (`/register`)
- Step 1: Location & type
- Step 2: Details & media
- Downloads JSON (for MVP)

---

## 🎮 Try These Features

### 1. Filter Events
1. Go to **Calendar**
2. Try the search box
3. Select a country
4. Pick a topic
5. Events update instantly!

### 2. View Event Details
1. Click any **event card**
2. Drawer modal opens
3. See full details
4. Click "View Full Details" for dedicated page

### 3. Download Calendar
1. Open any event
2. Click "📅 Add to Calendar"
3. .ics file downloads
4. Import to Google Calendar/Outlook

### 4. Use the Map
1. Go to **Map** page
2. Click markers on map
3. Event drawer opens
4. Filter gallery below

### 5. Register an Event
1. Go to **Register**
2. Fill in Step 1 (location)
3. Fill in Step 2 (details)
4. Submit → JSON downloads

---

## 🎨 Customize It

### Change Colors
**File:** `src/styles/tokens.css`

```css
:root {
  --izwm-brick: #YourColor;
  --accent-navy: #YourColor;
  /* etc */
}
```

### Add Events
**File:** `public/festival-2025/data/events.json`

```json
{
  "id": "evt-007",
  "title": "Your Event",
  "country": "Your Country",
  "start_datetime": "2025-07-15T10:00:00",
  ...
}
```

### Add a Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/app/router.jsx`:
   ```jsx
   { path: '/new', element: <NewPage /> }
   ```
3. Add link in `src/components/Layout/Layout.jsx`

---

## 📱 Test Responsiveness

### Desktop (1920×1080)
```
npm run dev
# Open in browser, resize window
```

### Mobile View (Browser DevTools)
```
F12 → Toggle Device Toolbar (Ctrl+Shift+M)
Select "iPhone 12 Pro" or "Samsung Galaxy S20"
```

### Real Device Testing
```
npm run dev
# Note: "Network: http://192.168.x.x:3000"
# Open that URL on your phone (same WiFi)
```

---

## 🐛 Common Issues

### Port 3000 Already in Use?
**Solution 1:** Kill existing process
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

**Solution 2:** Change port
Edit `vite.config.js`:
```js
server: { port: 3001 }
```

### Data Not Loading?
Check browser console (F12) for errors.

**Common cause:** JSON files not in `public/` folder.

**Fix:** Ensure `public/festival-2025/data/*.json` exists.

### Map Not Showing?
**Cause:** Internet required for map tiles.

**Fix:** Check network connection.

### Dependencies Won't Install?
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Styles Look Broken?
```bash
# Hard refresh
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

---

## 📚 Learn the Stack

### Never Used These Before?

**Vite:**
- Super fast dev server
- Hot Module Replacement (instant updates)
- [5-min intro](https://vitejs.dev/guide/)

**React:**
- Components = reusable UI pieces
- Hooks = useState, useEffect
- [Quick start](https://react.dev/learn)

**Zustand:**
- Simple state management
- No boilerplate
- [2-min intro](https://github.com/pmndrs/zustand)

**React Router:**
- Handle navigation
- URL-based rendering
- [Tutorial](https://reactrouter.com/en/main/start/tutorial)

---

## 🎓 Next Steps

### Beginner Track
1. ✅ Run the app
2. 📝 Edit an event in `events.json`
3. 🎨 Change a color in `tokens.css`
4. 📄 Add your own event
5. 🚀 Deploy to Vercel (see DEPLOYMENT.md)

### Intermediate Track
1. ✅ All beginner steps
2. 🧩 Create a new component
3. 📑 Add a new page
4. 🔧 Add a custom filter
5. 🗺️ Enhance the map UI

### Advanced Track
1. ✅ All intermediate steps
2. 🗄️ Integrate Supabase
3. 🔐 Add authentication
4. 📊 Add analytics
5. 🧪 Write tests
6. 🌍 Add i18n (multi-language)

---

## 💡 Pro Tips

### VS Code Extensions
- **ES7+ React snippets** - Fast component creation
- **Prettier** - Auto-format code
- **CSS Modules** - IntelliSense for styles

### Keyboard Shortcuts
- `Ctrl+P` - Quick file open
- `Ctrl+Shift+F` - Search across files
- `F12` - Go to definition

### Development Tips
1. Keep `npm run dev` running
2. Open DevTools (F12) - watch console
3. Use React DevTools extension
4. Check Network tab if data issues

---

## 🎯 Your First Contribution

### Easy Wins
- [ ] Add 3 more sample events
- [ ] Change the color scheme
- [ ] Add your organization to partners.json
- [ ] Fix a typo in docs
- [ ] Add a new topic

### Ready to Share?
1. Push to GitHub
2. Deploy to Vercel (free!)
3. Share the link
4. Get feedback
5. Iterate

---

## 📖 Documentation Map

**Just starting?**
→ QUICKSTART.md (you are here!)

**Want details?**
→ README.md (comprehensive guide)

**Deploying?**
→ DEPLOYMENT.md

**Contributing?**
→ CONTRIBUTING.md

**Understanding architecture?**
→ ARCHITECTURE.md

**Need file reference?**
→ FILE_STRUCTURE.md

**Overview?**
→ PROJECT_SUMMARY.md

---

## 🤝 Get Help

**Stuck on something?**
1. Check README.md
2. Search the docs
3. Check browser console (F12)
4. Google the error message
5. Ask ChatGPT
6. Open a GitHub Issue

**Found a bug?**
→ Open an issue with:
- What you did
- What happened
- What you expected
- Screenshots

---

## 🎉 Success Checklist

After setup, you should see:

- ✅ App running at http://localhost:3000
- ✅ Home page loads
- ✅ 6 sample events visible
- ✅ Navigation works
- ✅ Filters work
- ✅ Event drawer opens
- ✅ Map shows (with internet)
- ✅ No errors in console

**All green? You're ready to build! 🚀**

---

## 🌟 What's Special

This isn't just another React app. It's:

- 🎯 **Purpose-built** for zero waste events
- 📱 **Mobile-first** (works great on phones)
- ⚡ **Blazing fast** (150KB bundle)
- ♿ **Accessible** (keyboard + screen reader ready)
- 🎨 **Beautiful** (modern design)
- 🔧 **Maintainable** (clean code)
- 📚 **Well-documented** (ADHD-friendly!)
- 🚀 **Production-ready** (deploy today)

---

**Ready to make an impact? Let's build! 💚**

*Questions? Check README.md or open an issue on GitHub.*

