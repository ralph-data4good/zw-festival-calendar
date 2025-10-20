# Logo Setup Instructions

## Required Action

Please add the Zero Waste Festival logo image to this directory:

**File path:** `public/festival-2025/assets/zerowaste-festival-logo.png`

## Logo Requirements

- **Format:** PNG with transparent background (preferred) or white background
- **Dimensions:** Original aspect ratio maintained (approximately 1600x500 or 3.2:1 ratio)
- **Quality:** High resolution for crisp display
- **File size:** Optimized for web (recommended < 200KB)

## Alternative Formats

If you have the logo in a different format:

1. **SVG:** Save as `zerowaste-festival-logo.svg` and update `src/components/Logo/Logo.jsx` line 11:
   ```jsx
   src="/festival-2025/assets/zerowaste-festival-logo.svg"
   ```

2. **JPG:** Save as `zerowaste-festival-logo.jpg` and update the same line:
   ```jsx
   src="/festival-2025/assets/zerowaste-festival-logo.jpg"
   ```

## Quick Test

After adding the logo file:
1. Refresh your browser at http://localhost:3005
2. You should see the logo in:
   - Navbar (top of every page)
   - Footer (bottom of every page)

## Troubleshooting

If the logo doesn't appear:
1. Check the file name matches exactly: `zerowaste-festival-logo.png`
2. Ensure it's in the correct directory: `public/festival-2025/assets/`
3. Clear your browser cache and refresh
4. Check the browser console for any 404 errors

## Current Temporary Logo

Until you add the actual logo, a placeholder SVG is being used.

