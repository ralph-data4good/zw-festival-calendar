# 🏗️ Architecture Overview

## System Design

```
┌─────────────────────────────────────────────────────────┐
│                     USER BROWSER                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐          │
│  │  Home    │   │ Calendar │   │   Map    │          │
│  │  Page    │   │   Page   │   │  Gallery │          │
│  └────┬─────┘   └────┬─────┘   └────┬─────┘          │
│       │              │              │                  │
│       └──────────────┼──────────────┘                  │
│                      │                                  │
│              ┌───────▼────────┐                        │
│              │  Zustand Store │                        │
│              │  (State Mgmt)  │                        │
│              └───────┬────────┘                        │
│                      │                                  │
│              ┌───────▼────────┐                        │
│              │   API Service   │                        │
│              └───────┬────────┘                        │
│                      │                                  │
└──────────────────────┼─────────────────────────────────┘
                       │
                       ▼
        ┌─────────────────────────┐
        │   JSON Data Files       │
        │  (MVP - Static Files)   │
        └─────────────────────────┘
                       │
                       ▼  (Future Migration)
        ┌─────────────────────────┐
        │    Supabase Backend     │
        │  - PostgreSQL Database  │
        │  - Real-time Updates    │
        │  - Auth (optional)      │
        └─────────────────────────┘
```

---

## Data Flow

### 1. App Initialization
```
User visits site
  → main.jsx loads
  → RouterProvider mounts
  → Layout component loads
  → store.bootstrap() called
  → API service fetches all JSON files
  → Store populated with data
  → Pages render with data
```

### 2. Filtering Events
```
User changes filter
  → Filters component updates
  → store.setFilter() called
  → Store recalculates filtered results
  → Components re-render
  → URL updates (optional)
```

### 3. Viewing Event Details
```
User clicks event card
  → EventDrawer opens
  → Query param added (?event=xxx)
  → Drawer shows event data
  → User can download .ics file
  → Or navigate to full detail page
```

---

## Component Hierarchy

```
App (RouterProvider)
└── Layout
    ├── Navbar
    └── Page Routes
        ├── Home
        │   ├── Chips
        │   ├── EventCard (×6)
        │   └── EventDrawer
        ├── Calendar
        │   ├── Chips
        │   ├── Filters
        │   ├── EventCard (×N)
        │   └── EventDrawer
        ├── MapGallery
        │   ├── Map (MapLibre)
        │   ├── Filters
        │   ├── EventCard (×N)
        │   └── EventDrawer
        ├── Register
        │   └── Multi-step Form
        └── EventDetail
            └── Full Event Info
```

---

## State Management (Zustand)

### Store Structure
```js
{
  // Data
  events: [],
  topics: [],
  categories: [],
  campaigns: [],
  organizers: [],
  partners: [],
  
  // UI State
  loading: false,
  error: null,
  
  // Filters
  filters: {
    q: '',
    country: '',
    category: '',
    modality: '',
    topics: [],
    tags: [],
    dateFrom: '',
    dateTo: '',
    campaign: ''
  },
  
  // Actions
  bootstrap(),
  setFilter(),
  setFilters(),
  resetFilters(),
  getFilteredEvents(),
  getCountries(),
  getFeaturedCampaigns()
}
```

### Why Zustand?
- ✅ Tiny (1KB)
- ✅ Simple API
- ✅ No boilerplate
- ✅ Easy debugging
- ✅ React DevTools support

---

## Routing Strategy

**React Router v6** with data router:

```js
createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/map', element: <MapGallery /> },
      { path: '/register', element: <Register /> },
      { path: '/event/:id', element: <EventDetail /> }
    ]
  }
])
```

**Benefits:**
- Nested routes with shared layout
- URL params (`/event/:id`)
- Query params (`?event=xxx`)
- Programmatic navigation
- Back/forward support

---

## Styling Architecture

### 3-Layer System

**1. Design Tokens** (`tokens.css`)
```css
:root {
  --izwm-brick: #7B312A;
  --radius-md: 12px;
  /* ... */
}
```

