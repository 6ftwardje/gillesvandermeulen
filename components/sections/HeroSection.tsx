'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type Hls from 'hls.js'
import { ChevronDown, Instagram } from 'lucide-react'
import { heroImages, siteConfig } from '@/config/site'

const secondaryActionClassName = 'inline-flex min-h-12 items-center justify-center gap-2 border border-white/50 px-7 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobileHeroVideoViewport, setIsMobileHeroVideoViewport] = useState(false)
  const [heroVideoFailed, setHeroVideoFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { playbackId, mp4Url, posterTime, maxResolution } = siteConfig.media.heroVideo
  const shouldUseHeroVideo = Boolean(playbackId || mp4Url) && isMobileHeroVideoViewport && !heroVideoFailed
  const muxStreamUrl = playbackId
    ? `https://stream.mux.com/${playbackId}.m3u8?max_resolution=${encodeURIComponent(maxResolution)}`
    : undefined
  const muxPosterUrl = playbackId
    ? `https://image.mux.com/${playbackId}/thumbnail.webp?time=${posterTime}`
    : undefined

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const updateViewport = () => setIsMobileHeroVideoViewport(mediaQuery.matches)

    updateViewport()
    mediaQuery.addEventListener('change', updateViewport)

    return () => mediaQuery.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!shouldUseHeroVideo || !video) {
      return
    }

    let active = true
    let hls: Hls | undefined
    let usingMp4 = Boolean(mp4Url)

    const showHeroImages = () => {
      if (active) setHeroVideoFailed(true)
    }

    const loadStream = async () => {
      if (!muxStreamUrl) {
        showHeroImages()
        return
      }

      const canPlayNativeHls = video.canPlayType('application/vnd.apple.mpegurl')
      // Prefer native HLS on modern Safari. Chromium can report support without playing the stream.
      if (canPlayNativeHls && 'ManagedMediaSource' in window) {
        video.src = muxStreamUrl
        return
      }

      try {
        const { default: Hls } = await import('hls.js')
        if (!active) return

        if (Hls.isSupported()) {
          hls = new Hls()
          hls.on(Hls.Events.ERROR, (_, { fatal }) => {
            if (fatal) showHeroImages()
          })
          hls.loadSource(muxStreamUrl)
          hls.attachMedia(video)
          return
        }
      } catch {
        if (!active) return
      }

      if (canPlayNativeHls) {
        video.src = muxStreamUrl
      } else {
        showHeroImages()
      }
    }

    const handleMediaError = () => {
      if (usingMp4) {
        usingMp4 = false
        void loadStream()
      } else {
        showHeroImages()
      }
    }

    const startPlayback = () => {
      if (!video.paused) return

      void video.play().catch((error) => {
        if (error.name === 'NotAllowedError') showHeroImages()
      })
    }

    video.defaultMuted = true
    video.muted = true
    video.addEventListener('canplay', startPlayback)
    video.addEventListener('error', handleMediaError)

    if (mp4Url) {
      video.src = mp4Url
    } else {
      void loadStream()
    }

    return () => {
      active = false
      video.removeEventListener('canplay', startPlayback)
      video.removeEventListener('error', handleMediaError)
      hls?.destroy()
      video.removeAttribute('src')
      video.load()
    }
  }, [mp4Url, muxStreamUrl, shouldUseHeroVideo])

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
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={muxPosterUrl}
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="Gilles Vandermeulen hero background video"
        />
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
          <div className="mt-6 flex flex-col items-center justify-center gap-3 md:mt-10 md:flex-row md:flex-wrap md:gap-4">
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
              className={`${secondaryActionClassName} hover:bg-white/10`}
            >
              View editorial work
            </Link>
            {siteConfig.social.instagram && (
              <Link
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`${secondaryActionClassName} bg-black/50 hover:bg-black/70`}
              >
                <Instagram aria-hidden="true" className="h-4 w-4" />
                Instagram
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Image Indicators (Dots) */}
      {!shouldUseHeroVideo && (
        <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-24">
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
