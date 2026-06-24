import { EditorialVolume, ImageData } from '@/types'
import { getCloudflareImageUrl, isCloudflareImagesConfigured } from '@/lib/cloudflare-images'

type EditorialImageSeed = {
  id: string
  width: number
  height: number
}

const EDITORIAL_IMAGE_IDS = {
  // Current Cloudflare-hosted editorial images all belong to Volume 1.
  volume1: [
    '9ab97f68-6422-4194-2464-2e0bbeac1600',
    '958c80a4-4cb2-4e68-4f04-0046e9e3db00',
    'be7f9097-8297-4d76-66ee-4defbd210800',
    'cea7eb5a-2e94-4ca5-98ee-3252d4fe4500',
    'd99bfc89-317f-4ad9-ae52-bfb2585b9e00',
    '55b7151c-b71b-4a61-fffe-e56419adec00',
  ],
  volume2: [
    { id: '8a5af948-a71b-4439-d5c9-b15bc16d7200', width: 512, height: 768 },
    { id: '0fb039e5-939f-41a6-1c74-66f8cbeffd00', width: 512, height: 768 },
    { id: '961e3728-7ccf-4adc-4ae7-d3e74d2f5200', width: 512, height: 768 },
    { id: 'bccfd5f8-3bf3-4aa5-16fa-a527c466a800', width: 512, height: 768 },
    { id: '2c8a5352-d043-4805-b908-036d615cba00', width: 512, height: 768 },
    { id: '327711fb-973b-4959-7b38-2466a66dab00', width: 511, height: 768 },
    { id: '61ef4e7a-df72-449d-7f92-116ae00ea300', width: 512, height: 768 },
    { id: 'f4b31159-8155-4372-4c4a-01514c243300', width: 512, height: 768 },
    { id: '12f718e6-a728-4eec-bebc-4887a2469300', width: 512, height: 768 },
    { id: 'efac4022-b6ca-4a77-5d91-497c6cc0bd00', width: 512, height: 768 },
    { id: '6cdf0b7a-0b7f-4b4f-7812-a15d98a6f100', width: 512, height: 768 },
    { id: '4715b72d-93fa-4edb-b02b-ba5efa63ea00', width: 512, height: 768 },
    { id: 'dca3b650-954c-43c9-13d5-d6ead2723400', width: 512, height: 768 },
    { id: '5a4d4c63-aabc-4a4d-247d-5029f0ef3c00', width: 512, height: 768 },
    { id: '52874680-d0fa-488b-4a18-d34da7069300', width: 1152, height: 768 },
    { id: '97c0d50d-5605-4f71-50c0-adae1a4ec900', width: 512, height: 768 },
    { id: 'fd6be43e-e98f-4348-350d-99eea648fe00', width: 512, height: 768 },
    { id: 'd14a3d2e-c4b3-483e-283f-8bc3b2429200', width: 512, height: 768 },
    { id: '9ee54dbf-5a2b-45a5-b2ef-18a79ac21800', width: 512, height: 768 },
    { id: 'dee073d4-daf6-4811-8262-cf4248075a00', width: 511, height: 768 },
  ] satisfies EditorialImageSeed[],
}

function getEditorialImageUrl(
  cloudflareId: string,
  localPath: string,
  options?: { width?: number; height?: number }
): string {
  if (isCloudflareImagesConfigured() && cloudflareId && !cloudflareId.includes('/')) {
    const cloudflareUrl = getCloudflareImageUrl(cloudflareId, 'public', options)

    if (cloudflareUrl) {
      return cloudflareUrl
    }
  }

  return localPath
}

function createEditorialImage(
  volume: 'volume-1-2025' | 'volume-2-2026',
  cloudflareId: string,
  index: number,
  alt: string,
  width = 1200,
  height = 1600
): ImageData {
  return {
    src: getEditorialImageUrl(
      cloudflareId,
      `/images/editorial/${volume}/image-${index + 1}.jpg`,
      { width, height }
    ),
    alt,
    width,
    height,
    series: volume,
  }
}

const volume1Images = EDITORIAL_IMAGE_IDS.volume1.map((id, index) =>
  createEditorialImage(
    'volume-1-2025',
    id,
    index,
    `Gilles Vandermeulen editorial shoot Volume 1 2025 image ${index + 1}`,
    index === 2 ? 1600 : 1200,
    index === 2 ? 1200 : 1600
  )
)

const volume2Images = EDITORIAL_IMAGE_IDS.volume2.map((image, index) =>
  createEditorialImage(
    'volume-2-2026',
    image.id,
    index,
    `Gilles Vandermeulen editorial shoot Volume 2 2026 image ${index + 1}`,
    image.width,
    image.height
  )
)

const volume2CoverPlaceholder: ImageData = {
  src: '/images/editorial/volume-2-2026/cover.jpg',
  alt: 'Gilles Vandermeulen editorial shoot Volume 2 2026 cover placeholder',
  width: 1200,
  height: 1600,
  series: 'volume-2-2026',
}

export const editorialVolumes: EditorialVolume[] = [
  {
    slug: 'volume-1-2025',
    title: 'Volume 1',
    year: '2025',
    kicker: 'First photographic study',
    description:
      'An editorial selection from the first professional shoot: texture, shape, and controlled contrast.',
    coverImage: volume1Images[0],
    images: volume1Images,
  },
  {
    slug: 'volume-2-2026',
    title: 'Volume 2',
    year: '2026',
    kicker: 'Second photographic study',
    description:
      'A newer visual chapter, built around sharper silhouettes and a more direct studio presence.',
    coverImage: volume2Images[0] || volume2CoverPlaceholder,
    images: volume2Images,
  },
]

export const featuredEditorialImages = volume2Images.length > 0
  ? volume2Images.slice(0, 4)
  : volume1Images.slice(0, 4)
