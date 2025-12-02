# Gilles Vandermeulen - Premium Hair Artist Website

A premium, minimal, high-fashion style website for hair artist Gilles Vandermeulen (Ghent).

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS** (styling only)
- **Framer Motion** (animations)
- **Lenis** (smooth scrolling)

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with smooth scroll provider
│   ├── page.tsx            # Homepage (single-page app)
│   └── globals.css         # Global styles
├── components/
│   ├── sections/           # All 8 main sections
│   ├── ui/                 # Reusable UI components
│   └── providers/          # Context providers
├── config/
│   └── site.ts             # Site configuration and data
├── lib/
│   ├── utils.ts            # Utility functions
│   └── motion-variants.ts  # Framer Motion variants
└── types/
    └── index.ts            # TypeScript types
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Sections

1. **HeroSection** - Fullscreen hero with rotating images
2. **StatementSection** - Bold statement with asymmetrical images
3. **AboutSection** - Minimal about with SEO accordion
4. **GallerySection** - 3 series with editorial spreads
5. **AtelierSection** - Studio space with architectural photos
6. **PricesSection** - Accordion-based pricing
7. **BookingSection** - Salonkee widget integration
8. **FooterSection** - Ultra minimal footer

## Design Principles

- Contemporary urban, architectural, minimal, editorial
- High-fashion/studio aesthetic (not barbershop)
- Black/white with subtle greys (#f7f7f7, #e6e6e6)
- Large, high-quality model-only photography
- Asymmetrical but controlled layouts
- Architectural, clean grotesk typography
- Slow, subtle, directional motion

## Image Requirements

Add the following images to `public/images/`:

### Hero Images (3 images, fullscreen)
- `hero/hero-1.jpg` - High-quality model portrait
- `hero/hero-2.jpg` - High-quality model portrait
- `hero/hero-3.jpg` - High-quality model portrait

### Statement Section
- `statement/statement-large.jpg` - Large editorial image (4:5 aspect)
- `statement/statement-small.jpg` - Small detail image (1:1 aspect)

### About Section
- `about/gilles-portrait.jpg` - Portrait of Gilles (3:4 aspect)

### Gallery Series
- `gallery/series-1/image-1.jpg` - Editorial styling
- `gallery/series-1/image-2.jpg` - Editorial styling
- `gallery/series-2/image-1.jpg` - Studio styling
- `gallery/series-2/image-2.jpg` - Studio styling
- `gallery/series-3/image-1.jpg` - Urban styling
- `gallery/series-3/image-2.jpg` - Urban styling

### Atelier Section
- `atelier/interior.jpg` - Architectural interior photo

**Image Guidelines:**
- High-quality, high-resolution images
- Model-only photography (no Gilles in hero/gallery)
- Consistent editorial style
- Optimize for web (Next.js Image component handles optimization)

## Development

- All components use TypeScript with strict types
- TailwindCSS only (no custom CSS files except globals.css)
- Accessibility-first (ARIA, keyboard navigation)
- DRY, composable, data-driven architecture
- Ready for headless CMS integration

## Next Steps

1. Add images to `public/images/` directories
2. Integrate Salonkee booking widget in `BookingSection`
3. Connect to headless CMS (Sanity) if needed
4. Add custom fonts (architectural grotesk) if desired
5. Deploy to Vercel

