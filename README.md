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

## Development

- All components use TypeScript with strict types
- TailwindCSS only (no custom CSS files except globals.css)
- Accessibility-first (ARIA, keyboard navigation)
- DRY, composable, data-driven architecture
- Ready for headless CMS integration

