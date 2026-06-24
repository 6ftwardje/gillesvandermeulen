'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { heroImages } from '@/config/site'
import { siteConfig } from '@/config/site'

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobileHeroVideoViewport, setIsMobileHeroVideoViewport] = useState(false)
  const heroVideo = siteConfig.media.heroVideo
  const hasHeroVideo = Boolean(heroVideo.playbackId)
  const shouldUseHeroVideo = hasHeroVideo && isMobileHeroVideoViewport
  const muxStreamUrl = hasHeroVideo
    ? `https://stream.mux.com/${heroVideo.playbackId}.m3u8`
    : ''
  const muxPosterUrl = hasHeroVideo
    ? `https://image.mux.com/${heroVideo.playbackId}/thumbnail.webp?time=${heroVideo.posterTime}`
    : ''

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const updateViewport = () => setIsMobileHeroVideoViewport(mediaQuery.matches)

    updateViewport()
    mediaQuery.addEventListener('change', updateViewport)

    return () => mediaQuery.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    if (shouldUseHeroVideo) {
      return
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [shouldUseHeroVideo])

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  const scrollToNext = () => {
    const statementSection = document.querySelector('#statement')
    if (statementSection) {
      statementSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background media */}
      {shouldUseHeroVideo ? (
        <video
          key={heroVideo.playbackId}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={muxPosterUrl}
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="Gilles Vandermeulen hero background video"
        >
          {heroVideo.mp4Url && <source src={heroVideo.mp4Url} type="video/mp4" />}
          <source src={muxStreamUrl} type="application/x-mpegURL" />
        </video>
      ) : (
        heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Hero image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              unoptimized={image.includes('imagedelivery.net')}
            />
          </div>
        ))
      )}

      {/* Overlay with Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-6">
        <div className="max-w-5xl text-center text-white">
          <p className="mb-5 text-xs uppercase tracking-[0.5em] text-white/80 md:text-sm">
            {siteConfig.subtitle}
          </p>
          <h1 className="mb-6 text-4xl font-bold uppercase tracking-wider md:text-6xl lg:text-7xl xl:text-8xl">
            {siteConfig.title}
          </h1>
          <p className="mx-auto max-w-xl text-sm font-light leading-relaxed tracking-wide text-white/85 md:text-base lg:text-lg">
            Precision cuts, organic products, and editorial hair work from the heart of Ghent.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={siteConfig.booking.salonkeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center bg-white px-7 text-xs font-semibold uppercase tracking-[0.25em] text-black transition-colors hover:bg-white/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {siteConfig.booking.label}
            </Link>
            <Link
              href="/editorial"
              className="inline-flex min-h-12 items-center justify-center border border-white/50 px-7 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              View editorial work
            </Link>
          </div>
        </div>
      </div>

      {/* Image Indicators (Dots) */}
      {!shouldUseHeroVideo && (
        <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 transition-colors hover:text-white"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </button>
    </section>
  )
}
