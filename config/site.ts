import { SiteConfig, SeriesData, PriceCategory } from '@/types'

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

export const heroImages: string[] = [
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-3.jpg',
]

export const gallerySeries: SeriesData[] = [
  {
    id: 'series-1',
    title: 'Series I — Editorial',
    images: [
      {
        src: '/images/gallery/series-1/image-1.jpg',
        alt: 'Editorial hair styling',
        width: 1200,
        height: 1600,
        series: 'series-1',
      },
      {
        src: '/images/gallery/series-1/image-2.jpg',
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
        src: '/images/gallery/series-2/image-1.jpg',
        alt: 'Studio hair styling',
        width: 1200,
        height: 1600,
        series: 'series-2',
      },
      {
        src: '/images/gallery/series-2/image-2.jpg',
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
        src: '/images/gallery/series-3/image-1.jpg',
        alt: 'Urban hair styling',
        width: 1200,
        height: 1600,
        series: 'series-3',
      },
      {
        src: '/images/gallery/series-3/image-2.jpg',
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

