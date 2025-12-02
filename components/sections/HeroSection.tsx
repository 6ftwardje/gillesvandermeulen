'use client'

import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { siteConfig, heroImages } from '@/config/site'

export const HeroSection = () => {
  return (
    <SectionWrapper id="hero" variant="tight" className="min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-bold uppercase tracking-wider md:text-6xl lg:text-7xl">
          {siteConfig.title}
        </h1>
        <p className="text-sm uppercase tracking-widest text-gray-600">
          {siteConfig.subtitle}
        </p>
        {/* Hero image rotation will be implemented here */}
        <div className="mt-12 h-96 w-full bg-grey-light">
          {/* Placeholder for rotating hero images */}
        </div>
      </div>
    </SectionWrapper>
  )
}

