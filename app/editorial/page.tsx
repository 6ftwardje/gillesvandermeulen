import type { Metadata } from 'next'
import { EditorialArchive } from '@/components/sections/EditorialArchive'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `Editorial archive | ${siteConfig.name}`,
  description:
    'Professional editorial hair photography by Gilles Vandermeulen, including Volume 1 2025 and Volume 2 2026.',
  openGraph: {
    title: `Editorial archive | ${siteConfig.name}`,
    description:
      'Professional editorial hair photography by Gilles Vandermeulen, including Volume 1 2025 and Volume 2 2026.',
    type: 'website',
  },
}

export default function EditorialPage() {
  return <EditorialArchive />
}
