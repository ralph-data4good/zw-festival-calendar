# 🚀 Deployment Guide

## Build the App

```bash
npm run build
```

This creates a `dist/` folder with production-ready files.

---

## Deploy to Vercel

### Option 1: CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Done! Auto-deploys on every push

---

## Deploy to Netlify

### Drag & Drop
1. Build: `npm run build`
2. Go to [netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder
4. Done!

### CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

---

## Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install -D gh-pages
   ```

2. **Update package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js:**
   ```js
   export default defineConfig({
     base: '/repo-name/',
     // ... rest
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

---

## Environment Variables

For production with Supabase:

**Vercel/Netlify:**
- Add env vars in dashboard:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

**GitHub Pages:**
- Not recommended for apps with API keys
- Use Vercel or Netlify instead

---

## Custom Domain

**Vercel:**
1. Project Settings → Domains
2. Add your domain
3. Update DNS records

**Netlify:**
1. Domain Settings → Add custom domain
2. Follow DNS instructions

---

## Performance Tips

**Already optimized:**
- ✅ Code splitting (React Router)
- ✅ Lazy loading images
- ✅ CSS Modules (scoped, tree-shaken)
- ✅ Minimal dependencies

**Optional improvements:**
- Add image CDN (Cloudinary, imgix)
- Enable Brotli compression
- Add service worker for offline support

---

## Monitoring

**Recommended tools:**
- [Vercel Analytics](https://vercel.com/analytics)
- [Google Analytics](https://analytics.google.com)
- [Sentry](https://sentry.io) (error tracking)

---

**Questions?** Check the main README.md

