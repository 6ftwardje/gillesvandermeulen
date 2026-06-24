export interface ImageData {
  src: string
  alt: string
  width: number
  height: number
  series?: string
  priority?: boolean
}

export interface SeriesData {
  id: string
  title: string
  images: ImageData[]
}

export interface EditorialVolume {
  slug: string
  title: string
  year: string
  kicker: string
  description: string
  coverImage: ImageData
  images: ImageData[]
}

export interface PriceItem {
  name: string
  price: string
  description?: string
}

export interface PriceCategory {
  id: string
  name: string
  items: PriceItem[]
}

export interface SiteConfig {
  name: string
  title: string
  subtitle: string
  businessNumber: string
  media: {
    heroVideo: {
      playbackId: string
      mp4Url: string
      posterTime: string
      maxResolution: string
    }
  }
  booking: {
    salonkeeUrl: string
    label: string
  }
  address: {
    street: string
    city: string
  }
  social: {
    instagram?: string
  }
  seo: {
    description: string
    keywords?: string[]
  }
}



