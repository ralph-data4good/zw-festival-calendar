# 🌱 Zero Waste Festival 2025

> **TL;DR:** Modern React app for discovering zero waste events worldwide. Built with Vite, Zustand, and MapLibre. Mobile-first, fast, and beautiful.

---

## ⚡ Quick Start (3 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# → http://localhost:3000
```

**That's it!** 🎉 The app is now running.

---

## 📦 What's Inside?

**🎯 Core Features:**
- 🗓️ **Calendar View** - Browse all events with powerful filters
- 🗺️ **Interactive Map** - See events on a global map
- 📝 **Event Registration** - Submit new events (2-step form)
- 🎫 **Event Details** - Full event pages with calendar download
- 🔍 **Smart Filters** - Search by country, category, topics, dates, modality
- 📱 **Mobile-First** - Perfect on phones, tablets, and desktops

**🛠️ Tech Stack:**
- ⚛️ React 18 + Vite (fast!)
- 🗂️ Zustand (simple state management)
- 🚦 React Router (navigation)
- 🗺️ MapLibre GL (maps)
- 📅 Day.js (date handling)
- 🎨 CSS Modules (scoped styling)

---

## 📂 Project Structure

```
src/
├── app/
│   ├── router.jsx           # Routes (Home, Calendar, Map, etc.)
│   └── store.js             # Zustand state + filters
├── components/
│   ├── EventCard/           # Event preview cards
│   ├── EventDrawer/         # Modal for quick view
│   ├── Filters/             # Search & filter sidebar
│   ├── Chips/               # Campaign filter chips
│   └── Layout/              # Nav + footer wrapper
├── pages/
│   ├── Home.jsx             # Landing page
│   ├── Calendar.jsx         # All events list
│   ├── MapGallery.jsx       # Map + gallery view
│   ├── Register.jsx         # Event submission form
│   └── EventDetail.jsx      # Full event page
├── services/
│   ├── api.js               # Load JSON data (→ Supabase ready)
│   └── ics.js               # Generate .ics calendar files
├── utils/
│   ├── date.js              # Format dates/times
│   └── url.js               # Query param helpers
└── styles/
    ├── tokens.css           # Design tokens (colors, spacing)
    ├── base.css             # Global styles
    └── layout.css           # Grid & layout utilities
```

---

## 🎨 Design System

**Color Palette:**
- 🧱 Brick: `#7B312A` (hero backgrounds)
- 🏜️ Cream: `#F4EFE9` (page background)
- 🔵 Navy: `#2E5BA7` (primary buttons)
- 🟢 Sage: `#8BBF9A` (accents)

**Modality Colors:**
- 🔴 In-person: `#E6A6A6`
- 🟢 Online: `#A9D3B1`
- 🔵 Hybrid: `#9FC4E7`

**Typography:**
- Font: **Schibsted Grotesk** (400, 600, 700)
- Base size: 16px
- Responsive scaling via `clamp()`

---

## 📊 Data Structure

All data lives in `public/festival-2025/data/*.json`:

**events.json** - Event records
```json
{
  "id": "evt-001",
  "title": "Zero Waste Workshop",
  "modality": "In-person",
  "country": "Philippines",
  "city": "Manila",
  "start_datetime": "2025-07-05T14:00:00",
  "timezone": "Asia/Manila",
  "topics": ["circular-economy"],
  "campaigns": ["izwm-2025"]
}
```

**Other files:**
- `topics.json` - Topic taxonomy
- `categories.json` - Event categories
- `campaigns.json` - Featured campaigns
- `organizers.json` - Organizations
- `partners.json` - Partner details

---

## 🔧 Common Tasks

### Add a New Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/app/router.jsx`
3. Add link in `src/components/Layout/Layout.jsx`

### Add a New Filter
1. Update `filters` state in `src/app/store.js`
2. Add UI in `src/components/Filters/Filters.jsx`
3. Update `getFilteredEvents()` logic in store

### Change Colors
Edit `src/styles/tokens.css` - all colors in one place!

### Add Sample Events
Edit `public/festival-2025/data/events.json`

---

## 📱 Mobile-First Approach

**Breakpoints:**
- Mobile: `< 768px`
- Tablet: `768px - 1023px`
- Desktop: `≥ 1024px`

All layouts start mobile, then enhance for larger screens.

**Touch targets:** Minimum 44px × 44px (accessibility!)

---

## 🚀 Build for Production

```bash
npm run build
```

Output: `dist/` folder (deploy anywhere!)

**Preview production build:**
```bash
npm run preview
```

---

## 🔮 Future: Supabase Integration

Currently reads JSON files. To switch to Supabase:

1. **Install Supabase client:**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Add credentials to `.env`:**
   ```
   VITE_SUPABASE_URL=your-url
   VITE_SUPABASE_ANON_KEY=your-key
   ```

3. **Update `src/services/api.js`:**
   ```js
   import { createClient } from '@supabase/supabase-js';
   
   const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   );
   
   export const api = {
     events: async () => {
       const { data } = await supabase.from('events').select('*');
       return data;
     },
     // ... other methods
   };
   ```

Function signatures stay the same - easy swap! ✨

---

## 🎯 Acceptance Checklist

- ✅ Home page with stats and featured events
- ✅ Calendar view with filters
- ✅ Map view with markers
- ✅ Event registration form (2 steps)
- ✅ Event detail pages
- ✅ Event drawer modal (deep-linkable)
- ✅ Download .ics calendar files
- ✅ Mobile-responsive layouts
- ✅ Keyboard navigation (accessibility)
- ✅ Sample data included

---

## 🐛 Troubleshooting

**Map not loading?**
- Check console for errors
- MapLibre requires internet connection for tiles

**Data not showing?**
- Check `public/festival-2025/data/` exists
- Open browser DevTools → Network tab
- Look for 404 errors on JSON files

**Styles look broken?**
- Clear browser cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

**Can't install dependencies?**
- Node.js version ≥ 16 required
- Try: `rm -rf node_modules package-lock.json && npm install`

---

## 📚 Learn More

**Docs & Resources:**
- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
- [Zustand Docs](https://zustand-demo.pmnd.rs)
- [MapLibre Docs](https://maplibre.org)
- [Day.js Docs](https://day.js.org)

**Design Inspiration:**
- Zero Waste Asia brand guidelines
- International Zero Waste Month (IZWM)

---

## 💚 Contributing

Have ideas? Found a bug? Want to add features?

1. Fork the repo
2. Create a branch: `git checkout -b feature/amazing-idea`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-idea`
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this for your own zero waste projects!

---

## 🌍 About Zero Waste Asia

This app was built for the **International Zero Waste Month 2025** campaign.

Zero Waste Asia is a network of organizations working toward a waste-free future across the Asia-Pacific region.

**Learn more:** [zerowaste.asia](https://zerowaste.asia)

---

**Built with 💚 for the planet**

