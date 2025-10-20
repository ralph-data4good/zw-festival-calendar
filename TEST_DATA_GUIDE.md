# 🧪 Test Data Guide - 101 Events

## ✅ Successfully Generated!

**Location:** `public/festival-2025/data/events.json`  
**Count:** 101 events  
**Purpose:** Comprehensive edge case testing

---

## 🎯 Edge Cases Covered

### **1. Title Variations**
- ✅ **Very Long Title** (Event #0)
  - Tests title truncation
  - Tests card layout with long text
  - Tests responsive wrapping

- ✅ **Very Short Title** (Event #1)
  - "Talk" - single word
  - Tests minimum content layout

- ✅ **Special Characters** (Event #2)
  - Quotes, parentheses, hashtags
  - Tests character encoding
  - Example: `"Reduce, Reuse, Recycle!" - A Guide (2025) #ZeroWaste`

### **2. Date & Time Coverage**
- ✅ **Past Events** (Days -100 to -1)
  - Tests "Past Events" section
  - Tests date grouping
  - Tests sorting

- ✅ **Present Events** (Today)
  - Tests "Today" highlighting
  - Tests current event display

- ✅ **Future Events** (Days +1 to +100)
  - Tests "Upcoming Events" section
  - Tests calendar integration

- ✅ **Midnight Crossing** (Event #101)
  - New Year's Eve 23:00 to 02:00
  - Tests date boundary
  - Tests multi-day display

- ✅ **Various Hours** (8 AM - 8 PM)
  - Morning, afternoon, evening events
  - Tests time display formatting

- ✅ **Various Durations**
  - 1, 2, 3, 4, 6, 8 hour events
  - Tests end time calculations

### **3. Geographic Coverage**
- ✅ **29 Countries**
  - Philippines, Singapore, Thailand, Indonesia, Malaysia
  - Vietnam, Cambodia, Myanmar, Laos, Brunei
  - Japan, South Korea, China, India, Bangladesh
  - Pakistan, Sri Lanka, Nepal, Taiwan, Hong Kong
  - Australia, New Zealand, USA, UK, Canada
  - Germany, France, Netherlands
  - **"Global"** for online events

- ✅ **25 Cities**
  - Major Asian cities
  - Global cities for international events

- ✅ **15 Timezones**
  - `Asia/Manila`, `Asia/Singapore`, `Asia/Bangkok`
  - `Asia/Tokyo`, `Asia/Seoul`, `Asia/Shanghai`
  - `Asia/Kolkata`, `Australia/Sydney`
  - `America/New_York`, `Europe/London`, `UTC`
  - Tests timezone conversion
  - Tests local time display

### **4. Modality Testing**
- ✅ **In-person Events** (~33%)
  - Has venue, address, coordinates
  - Tests map markers
  - Tests location display

- ✅ **Online Events** (~33%)
  - No venue/address/coordinates
  - Tests conditional rendering

- ✅ **Hybrid Events** (~33%)
  - Both physical and virtual
  - Tests mixed display

### **5. Optional Fields**
- ✅ **With Venue** (67%)
  - Full venue information

- ✅ **Without Venue** (33%)
  - Tests missing field handling

- ✅ **With Address** (75%)
  - Full street address

- ✅ **Without Address** (25%)
  - Tests fallback display

- ✅ **With Poster** (67%)
  - Placeholder Unsplash images

- ✅ **Without Poster** (33%)
  - Tests placeholder UI

- ✅ **With Registration URL** (75%)
  - External registration links

- ✅ **Without Registration** (25%)
  - Tests conditional button display

- ✅ **With Description** (80%)
  - Full event details

- ✅ **Without Description** (20%)
  - Tests minimal content

- ✅ **With Campaigns** (67%)
  - 1-2 campaigns per event

- ✅ **Without Campaigns** (33%)
  - Tests empty array

- ✅ **With Partners** (80%)
  - Partner organizations

- ✅ **Without Partners** (20%)
  - Tests empty partners section

### **6. Content Length Variations**
- ✅ **Short Summary** (Every 10th event)
  - ~50 characters
  - Tests minimum content

- ✅ **Long Summary** (Every 7th event)
  - ~300 characters
  - Tests text overflow
  - Tests "read more" functionality

- ✅ **Medium Summary** (Most events)
  - ~150 characters
  - Standard display

### **7. Category Distribution**
All 8 categories represented:
- `workshop`, `cleanup`, `webinar`, `conference`
- `campaign-launch`, `marketplace`, `film-screening`, `training`

### **8. Topic Distribution**
All 12 topics represented:
- `circular-economy`, `waste-reduction`, `plastic-free`
- `policy`, `ocean-conservation`, `community-action`
- `business`, `youth-engagement`, `climate-action`
- `composting`, `urban-farming`, `fashion`

**Events have:** 1-4 topics each (random)

### **9. Tag Variations**
Common tags included:
- `beginner-friendly`, `free-event`, `online-option`
- `family-friendly`, `youth`, `professionals`
- `english`, `multi-day`

**Events have:** 0-3 tags each

### **10. Campaign Association**
4 campaigns represented:
- `izwm-2025` (International Zero Waste Month)
- `plastic-free-july`
- `world-ocean-day`
- `zero-waste-week`

**Events have:** 0-2 campaigns each

---

## 🧪 What to Test

### **Calendar Page**
```
✅ Month navigation shows correct events
✅ Events grouped properly (Upcoming/Past)
✅ Date headers display correctly
✅ "Today" is highlighted
✅ "Events in [Month]" section works
✅ Grid vs List view both work
✅ Mini calendar dots appear on event days
✅ Clicking dates filters correctly
```

### **Filters**
```
✅ Text search finds events
✅ Country filter (29 options)
✅ Category filter (8 options)
✅ Modality filter (3 options)
✅ Topic chips (12 options)
✅ Date range filtering
✅ Campaign chips work
✅ Multiple filters combine correctly
✅ "Clear Filters" resets all
```

### **Display Issues**
```
✅ Long titles don't break layout
✅ Short titles display properly
✅ Special characters render correctly
✅ Missing posters show placeholder
✅ Missing addresses handled gracefully
✅ Empty descriptions don't show section
✅ Timezone conversion accurate
```

### **Edge Cases**
```
✅ Midnight events span correctly
✅ Past events in correct section
✅ Future events in correct section
✅ Today's events highlighted
✅ Events with no campaigns
✅ Events with no partners
✅ Online events (no location)
✅ Multi-day events
```

### **Performance**
```
✅ 101 events load quickly
✅ Filtering is fast
✅ Scrolling is smooth
✅ Calendar navigation responsive
✅ Month view updates instantly
```

### **Mobile View**
```
✅ Calendar toggles work
✅ Filters toggle work
✅ Cards stack properly
✅ Date headers readable
✅ Buttons accessible (44px+)
✅ Text doesn't overflow
```

---

## 📊 Data Statistics

### Distribution
```
Total Events:        101
Past Events:         ~50
Present Events:      ~1
Future Events:       ~50

Modalities:
  In-person:         ~34 events
  Online:            ~34 events
  Hybrid:            ~33 events

With Optional Fields:
  Venue:             ~67 events
  Address:           ~75 events
  Poster:            ~67 events
  Registration:      ~75 events
  Description:       ~80 events
  Campaigns:         ~67 events
  Partners:          ~80 events
```

### Date Range
```
Earliest:  ~100 days ago
Latest:    ~100 days from now
Total Span: ~200 days
```

### Geographic Spread
```
Countries:  29 unique
Cities:     25 unique
Timezones:  15 unique
```

---

## 🚀 How to Use

### **1. Data is Already Loaded**
The script just ran and updated your events.json file. Refresh your browser!

### **2. Regenerate Anytime**
```bash
npm run generate-test-data
```

### **3. Revert to Original 6 Events**
If you want the original small dataset back, you'll need to manually restore or keep a backup.

---

## 🎯 Testing Checklist

### Quick Tests (5 min)
```
□ Refresh http://localhost:3005
□ Go to Calendar page
□ See 101 events loaded
□ Try filters - see count change
□ Navigate calendar months
□ Switch grid/list view
□ Click random events
□ Check mobile view
```

### Thorough Tests (30 min)
```
□ Test all 29 countries in filter
□ Test all 8 categories
□ Test all 12 topics
□ Test all 4 campaigns
□ Test date range filtering
□ Test text search
□ Test event details page
□ Test "Add to Calendar"
□ Test Google Calendar export
□ Check midnight event display
□ Check long title event
□ Check special character event
□ Check events with no posters
□ Check events with no descriptions
□ Mobile: Test both toggles
□ Mobile: Test "Events in Month"
```

### Edge Case Tests (15 min)
```
□ Filter to show 0 results
□ Filter to show 1 result
□ Filter to show 100 results
□ Select date with no events
□ Select date with 5+ events
□ Navigate to far past month
□ Navigate to far future month
□ Test today's date
□ Test yesterday
□ Test tomorrow
□ Apply all filters at once
□ Clear all filters
□ Rapid filter changes
□ Quick view mode switches
```

---

## 🐛 Known Considerations

### Event Generation Logic
- Events distributed evenly across ~200 day range
- Random selection of countries, topics, tags
- Coordinated fields (Online = no venue/address)
- Special test cases at specific indices

### What's NOT Tested
- Real image URLs (using placeholders)
- Real registration URLs (using examples)
- Real organization emails
- Actual event content accuracy

### Performance Notes
- 101 events should load instantly
- If slow, check browser DevTools
- Filter operations should be < 100ms

---

## 💡 Pro Tips

### Finding Specific Test Cases
```javascript
// Event #0: Very long title
// Event #1: Very short title  
// Event #2: Special characters
// Event #101: Midnight crossing
// Events 0-9: Short summaries (multiples of 10)
// Events with no poster: multiples of 3
// Events with no registration: multiples of 4
```

### Testing Filters
```
1. Apply one filter → Check count
2. Add second filter → Count should decrease
3. Add third filter → Count should decrease more
4. Clear filters → Back to 101
```

### Testing Calendar View
```
1. Show calendar (mobile)
2. Navigate to June 2025
3. Should see "Events in June 2025"
4. Count should match events in that month
5. Navigate to July → Section updates
```

---

## 🎉 You're Ready to Test!

**Refresh your browser:** http://localhost:3005

**You now have 101 comprehensive test events covering:**
- ✅ All edge cases
- ✅ All features
- ✅ All geographic regions
- ✅ All time ranges
- ✅ All modalities
- ✅ Optional field variations

**Happy Testing! 🚀**

