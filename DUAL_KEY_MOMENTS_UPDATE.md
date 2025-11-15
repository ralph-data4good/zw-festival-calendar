# Dual Key Moments Feature - Homepage Update

## 📝 Change Summary

Updated the homepage to display **TWO separate event galleries** for Key Moments:
1. **"Happening Now"** - Currently ongoing campaign
2. **"Coming Soon"** - Next upcoming campaign

This allows users to see both current and future environmental moments simultaneously.

## 🎯 User Experience

### Before (Single Featured Campaign):
- Showed only one campaign (either ongoing OR upcoming)
- Had to choose between current and future events

### After (Dual Galleries):
- Shows BOTH ongoing and upcoming campaigns
- Provides context for current events AND future planning
- Clear labels: "Happening Now" vs "Coming Soon"

## 📊 Visual Layout

```
Homepage Structure:
├─ Hero Section
├─ How It Works
├─ Key Moments Chips (all campaigns)
├─ Happening This Week (next 7 days)
├─ 🌡️ Happening Now: COP30 Climate Action    ← ONGOING
│  └─ [6 event cards]
└─ 🌍 Coming Soon: International Zero Waste Month  ← UPCOMING
   └─ [6 event cards]
```

## 🔄 Logic Overview

### Campaign Selection:

```javascript
// Ongoing Campaign (first priority)
- Currently active (start_date ≤ today ≤ end_date)
- Shows: "Happening Now: [Campaign Name]"
- Example: COP30 (Nov 1-30) shows during November

// Upcoming Campaign (second priority)  
- Not started yet (start_date > today)
- Shows next campaign to begin
- Shows: "Coming Soon: [Campaign Name]"
- Example: IZWM (Jan 1 - Feb 28) shows in December
```

### Smart Display Rules:

| Scenario | "Happening Now" | "Coming Soon" |
|----------|----------------|---------------|
| Mid-November | 🌡️ COP30 (Nov) | 🌍 IZWM (Jan-Feb) |
| Mid-January | 🌍 IZWM (Jan-Feb) | 🚫 Plastic Free July (Jul) |
| Mid-July | 🚫 Plastic Free July | 📜 Global Plastics Treaty (Oct) |
| Mid-October | 📜 Global Plastics Treaty | 🌡️ COP30 (Nov) |
| Late December | *(none)* | 🌍 IZWM (Jan-Feb) |

## 🎨 Design Changes

### Section Headers:

```jsx
// Ongoing Campaign
<h2>
  <emoji /> Happening Now: Campaign Name
</h2>
<p className="campaignDescription">
  Campaign description text
</p>

// Upcoming Campaign  
<h2>
  <emoji /> Coming Soon: Campaign Name
</h2>
<p className="campaignDescription">
  Campaign description text
</p>
```

### Layout Improvements:

- Description now inside section header container
- Better alignment with "View All" link
- Consistent spacing between galleries
- Mobile-responsive (description stacks properly)

## 📁 Files Modified

### `src/pages/Home.jsx`
**Changes:**
- Split campaign selection into `ongoingCampaign` and `upcomingCampaign`
- Added `isOngoing` and `isUpcoming` flags
- Created two separate event galleries
- Added clear labels: "Happening Now" and "Coming Soon"

**Lines Changed:** ~40 lines

### `src/pages/Home.module.css`
**Changes:**
- Updated `.sectionHeader` to `align-items: flex-start` (for description)
- Added `gap: 24px` for spacing
- Adjusted `.campaignDescription` margin and sizing
- Ensures proper text wrapping

**Lines Changed:** ~10 lines

## 🧪 Testing Scenarios

### Scenario 1: Multiple Ongoing Campaigns
**Situation:** Two campaigns overlap
**Behavior:** Shows earliest ongoing campaign in "Happening Now"
**Example:** If both IZWM and PFJ were in July, shows IZWM (starts earlier)

### Scenario 2: No Ongoing Campaign
**Situation:** Between campaigns
**Behavior:** Only shows "Coming Soon" with next campaign
**Example:** In December, shows "Coming Soon: IZWM"

### Scenario 3: Last Campaign of Year
**Situation:** In November (COP30)
**Behavior:** Shows COP30 as "Happening Now", IZWM as "Coming Soon"
**Example:** Wraps around to next year's campaigns

