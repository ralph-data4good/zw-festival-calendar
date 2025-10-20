# Logo Troubleshooting Guide

## ✅ Current Status

Your logo component is now **working with an SVG fallback**! 

You should see a styled "ZERO WASTE FESTIVAL" logo on your site right now with:
- ✓ "ZERO" in lime green
- ✓ "WASTE" in blue  
- ✓ A circular globe/arrow element
- ✓ "FESTIVAL" text below
- ✓ Proper brand colors applied

## 🎨 What's Showing Now?

The logo component has **smart fallback logic**:

1. **First**, it tries to load: `public/festival-2025/assets/zerowaste-festival-logo.png`
2. **If that fails**, it shows a styled SVG logo that matches your brand colors

So you should see **something right now** - the SVG version!

## 🚀 To Use Your Actual Logo

If you have the actual Zero Waste Festival logo file:

1. **Save it as:** `public/festival-2025/assets/zerowaste-festival-logo.png`
2. **Refresh browser:** The component will automatically switch to your image
3. **That's it!** No code changes needed

### Supported Formats
- **PNG** (recommended) - Just name it `zerowaste-festival-logo.png`
- **SVG** - Name it `zerowaste-festival-logo.svg` and update line 24 in `src/components/Logo/Logo.jsx`
- **JPG** - Name it `zerowaste-festival-logo.jpg` and update line 24 in `src/components/Logo/Logo.jsx`

## 🔍 Common Issues & Fixes

### Issue: "I don't see any logo at all"

**Solution:**
1. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Check browser console (F12) for errors
3. Ensure dev server is running: `npm run dev`

### Issue: "Logo is too big/small"

**Solution:** The Logo component accepts size props:
- `<Logo size="small" />` - 50px height (navbar)
- `<Logo size="default" />` - 60px height
- `<Logo size="large" />` - 80px height

Update in `src/components/Layout/Layout.jsx` if needed.

### Issue: "Logo looks pixelated"

**Solution:** The SVG version is vector and always crisp. If you add a PNG:
- Use at least 2x resolution (e.g., 800x250 for a 400x125 display)
- Or better yet, use SVG format

### Issue: "Logo doesn't match exactly"

**Solution:** The SVG fallback is a simplified version. To use your exact logo:
1. Add the actual logo file to `public/festival-2025/assets/`
2. The component will automatically switch to it

## 📱 Mobile Display

The logo automatically resizes for mobile:
- **Desktop:** Full size
- **Tablet:** Max 250px width
- **Mobile:** Max 200px width

## 🎨 Logo Styling

Current logo uses brand colors from `src/styles/tokens.css`:
- `--zw-lime: #A4BF3D`
- `--zw-blue: #4A8FC7`
- `--zw-green: #5B8C5A`

These are applied throughout the app for consistency.

## 🔧 Advanced: Customize the SVG Fallback

If you want to tweak the SVG logo design, edit `src/components/Logo/Logo.jsx`:

```jsx
const SVGLogo = () => (
  <svg viewBox="0 0 400 100" ...>
    {/* Modify text, shapes, colors here */}
  </svg>
);
```

## ✅ Verification Checklist

- [ ] Logo appears in navbar on all pages
- [ ] Logo appears in footer on all pages
- [ ] Logo is clickable in navbar (goes to home)
- [ ] Logo looks good on desktop
- [ ] Logo looks good on mobile (resize browser)
- [ ] Logo colors match brand (lime, blue, green)

## 🆘 Still Having Issues?

1. **Check the console:** Open DevTools (F12) and look for errors
2. **Verify file path:** Logo should be at `public/festival-2025/assets/zerowaste-festival-logo.png`
3. **Check imports:** Ensure `Logo` component is imported in `src/components/Layout/Layout.jsx`
4. **Restart dev server:** Stop (Ctrl+C) and run `npm run dev` again

## 📊 How It Works

The Logo component uses React state to manage image loading:

```jsx
1. Component mounts
2. Tries to load PNG image
3. If 404/error → automatically falls back to SVG
4. SVG renders with brand colors
5. No manual intervention needed!
```

This ensures your site **always has a logo**, even before you add the actual file.

---

**Bottom line:** You should see a logo right now! If you want to use your actual logo file, just drop it in the assets folder and refresh. 🎉

