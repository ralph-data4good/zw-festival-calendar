# 🚀 Quick Reference Guide

One-page reference for the Zero Waste Festival Bricks templates.

## 📦 What You Have

| File | Purpose | Use When |
|------|---------|----------|
| `hero-section-with-stats.json` | Hero banner with CTA buttons and stats panel | Homepage header section |
| `how-it-works-section.json` | 3-step process cards with icons | Explaining features or process |
| `event-card-layout.json` | Single event card design | Displaying events in grids/lists |
| `custom-styles.css` | Additional CSS enhancements | Adding hover effects and animations |
| `README.md` | Full documentation | Learning about templates |
| `INSTALLATION_GUIDE.md` | Step-by-step setup | First-time setup |

## ⚡ Quick Import (2 Minutes)

```
1. WordPress Admin → Bricks → Templates → Import
2. Upload JSON files (hero, how-it-works, event-card)
3. Done! ✅
```

## 🎨 Brand Colors Cheat Sheet

Copy-paste these hex codes:

| Color | Hex | Use For |
|-------|-----|---------|
| Dark Green | `#5B8C5A` | Hero backgrounds, primary brand |
| Blue | `#4A8FC7` | Buttons, icons, links |
| Lime | `#A4BF3D` | CTA buttons, accents |
| Cream | `#F5F3ED` | Backgrounds, panels |
| Black | `#1A1A1A` | Headings, text |
| Gray | `#4A4A4A` | Body text |

## 📐 Common Bricks Settings

### Button Settings
```
Padding: 14px 28px
Border Radius: 12px
Font Size: 1rem
Font Weight: 600
Transition: all 0.3s ease
```

### Card Settings
```
Border Radius: 24px
Padding: 32px
Box Shadow: 0 8px 20px rgba(0,0,0,0.08)
Background: #FFFFFF
```

### Section Settings
```
Padding Top/Bottom: 100px (desktop), 60px (mobile)
Container Max Width: 1120px
```

## 🔧 Dynamic Data Shortcuts

| Element | Dynamic Data Tag | Example |
|---------|------------------|---------|
| Title | `{post_title}` | Event name |
| Date | `{acf_event_date}` | Jan 15, 2025 |
| Image | `{featured_image}` | Event poster |
| Location | `{acf_event_city}` | Manila |
| Category | `{post_terms:category}` | Workshop |
| Link | `{permalink}` | Event URL |
| Excerpt | `{post_excerpt}` | Short description |

## 📱 Responsive Breakpoints

| Device | Bricks Setting | Width |
|--------|----------------|-------|
| Desktop | Desktop | 1024px+ |
| Tablet | Tablet Portrait | 768px - 1023px |
| Mobile | Mobile Landscape | 480px - 767px |
| Mobile | Mobile Portrait | < 480px |

## 🎯 Page Templates Quick Build

### Homepage (5 min)
1. Hero Section template
2. How It Works template
3. Query Loop + Event Cards
4. Save & Publish

### Events Archive (10 min)
1. Page header with title
2. Filters (optional)
3. Query Loop:
   - Post Type: Events
   - Posts Per Page: 12
4. Inside loop: Event Card template
5. Add pagination
6. Save as Archive template

### Single Event (15 min)
1. Featured image (full width)
2. Title: `{post_title}`
3. Meta: Date, Time, Location
4. Content: `{post_content}`
5. Registration button
6. Related events query

## 🔍 Troubleshooting Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| Template not showing | Clear Bricks cache |
| Dynamic data empty | Check ACF field names |
| Styles not matching | Import custom-styles.css |
| Hover effects not working | Add transition: all 0.3s ease |
| Mobile layout broken | Check responsive settings |
| Images not loading | Verify featured image is set |

## 💡 Pro Tips

### Tip #1: Use Global Classes
Create global classes in Bricks for consistent styling:
- `btn-primary`
- `btn-outline`
- `card-default`
- `section-spacing`

### Tip #2: Query Loop Optimization
```
Settings to adjust:
- Posts Per Page: 6-12 (optimal)
- No Results: Show custom message
- Pagination: Enable for archives
- Order By: Event date (custom field)
```

### Tip #3: Conditional Display
Show/hide elements based on ACF fields:
```
If {acf_event_registration_url} exists → Show button
If {acf_event_modality} = "Online" → Hide location
```

### Tip #4: Speed Optimization
- Use lazy loading for images
- Limit Query Loop results
- Enable Bricks cache
- Use WebP images

## 🎨 CSS Variables Usage

Add to Bricks → Settings → Custom CSS:
```css
:root {
  --zw-green: #5B8C5A;
  --zw-blue: #4A8FC7;
  --zw-lime: #A4BF3D;
  --zw-cream: #F5F3ED;
}

/* Use in elements */
.my-button {
  background: var(--zw-blue);
}
```

## 🚀 Next Level Features

### Interactive Map (with plugins)
- WP Google Maps or Leaflet
- Connect to event coordinates
- Show markers for event locations

### Advanced Filters
- FacetWP plugin
- Filter by: Category, Date, Location, Modality
- AJAX search (no page reload)

### Calendar View
- The Events Calendar plugin
- Or use FullCalendar.js
- Sync with event custom post type

### Email Notifications
- WP Mail SMTP
- Send notifications for new events
- Event reminders for registered users

## 📞 Resources

| Resource | Link |
|----------|------|
| Bricks Academy | academy.bricksbuilder.io |
| ACF Documentation | advancedcustomfields.com/resources |
| Icon Libraries | themify.me/themify-icons |
| Color Picker | htmlcolorcodes.com |

## ✅ Final Checklist

Before going live:
- [ ] All templates imported
- [ ] Custom Post Type created (Events)
- [ ] ACF fields set up
- [ ] Sample events added (5-10)
- [ ] Homepage built
- [ ] Events archive template created
- [ ] Single event template created
- [ ] Custom CSS added
- [ ] Mobile responsive tested
- [ ] Forms working (registration)
- [ ] Images optimized
- [ ] SEO titles/descriptions added
- [ ] SSL certificate active
- [ ] Backup created

---

**Need more help?** Check the full INSTALLATION_GUIDE.md or README.md

**Questions?** Refer to the React app source code for design details.

🎉 **Happy Building!**


