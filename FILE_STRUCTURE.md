# 📁 Complete File Structure

```
Festival_React_2025/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies & scripts
│   ├── vite.config.js            # Vite build config
│   ├── index.html                # HTML entry point
│   └── .gitignore                # Git exclusions
│
├── 📚 Documentation (7 files)
│   ├── README.md                 # Main docs (ADHD-friendly)
│   ├── QUICKSTART.md             # 3-step setup guide
│   ├── PROJECT_SUMMARY.md        # What's been built
│   ├── FILE_STRUCTURE.md         # This file
│   ├── ARCHITECTURE.md           # System design
│   ├── DEPLOYMENT.md             # Deploy guide
│   └── CONTRIBUTING.md           # Contribution guide
│
├── 📂 public/
│   ├── favicon.svg               # Site icon (🌱)
│   └── festival-2025/
│       └── data/                 # JSON data files
│           ├── events.json       # 6 sample events
│           ├── topics.json       # 12 topics
│           ├── categories.json   # 8 categories
│           ├── campaigns.json    # 4 campaigns
│           ├── organizers.json   # 4 organizers
│           └── partners.json     # 4 partners
│
└── 📂 src/
    │
    ├── 🎯 main.jsx               # App entry point
    ├── 🎨 index.css              # Global style imports
    │
    ├── 📂 app/                   # Core app logic
    │   ├── router.jsx            # React Router setup
    │   └── store.js              # Zustand state store
    │
    ├── 📂 components/            # Reusable components
    │   ├── Layout/
    │   │   ├── Layout.jsx        # Nav + Footer wrapper
    │   │   └── Layout.module.css
    │   ├── EventCard/
    │   │   ├── EventCard.jsx     # Event preview card
    │   │   └── EventCard.module.css
    │   ├── EventDrawer/
    │   │   ├── EventDrawer.jsx   # Modal overlay
    │   │   └── EventDrawer.module.css
    │   ├── Filters/
    │   │   ├── Filters.jsx       # Search & filter UI
    │   │   └── Filters.module.css
    │   └── Chips/
    │       ├── Chips.jsx         # Campaign filter chips
    │       └── Chips.module.css
    │
    ├── 📂 pages/                 # Route pages
    │   ├── Home.jsx              # Landing page
    │   ├── Home.module.css
    │   ├── Calendar.jsx          # Browse events
    │   ├── Calendar.module.css
    │   ├── MapGallery.jsx        # Map + gallery
    │   ├── MapGallery.module.css
    │   ├── Register.jsx          # Submit event
    │   ├── Register.module.css
    │   ├── EventDetail.jsx       # Full event page
    │   └── EventDetail.module.css
    │
    ├── 📂 services/              # Business logic
    │   ├── api.js                # Data fetching
    │   └── ics.js                # Calendar file generator
    │
    ├── 📂 utils/                 # Helper functions
    │   ├── date.js               # Date formatting
    │   └── url.js                # Query params
    │
    └── 📂 styles/                # Global styles
        ├── tokens.css            # Design tokens
        ├── base.css              # Base styles
        └── layout.css            # Layout utilities
```

---

## 📊 File Count by Type

| Category | Count | Purpose |
|----------|-------|---------|
| **React Components** | 10 | UI building blocks |
| **Pages** | 5 | Route destinations |
| **CSS Files** | 14 | Styling (tokens + modules) |
| **JavaScript Utils** | 4 | Services + helpers |
| **JSON Data** | 6 | Sample data |
| **Config Files** | 4 | Build & dependencies |
| **Documentation** | 7 | Guides & references |
| **Total Files** | **50+** | Complete app |

---

## 🎯 Key Files to Edit

### Want to...

**Add an event?**
→ `public/festival-2025/data/events.json`

**Change colors?**
→ `src/styles/tokens.css`

**Add a page?**
→ `src/pages/YourPage.jsx` + update `src/app/router.jsx`

**Modify filters?**
→ `src/components/Filters/Filters.jsx` + `src/app/store.js`

**Change API source?**
→ `src/services/api.js` (already Supabase-ready!)

---

## 🔥 Hot Files (Most Important)

1. **src/app/store.js** - All app state
2. **src/app/router.jsx** - All routes
3. **src/styles/tokens.css** - All design tokens
4. **src/services/api.js** - Data fetching
5. **public/festival-2025/data/events.json** - Sample data

---

## 📦 Build Output

After running `npm run build`:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js        # Main bundle
│   ├── index-[hash].css       # Styles
│   └── [chunks]               # Code-split chunks
└── festival-2025/
    └── data/                  # JSON files copied
```

**Deploy the entire `dist/` folder!**

---

## 🗂️ File Size Reference

| File Type | Approx Size |
|-----------|-------------|
| **React Components** | 1-5 KB each |
| **Pages** | 3-8 KB each |
| **CSS Modules** | 0.5-2 KB each |
| **Data JSON** | 1-10 KB each |
| **Total Bundle** | ~150 KB gzipped |

---

## 🚀 Quick Navigation

**Want to:**
- 🏠 Change home page → `src/pages/Home.jsx`
- 🗓️ Modify calendar → `src/pages/Calendar.jsx`
- 🗺️ Update map → `src/pages/MapGallery.jsx`
- 📝 Edit form → `src/pages/Register.jsx`
- 🎨 Adjust colors → `src/styles/tokens.css`
- 📊 Add data → `public/festival-2025/data/*.json`
- ⚙️ Configure build → `vite.config.js`

---

## 💡 Pro Tips

**CSS Organization:**
1. Design tokens (`tokens.css`) - never hard-code colors!
2. Global styles (`base.css`, `layout.css`) - reusable classes
3. Component styles (`*.module.css`) - scoped to component

**Component Organization:**
- Each component in own folder
- `.jsx` + `.module.css` pair
- Import CSS in component file

**State Management:**
- All state in `src/app/store.js`
- No prop drilling needed
- Use `useStore()` hook anywhere

---

**Need help finding something? Use your editor's file search! (Ctrl+P or Cmd+P)**

