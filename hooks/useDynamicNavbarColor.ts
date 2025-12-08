"use client"

import { useEffect, useCallback, useRef } from 'react'
import { getNavbarBrightness } from '@/lib/brightness'
import { useUiStyle } from '@/components/providers/UiStyleProvider'

/**
 * Hook that automatically updates navbar color based on background brightness
 * Listens to scroll, resize, and hero image changes
 */
export function useDynamicNavbarColor() {
  const { setUiStyle, autoMode } = useUiStyle()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isActiveRef = useRef(true)

  const checkBrightness = useCallback(async () => {
    if (!autoMode || !isActiveRef.current) return

    try {
      const result = await getNavbarBrightness()
      // If background is dark (brightness < 130), use light UI (white text)
      // If background is light (brightness >= 130), use dark UI (black text)
      setUiStyle(result.style)
    } catch (error) {
      console.warn('[useDynamicNavbarColor] Brightness check failed:', error)
    }
  }, [autoMode, setUiStyle])

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      checkBrightness()
    }, 150)
  }, [checkBrightness])

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      checkBrightness()
    }, 300)
  }, [checkBrightness])

  // Listen to hero image changes via custom event
  useEffect(() => {
    const handleHeroImageChange = () => {
      // Small delay to allow image to render
      setTimeout(() => {
        checkBrightness()
      }, 100)
    }

    window.addEventListener('hero-image-changed', handleHeroImageChange)
    return () => {
      window.removeEventListener('hero-image-changed', handleHeroImageChange)
    }
  }, [checkBrightness])

  // Setup scroll and resize listeners
  useEffect(() => {
    if (!autoMode) return

    // Initial check with small delay to ensure DOM is ready
    const initialTimer = setTimeout(() => {
      checkBrightness()
    }, 100)

    // Listen to scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Listen to resize
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      clearTimeout(initialTimer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [autoMode, handleScroll, handleResize, checkBrightness])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
}

