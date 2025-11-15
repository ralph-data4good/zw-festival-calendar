# Bricks Templates Installation Guide

Step-by-step guide to import and use the Zero Waste Festival templates in your WordPress site with Bricks Builder.

## 📋 Prerequisites

Before importing the templates, ensure you have:

- ✅ WordPress 6.0 or higher
- ✅ Bricks Builder 1.9.0 or higher (active license)
- ✅ (Optional) Advanced Custom Fields (ACF) Pro for event custom fields
- ✅ (Optional) Custom Post Type UI for creating the Events post type

## 🚀 Quick Start (5 Minutes)

### Step 1: Import Templates

1. Log into your WordPress admin dashboard
2. Navigate to **Bricks → Templates**
3. Click the **Import** button (top right)
4. Select each JSON file from the `bricks-templates` folder:
   - `hero-section-with-stats.json`
   - `how-it-works-section.json`
   - `event-card-layout.json`
5. Click **Import** for each file
6. ✅ Templates are now available in your library!

### Step 2: Create a Homepage

1. Go to **Pages → Add New**
2. Title it "Home" or "Festival Calendar"
3. Click **Edit with Bricks**
4. In the Bricks builder:
   - Click the **+** icon to add content
   - Select **Templates** tab
   - Find "Zero Waste Hero Section with Stats"
   - Click to insert
5. Repeat for "How It Works Section"
6. Save and publish

### Step 3: Customize Content

Edit the imported sections:
- Click any text element to edit
- Update button links to match your pages
- Change stats numbers to reflect your data
- Update images (if any)

---

## 🎨 Detailed Customization

### Hero Section Customization

**To edit the hero title:**
1. Click the heading "Celebrate Zero Waste, Together."
2. In the right sidebar, edit the text
3. Adjust typography if needed (font size, weight, color)

**To update CTA buttons:**
1. Click a button (e.g., "Add Your Event")
2. In settings → Link → URL, enter your page URL
3. Update button text if needed
4. Adjust colors in settings → Style

**To update stats (make dynamic):**
1. Click a stat value (e.g., "101")
2. In settings → Content, click the **{x}** icon for dynamic data
3. Options:
   - **ACF Field**: Connect to a custom field
   - **Post Count**: Use `{query_count}` to show total events
   - **Custom PHP**: Write a function to calculate stats

Example dynamic stat using PHP (in Bricks → Settings → Custom Code):
```php
// Add to functions.php or use Code Snippets plugin
function get_event_count() {
    $count = wp_count_posts('event')->publish;
    return $count;
}

// Then use {echo:get_event_count} in Bricks
```

### How It Works Section Customization

**To change step icons:**
1. Click the icon element
2. In settings → Icon, choose from:
   - Themify Icons
   - Font Awesome
   - Material Icons
   - Or upload custom SVG

**To add/remove steps:**
1. Right-click on a step card
2. Select **Duplicate** to add more
3. Or **Delete** to remove
4. Update grid columns if needed (Settings → Layout → Grid Template Columns)

**To adjust hover effects:**
1. Click the step card
2. Go to settings → Interaction
3. Add hover state:
   - Transform → TranslateY: -8px
   - Box Shadow: increase on hover

### Event Card Layout (Dynamic)

**Setting up with Custom Post Type:**

1. **Install CPT UI** (if not using code):
   - Install plugin "Custom Post Type UI"
   - Add post type: `event`
   - Slug: `events`
   - Labels: "Events", "Event", etc.

2. **Install ACF Pro** (recommended):
   - Create Field Group: "Event Details"
   - Assign to post type: Events
   - Add fields (see below)

3. **Required ACF Fields:**
   ```
   Field Group: Event Details
   
   - event_date (Date Picker)
   - event_start_time (Time Picker)
   - event_end_time (Time Picker)
   - event_modality (Select)
     - Choices: In-person, Hybrid, Online
   - event_country (Text)
   - event_city (Text)
   - event_venue (Text)
   - event_address (Text)
   - event_registration_url (URL)
   ```

4. **Create taxonomies:**
   - Categories: workshop, cleanup, webinar, conference, etc.
   - Topics: circular-economy, waste-reduction, etc.

**Connecting Dynamic Data to Event Card:**

1. In Bricks builder, add a **Query Loop** element
2. Settings → Query:
   - Query Type: Posts
   - Post Type: Events
   - Posts Per Page: 6
   - Order By: Event Date

3. Inside the Query Loop, click **+** → **Templates**
4. Insert "Zero Waste Event Card"

5. Connect dynamic data:

   **Event Image:**
   - Click image element
   - Settings → Image → Dynamic Data → `{featured_image}`

   **Event Date:**
   - Click date text
   - Settings → Content → `{acf_event_date}`
   - Format: F j, Y (e.g., "January 15, 2025")

   **Event Title:**
   - Click heading
   - Settings → Content → `{post_title}`

   **Location:**
   - Click location text
   - Settings → Content → `{acf_event_city}, {acf_event_country}`

   **Modality Badge:**
   - Click badge
   - Settings → Content → `{acf_event_modality}`
   - Conditional styling based on value (see below)

   **Category:**
   - Click category text
   - Settings → Content → `{post_terms:category}`

   **Summary:**
   - Click summary text
   - Settings → Content → `{post_excerpt}`
   - Or: `{acf_event_summary}`

   **Button Link:**
   - Click button
   - Settings → Link → URL → `{permalink}`

