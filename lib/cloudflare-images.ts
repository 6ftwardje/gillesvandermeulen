/**
 * Cloudflare Images Utility
 * 
 * Helper functions voor het werken met Cloudflare Images URLs
 */

const CLOUDFLARE_ACCOUNT_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID
const CLOUDFLARE_DELIVERY_URL = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_URL || 'https://imagedelivery.net'

export interface CloudflareImageOptions {
  width?: number
  height?: number
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad'
  quality?: number
  format?: 'webp' | 'avif' | 'jpeg' | 'png'
}

/**
 * Genereert een Cloudflare Images URL
 * 
 * @param imageId - De Cloudflare Image ID
 * @param variant - De variant naam (optioneel, default: 'public')
 * @param options - Transform opties
 * @returns De volledige Cloudflare Images URL
 */
export function getCloudflareImageUrl(
  imageId: string,
  variant: string = 'public',
  options: CloudflareImageOptions = {}
): string {
  if (!CLOUDFLARE_ACCOUNT_ID) {
    console.warn('CLOUDFLARE_ACCOUNT_ID is not set. Falling back to local images.')
    return ''
  }

  const { width, height, fit = 'cover', quality, format } = options

  const params = new URLSearchParams()

  if (width) params.append('width', width.toString())
  if (height) params.append('height', height.toString())
  if (fit) params.append('fit', fit)
  if (quality) params.append('quality', quality.toString())
  if (format) params.append('format', format)

  const queryString = params.toString()
  const baseUrl = `${CLOUDFLARE_DELIVERY_URL}/${CLOUDFLARE_ACCOUNT_ID}/${imageId}/${variant}`

  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

/**
 * Genereert een responsive Cloudflare Images URL met srcset
 * 
 * @param imageId - De Cloudflare Image ID
 * @param variant - De variant naam (optioneel, default: 'public')
 * @param sizes - Array van widths voor srcset
 * @param baseHeight - Basis height (optioneel)
 * @returns Object met src en srcSet
 */
export function getCloudflareImageSrcSet(
  imageId: string,
  variant: string = 'public',
  sizes: number[] = [640, 750, 828, 1080, 1200, 1920],
  baseHeight?: number
): { src: string; srcSet: string } {
  const src = getCloudflareImageUrl(imageId, variant, {
    width: sizes[Math.floor(sizes.length / 2)],
    height: baseHeight,
  })

  const srcSet = sizes
    .map((width) => {
      const url = getCloudflareImageUrl(imageId, variant, {
        width,
        height: baseHeight,
      })
      return `${url} ${width}w`
    })
    .join(', ')

  return { src, srcSet }
}

/**
 * Check of Cloudflare Images is geconfigureerd
 */
export function isCloudflareImagesConfigured(): boolean {
  return !!CLOUDFLARE_ACCOUNT_ID
}

