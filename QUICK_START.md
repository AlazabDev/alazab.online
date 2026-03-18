# Alazab Construction Portal - Quick Start Guide

## Project Overview

The Alazab Construction Group portal has been successfully rebuilt with a modern, modular architecture showcasing 4 specialized business divisions.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2. Run Development Server
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal in your browser.

---

## 📱 Preview the Portal

The homepage features these main sections (in order):

1. **Hero Section** - Full-width introduction with 4 quick action buttons
2. **Divisions Showcase** - 2x2 grid of service divisions
3. **Why Choose Us** - Statistics and advantages
4. **Testimonials** - Client success stories carousel
5. **CTA Banner** - Call-to-action with contact information
6. **Contact Section** - Additional contact methods

---

## 🎯 Key Features

### Bilingual Support (Arabic/English)
- Switch languages using the navbar language toggle
- All content automatically translates
- Proper RTL/LTR layout support

### Responsive Design
- Mobile optimized (375px+)
- Tablet friendly (640px+)
- Desktop enhanced (1024px+)

### Animations
- Smooth scroll-triggered animations
- Hover effects on interactive elements
- Auto-playing testimonial carousel
- CountUp animations for statistics

### SEO Optimized
- Semantic HTML structure
- Meta tags for social sharing
- Proper heading hierarchy
- Open Graph configuration

---

## 🔧 Customization Guide

### Update Company Information

**Contact Details** (in `/components/cta-banner.tsx`):
```tsx
<a href="tel:+966XXXXXXXXX">  {/* Update phone number */}
<a href="https://wa.me/966XXXXXXXXX">  {/* Update WhatsApp */}
```

**Email and Location** (same file):
```tsx
info@alazab.com  {/* Update email */}
Riyadh, Saudi Arabia  {/* Update location */}
```

### Modify Division Information

Edit `/lib/data/divisions.ts`:
```typescript
{
  id: "luxury-finishing",
  titleAr: "التشطيبات الفاخرة",
  titleEn: "Luxury Finishing",
  descriptionAr: "...",
  descriptionEn: "...",
  link: "https://luxury-finishing.alazab.com",
  // Customize as needed
}
```

### Update Statistics

Edit `/lib/data/statistics.ts`:
```typescript
{
  id: "experience",
  valueEn: 15,  // Change to your actual years
  valueAr: 15,
  labelAr: "سنة من الخبرة",
  labelEn: "Years of Experience",
  // Update other values
}
```

### Add/Edit Testimonials

Edit `/lib/data/testimonials.ts`:
```typescript
{
  nameAr: "أحمد محمد",
  nameEn: "Ahmed Mohammed",
  quoteAr: "...",
  quoteEn: "...",
  division: "luxury-finishing",
  rating: 5,
}
```

---

## 🌍 External Links Configuration

The portal links to 4 subsidiary websites. Update these in `/lib/data/divisions.ts`:

```typescript
link: "https://your-subsidiary-url.com"
```

Websites:
1. **Luxury Finishing:** https://luxury-finishing.alazab.com
2. **Brand Identity:** https://brand-identity.alazab.com
3. **UberFix:** https://uberfix.alazab.com
4. **Laban Alasfour:** https://laban-alasfour.alazab.com

---

## 🎨 Design Customization

### Color Scheme

Located in `/app/globals.css`:

```css
:root {
  --color-primary: #f5bf23;      /* Gold - Main accent */
  --color-deep: #030332;         /* Dark Blue - Secondary */
  --background: oklch(1 0 0);    /* White */
  --foreground: oklch(0.145 0 0); /* Dark */
}
```

### Typography

Fonts defined in `/app/layout.tsx`:
- **Arabic:** Cairo font
- **English:** Montserrat font
- **Mono:** Inter font

---

## 🔗 Navigation Structure

**Main Navigation (Navbar):**
- Home
- About
- Services
- Projects
- Media Center
- Contact
- Language Toggle
- Get Quote Button

**Quick Links (Hero Section):**
- Luxury Finishing
- Brand Identity
- UberFix
- Laban Alasfour

---

## 📊 Analytics Integration (Optional)

To add Google Analytics:

1. Add `NEXT_PUBLIC_GA_ID` to `.env.local`
2. Update `/app/layout.tsx` with analytics script

---

## 🔐 Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://alazab.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id  (optional)
```

---

## 📦 Component Structure

```
components/
├── hero-section.tsx          ← Full-width hero
├── divisions-showcase.tsx    ← Service cards
├── why-choose-us.tsx         ← Statistics
├── testimonial-section.tsx   ← Client reviews
├── cta-banner.tsx           ← Call-to-action
├── enhanced-contact-section.tsx
└── animations/              ← Reusable animations
    ├── fade-in.tsx
    ├── scale-in.tsx
    ├── count-up.tsx
    └── scroll-progress.tsx
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1440px)
- [ ] Test language toggle (AR/EN)
- [ ] Test carousel navigation
- [ ] Click all external links
- [ ] Test form submissions
- [ ] Check animation performance

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

## 🚀 Deployment

### Deploy to Vercel
```bash
# Push to GitHub (if connected)
git push origin main

# Or deploy directly
vercel deploy
```

### Environment Setup
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy from main branch

---

## 📞 Support

### Common Issues

**Components not showing?**
- Verify all imports in `HomePageClient.tsx`
- Check file paths in import statements
- Ensure all dependencies are installed

**Styling issues?**
- Clear Next.js cache: `rm -rf .next`
- Restart dev server
- Check Tailwind configuration

**Animations not working?**
- Verify Framer Motion is installed
- Check browser supports CSS animations
- Try disabling reduced-motion

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Shadcn/ui Components](https://ui.shadcn.com/)

---

## ✨ Next Steps

1. **Update Content** - Replace placeholder text with your company info
2. **Add Assets** - Upload your company logo and project images
3. **Configure Analytics** - Set up Google Analytics
4. **Test Thoroughly** - Test on various devices and browsers
5. **Deploy** - Push to Vercel or your hosting platform
6. **Monitor** - Track performance and user engagement

---

**Portal Version:** 1.0.0  
**Last Updated:** March 18, 2026  
**Status:** Production Ready ✅
