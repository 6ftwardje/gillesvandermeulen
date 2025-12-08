/**
 * Brightness detection helper
 * Samples the background underneath the navbar to determine optimal UI color
 */

interface BrightnessResult {
  brightness: number
  style: 'light' | 'dark'
}

const BRIGHTNESS_THRESHOLD = 130
const SAMPLE_SIZE = 40
const MAX_SAMPLES_PER_SECOND = 8
const SAMPLE_INTERVAL = 1000 / MAX_SAMPLES_PER_SECOND

let lastSampleTime = 0
let pendingSample: Promise<BrightnessResult> | null = null

/**
 * Gets the element at the given coordinates
 */
function getElementAtPoint(x: number, y: number): Element | null {
  if (typeof document === 'undefined') return null
  return document.elementFromPoint(x, y)
}

/**
 * Gets the background image URL from computed styles
 */
function getBackgroundImageUrl(element: Element): string | null {
  if (typeof window === 'undefined') return null
  
  const computed = window.getComputedStyle(element)
  const bgImage = computed.backgroundImage
  
  if (!bgImage || bgImage === 'none') return null
  
  // Extract URL from "url(...)" or "url('...')" or "url("...")"
  const match = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/)
  return match ? match[1] : null
}

/**
 * Gets the image source from an img element or background-image
 * Also checks parent elements if current element is transparent or has no image
 */
function getImageSource(element: Element): string | null {
  // Check current element
  if (element instanceof HTMLImageElement) {
    return element.src
  }
  
  // Check for background-image on current element
  const bgUrl = getBackgroundImageUrl(element)
  if (bgUrl) return bgUrl
  
  // Check child img element
  const img = element.querySelector('img')
  if (img instanceof HTMLImageElement) {
    return img.src
  }
  
  // Check if element has a solid background color (if so, don't traverse up)
  // But always check if it's a section/hero container first
  if (typeof window !== 'undefined') {
    const computed = window.getComputedStyle(element)
    const bgColor = computed.backgroundColor
    const hasSolidBg = bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent'
    
    // If current element has solid background, check if it's the section container
    // Otherwise, traverse up to parent to find background images
    if (!hasSolidBg || element.tagName === 'SECTION' || element.classList.contains('hero') || element.id === 'hero') {
      let parent = element.parentElement
      let depth = 0
      const maxDepth = 5
      
      while (parent && depth < maxDepth) {
        // Check parent for background-image
        const parentBgUrl = getBackgroundImageUrl(parent)
        if (parentBgUrl) return parentBgUrl
        
        // Check for child images in parent (might be the hero image)
        const parentImg = parent.querySelector('img')
        if (parentImg instanceof HTMLImageElement && 
            (parentImg.style.position === 'absolute' || 
             parent.classList.contains('hero') ||
             parent.id === 'hero')) {
          return parentImg.src
        }
        
        parent = parent.parentElement
        depth++
      }
    }
  } else {
    // SSR fallback: traverse up anyway
    let parent = element.parentElement
    let depth = 0
    const maxDepth = 5
    
    while (parent && depth < maxDepth) {
      const parentBgUrl = getBackgroundImageUrl(parent)
      if (parentBgUrl) return parentBgUrl
      
      const parentImg = parent.querySelector('img')
      if (parentImg instanceof HTMLImageElement) {
        return parentImg.src
      }
      
      parent = parent.parentElement
      depth++
    }
  }
  
  return null
}

/**
 * Samples brightness from an image
 */
async function sampleImageBrightness(imageSrc: string): Promise<number> {
  return new Promise((resolve) => {
    const img = new Image()
    
    // Try with CORS for external images
    if (imageSrc.startsWith('http')) {
      img.crossOrigin = 'anonymous'
    }
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = SAMPLE_SIZE
        canvas.height = SAMPLE_SIZE
        
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) {
          resolve(128) // Default mid-gray
          return
        }
        
        // Draw and sample
        ctx.drawImage(img, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE)
        const imageData = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE)
        const data = imageData.data
        
        let totalBrightness = 0
        let pixelCount = 0
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const alpha = data[i + 3]
          
          // Skip fully transparent pixels
          if (alpha > 0) {
            // Simple brightness calculation: average of RGB
            const brightness = (r + g + b) / 3
            totalBrightness += brightness
            pixelCount++
          }
        }
        
        const avgBrightness = pixelCount > 0 ? totalBrightness / pixelCount : 128
        resolve(avgBrightness)
      } catch (error) {
        console.warn('[Brightness] Canvas sampling failed:', error)
        resolve(128)
      }
    }
    
    img.onerror = () => {
      console.warn('[Brightness] Image load failed:', imageSrc)
      resolve(128) // Default on error
    }
    
    img.src = imageSrc
  })
}