---

## 🎨 Conditional Styling for Modality Badges

To show different colors for In-person, Hybrid, and Online:

1. Click the modality badge
2. Add **Conditions** in Bricks:

   **Condition 1: In-person**
   - If: `{acf_event_modality}` equals "In-person"
   - Background Color: #7BA872 (green)

   **Condition 2: Hybrid**
   - If: `{acf_event_modality}` equals "Hybrid"
   - Background Color: #6BB5E8 (blue)

   **Condition 3: Online**
   - If: `{acf_event_modality}` equals "Online"
   - Background Color: #A4BF3D (lime)

---

## 🔍 Creating an Events Archive Page

1. **Create Archive Template:**
   - Go to Bricks → Templates → Add New
   - Template Type: Archive
   - Conditions: Post Type = Events

2. **Add Header Section:**
   - Title: "Upcoming Events"
   - Optional: Filter buttons (All, Workshops, Webinars, etc.)

3. **Add Query Loop:**
   - Element: Query Loop
   - Query Type: Current Query (inherits archive query)
   - Layout: Grid (3 columns on desktop, 1 on mobile)

4. **Insert Event Card:**
   - Inside Query Loop, insert the Event Card template
   - Connect dynamic data (as shown above)

5. **Add Pagination:**
   - Below Query Loop, add Pagination element
   - Style to match your design

---

## 📱 Mobile Optimization Checklist

- [ ] Hero text is readable on small screens (min 2.5rem)
- [ ] CTA buttons stack vertically on mobile
- [ ] Stats grid is visible (3 columns even on mobile, but smaller font)
- [ ] How It Works cards stack to 1 column on mobile
- [ ] Event cards are 1 column on mobile
- [ ] All images have proper aspect ratios
- [ ] Touch targets are at least 44px × 44px

**To test:**
- Use Bricks responsive preview (bottom toolbar)
- Test on actual mobile device
- Use browser DevTools responsive mode

---

## 🎯 Recommended Page Structure

### Homepage (`/`)
```
1. Hero Section with Stats (template)
2. How It Works Section (template)
3. Featured Events (Query Loop with Event Cards)
   - Filter: Featured = Yes
   - Limit: 6 events
4. Upcoming Events (Query Loop)
   - Filter: Date >= Today
   - Limit: 6 events
5. Call-to-Action Section (custom)
   - "Add Your Event" button
```

### Events Archive (`/events`)
```
1. Page Header
   - Title: "All Events"
   - Filters: Category, Modality, Date
2. Query Loop with Event Cards
   - Shows all events
   - Pagination
3. Sidebar (optional)
   - Search
   - Filter by category
   - Filter by date
```

### Single Event (`/events/event-name`)
```
1. Hero Image (featured image)
2. Event Details
   - Title, Date, Time
   - Location (with map if coordinates available)
   - Modality, Category
3. Event Description (post content)
4. Registration CTA (button to registration URL)
5. Organizer Info
6. Related Events (Query Loop)
```

---

## 🚨 Troubleshooting

### Templates not showing after import
- **Solution**: Clear Bricks cache (Bricks → Settings → Cache → Clear)
- Refresh the page

### Dynamic data not displaying
- **Solution**: Check if ACF fields are assigned to correct post type
- Verify field names match exactly (case-sensitive)
- Use `{acf_field_name}` format

### Hover effects not working
- **Solution**: Enable hover interactions in Bricks settings
- Check that transition property is set (Settings → Style → Transition)

### Styles not matching React app
- **Solution**: Import the CSS variables (see below)
- Use global classes for consistent styling

### Query Loop shows no results
- **Solution**: Check that you have published events
- Verify query settings (post type, status)
- Check date filters aren't excluding all events

---

## 🎨 CSS Variables for Brand Consistency

Add this to **Bricks → Settings → Custom CSS** (Global CSS):

```css
:root {
  /* Zero Waste Festival Brand Colors */
  --zw-lime: #A4BF3D;
  --zw-blue: #4A8FC7;
  --zw-green: #5B8C5A;
  --zw-cream: #F5F3ED;
  --zw-black: #1A1A1A;
  
  /* Neutrals */
  --ink-900: #1A1A1A;
  --ink-600: #4A4A4A;
  --line-200: #E5E5E5;
  
  /* Accents */
  --accent-navy: #4A8FC7;
  --accent-gold: #D4C84A;
  --accent-sage: #7BA872;
  --accent-sky: #6BB5E8;
  --accent-lime: #A4BF3D;
  
  /* Effects */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 8px 20px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.12);
}

/* Hover effects for cards */
.event-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
}
```

---

## ✅ Next Steps

1. ✅ Import all templates
2. ✅ Set up Custom Post Type (Events)
3. ✅ Add ACF fields
4. ✅ Create sample events (5-10 for testing)
5. ✅ Build homepage using templates
6. ✅ Create events archive template
7. ✅ Create single event template
8. ✅ Test on mobile devices
9. ✅ Optimize images
10. ✅ Launch!

---

## 📚 Additional Resources

- **Bricks Documentation**: https://academy.bricksbuilder.io/
- **ACF Documentation**: https://www.advancedcustomfields.com/resources/
- **Zero Waste Festival React App**: (link to GitHub repo)
- **Support**: Contact the development team

---

**Happy Building! 🎉**

Create beautiful, functional pages for the Zero Waste Festival Calendar using these templates.

