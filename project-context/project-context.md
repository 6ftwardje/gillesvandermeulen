# Project Overview

**Project Name:** BARB3R_VDM / Gilles Vandermeulen  
**Type:** Premium Hair Artist Website  
**Location:** Ghent, Belgium  
**Status:** In Development

A premium, minimal, high-fashion style single-page website for hair artist Gilles Vandermeulen. The site emphasizes contemporary urban, architectural, and editorial aesthetics with a focus on high-quality photography and minimal design.

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript (strict mode)
- TailwindCSS (styling only, no custom CSS except globals.css)
- Framer Motion (animations)
- Lenis (smooth scrolling)
- Cloudflare Images (image hosting with fallback to local)
- Netlify (hosting & deployment)

---

# Brand Identity

**Name:** Gilles Vandermeulen  
**Title:** GILLES VANDERMEULEN  
**Subtitle:** Hair Artist – Ghent

**Brand Positioning:**
- Contemporary urban, architectural, minimal, editorial aesthetic
- High-fashion/studio aesthetic (NOT barbershop)
- Premium hair artistry
- Architectural expression through hair design
- Minimalism as luxury

**Color Palette:**
- Primary: Black (#000000) and White (#FFFFFF)
- Subtle greys: `#f7f7f7` (grey-light), `#e6e6e6` (grey-medium)
- Text: Black on white, white on dark images

**Typography:**
- System fonts: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- Clean grotesk, architectural style
- Uppercase for headings with wide tracking
- Future consideration: Custom architectural grotesk font

**Visual Style:**
- Large, high-quality model-only photography (no Gilles in hero/gallery)
- Asymmetrical but controlled layouts
- Editorial spreads, not standard masonry
- Much white space
- Slow, subtle, directional motion
- No marketing fluff, high-end editorial tone

---

# Website Structure

**Type:** Single-page application (SPA) with anchor navigation

**Sections (in order):**

1. **HeroSection** (`#hero`)
   - Fullscreen hero with rotating images (3 images, 5-second intervals)
   - Typography overlay with name and subtitle
   - Scroll indicator
   - Image indicators (clickable dots)

2. **StatementSection** (`#statement`)
   - Bold statement with asymmetrical images
   - Large editorial image (4:5 aspect)
   - Small detail image (1:1 aspect)

3. **AboutSection** (`#about`)
   - Minimal about text
   - Portrait of Gilles (3:4 aspect)
   - Expandable SEO accordion with longer content

4. **GallerySection** (`#gallery`)
   - 3 editorial series:
     - Series I — Editorial
     - Series II — Studio
     - Series III — Urban
   - Each series: 2-6 images in editorial spreads
   - Alternating ratios, asymmetrical layouts with white space

5. **AtelierSection** (`#atelier`)
   - Studio space showcase
   - Architectural interior photos
   - Address display (Zuidstationstraat 16, Ghent)
   - Optional expandable SEO block for products, organic info, location details

6. **PricesSection** (`#prices`)
   - Accordion-based pricing categories
   - Clean typography, no budget-looking tables
   - Categories:
     - Cut – Men (Classic Cut €45, Premium Cut €65)
     - Cut – Women (Classic Cut €55, Premium Cut €75, Styling Cut €95)
     - Color (Full Color €120, Highlights €150, Balayage €180)
     - Add-ons (Hair Treatment €25, Beard Trim €15)

7. **BookingSection** (`#booking`)
   - Salonkee widget integration (placeholder currently)
   - Clean container with minimal intro ("Book your session")
   - No overbearing CTAs or distractions

8. **FooterSection** (`#footer`)
   - Ultra minimal
   - Name, address, Instagram link
   - Future: Digital signature option
   - No complex navigation

**Navigation:**
- Tubelight navbar with icons (Home, About, Gallery, Atelier, Prices, Booking)
- Smooth scroll to sections
- Sticky/fixed positioning

---

# Copy Content

## Hero Section
- **Title:** GILLES VANDERMEULEN
- **Subtitle:** Hair Artist – Ghent

## About Section

**Main Text:**
> Gilles Vandermeulen approaches hair as a form of architectural expression, creating structures that reflect contemporary urban minimalism.

**SEO Accordion Content:**
> With a background in high-end fashion and editorial work, Gilles brings a unique perspective to hair artistry. His approach combines technical precision with creative vision, resulting in looks that are both contemporary and timeless.
>
> Based in Ghent, Gilles works from his studio atelier, where he creates custom looks for clients seeking something beyond the ordinary. Each session is a collaboration, a dialogue between artist and client.
>
> His work has been featured in editorial spreads and fashion campaigns, always maintaining the same philosophy: hair as form, structure as expression, minimalism as luxury.

## Statement Section
*(Content to be added from PDF sources or user notes)*

## Atelier Section
*(Additional content about products, organic approach, location details - to be added)*

## SEO Meta
- **Description:** Premium hair artistry by Gilles Vandermeulen in Ghent. Contemporary, architectural, minimal approach to hair design.
- **Keywords:** hair artist, Ghent, hair salon, premium hair, Gilles Vandermeulen

---

# UI / UX Guidelines

## Design Principles

1. **Contemporary Urban, Architectural, Minimal, Editorial**
   - High-fashion/studio aesthetic (not barbershop)
   - Black/white with subtle greys
   - Large, high-quality model-only photography
   - Asymmetrical but controlled layouts
   - Architectural, clean grotesk typography
   - Slow, subtle, directional motion

2. **No Marketing Fluff**
   - High-end, editorial tone
   - No overbearing CTAs
   - Minimal, clean presentation

3. **Accessibility First**
   - ARIA attributes
   - Keyboard navigation
   - Semantic HTML
   - Alt text for all images

## Animations & Motion

**Framer Motion Variants:**
- `fadeIn` - Simple opacity fade
- `fadeInUp` - Fade with upward motion (y: 40)
- `fadeInDown` - Fade with downward motion (y: -40)
- `slideInLeft` - Slide from left (x: -60)
- `slideInRight` - Slide from right (x: 60)
- `staggerContainer` - Container for staggered children
- `staggerItem` - Individual staggered item

**Animation Guidelines:**
- Duration: 0.8-1.2 seconds
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (editorial timing)
- Directional motion: Images and text move from opposite directions
- No over-the-top parallax; subtle, cinematic feel
- Slow, elegant, no bouncy easing
- Avoid busy, flashy effects; always premium, editorial

**Smooth Scrolling:**
- Lenis integration via `SmoothScrollProvider`
- No aggressive parallax
- Subtle, cinematic feel

## Responsive Design

- Mobile-first approach
- Breakpoints: Tailwind defaults (sm, md, lg, xl, 2xl)
- Section spacing: `section` (8rem), `section-sm` (4rem)
- Images: Responsive with Next.js Image component
- Typography scales: text-3xl → md:text-4xl → lg:text-5xl

## Color Tokens

```css
--background: 0 0% 100% (white)
--foreground: 0 0% 0% (black)
--border: 0 0% 89.8%
--muted: 0 0% 96.1%
--muted-foreground: 0 0% 45.1%
--primary: 0 0% 9%
--primary-foreground: 0 0% 98%
--grey-light: #f7f7f7
--grey-medium: #e6e6e6
```

---

# Components & Architecture

## File Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SmoothScrollProvider & Navigation
│   ├── page.tsx            # Homepage (single-page app, imports all sections)
│   └── globals.css         # Global styles, CSS variables, Lenis styles
├── components/
│   ├── sections/           # All 8 main sections
│   │   ├── HeroSection.tsx
│   │   ├── StatementSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── AtelierSection.tsx
│   │   ├── PricesSection.tsx
│   │   ├── BookingSection.tsx
│   │   └── FooterSection.tsx
│   ├── ui/                 # Reusable UI components
│   │   ├── Accordion.tsx
│   │   ├── ImagePair.tsx
│   │   ├── Navigation.tsx
│   │   ├── SectionWrapper.tsx
│   │   └── tubelight-navbar.tsx
│   └── providers/          # Context providers
│       └── SmoothScrollProvider.tsx
├── config/
│   └── site.ts             # Site configuration, image config, pricing data
├── lib/
│   ├── cloudflare-images.ts    # Cloudflare Images utilities
│   ├── motion-variants.ts      # Framer Motion variants
│   └── utils.ts                # Utility functions
├── types/
│   └── index.ts            # TypeScript type definitions
└── public/
    └── images/             # Local image fallbacks
        ├── hero/
        ├── statement/
        ├── about/
        ├── gallery/
        │   ├── series-1/
        │   ├── series-2/
        │   └── series-3/
        └── atelier/
```

## Component Architecture

**Data-Driven:**
- All content in `config/site.ts`
- Types defined in `types/index.ts`
- Components are composable and reusable
- Ready for headless CMS integration (future)

**Component Patterns:**
- All sections use `SectionWrapper` for consistent spacing
- Motion animations via Framer Motion with viewport triggers
- `'use client'` directive for interactive components
- TypeScript strict mode throughout

## Key Components

### SectionWrapper
- Consistent section spacing and layout
- Optional animation prop
- Variant support (default, etc.)

### Accordion
- Expandable content for SEO blocks
- ARIA attributes for accessibility
- Used in AboutSection and PricesSection

### Navigation
- Tubelight navbar component
- Icon-based navigation (lucide-react)
- Smooth scroll to sections

### ImagePair
- For asymmetrical image layouts
- Used in StatementSection

## TypeScript Types

```typescript
interface SiteConfig {
  name: string
  title: string
  subtitle: string
  address: { street: string; city: string }
  social: { instagram?: string }
  seo: { description: string; keywords?: string[] }
}

interface ImageData {
  src: string
  alt: string
  width: number
  height: number
  series?: string
  priority?: boolean
}

interface SeriesData {
  id: string
  title: string
  images: ImageData[]
}

interface PriceItem {
  name: string
  price: string
  description?: string
}

interface PriceCategory {
  id: string
  name: string
  items: PriceItem[]
}
```

---

# Hosting & Infrastructure

## Deployment Platform: Netlify

**Configuration:** `netlify.toml`

```toml
[build]
  command = "npm run build"
  # Publish directory handled by @netlify/plugin-nextjs

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
  # Disable secrets scanning for Cloudflare Images Account IDs
  SECRETS_SCAN_OMIT_KEYS = "NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID,NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ACCOUNT_ID"
```

**Headers:**
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy)
- Cache headers for static assets (31536000, immutable)
- Cache headers for images (31536000, immutable)

**DNS:**
*(To be added when domain is configured)*

## Environment Variables

**Required for Cloudflare Images:**
- `NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID` - Cloudflare Account ID
- `CLOUDFLARE_IMAGES_API_TOKEN` - API Token (server-side only)
- `NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ACCOUNT_ID` - Optional, defaults to Account ID
- `NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_URL` - Optional, defaults to `https://imagedelivery.net`

**Note:** Account IDs are public identifiers (intentionally exposed in client-side code) and are not secrets.

## Build & Deploy

```bash
npm run build    # Production build
npm run dev      # Development server
npm start        # Production server
npm run lint     # ESLint
```

---

# Image & Video Strategy

## Cloudflare Images (Primary)

**Status:** Configured with automatic fallback to local images

**Benefits:**
- Automatic optimization (WebP/AVIF conversion)
- CDN distribution (fast global load times)
- Automatic compression without quality loss
- Fallback system works without Cloudflare

**Configuration:**
- Image IDs stored in `config/site.ts` → `CLOUDFLARE_IMAGE_IDS`
- Helper function `getImageUrl()` automatically chooses Cloudflare or local
- Utility functions in `lib/cloudflare-images.ts`

**Image URLs Format:**
```
https://imagedelivery.net/{accountId}/{imageId}/{variant}?width={width}&height={height}&fit={fit}&quality={quality}&format={format}
```

**Current Image IDs (Placeholders - to be replaced):**

**Hero (3 images):**
- `ad402027-d330-414d-13ea-391d835e5900`
- `ab471d33-1311-449a-2507-2e581b34cb00`
- `bc04322f-fda0-44bc-74f3-3b259fd55d00`

**Statement:**
- Large: `statement-large`
- Small: `statement-small`

**About:**
- Portrait: `gilles-portrait`

**Atelier:**
- Interior: `atelier-interior`

**Gallery Series:**
- Series 1: `series-1-image-1`, `series-1-image-2`
- Series 2: `series-2-image-1`, `series-2-image-2`
- Series 3: `series-3-image-1`, `series-3-image-2`

**Upload Scripts:**
- `scripts/upload-images.js` - Automated upload script
- `scripts/fetch-cloudflare-image-ids.js` - Fetch existing IDs
- `scripts/debug-cloudflare-image.js` - Debug tool

## Local Images (Fallback)

**Directory Structure:**
```
public/images/
├── hero/
│   ├── hero-1.jpg
│   ├── hero-2.jpg
│   └── hero-3.jpg
├── statement/
│   ├── statement-large.jpg (4:5 aspect)
│   └── statement-small.jpg (1:1 aspect)
├── about/
│   └── gilles-portrait.jpg (3:4 aspect)
├── gallery/
│   ├── series-1/
│   │   ├── image-1.jpg (1200x1600)
│   │   └── image-2.jpg (1200x1600)
│   ├── series-2/
│   │   ├── image-1.jpg (1200x1600)
│   │   └── image-2.jpg (1200x1600)
│   └── series-3/
│       ├── image-1.jpg (1200x1600)
│       └── image-2.jpg (1200x1600)
└── atelier/
    └── interior.jpg (4:3 or square)
```

**Image Guidelines:**
- High-quality, high-resolution images
- Model-only photography (no Gilles in hero/gallery)
- Consistent editorial style
- Next.js Image component handles optimization
- Cloudflare images use `unoptimized={true}` flag

**Total Images Required:** 13 images

## Next.js Image Configuration

**Config:** `next.config.js`

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'imagedelivery.net',
    },
  ],
}
```

---

# SEO Rules

## Meta Tags

**Default (from `app/layout.tsx`):**
- Title: `Gilles Vandermeulen` (template: `%s | Gilles Vandermeulen`)
- Description: Premium hair artistry by Gilles Vandermeulen in Ghent. Contemporary, architectural, minimal approach to hair design.
- Keywords: hair artist, Ghent, hair salon, premium hair, Gilles Vandermeulen
- Open Graph: Configured for social sharing

## SEO Content Strategy

**Visible Content:**
- Minimal, high-end copy
- No keyword stuffing
- Editorial tone

**Hidden/Expandable SEO Content:**
- AboutSection: Expandable accordion with longer content
- AtelierSection: Optional expandable block for products, organic info, location details
- All content accessible to search engines (not hidden with CSS)

## Technical SEO

- Semantic HTML structure
- Proper heading hierarchy (h1, h2, h3)
- Alt text for all images
- ARIA attributes for accessibility
- Clean URL structure (single-page with anchors)
- Fast loading (Cloudflare CDN, optimized images)

---

# Integrations

## Salonkee (Booking System)

**Status:** Placeholder - Integration pending

**Location:** `components/sections/BookingSection.tsx`

**Current State:**
- Placeholder div with "Salonkee booking widget" text
- Container ready: `min-h-[600px]`, white background, rounded
- Clean, minimal presentation

**Next Steps:**
- Obtain Salonkee embed code/widget
- Replace placeholder with actual iframe or script
- Test booking flow
- Ensure mobile responsiveness

**Requirements:**
- Clean container, no overbearing CTAs
- Minimal intro text ("Book your session")
- No distractions around booking widget

## Cloudflare Images

**Status:** Fully configured with fallback

**Integration Points:**
- `lib/cloudflare-images.ts` - Utility functions
- `config/site.ts` - Image ID configuration
- `next.config.js` - Remote patterns for imagedelivery.net

**Functions:**
- `getCloudflareImageUrl()` - Generate optimized URLs
- `getCloudflareImageSrcSet()` - Generate responsive srcsets
- `isCloudflareImagesConfigured()` - Check configuration
- `isCloudflareImageUrl()` - Validate URLs

**Cost:** Free tier (100,000 images/month) - likely sufficient for this project

---

# Open Tasks

## High Priority

1. **Salonkee Integration**
   - [ ] Obtain Salonkee embed code/widget
   - [ ] Replace placeholder in BookingSection
   - [ ] Test booking functionality
   - [ ] Ensure mobile responsiveness

2. **Cloudflare Images Setup**
   - [ ] Upload all 13 images to Cloudflare Images
   - [ ] Replace placeholder Image IDs in `config/site.ts`
   - [ ] Test image loading and optimization
   - [ ] Verify fallback to local images works

3. **Content Completion**
   - [ ] Add Statement section copy (from PDF sources)
   - [ ] Add Atelier section expandable content (products, organic info)
   - [ ] Review and finalize all copy

## Medium Priority

4. **Custom Fonts**
   - [ ] Research architectural grotesk fonts
   - [ ] Integrate custom font (if desired)
   - [ ] Update typography in Tailwind config

5. **DNS & Domain**
   - [ ] Configure custom domain on Netlify
   - [ ] Set up DNS records
   - [ ] Document domain configuration

6. **Image Assets**
   - [ ] Ensure all 13 images are high-quality
   - [ ] Verify image aspect ratios match requirements
   - [ ] Optimize images before upload (if needed)

## Low Priority / Future

7. **Headless CMS Integration**
   - [ ] Evaluate CMS options (Sanity mentioned in README)
   - [ ] Plan content structure
   - [ ] Implement CMS integration (if needed)

8. **Analytics**
   - [ ] Set up analytics (Google Analytics, Plausible, etc.)
   - [ ] Configure privacy-compliant tracking

9. **Performance Optimization**
   - [ ] Run Lighthouse audits
   - [ ] Optimize Core Web Vitals
   - [ ] Test on various devices/browsers

10. **Testing**
    - [ ] Cross-browser testing
    - [ ] Mobile device testing
    - [ ] Accessibility audit (WCAG compliance)

---

# Decisions Log

## 2024 - Project Setup

**Tech Stack Decision:**
- Chose Next.js 14 App Router for modern React framework
- TypeScript strict mode for type safety
- TailwindCSS for utility-first styling (no custom CSS files)
- Framer Motion for animations (premium, editorial feel)
- Lenis for smooth scrolling

**Design Direction:**
- Decided on single-page application (SPA) with anchor navigation
- Chose high-fashion/studio aesthetic over barbershop style
- Minimal, editorial approach with black/white/grey palette

**Image Strategy:**
- Implemented Cloudflare Images with automatic fallback to local images
- Created helper functions for seamless switching between Cloudflare and local
- Configured Next.js Image component with Cloudflare remote patterns

**Hosting Decision:**
- Chose Netlify for deployment
- Configured @netlify/plugin-nextjs for Next.js support
- Set up security headers and caching strategies

**Component Architecture:**
- Data-driven approach with all content in `config/site.ts`
- Composable, reusable components
- TypeScript types for all data structures
- Ready for future CMS integration

**Navigation:**
- Implemented tubelight navbar with icon-based navigation
- Smooth scroll to sections
- Sticky/fixed positioning

**Animation Strategy:**
- Slow, elegant animations (0.8-1.2s duration)
- Editorial easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Directional motion (opposite directions for images/text)
- No over-the-top effects

**SEO Approach:**
- Visible minimal content + expandable SEO blocks
- Accordion components for longer content
- All content accessible to search engines
- Proper semantic HTML and ARIA attributes

---

# Development Workflow

## Coding Standards

**TypeScript:**
- Strict mode enabled
- All components typed
- Interfaces defined in `types/index.ts`
- No `any` types

**Styling:**
- TailwindCSS only (no custom CSS except `globals.css`)
- Use design tokens (colors, spacing, typography)
- Responsive design with Tailwind breakpoints
- Utility classes preferred over custom CSS

**Components:**
- `'use client'` directive for interactive components
- Framer Motion for animations
- Viewport triggers for scroll animations
- Accessibility-first (ARIA, keyboard navigation)

**File Organization:**
- Sections in `components/sections/`
- Reusable UI in `components/ui/`
- Providers in `components/providers/`
- Configuration in `config/`
- Utilities in `lib/`
- Types in `types/`

## Git Workflow

**Current Status:**
- Branch: `main`
- Up to date with `origin/main`
- Uncommitted changes: Deleted documentation files, modified `config/site.ts`

**Note:** Several documentation files were deleted (CLOUDFLARE_*, NETLIFY_*). Information from these should be preserved in this project-context.md file.

---

# Notes & Reminders

- **Project Name Discrepancy:** User refers to project as "BARB3R_VDM" but codebase uses "Gilles Vandermeulen" / "gilles-vandermeulen". Using actual project name in documentation.

- **Image Placeholders:** All Cloudflare Image IDs in `config/site.ts` are placeholders and need to be replaced with actual IDs after upload.

- **Salonkee:** Booking widget integration is pending. Placeholder exists in BookingSection.

- **Content Sources:** Some content (Statement section, Atelier details) may come from PDF sources - to be added when available.

- **No Lorem Ipsum:** All content should be real. No placeholder text.

---

*Last Updated: [Auto-updated on changes]*