/**
 * Samples the background color/brightness at the navbar position
 */
async function sampleNavbarBrightness(): Promise<BrightnessResult> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { brightness: 128, style: 'dark' }
  }
  
  // Get navbar position (centered, top or bottom depending on viewport)
  const navbarElement = document.querySelector('[data-navbar]')
  if (!navbarElement) {
    // Fallback: sample from center of viewport
    const navX = window.innerWidth / 2
    const navY = window.innerHeight * 0.1 // Top 10% of viewport
    
    const element = getElementAtPoint(navX, navY)
    if (!element) {
      return { brightness: 128, style: 'dark' }
    }
    
    const imageSrc = getImageSource(element)
    if (imageSrc) {
      const brightness = await sampleImageBrightness(imageSrc)
      return {
        brightness,
        style: brightness < BRIGHTNESS_THRESHOLD ? 'light' : 'dark'
      }
    }
    
    // If no image found, check computed background color
    const computed = window.getComputedStyle(element)
    const bgColor = computed.backgroundColor
    
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
      // Parse RGB values
      const match = bgColor.match(/\d+/g)
      if (match && match.length >= 3) {
        const r = parseInt(match[0])
        const g = parseInt(match[1])
        const b = parseInt(match[2])
        const brightness = (r + g + b) / 3
        return {
          brightness,
          style: brightness < BRIGHTNESS_THRESHOLD ? 'light' : 'dark'
        }
      }
    }
    
    return { brightness: 128, style: 'dark' }
  }
  
  // Use navbar bounding box to determine sample point
  // Sample below the navbar (on desktop, navbar is at top, so sample below it)
  // On mobile, navbar is at bottom, so sample above it
  const rect = navbarElement.getBoundingClientRect()
  const navX = rect.left + rect.width / 2
  
  // Determine if navbar is at top or bottom
  const isTopNavbar = rect.top < window.innerHeight / 2
  // Sample slightly below/above the navbar to avoid sampling the navbar itself
  const offset = isTopNavbar ? rect.bottom + 10 : rect.top - 10
  const navY = Math.max(0, Math.min(window.innerHeight, offset))
  
  const element = getElementAtPoint(navX, navY)
  if (!element) {
    return { brightness: 128, style: 'dark' }
  }
  
  // First, try to find an image source (background-image or img element)
  const imageSrc = getImageSource(element)
  if (imageSrc) {
    const brightness = await sampleImageBrightness(imageSrc)
    return {
      brightness,
      style: brightness < BRIGHTNESS_THRESHOLD ? 'light' : 'dark'
    }
  }
  
  // Fallback to background color - check current element and traverse up
  if (typeof window !== 'undefined') {
    let currentEl: Element | null = element
    let depth = 0
    const maxDepth = 5
    
    while (currentEl && depth < maxDepth) {
      const computed = window.getComputedStyle(currentEl)
      const bgColor = computed.backgroundColor
      
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        // Parse RGB values from rgba() or rgb() format
        const match = bgColor.match(/\d+/g)
        if (match && match.length >= 3) {
          const r = parseInt(match[0])
          const g = parseInt(match[1])
          const b = parseInt(match[2])
          const brightness = (r + g + b) / 3
          
          // Only use if brightness is significantly different from transparent
          if (brightness < 250) { // Ignore near-white transparent backgrounds
            return {
              brightness,
              style: brightness < BRIGHTNESS_THRESHOLD ? 'light' : 'dark'
            }
          }
        }
      }
      
      currentEl = currentEl.parentElement
      depth++
    }
  }
  
  // Final fallback
  return { brightness: 128, style: 'dark' }
}

/**
 * Debounced brightness sampling
 * Limits sampling to MAX_SAMPLES_PER_SECOND
 */
export async function getNavbarBrightness(): Promise<BrightnessResult> {
  const now = Date.now()
  const timeSinceLastSample = now - lastSampleTime
  
  // If we have a pending sample, return it
  if (pendingSample && timeSinceLastSample < SAMPLE_INTERVAL) {
    return pendingSample
  }
  
  // If enough time has passed, start a new sample
  if (timeSinceLastSample >= SAMPLE_INTERVAL) {
    lastSampleTime = now
    pendingSample = sampleNavbarBrightness()
    return pendingSample
  }
  
  // Otherwise, wait and return the pending sample
  if (pendingSample) {
    return pendingSample
  }
  
  // Last resort: start a new sample
  lastSampleTime = now
  pendingSample = sampleNavbarBrightness()
  return pendingSample
}

