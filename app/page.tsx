'use client'

import { HeroSection } from '@/components/sections/HeroSection'
import { StatementSection } from '@/components/sections/StatementSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { AtelierSection } from '@/components/sections/AtelierSection'
import { PricesSection } from '@/components/sections/PricesSection'
import { BookingSection } from '@/components/sections/BookingSection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatementSection />
      <AboutSection />
      <GallerySection />
      <AtelierSection />
      <PricesSection />
      <BookingSection />
      <FooterSection />
    </main>
  )
}

