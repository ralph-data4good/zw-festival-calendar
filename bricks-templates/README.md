# Bricks Templates for Zero Waste Festival Calendar

This folder contains Bricks Builder-compatible templates that replicate the design and structure of the React app's homepage components.

## 📦 Templates Included

### 1. Hero Section with Stats (`hero-section-with-stats.json`)

**What it includes:**
- Large hero section with gradient background (#5B8C5A to #4A8FC7)
- Hero title: "Celebrate Zero Waste, Together."
- Subtitle and description
- Three CTA buttons (Add Event, Calendar, Map)
- Quick Stats panel with 3 stats (Total Events, This Week, Countries)
- Fully responsive grid layout

**How to use:**
1. Import the JSON file in Bricks Builder (Templates → Import)
2. Edit text content to match your data
3. Update button links to match your WordPress pages
4. Connect stats to dynamic data sources (optional)

**Customization tips:**
- Stats can be connected to WordPress queries or ACF fields
- Button links should point to your WordPress pages
- Colors match the brand palette from the React app

---

### 2. How It Works Section (`how-it-works-section.json`)

**What it includes:**
- Section title: "How It Works"
- 3-column grid layout (responsive to 1 column on mobile)
- Each step has:
  - Icon in a circular badge
  - Title
  - Description
  - Call-to-action link
- Hover effects (cards lift on hover)
- Gradient background (white to cream)

**How to use:**
1. Import the JSON file in Bricks Builder
2. Customize step titles, descriptions, and links
3. Replace icons if needed (using Bricks icon element)
4. Adjust colors to match your brand

**Customization tips:**
- Icons use Themify icons by default (ti-pencil-alt, ti-calendar, ti-filter)
- Card hover effects are built-in
- Easy to add/remove steps by duplicating the card structure

---

### 3. Event Card Layout (`event-card-layout.json`)

**What it includes:**
- Featured image
- Event date and modality badge
- Event title
- Location with icon
- Category badge
- Summary text
- "View Details" button
- Clean card design with shadows

**How to use:**
1. Import the JSON file in Bricks Builder
2. Use with WordPress custom post types or ACF fields
3. Set up dynamic data for:
   - Image: `{featured_image}`
   - Date: `{post_date}`
   - Title: `{post_title}`
   - Location: Custom field `{location}`
   - Category: `{post_terms:category}`
   - Summary: `{post_excerpt}`
4. Use in a Query Loop to display multiple events

**Dynamic data connections:**
- Image: Featured Image
- Date: Post Date or Custom Field
- Title: Post Title
- Location: Custom Field (e.g., ACF field)
- Modality: Custom Field or Taxonomy
- Category: Post Terms
- Summary: Excerpt or Custom Field
- Link: Post Permalink

---

## 🎨 Brand Colors Used

All templates use the Zero Waste Festival brand colors:

- **Primary Green**: `#5B8C5A` (Hero backgrounds, accents)
- **Primary Blue**: `#4A8FC7` (Buttons, icons, links)
- **Lime Green**: `#A4BF3D` (CTA buttons)
- **Cream**: `#F5F3ED` (Backgrounds, panels)
- **Dark Text**: `#1A1A1A` (Headings)
- **Medium Text**: `#4A4A4A` (Body text)
- **Light Gray**: `#E5E5E5` (Borders)

## 📥 How to Import Templates

1. **Open Bricks Builder** in WordPress
2. Go to **Bricks → Templates**
3. Click **Import**
4. Select the JSON file
5. Click **Import**
6. The template will appear in your Templates library
7. Insert it into any page using the Bricks editor

## 🔌 Recommended WordPress Setup

### Custom Post Type: Events

Create a custom post type called "Events" with these fields (using ACF or similar):

**Basic Fields:**
- Title (post title)
- Featured Image (featured image)
- Summary (excerpt or custom field)
- Description (post content)

**Custom Fields:**
- Event Date (date picker)
- Start Time (time picker)
- End Time (time picker)
- Modality (select: In-person, Hybrid, Online)
- Country (text)
- City (text)
- Venue Name (text)
- Address (text)
- Latitude (number)
- Longitude (number)
- Registration URL (URL)

**Taxonomies:**
- Categories (workshop, cleanup, webinar, etc.)
- Topics (circular-economy, waste-reduction, etc.)
- Tags (beginner-friendly, free-event, etc.)

### Integration with Bricks Query Loop

Use the event card template with Bricks Query Loop:

1. Add a Query Loop element to your page
2. Set query type to "Posts"
3. Select post type: "Events"
4. Set posts per page (e.g., 6 or 12)
5. Inside the query loop, insert the event card template
6. Connect dynamic data to the fields

## 🎯 Page Layout Suggestions

### Homepage Structure:
1. Hero Section with Stats
2. How It Works Section
3. Event Grid (using Query Loop with Event Cards)
   - Filter by: "Happening This Week"
   - Or: "Newly Added"
   - Or: "Featured Events"

### Events Archive Page:
- Use Event Cards in a Query Loop
- Add filters (category, modality, date)
- Add search functionality
- Enable pagination

## ⚡ Performance Tips

1. **Optimize Images**: Use WebP format for event images
2. **Lazy Loading**: Enable lazy loading for images in Bricks settings
3. **Limit Query**: Set reasonable posts per page (6-12)
4. **Caching**: Use a caching plugin (WP Rocket, LiteSpeed Cache)
5. **CDN**: Consider using a CDN for images

## 🛠️ Customization Guide

### Changing Colors:
All colors are set in the template settings. To change globally:
1. Use Bricks Global Classes
2. Or create CSS variables in Bricks → Settings → Custom CSS

### Hover Effects:
The How It Works cards have hover effects:
```css
transform: translateY(-8px);
box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
```

Add these in Bricks under Interaction → Hover

### Responsive Behavior:
All templates are fully responsive with breakpoints:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

## 📞 Support

For questions about these templates:
- Check Bricks documentation: https://academy.bricksbuilder.io/
- Refer to the React app source code for design reference
- Test templates in Bricks preview mode before publishing

## 📝 License

These templates are based on the Zero Waste Festival Calendar React app and are provided for use with the WordPress/Bricks implementation of the same project.

---

**Created for:** Zero Waste Festival 2025
**Compatible with:** Bricks Builder 1.9.0+
**Last Updated:** October 2025