**2. Global Styles** (`base.css` + `layout.css`)
- Typography
- Buttons
- Cards
- Grid utilities

**3. Component Styles** (CSS Modules)
```css
/* EventCard.module.css */
.eventCard { /* scoped to component */ }
```

**Why CSS Modules?**
- ✅ Scoped by default
- ✅ No naming conflicts
- ✅ Dead code elimination
- ✅ Fast (no runtime)

---

## API Abstraction Layer

### Current (MVP)
```js
// src/services/api.js
export const api = {
  events: () => fetch('/festival-2025/data/events.json'),
  topics: () => fetch('/festival-2025/data/topics.json'),
  // ...
}
```

### Future (Supabase)
```js
// src/services/api.js
const supabase = createClient(URL, KEY);

export const api = {
  events: () => supabase.from('events').select('*'),
  insertEvent: (data) => supabase.from('events').insert(data),
  // ...
}
```

**Same interface, different backend!**

---

## Performance Optimizations

### Already Implemented
- ✅ Code splitting (React Router lazy loading possible)
- ✅ CSS Modules (tree-shaken)
- ✅ Minimal dependencies
- ✅ Image lazy loading (browser native)
- ✅ Zustand (no re-render overhead)

### Future Improvements
- [ ] React.lazy() for pages
- [ ] Image optimization (next/image equivalent)
- [ ] Virtual scrolling (react-window)
- [ ] Service worker (PWA)
- [ ] CDN for assets

---

## Accessibility (a11y)

### Implemented
- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ Focus management (modals)
- ✅ ARIA labels
- ✅ Color contrast (WCAG AA)
- ✅ Touch targets (44px min)

### Testing Tools
- Keyboard only navigation
- Screen reader (NVDA, VoiceOver)
- Lighthouse audit
- axe DevTools

---

## Browser Support

**Target:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 10+)

**Uses modern features:**
- CSS Grid & Flexbox
- CSS Variables
- ES6+ JavaScript
- Fetch API
- Web APIs (Intl, Clipboard)

---

## Security Considerations

### Current (Static Site)
- ✅ No server-side code
- ✅ No user authentication
- ✅ Public data only
- ✅ XSS prevention (React default)

### Future (With Backend)
- [ ] Input validation
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Sanitize user content
- [ ] HTTPS only
- [ ] Environment variable management

---

## Deployment Architecture

```
GitHub Repo
    ↓
  Build Process (Vite)
    ↓
Static Files (dist/)
    ↓
CDN (Vercel/Netlify)
    ↓
Global Edge Network
    ↓
End Users (Fast!)
```

**Advantages:**
- ⚡ Instant loading
- 🌍 Global distribution
- 💰 Free hosting
- 🔒 HTTPS included
- 📈 Auto-scaling

---

## Testing Strategy (Future)

### Unit Tests (Vitest)
```js
describe('EventCard', () => {
  it('renders event title', () => {
    // test
  })
})
```

### Integration Tests
- Filter combinations
- Navigation flows
- Form submissions

### E2E Tests (Playwright)
```js
test('user can filter and view event', async ({ page }) => {
  await page.goto('/')
  await page.click('[href="/calendar"]')
  await page.fill('input[type="search"]', 'Workshop')
  // ...
})
```

---

## Migration Path to Supabase

### Step 1: Database Schema
```sql
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  modality TEXT,
  country TEXT,
  -- ... all JSON fields
);
```

### Step 2: Data Migration
```js
// One-time script to upload JSON → Supabase
const events = await fetch('/festival-2025/data/events.json')
await supabase.from('events').insert(events)
```

### Step 3: Update API Layer
```js
// Change ONE file: src/services/api.js
// All components work unchanged!
```

### Step 4: Add Real-time (Optional)
```js
supabase
  .from('events')
  .on('INSERT', payload => {
    store.addEvent(payload.new)
  })
  .subscribe()
```

---

## Monitoring & Analytics

### Recommended Setup
1. **Vercel Analytics** - Core Web Vitals
2. **Google Analytics** - User behavior
3. **Sentry** - Error tracking
4. **LogRocket** - Session replay

---

**Questions?** Open a GitHub Discussion!

