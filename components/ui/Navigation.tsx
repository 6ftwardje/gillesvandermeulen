"use client"

import { useState, useEffect } from "react"
import { NavBar } from '@/components/ui/tubelight-navbar'
import { HamburgerButton } from '@/components/ui/HamburgerButton'
import { MobileMenu } from '@/components/ui/MobileMenu'
import { useDynamicNavbarColor } from '@/hooks/useDynamicNavbarColor'
import { Home, User, Images, Building2, Euro, Calendar } from 'lucide-react'

const navItems = [
  { name: 'Home', url: '#hero', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Gallery', url: '#gallery', icon: Images },
  { name: 'Atelier', url: '#atelier', icon: Building2 },
  { name: 'Prices', url: '#prices', icon: Euro },
  { name: 'Booking', url: '#booking', icon: Calendar },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  
  // Enable dynamic navbar color detection
  useDynamicNavbarColor()

  const toggle = () => setIsOpen(!isOpen)

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open")
    } else {
      document.body.classList.remove("menu-open")
    }
  }, [isOpen])

  return (
    <>
      {/* MOBILE ONLY - Hamburger Button */}
      <div className="fixed z-50 top-6 right-6 lg:hidden" data-navbar>
        <HamburgerButton isOpen={isOpen} toggle={toggle} />
      </div>

      {/* MOBILE ONLY - Fullscreen Menu */}
      <MobileMenu isOpen={isOpen} toggle={toggle} />

      {/* DESKTOP NAV - Hidden on mobile */}
      <div className="hidden lg:block" data-navbar>
        <NavBar items={navItems} />
      </div>
    </>
  )
}





