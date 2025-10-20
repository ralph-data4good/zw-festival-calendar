# 🤝 Contributing Guide

Thanks for contributing to Zero Waste Festival 2025! 💚

---

## Quick Start

1. **Fork the repo** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/festival-react-2025.git
   cd festival-react-2025
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Make changes** and test
6. **Commit:**
   ```bash
   git commit -m "Add amazing feature"
   ```
7. **Push:**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** on GitHub

---

## Code Style

**React:**
- Functional components only
- Hooks for state management
- Props destructuring
- Clear component names

**CSS:**
- CSS Modules for components
- Use design tokens from `tokens.css`
- Mobile-first media queries

**JavaScript:**
- ES6+ features
- Clear variable names
- Comments for complex logic

---

## File Organization

**Adding a new component:**
```
src/components/MyComponent/
├── MyComponent.jsx
└── MyComponent.module.css
```

**Adding a new page:**
```
src/pages/
├── MyPage.jsx
└── MyPage.module.css
```

Then update `src/app/router.jsx` to add the route.

---

## Testing Checklist

Before submitting a PR, test:

- ✅ Desktop view (1920×1080)
- ✅ Tablet view (768×1024)
- ✅ Mobile view (375×667)
- ✅ All filters work
- ✅ Navigation works
- ✅ No console errors
- ✅ Keyboard navigation works

---

## Commit Message Format

```
type: Brief description

Longer explanation if needed
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

**Examples:**
```
feat: Add campaign filter to map view
fix: Event drawer not closing on mobile
docs: Update deployment instructions
style: Format EventCard component
```

---

## What to Contribute

**Ideas:**
- 🐛 Fix bugs
- ✨ Add features from roadmap
- 📝 Improve documentation
- 🎨 Enhance UI/UX
- ♿ Improve accessibility
- 🌍 Add translations
- 🧪 Write tests

**Needed improvements:**
- [ ] Add unit tests (Vitest)
- [ ] Add E2E tests (Playwright)
- [ ] Improve mobile map UX
- [ ] Add event sharing (social media)
- [ ] Add print-friendly event pages
- [ ] Add dark mode
- [ ] Add internationalization (i18n)

---

## Getting Help

**Questions?**
- Check README.md first
- Open a GitHub Discussion
- Tag maintainers in issues

**Found a bug?**
- Open an issue with:
  - Description
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots if relevant

---

## Code of Conduct

**Be kind:**
- Respectful communication
- Constructive feedback
- Inclusive language
- Assume good intentions

**Zero tolerance for:**
- Harassment
- Discrimination
- Toxic behavior

---

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Part of the Zero Waste community! 🌱

---

**Thank you for making the world more sustainable! 💚**

