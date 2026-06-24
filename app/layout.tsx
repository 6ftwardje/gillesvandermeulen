import type { Metadata } from 'next'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { UiStyleProvider } from '@/components/providers/UiStyleProvider'
import { Navigation } from '@/components/ui/Navigation'
import { FooterSection } from '@/components/sections/FooterSection'
import { siteConfig } from '@/config/site'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.seo.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UiStyleProvider>
          <SmoothScrollProvider>
            <Navigation />
            {children}
            <FooterSection />
          </SmoothScrollProvider>
        </UiStyleProvider>
      </body>
    </html>
  )
}