### Scenario 4: Campaign Just Ended
**Situation:** Past end_date
**Behavior:** Campaign hidden, shows next available
**Example:** December 1st, COP30 hidden, IZWM shows as "Coming Soon"

## ✅ Benefits

### For Users:
- ✨ See both current AND future opportunities
- ✨ Plan ahead while engaging with current events
- ✨ Better understanding of environmental calendar
- ✨ Clear temporal context ("Now" vs "Soon")

### For Event Organizers:
- ✨ Increased visibility for upcoming events
- ✨ More time for users to discover and register
- ✨ Better alignment with campaign timelines

### For Platform:
- ✨ More engaging homepage
- ✨ Richer content display
- ✨ Encourages repeat visits
- ✨ Showcases breadth of campaigns

## 📱 Responsive Behavior

### Desktop (1024px+):
- Both galleries side-by-side in viewport
- 3-column event grids
- Description displays inline with heading

### Tablet (768px - 1023px):
- Galleries stack vertically
- 2-column event grids
- Description maintains readability

### Mobile (<768px):
- Full-width galleries
- Single-column event cards
- Description stacks below heading
- "View All" button moves below title

## 🔄 Automatic Updates

The dual galleries automatically:
- ✅ Show/hide based on campaign dates
- ✅ Update daily without manual intervention
- ✅ Handle year transitions (Dec → Jan)
- ✅ Prioritize correctly (ongoing > upcoming)
- ✅ Hide when no events exist for campaign

## 🎯 Example Walkthrough

**Date: November 15, 2025**

**Campaigns Data:**
- COP30: Nov 1-30 (ongoing) ✓
- IZWM: Jan 1 - Feb 28, 2026 (upcoming) ✓
- Plastic Free July: Jul 1-31, 2026 (far future)

**Homepage Shows:**

```
┌─────────────────────────────────────────────────────┐
│  🌡️ Happening Now: COP30 Climate Action             │
│  UN Climate Change Conference focusing on climate   │
│  action and waste reduction                         │
│                                                     │
│  [COP Pre-Conference] [Climate Showcase] [...]     │
│                                      [View All →]  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  🌍 Coming Soon: International Zero Waste Month     │
│  The flagship global campaign celebrating zero      │
│  waste solutions and circular economy practices     │
│                                                     │
│  [IZWM Summit] [Cities Workshop] [Challenge] [...] │
│                                      [View All →]  │
└─────────────────────────────────────────────────────┘
```

## 🚀 Next Steps

### For Development:
1. Import sample events from `key_moments_sample_events.csv`
2. Verify campaigns have correct dates in `campaigns.json`
3. Test with different date scenarios
4. Ensure events have `campaign_id` field populated

### For Content:
1. Add more events to each campaign
2. Ensure even distribution across campaigns
3. Write compelling campaign descriptions
4. Use engaging event titles and imagery

### For Future Enhancement:
- Add "days until start" counter for upcoming campaigns
- Show campaign date range below title
- Add "Register Now" CTA for upcoming campaign events
- Track clicks per campaign for analytics

## 📊 Data Requirements

### For Campaigns (`campaigns.json`):
```json
{
  "id": "campaign-id",
  "name": "Campaign Name",
  "emoji": "🌍",
  "description": "Description text",
  "featured": true,
  "start_date": "2025-01-01",
  "end_date": "2025-02-28"
}
```

### For Events (with campaign link):
```json
{
  "id": "event-id",
  "title": "Event Title",
  "campaign_id": "campaign-id",
  // ... other fields
}
```

## ✅ Quality Checklist

- [x] No linter errors
- [x] Responsive on all screen sizes
- [x] Handles edge cases (no campaigns, no events)
- [x] Clear visual hierarchy
- [x] Accessible (semantic HTML)
- [x] Performance optimized (no extra API calls)
- [x] Works with existing data structure
- [x] Backward compatible

## 🎉 Summary

The homepage now intelligently displays **two Key Moment galleries** simultaneously, showing both current ("Happening Now") and future ("Coming Soon") environmental campaigns. This provides users with a richer, more contextual experience and helps them engage with both immediate and upcoming opportunities.

---

**Status:** ✅ **COMPLETE**  
**Date:** November 15, 2024  
**Version:** 2.0  
**Impact:** Enhanced homepage with dual campaign galleries

