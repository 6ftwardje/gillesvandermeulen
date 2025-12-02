import { SiteConfig, SeriesData, PriceCategory } from '@/types'
import { getCloudflareImageUrl, isCloudflareImagesConfigured } from '@/lib/cloudflare-images'

export const siteConfig: SiteConfig = {
  name: 'Gilles Vandermeulen',
  title: 'GILLES VANDERMEULEN',
  subtitle: 'Hair Artist – Ghent',
  address: {
    street: 'Zuidstationstraat 16',
    city: 'Ghent',
  },
  social: {
    instagram: 'https://instagram.com/gillesvandermeulen',
  },
  seo: {
    description: 'Premium hair artistry by Gilles Vandermeulen in Ghent. Contemporary, architectural, minimal approach to hair design.',
    keywords: ['hair artist', 'Ghent', 'hair salon', 'premium hair', 'Gilles Vandermeulen'],
  },
}

// Cloudflare Images Configuration
// Vervang deze Image IDs met de werkelijke IDs na het uploaden naar Cloudflare Images
// Als je nog geen Cloudflare Images hebt ingesteld, worden lokale images gebruikt als fallback
const CLOUDFLARE_IMAGE_IDS = {
  hero: [
    'hero-1', // Vervang met werkelijke Image ID
    'hero-2', // Vervang met werkelijke Image ID
    'hero-3', // Vervang met werkelijke Image ID
  ],
  statement: {
    large: 'statement-large', // Vervang met werkelijke Image ID
    small: 'statement-small', // Vervang met werkelijke Image ID
  },
  about: 'gilles-portrait', // Vervang met werkelijke Image ID
  atelier: 'atelier-interior', // Vervang met werkelijke Image ID
  gallery: {
    'series-1': [
      'series-1-image-1', // Vervang met werkelijke Image ID
      'series-1-image-2', // Vervang met werkelijke Image ID
    ],
    'series-2': [
      'series-2-image-1', // Vervang met werkelijke Image ID
      'series-2-image-2', // Vervang met werkelijke Image ID
    ],
    'series-3': [
      'series-3-image-1', // Vervang met werkelijke Image ID
      'series-3-image-2', // Vervang met werkelijke Image ID
    ],
  },
}

// Helper functie om image URL te krijgen (Cloudflare of lokaal)
function getImageUrl(cloudflareId: string, localPath: string, options?: { width?: number; height?: number }): string {
  if (isCloudflareImagesConfigured() && cloudflareId && !cloudflareId.includes('/')) {
    // Als het een Cloudflare Image ID is (geen path), gebruik Cloudflare
    return getCloudflareImageUrl(cloudflareId, 'public', options)
  }
  // Anders gebruik lokale path
  return localPath
}

export const heroImages: string[] = isCloudflareImagesConfigured()
  ? CLOUDFLARE_IMAGE_IDS.hero.map((id, index) => getImageUrl(id, `/images/hero/hero-${index + 1}.jpg`))
  : [
      '/images/hero/hero-1.jpg',
      '/images/hero/hero-2.jpg',
      '/images/hero/hero-3.jpg',
    ]

export const statementImages = {
  large: getImageUrl(CLOUDFLARE_IMAGE_IDS.statement.large, '/images/statement/statement-large.jpg'),
  small: getImageUrl(CLOUDFLARE_IMAGE_IDS.statement.small, '/images/statement/statement-small.jpg'),
}

export const aboutImage = getImageUrl(CLOUDFLARE_IMAGE_IDS.about, '/images/about/gilles-portrait.jpg')

export const atelierImage = getImageUrl(CLOUDFLARE_IMAGE_IDS.atelier, '/images/atelier/interior.jpg')

export const gallerySeries: SeriesData[] = [
  {
    id: 'series-1',
    title: 'Series I — Editorial',
    images: [
      {
        src: getImageUrl(CLOUDFLARE_IMAGE_IDS.gallery['series-1'][0], '/images/gallery/series-1/image-1.jpg', {
          width: 1200,
          height: 1600,
        }),
        alt: 'Editorial hair styling',
        width: 1200,
        height: 1600,
        series: 'series-1',
      },
      {
        src: getImageUrl(CLOUDFLARE_IMAGE_IDS.gallery['series-1'][1], '/images/gallery/series-1/image-2.jpg', {
          width: 1200,
          height: 1600,
        }),
        alt: 'Editorial hair styling',
        width: 1200,
        height: 1600,
        series: 'series-1',
      },
    ],
  },
  {
    id: 'series-2',
    title: 'Series II — Studio',
    images: [
      {
        src: getImageUrl(CLOUDFLARE_IMAGE_IDS.gallery['series-2'][0], '/images/gallery/series-2/image-1.jpg', {
          width: 1200,
          height: 1600,
        }),
        alt: 'Studio hair styling',
        width: 1200,
        height: 1600,
        series: 'series-2',
      },
      {
        src: getImageUrl(CLOUDFLARE_IMAGE_IDS.gallery['series-2'][1], '/images/gallery/series-2/image-2.jpg', {
          width: 1200,
          height: 1600,
        }),
        alt: 'Studio hair styling',
        width: 1200,
        height: 1600,
        series: 'series-2',
      },
    ],
  },
  {
    id: 'series-3',
    title: 'Series III — Urban',
    images: [
      {
        src: getImageUrl(CLOUDFLARE_IMAGE_IDS.gallery['series-3'][0], '/images/gallery/series-3/image-1.jpg', {
          width: 1200,
          height: 1600,
        }),
        alt: 'Urban hair styling',
        width: 1200,
        height: 1600,
        series: 'series-3',
      },
      {
        src: getImageUrl(CLOUDFLARE_IMAGE_IDS.gallery['series-3'][1], '/images/gallery/series-3/image-2.jpg', {
          width: 1200,
          height: 1600,
        }),
        alt: 'Urban hair styling',
        width: 1200,
        height: 1600,
        series: 'series-3',
      },
    ],
  },
]

export const prices: PriceCategory[] = [
  {
    id: 'cut-men',
    name: 'Cut – Men',
    items: [
      { name: 'Classic Cut', price: '€45' },
      { name: 'Premium Cut', price: '€65' },
    ],
  },
  {
    id: 'cut-women',
    name: 'Cut – Women',
    items: [
      { name: 'Classic Cut', price: '€55' },
      { name: 'Premium Cut', price: '€75' },
      { name: 'Styling Cut', price: '€95' },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    items: [
      { name: 'Full Color', price: '€120' },
      { name: 'Highlights', price: '€150' },
      { name: 'Balayage', price: '€180' },
    ],
  },
  {
    id: 'addons',
    name: 'Add-ons',
    items: [
      { name: 'Hair Treatment', price: '€25' },
      { name: 'Beard Trim', price: '€15' },
    ],
  },
]

