'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { siteConfig, heroImages } from '@/config/site'
import { useUiStyle } from '@/components/providers/UiStyleProvider'

// Brightness threshold: < threshold = donkere achtergrond → light UI (witte tekst)
//                      >= threshold = lichte achtergrond → dark UI (zwarte tekst)
// Luminance range: 0 (zwart) tot 255 (wit)
// Verlaagd naar 100 voor betere detectie van lichte achtergronden
const BRIGHTNESS_THRESHOLD = 100

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [activeLayer, setActiveLayer] = useState<'A' | 'B'>('A')
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const brightnessCacheRef = useRef<Map<string, number>>(new Map())
  const { uiStyle, setUiStyle } = useUiStyle()

  // Preload alle hero afbeeldingen
  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new window.Image()
      img.src = src
    })
  }, [])

  // Brightness analyse functie met caching
  const analyzeBrightness = (src: string): Promise<number> => {
    // Check cache eerst
    if (brightnessCacheRef.current.has(src)) {
      const cached = brightnessCacheRef.current.get(src)!
      console.log(`[Brightness] Using cached brightness: ${cached.toFixed(2)} for ${src.substring(src.length - 30)}`)
      return Promise.resolve(cached)
    }

    return new Promise((resolve) => {
      const img = new window.Image()
      
      // Voor externe images, probeer verschillende CORS strategieën
      if (src.startsWith('http')) {
        // Strategie 1: Probeer met crossOrigin
        img.crossOrigin = 'anonymous'
      }
      
      img.src = src

      const handleLoad = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = 100 // Verhoogd voor betere precisie
          canvas.height = 100
          const ctx = canvas.getContext('2d', { willReadFrequently: true })
          if (!ctx) {
            console.error('[Brightness] No canvas context')
            resolve(128)
            return
          }

          ctx.drawImage(img, 0, 0, 100, 100)
          const data = ctx.getImageData(0, 0, 100, 100).data

          let brightness = 0
          let pixelCount = 0
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]
            // Skip fully transparent pixels
            if (data[i + 3] > 0) {
              brightness += (r * 0.299 + g * 0.587 + b * 0.114) // Luminance formula
              pixelCount++
            }
          }

          const avg = pixelCount > 0 ? brightness / pixelCount : 128
          console.log(`[Brightness] ${src.substring(src.length - 30)}: ${avg.toFixed(2)}, Style: ${avg < BRIGHTNESS_THRESHOLD ? 'light' : 'dark'}`)
          
          // Cache het resultaat
          brightnessCacheRef.current.set(src, avg)
          resolve(avg)
        } catch (error) {
          console.error('[Brightness] Canvas error:', error, src)
          resolve(128)
        }
      }

      const handleError = () => {
        console.error('[Brightness] Image load failed:', src)
        // Probeer zonder crossOrigin als fallback
        if (src.startsWith('http') && img.crossOrigin) {
          const img2 = new window.Image()
          img2.onload = handleLoad
          img2.onerror = () => resolve(128)
          img2.src = src
        } else {
          resolve(128)
        }
      }

      img.onload = handleLoad
      img.onerror = handleError
    })
  }

  // Analyseer brightness van huidige image bij mount en bij wijzigingen
  useEffect(() => {
    const updateUiStyle = async () => {
      const brightness = await analyzeBrightness(heroImages[currentImageIndex])
      console.log(`[HeroSection] Current image brightness: ${brightness.toFixed(2)} for image ${currentImageIndex}`)
      // Als achtergrond donker (< threshold) → gebruik light UI (witte tekst)
      // Als achtergrond licht (>= threshold) → gebruik dark UI (zwarte tekst)
      if (brightness < BRIGHTNESS_THRESHOLD) {
        console.log(`[HeroSection] Setting UI style to: light (brightness ${brightness.toFixed(2)} < ${BRIGHTNESS_THRESHOLD})`)
        setUiStyle('light')
      } else {
        console.log(`[HeroSection] Setting UI style to: dark (brightness ${brightness.toFixed(2)} >= ${BRIGHTNESS_THRESHOLD})`)
        setUiStyle('dark')
      }
    }

    updateUiStyle()
  }, [currentImageIndex, setUiStyle])

  useEffect(() => {
    const interval = setInterval(async () => {
      // Start transition: fade out current, fade in next
      setIsTransitioning(true)

      // Bepaal volgende image index
      setCurrentImageIndex((prev) => {
        const nextIndex = (prev + 1) % heroImages.length

        // Analyseer brightness van de volgende image VOORDAT we de index updaten
        analyzeBrightness(heroImages[nextIndex]).then((brightness) => {
          console.log(`[HeroSection] Auto-transition brightness: ${brightness.toFixed(2)} for image ${nextIndex} (threshold: ${BRIGHTNESS_THRESHOLD})`)
          if (brightness < BRIGHTNESS_THRESHOLD) {
            console.log(`[HeroSection] → Setting UI to LIGHT (dark background)`)
            setUiStyle('light')
          } else {
            console.log(`[HeroSection] → Setting UI to DARK (light background)`)
            setUiStyle('dark')
          }
        })

        // Na fade-in (1s), wissel de actieve laag en update indices
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current)
        }

        transitionTimeoutRef.current = setTimeout(() => {
          setNextImageIndex((nextIndex + 1) % heroImages.length)
          setActiveLayer((prev) => (prev === 'A' ? 'B' : 'A'))
          setIsTransitioning(false)
        }, 1000) // Moet gelijk zijn aan opacity transition tijd

        return nextIndex
      })
    }, 5000) // Change image every 5 seconds

    return () => {
      clearInterval(interval)
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [setUiStyle])

  // Handle manual image selection via indicators
  const handleImageSelect = async (index: number) => {
    if (index === currentImageIndex || isTransitioning) return

    setIsTransitioning(true)

    // Analyseer brightness van de nieuwe image
    const brightness = await analyzeBrightness(heroImages[index])
    console.log(`[HeroSection] Manual select brightness: ${brightness.toFixed(2)} for image ${index}`)
    if (brightness < BRIGHTNESS_THRESHOLD) {
      console.log(`[HeroSection] Setting UI style to: light`)
      setUiStyle('light')
    } else {
      console.log(`[HeroSection] Setting UI style to: dark`)
      setUiStyle('dark')
    }

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }

    transitionTimeoutRef.current = setTimeout(() => {
      setCurrentImageIndex(index)
      setNextImageIndex((index + 1) % heroImages.length)
      setActiveLayer((prev) => (prev === 'A' ? 'B' : 'A'))
      setIsTransitioning(false)
    }, 1000)
  }

  // Bepaal welke images op welke laag staan
  // Wanneer activeLayer === 'A': Layer A toont currentImageIndex, Layer B toont nextImageIndex
  // Wanneer activeLayer === 'B': Layer B toont currentImageIndex, Layer A toont nextImageIndex
  const layerAImageIndex = activeLayer === 'A' ? currentImageIndex : nextImageIndex
  const layerBImageIndex = activeLayer === 'B' ? currentImageIndex : nextImageIndex

  // Bepaal opacity: actieve laag is zichtbaar, tijdens transition fade de andere in
  const layerAOpacity = activeLayer === 'A' && !isTransitioning ? 1 : 
                        activeLayer === 'A' && isTransitioning ? 0 :
                        activeLayer === 'B' && isTransitioning ? 1 : 0
  
  const layerBOpacity = activeLayer === 'B' && !isTransitioning ? 1 :
                        activeLayer === 'B' && isTransitioning ? 0 :
                        activeLayer === 'A' && isTransitioning ? 1 : 0

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Twee overlappende image lagen voor smooth crossfade */}
      <div className="absolute inset-0">
        {/* Layer A */}
        <Image
          src={heroImages[layerAImageIndex]}
          alt={`Hero image ${layerAImageIndex + 1}`}
          fill
          priority={layerAImageIndex === 0}
          unoptimized={heroImages[layerAImageIndex].includes('imagedelivery.net')}
          className="absolute inset-0 object-cover transition-opacity duration-1000 ease-out"
          style={{ opacity: layerAOpacity }}
          sizes="100vw"
        />

        {/* Layer B */}
        <Image
          src={heroImages[layerBImageIndex]}
          alt={`Hero image ${layerBImageIndex + 1}`}
          fill
          priority={layerBImageIndex === 0}
          unoptimized={heroImages[layerBImageIndex].includes('imagedelivery.net')}
          className="absolute inset-0 object-cover transition-opacity duration-1000 ease-out"
          style={{ opacity: layerBOpacity }}
          sizes="100vw"
        />
      </div>

      {/* Overlay gradient for text readability - alleen bij light UI */}
      {uiStyle === 'light' && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      )}

      {/* Typography Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-4"
        >
          <h1
            className={`text-4xl font-bold uppercase tracking-wider md:text-6xl lg:text-7xl xl:text-8xl transition-colors duration-300 ${
              uiStyle === 'light' ? 'text-white' : 'text-black'
            }`}
          >
            {siteConfig.title}
          </h1>
          <p
            className={`text-sm uppercase tracking-widest md:text-base transition-colors duration-300 ${
              uiStyle === 'light' ? 'text-white/90' : 'text-black/90'
            }`}
          >
            {siteConfig.subtitle}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className={`h-8 w-px transition-colors duration-300 ${
              uiStyle === 'light' ? 'bg-white/60' : 'bg-black/60'
            }`}
          />
        </motion.div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 right-8 z-10 flex space-x-2">
        {heroImages.map((_, index) => {
          const isActive = index === currentImageIndex
          const isLight = uiStyle === 'light'
          return (
            <button
              key={index}
              onClick={() => handleImageSelect(index)}
              className={`h-1.5 transition-all duration-300 ${
                isActive
                  ? `w-8 ${isLight ? 'bg-white' : 'bg-black'}`
                  : `w-1.5 ${isLight ? 'bg-white/40 hover:bg-white/60' : 'bg-black/40 hover:bg-black/60'}`
              }`}
              aria-label={`Go to image ${index + 1}`}
              tabIndex={0}
            />
          )
        })}
      </div>
    </section>
  )
}

