# Zero Waste Festival 2025 - Developer Handoff Documentation

**Project Manager:** [Your Name]  
**Date:** November 15, 2024  
**Version:** 1.0  
**Status:** Prototype Complete - Ready for Production Development

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Technical Stack](#technical-stack)
4. [Architecture & Structure](#architecture--structure)
5. [Design System](#design-system)
6. [Features & Functionality](#features--functionality)
7. [Data Models](#data-models)
8. [Key Components](#key-components)
9. [Backend Integration (Supabase)](#backend-integration-supabase)
10. [Development Setup](#development-setup)
11. [Deployment](#deployment)
12. [Testing Requirements](#testing-requirements)
13. [Known Issues & Limitations](#known-issues--limitations)
14. [Future Enhancements](#future-enhancements)
15. [Appendices](#appendices)

---

## 1. Executive Summary

The Zero Waste Festival 2025 platform is a mobile-first React web application designed to showcase zero waste events across Asia-Pacific. The prototype demonstrates core functionality including event browsing, filtering, interactive maps, registration, and admin capabilities.

**Key Achievements:**
- ✅ Fully functional prototype with 3000+ sample events
- ✅ Mobile-responsive design optimized for all devices
- ✅ Integrated with Supabase backend
- ✅ Admin panel for event management
- ✅ Interactive map with clustering
- ✅ Dynamic Key Moments feature highlighting campaigns
- ✅ Deployed live on GitHub Pages

**Live Prototype:** https://ralph-data4good.github.io/zw-festival-calendar/

---

## 2. Project Overview

### 2.1 Purpose

Create a centralized platform for discovering and managing zero waste events across Asia-Pacific, supporting environmental campaigns and community engagement.

### 2.2 Target Audience

- **Primary:** Environmental activists, NGOs, community organizers
- **Secondary:** General public interested in zero waste events
- **Admin:** Event moderators and platform administrators

### 2.3 Key Objectives

1. **Discovery:** Help users find relevant zero waste events
2. **Engagement:** Connect communities with environmental campaigns
3. **Management:** Provide tools for event organizers and administrators
4. **Visibility:** Promote key environmental moments (IZWM, Plastic Free July, etc.)

### 2.4 Success Metrics

- Event submission rate
- User engagement (page views, event registrations)
- Geographic coverage (countries, cities)
- Campaign participation

---

## 3. Technical Stack

### 3.1 Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework |
| **React Router DOM** | 6.22.0 | Client-side routing |
| **Zustand** | 4.5.0 | State management |
| **MapLibre GL** | 3.6.2 | Interactive maps |
| **Day.js** | 1.11.10 | Date manipulation |
| **Vite** | 5.1.0 | Build tool |

### 3.2 Backend

| Service | Purpose |
|---------|---------|
| **Supabase** | PostgreSQL database, authentication, storage |
| **Supabase Edge Functions** | Serverless email notifications |

### 3.3 Styling

- **CSS Modules** - Component-scoped styling
- **Custom CSS Variables** - Design tokens
- **Mobile-First Responsive Design**

### 3.4 Deployment

- **GitHub Pages** - Static site hosting
- **GitHub Actions** - Automated deployment (via `gh-pages` npm package)

---

## 4. Architecture & Structure

### 4.1 Project Structure

```
zero-waste-festival-2025/
├── public/
│   └── festival-2025/
│       ├── assets/
│       │   └── zerowaste-festival-logo.svg
│       └── data/                    # Local JSON data (for development)
│           ├── campaigns.json
│           ├── categories.json
│           ├── events.json
│           ├── organizers.json
│           ├── partners.json
│           └── topics.json
├── src/
│   ├── app/
│   │   ├── router.jsx              # React Router configuration
│   │   └── store.js                # Zustand state management
│   ├── components/
│   │   ├── Chips/                  # Key Moments filter chips
│   │   ├── EventCard/              # Event card component
│   │   ├── EventDrawer/            # Event detail drawer
│   │   ├── Filters/                # Search & filter component
│   │   ├── Icons/                  # SVG icon components
│   │   ├── Layout/                 # Page layout wrapper
│   │   ├── Logo/                   # Brand logo component
│   │   ├── MapPicker/              # Interactive map for location selection
│   │   └── MiniCalendar/           # Date picker component
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminLogin.jsx      # Admin authentication
│   │   │   ├── AdminEvents.jsx     # Event list management
│   │   │   ├── AdminEventEdit.jsx  # Event editor
│   │   │   └── AdminLayout.jsx     # Admin panel layout
│   │   ├── Calendar.jsx            # Main calendar view
│   │   ├── EventDetail.jsx         # Event detail page
│   │   ├── Home.jsx                # Landing page
│   │   ├── MapGallery.jsx          # Map view
│   │   └── Register.jsx            # Event registration form
│   ├── services/
│   │   ├── api.js                  # Local JSON API (development)
│   │   ├── apiSupabase.js          # Supabase API client
│   │   ├── supabase.js             # Supabase initialization
│   │   ├── ics.js                  # iCalendar export
│   │   └── mailer.js               # Email service integration
│   ├── styles/
│   │   ├── base.css                # Global styles
│   │   ├── layout.css              # Layout utilities
│   │   └── tokens.css              # Design system tokens
│   ├── utils/
│   │   ├── date.js                 # Date formatting utilities
│   │   └── url.js                  # URL helpers
│   ├── index.css                   # Root styles
│   └── main.jsx                    # App entry point
├── supabase/
│   └── functions/
│       └── event-mailer/           # Email notification function
│           └── index.ts
├── scripts/
│   ├── generate-test-data.js       # Generate sample events
│   └── generate-mvp-data.js        # Generate MVP dataset
├── .cursorrules                    # Design system rules
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies
└── SUPABASE_SETUP.sql             # Database schema
```

### 4.2 Application Flow

```
User Journey:
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Homepage                                               │
│  ├─ Hero with stats                                     │
│  ├─ How It Works                                        │
│  ├─ Happening This Week                                 │
│  ├─ In Focus: Ongoing Campaign                          │
│  └─ In Focus: Upcoming Campaign                         │
│                                                         │
└──┬──────────────────────────────────────────────────────┘
   │
   ├─> Calendar Page
   │   ├─ Filter by country, category, modality, topics, dates
   │   ├─ Grid/List view toggle
   │   └─ Event cards → Event Detail
   │
   ├─> Map Gallery
   │   ├─ Interactive map with event markers
   │   ├─ Clustering for dense areas
   │   └─ Click marker → Event Detail
   │
   ├─> Event Detail
   │   ├─ Full event information
   │   ├─ Location map
   │   ├─ Register/RSVP button
   │   └─ Download to calendar (.ics)
   │
   ├─> Register Event
   │   ├─ Multi-step form
   │   ├─ Interactive map picker
   │   ├─ Campaign association
   │   └─ Submit for review
   │
   └─> Admin Panel (authenticated)
       ├─ Login
       ├─ Event list with filters
       ├─ Event editor
       └─ Publish/Archive events
```

### 4.3 State Management

Using **Zustand** for global state:

```javascript
// Store Structure
{
  // Data
  events: [],
  campaigns: [],
  categories: [],
  topics: [],
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
  bootstrap: async () => {...},
  setFilter: (key, value) => {...},
  clearFilters: () => {...},
  getFilteredEvents: () => {...},
  getFeaturedCampaigns: () => {...}
}
```

---

## 5. Design System

### 5.1 Color Palette

```css
/* Primary Colors */
--izwm-brick: #8B4542;        /* Primary brand color */
--izwm-cream: #FAF3E0;        /* Secondary background */
--accent-navy: #2E5BA7;       /* Links, buttons */

/* Neutral Colors */
--ink-900: #1A1A1A;           /* Primary text */
--ink-600: #666666;           /* Secondary text */
--neutral-100: #F5F5F5;       /* Light background */

/* Semantic Colors */
--success: #10B981;           /* Success states */
--warning: #F59E0B;           /* Warnings */
--error: #EF4444;             /* Errors */
```

### 5.2 Typography

```css
/* Font Family */
font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

/* Type Scale */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
```

### 5.3 Spacing

8px base unit system:
- 4px (0.25rem)
- 8px (0.5rem)
- 16px (1rem)
- 24px (1.5rem)
- 32px (2rem)
- 40px (2.5rem)
- 48px (3rem)

### 5.4 Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### 5.5 Component Patterns

**Buttons:**
```jsx
<button className="btn btn-primary">Primary Action</button>
<button className="btn btn-outline">Secondary Action</button>
<button className="btn-text">Text Link</button>
```

**Cards:**
```jsx
<div className="card">
  <div className="card-header">Title</div>
  <div className="card-body">Content</div>
</div>
```

**See `.cursorrules` file for complete design system documentation.**

---

## 6. Features & Functionality

### 6.1 Core Features

#### 6.1.1 Event Discovery

**Calendar View**
- Grid/List view toggle
- Advanced filtering:
  - Search by keyword
  - Country dropdown
  - Category filter
  - Modality (In-person, Online, Hybrid)
  - Topics (multi-select chips)
  - Date range picker
  - Campaign filter
- Sort by date
- Pagination (client-side)

**Map View**
- Interactive map powered by MapLibre GL
- Event markers with clustering
- Popup preview on marker click
- Filter synchronization with Calendar
- Zoom to bounds on filter change

**Event Detail**
- Full event information display
- Location map (if applicable)
- Related events section
- Download to calendar (.ics file)
- Registration/RSVP link
- Social sharing (future)

#### 6.1.2 Event Registration

**Multi-Step Form:**

**Step 1: Basic Information**
- Event title
- Summary (short description)
- Full description
- Event type (category)
- Topics (multi-select)
- Custom tags

**Step 2: Date & Location**
- Date and time selection
- Timezone
- All-day event toggle
- Modality (In-person, Online, Hybrid)
- Country, City
- Venue name and address
- Interactive map picker for coordinates
- Virtual meeting URL (if online/hybrid)

**Step 3: Organizer & Contact**
- Organizer name
- Contact person
- Email and phone
- Affiliation type
- Organization details

**Step 4: Additional Details**
- Languages offered
- Accessibility features
- Target audience
- Cost type (Free, Paid, Donation)
- Registration URL
- Cover image upload
- Campaign association

**Step 5: Review & Submit**
- Preview all entered data
- Edit capability for each section
- Submit for review
- Confirmation message

**Features:**
- Form validation
- Auto-save to localStorage (draft recovery)
- Image upload to Supabase Storage
- Interactive map for location picking
- Auto-population of address from map selection

#### 6.1.3 Admin Panel

**Authentication**
- Supabase Auth login
- Email/password authentication
- Session management
- Protected routes

**Event Management**
- List all events (including drafts)
- Filter by status:
  - Draft
  - Under Review
  - Published
  - Archived
- Search events
- Quick actions:
  - Edit
  - Publish
  - Archive
  - Delete

**Event Editor**
- Edit all event fields
- Change verification level
- Update status
- Preview changes
- Save and publish

#### 6.1.4 Key Moments Feature

**Dynamic Campaign Highlighting**

The homepage displays two "In Focus" sections:
1. **Ongoing Campaign** - Currently active
2. **Upcoming Campaign** - Next to start

**Logic:**
- Automatically selects campaigns based on date
- Shows 6 events per campaign
- "View All" links to filtered calendar
- Campaign descriptions displayed

**Campaigns:**
- 🌍 International Zero Waste Month (Jan-Feb)
- 🚫 Plastic Free July (July)
- 📜 Global Plastics Treaty (October)
- 🌡️ COP30 Climate Action (November)

### 6.2 User Experience Features

**Mobile Optimization**
- Touch-friendly interface
- Swipeable event cards
- Responsive filters (drawer on mobile)
- Optimized map controls

**Performance**
- Lazy loading images
- Virtual scrolling for large lists
- Debounced search
- Cached API responses

**Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast WCAG AA compliant

---

## 7. Data Models

### 7.1 Database Schema (PostgreSQL via Supabase)

#### 7.1.1 Core Tables

**events**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT,
  description TEXT,
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL,
  all_day BOOLEAN DEFAULT false,
  modality TEXT CHECK (modality IN ('in_person', 'online', 'hybrid')),
  country_code TEXT CHECK (char_length(country_code) = 2),
  city TEXT,
  venue_name TEXT,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  registration_url TEXT,
  livestream_url TEXT,
  organizer_name TEXT,
  affiliation TEXT CHECK (affiliation IN ('GAIA Member', 'Ally/Partner', 'Public', 'Other')),
  contact_person TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  languages TEXT[] DEFAULT '{}',
  accessibility TEXT[] DEFAULT '{}',
  audience TEXT[] DEFAULT '{}',
  cost_type TEXT CHECK (cost_type IN ('free', 'paid', 'donation')),
  cost_amount NUMERIC,
  currency TEXT,
  cover_image_url TEXT,
  category_id UUID REFERENCES categories(id),
  tags TEXT[] DEFAULT '{}',
  verification TEXT CHECK (verification IN ('unverified', 'verified_org', 'verified_gaia', 'community')),
  status TEXT CHECK (status IN ('draft', 'under_review', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**campaigns**
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  emoji TEXT,
  description TEXT,
  start_date DATE,
  end_date DATE,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**categories**
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**topics**
```sql
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES topics(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**organizers**
```sql
CREATE TABLE organizers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('NGO', 'School', 'LGU', 'National Agency', 'Alliance', 'Private', 'Community', 'Other')),
  country_code TEXT,
  city TEXT,
  address TEXT,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**partners**
```sql
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  country_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### 7.1.2 Junction Tables

**event_topics** (many-to-many)
```sql
CREATE TABLE event_topics (
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, topic_id)
);
```

**event_campaigns** (many-to-many)
```sql
CREATE TABLE event_campaigns (
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, campaign_id)
);
```

**event_partners** (many-to-many with ordering)
```sql
CREATE TABLE event_partners (
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
  position INT DEFAULT 0,
  PRIMARY KEY (event_id, partner_id)
);
```

### 7.2 Row Level Security (RLS)

**Public Access:**
- Read published events
- Submit new events (status: under_review)

**Admin Access:**
- Read all events (any status)
- Update event status
- Delete events
- Manage all reference data

### 7.3 Sample Data

**Included in Prototype:**
- 3000+ sample events across Asia-Pacific
- 4 featured campaigns
- 8 categories
- 12 topics
- 25 Key Moments-specific events

**CSV Import Files:**
- `sample_events_supabase_import.csv` (15 events)
- `key_moments_sample_events.csv` (25 events)

---

## 8. Key Components

### 8.1 Component Hierarchy

```
App
├── Router
│   ├── Layout
│   │   ├── Header (Logo, Navigation)
│   │   └── Main Content
│   │       ├── Home
│   │       │   ├── Hero
│   │       │   ├── How It Works
│   │       │   ├── Event Blocks
│   │       │   │   └── EventCard
│   │       │   └── EventDrawer
│   │       ├── Calendar
│   │       │   ├── Filters
│   │       │   ├── Chips
│   │       │   ├── Grid/List Toggle
│   │       │   ├── EventCard
│   │       │   └── EventDrawer
│   │       ├── MapGallery
│   │       │   ├── MapLibre Map
│   │       │   ├── Filters
│   │       │   └── EventDrawer
│   │       ├── EventDetail
│   │       │   └── MapLibre Map
│   │       ├── Register
│   │       │   ├── Multi-Step Form
│   │       │   ├── MapPicker
│   │       │   └── MiniCalendar
│   │       └── Admin
│   │           ├── AdminLogin
│   │           ├── AdminLayout
│   │           ├── AdminEvents
│   │           └── AdminEventEdit
│   └── Footer
```

### 8.2 Critical Components

#### EventCard
**Purpose:** Display event summary in grid/list views

**Props:**
```typescript
interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}
```

**Features:**
- Responsive card design
- Date badge
- Category icon
- Location display
- Modality badge
- Verification badge
- Click to open drawer

#### EventDrawer
**Purpose:** Side drawer for event details

**Props:**
```typescript
interface EventDrawerProps {
  event: Event | null;
  onClose: () => void;
}
```

**Features:**
- Slide-in animation
- Full event details
- Location map
- Action buttons (Register, Download)
- Responsive (full screen on mobile)

#### Filters
**Purpose:** Advanced search and filter interface

**Features:**
- Text search
- Country dropdown
- Category filter
- Modality chips
- Topic chips (multi-select)
- Date range picker
- Clear filters button
- Responsive (drawer on mobile)

#### MapPicker
**Purpose:** Interactive map for location selection

**Features:**
- Click to set coordinates
- Drag marker to adjust
- Reverse geocoding (address lookup)
- Search box for places
- Zoom controls

#### MiniCalendar
**Purpose:** Date and time picker

**Features:**
- Calendar grid
- Month navigation
- Time selection (hours, minutes)
- Timezone selection
- All-day toggle

---

## 9. Backend Integration (Supabase)

### 9.1 Setup

**Environment Variables:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Initialization:**
```javascript
// src/services/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
```

### 9.2 API Service Layer

**Location:** `src/services/apiSupabase.js`

**Key Functions:**

```javascript
// Fetch published events
export async function getEvents()

// Fetch single event
export async function getEvent(id)

// Create event (public submission)
export async function createEvent(eventData)

// Update event (admin only)
export async function updateEvent(id, updates)

// Delete event (admin only)
export async function deleteEvent(id)

// Fetch campaigns
export async function getCampaigns()
export async function getFeaturedCampaigns()

// Fetch categories
export async function getCategories()

// Fetch topics
export async function getTopics()

// Auth
export async function signIn(email, password)
export async function signOut()
export async function getCurrentUser()
```

### 9.3 Storage

**Buckets:**
- `posters` - Event cover images
- `logos` - Organization logos

**Upload Example:**
```javascript
const { data, error } = await supabase.storage
  .from('posters')
  .upload(`public/${filename}`, file)

const publicUrl = supabase.storage
  .from('posters')
  .getPublicUrl(data.path).data.publicUrl
```

### 9.4 Edge Functions

**event-mailer**

**Purpose:** Send email notifications for new event submissions

**Trigger:** Database trigger on event insert

**Location:** `supabase/functions/event-mailer/`

**Configuration:**
```typescript
// Required secrets
SENDGRID_API_KEY
ADMIN_EMAIL
```

---

## 10. Development Setup

### 10.1 Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- Git
- Supabase account (for backend)
- SendGrid account (for emails, optional)

### 10.2 Initial Setup

```bash
# Clone repository
git clone https://github.com/ralph-data4good/zw-festival-calendar.git
cd zw-festival-calendar

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Add Supabase credentials to .env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Start development server
npm run dev

# Open browser
http://localhost:3005
```

### 10.3 Supabase Setup

```bash
# 1. Create Supabase project at supabase.com

# 2. Run SQL schema
# Copy contents of SUPABASE_SETUP.sql
# Paste in Supabase SQL Editor
# Execute

# 3. Create storage buckets
# - posters (public)
# - logos (public)

# 4. Create admin user
# Go to Authentication → Users
# Create user with email/password
# Edit user → Set role in app_metadata:
{
  "role": "admin"
}

# 5. Deploy Edge Function (optional)
npm install -g supabase
supabase login
supabase functions deploy event-mailer
```

### 10.4 Local Development with Mock Data

The app can run without Supabase using local JSON files:

```javascript
// src/services/api.js
// Reads from public/festival-2025/data/*.json

// Toggle in code or use environment variable
USE_SUPABASE=false npm run dev
```

### 10.5 Generate Test Data

```bash
# Generate 1000 random events
node scripts/generate-test-data.js

# Generate MVP dataset (smaller)
node scripts/generate-mvp-data.js
```

---

## 11. Deployment

### 11.1 GitHub Pages (Current)

**Build & Deploy:**
```bash
npm run build      # Build for production
npm run deploy     # Deploy to gh-pages branch
```

**Configuration:**
```javascript
// vite.config.js
export default defineConfig({
  base: '/zw-festival-calendar/',  // GitHub repo name
  // ...
})
```

**Access:** https://ralph-data4good.github.io/zw-festival-calendar/

### 11.2 Alternative Deployment Options

#### Vercel (Recommended for Production)
```bash
npm install -g vercel
vercel
```

**Advantages:**
- Automatic HTTPS
- Custom domain support
- Environment variables
- Preview deployments
- Better performance

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Advantages:**
- Drag & drop deployment
- Form handling
- Split testing
- Analytics

### 11.3 Production Considerations

**Environment Variables:**
- Set in hosting platform dashboard
- Never commit to repository
- Use different values for staging/production

**Build Optimization:**
```javascript
// vite.config.js
build: {
  sourcemap: false,
  minify: 'terser',
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom', 'react-router-dom'],
        maps: ['maplibre-gl']
      }
    }
  }
}
```

**Performance:**
- Enable gzip/brotli compression
- Set cache headers
- Use CDN for static assets
- Lazy load images
- Code splitting

---

## 12. Testing Requirements

### 12.1 Manual Testing Checklist

#### Homepage
- [ ] Hero section displays correctly
- [ ] Stats show accurate numbers
- [ ] "How It Works" section loads
- [ ] "Happening This Week" shows events
- [ ] "In Focus" campaigns display (ongoing + upcoming)
- [ ] Event cards are clickable
- [ ] Drawer opens with event details
- [ ] Responsive on mobile/tablet/desktop

#### Calendar Page
- [ ] Events load and display
- [ ] Grid/List view toggle works
- [ ] All filters functional:
  - [ ] Search by keyword
  - [ ] Country dropdown
  - [ ] Category filter
  - [ ] Modality chips
  - [ ] Topic chips (multi-select)
  - [ ] Date range picker
  - [ ] Campaign filter (Key Moments chips)
- [ ] Clear filters works
- [ ] Event cards clickable
- [ ] Drawer opens correctly
- [ ] "Download to Calendar" generates .ics file

#### Map Gallery
- [ ] Map loads and displays markers
- [ ] Markers cluster appropriately
- [ ] Click marker opens popup
- [ ] Click popup opens drawer
- [ ] Filters work and update map
- [ ] Zoom controls functional
- [ ] Responsive on mobile

#### Event Detail Page
- [ ] Direct URL access works
- [ ] All event information displays
- [ ] Location map shows (if applicable)
- [ ] Registration button links correctly
- [ ] Download calendar button works
- [ ] Back navigation works

#### Register Page
- [ ] All form steps accessible
- [ ] Validation works on each field
- [ ] Required fields enforced
- [ ] Map picker allows location selection
- [ ] Date/time picker works
- [ ] Image upload to Supabase Storage
- [ ] Form submission creates event
- [ ] Success message displays
- [ ] Event set to "under_review" status

#### Admin Panel
- [ ] Login page accessible
- [ ] Authentication works
- [ ] Protected routes redirect if not logged in
- [ ] Event list displays all statuses
- [ ] Filters work (status, search)
- [ ] Edit button opens event in editor
- [ ] Event editor loads all fields
- [ ] Can change status (draft → published)
- [ ] Can set verification level
- [ ] Save changes updates database
- [ ] Delete event works (with confirmation)
- [ ] Logout works

### 12.2 Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 12.3 Device Testing

- [ ] iPhone SE (375px)
- [ ] iPhone 12 Pro (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1920px)

### 12.4 Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader announces content
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Form labels properly associated
- [ ] ARIA labels present

### 12.5 Performance Testing

**Target Metrics:**
- Lighthouse Performance Score: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

**Tools:**
- Lighthouse (Chrome DevTools)
- WebPageTest
- GTmetrix

---

## 13. Known Issues & Limitations

### 13.1 Current Limitations

1. **No Real-Time Updates**
   - Events don't auto-refresh when database changes
   - Requires manual page refresh

2. **Client-Side Filtering**
   - All events loaded at once
   - Performance may degrade with 10,000+ events
   - Consider server-side pagination for production

3. **Map Performance**
   - Clustering may be slow with 1,000+ visible markers
   - Consider server-side clustering or event limiting

4. **Image Uploads**
   - No image compression before upload
   - No image validation (dimensions, file type)
   - Consider adding image optimization

5. **Authentication**
   - No password reset flow
   - No email verification
   - No multi-factor authentication

6. **Search**
   - Simple text matching
   - No fuzzy search
   - No search ranking/relevance

### 13.2 Browser Compatibility

**Known Issues:**
- IE11: Not supported (uses ES6+ features)
- Safari < 14: Some CSS features may not work
- Mobile Chrome < 90: Map may have rendering issues

### 13.3 Technical Debt

1. **Code Organization**
   - Some components are too large (Home.jsx, Calendar.jsx)
   - Consider splitting into smaller components

2. **State Management**
   - Filters stored in global state (consider URL params)
   - No persist/hydration between page reloads

3. **Error Handling**
   - Basic error messages
   - No error boundary components
   - No retry logic for failed requests

4. **Testing**
   - No automated tests
   - No E2E tests
   - No unit tests

---

## 14. Future Enhancements

### 14.1 High Priority

#### Phase 2: Enhanced User Experience

1. **User Accounts**
   - User registration and profiles
   - Save favorite events
   - RSVP tracking
   - Event reminders

2. **Advanced Search**
   - Elasticsearch or Algolia integration
   - Fuzzy search
   - Search suggestions
   - Recent searches

3. **Social Features**
   - Share events on social media
   - Event comments/discussions
   - User reviews and ratings
   - Photo uploads from attendees

4. **Email Notifications**
   - Event reminder emails
   - Weekly digest of new events
   - Campaign announcements
   - Personalized recommendations

5. **Analytics Dashboard**
   - Event views
   - Registration clicks
   - Popular filters
   - Geographic distribution
   - Campaign engagement

#### Phase 3: Organizer Tools

1. **Organizer Dashboard**
   - Manage multiple events
   - Track registrations
   - View analytics
   - Export attendee lists

2. **Event Series**
   - Create recurring events
   - Link related events
   - Series management

3. **Ticketing Integration**
   - Eventbrite API
   - Custom ticketing
   - Payment processing
   - QR code check-in

4. **Marketing Tools**
   - Email campaign builder
   - Social media preview
   - Event promotion tips
   - Shareable widgets

#### Phase 4: Platform Growth

1. **Multilingual Support**
   - Interface translations (i18n)
   - Event translations
   - Language preference

2. **Mobile Apps**
   - iOS app (React Native)
   - Android app (React Native)
   - Push notifications
   - Offline mode

3. **API for Third Parties**
   - Public REST API
   - API documentation
   - Rate limiting
   - API keys management

4. **Partner Integrations**
   - Google Calendar sync
   - Meetup.com import
   - Facebook Events sync
   - Microsoft Teams/Slack bots

### 14.2 Nice-to-Have Features

- Virtual event hosting (Zoom integration)
- Live chat during events
- Event leaderboards/gamification
- Carbon footprint calculator
- Resource library (documents, templates)
- Community forums
- Mentorship matching
- Grant/funding opportunities board
- Success stories showcase
- Media kit generator

---

## 15. Appendices

### 15.1 Glossary

| Term | Definition |
|------|------------|
| **Key Moments** | Featured environmental campaigns (formerly "Featured Campaigns") |
| **IZWM** | International Zero Waste Month |
| **GAIA** | Global Alliance for Incinerator Alternatives |
| **Modality** | Event format (In-person, Online, Hybrid) |
| **Verification Level** | Trust indicator (Unverified, Verified Org, Verified GAIA, Community) |
| **RLS** | Row Level Security (Supabase security feature) |

### 15.2 Useful Links

**Live Prototype:**
https://ralph-data4good.github.io/zw-festival-calendar/

**GitHub Repository:**
https://github.com/ralph-data4good/zw-festival-calendar

**Supabase Documentation:**
https://supabase.com/docs

**React Router Documentation:**
https://reactrouter.com/

**MapLibre GL Documentation:**
https://maplibre.org/maplibre-gl-js/docs/

### 15.3 Support Resources

**Design System:**
See `.cursorrules` file in repository root

**Database Schema:**
See `SUPABASE_SETUP.sql` in repository root

**API Documentation:**
See `src/services/apiSupabase.js` for function signatures

**Component Library:**
See `src/components/` directory

### 15.4 Contact Information

**Project Manager:** [Your Name]  
**Email:** [your.email@domain.com]  
**Project Start Date:** [Start Date]  
**Prototype Completion:** November 15, 2024  
**Next Review:** [Schedule Date]

---

## 16. Development Handoff Checklist

### 16.1 Before Handoff

- [ ] All prototype features working
- [ ] Documentation complete
- [ ] Code commented where necessary
- [ ] Environment variables documented
- [ ] Database schema finalized
- [ ] Sample data provided
- [ ] Design system documented
- [ ] Known issues listed
- [ ] Future enhancements prioritized

### 16.2 Developer Onboarding

- [ ] Grant GitHub repository access
- [ ] Provide Supabase project access
- [ ] Share environment variables securely
- [ ] Schedule kickoff meeting
- [ ] Review documentation together
- [ ] Demonstrate prototype
- [ ] Discuss timeline and milestones
- [ ] Set up communication channels

### 16.3 Success Criteria

**Prototype Validation:**
- All features demonstrated work correctly
- Design system is consistent
- Code is maintainable and documented
- Performance meets targets

**Production Readiness:**
- Automated tests implemented
- Error handling improved
- Security audit passed
- Performance optimized
- Accessibility verified
- Cross-browser tested

---

## 17. Questions & Clarifications

### 17.1 For Developer to Address

1. **Hosting Decision:** Vercel vs Netlify vs other?
2. **Testing Framework:** Jest + React Testing Library?
3. **CI/CD:** GitHub Actions setup needed?
4. **Monitoring:** Sentry for error tracking?
5. **Analytics:** Google Analytics or alternative?
6. **Email Service:** SendGrid confirmed or exploring alternatives?
7. **Image Optimization:** Cloudinary or built-in?
8. **Search:** Keep client-side or implement Algolia?

### 17.2 Project Manager to Provide

1. Production domain name
2. SSL certificate requirements
3. Budget for third-party services
4. Timeline for Phase 2
5. User acceptance criteria
6. Launch marketing plan
7. Support plan after launch
8. Backup and disaster recovery plan

---

## Document Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Nov 15, 2024 | Initial developer handoff documentation | [PM Name] |

---

**END OF DOCUMENT**

**Total Pages:** ~40 (when converted to Word)  
**Word Count:** ~6,000 words  
**Last Updated:** November 15, 2024


