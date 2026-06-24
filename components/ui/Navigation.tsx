"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Home, User, Images, Building2, Euro, Calendar } from "lucide-react"
import { NavBar, NavItem } from "@/components/ui/tubelight-navbar"
import { HamburgerButton } from "@/components/ui/HamburgerButton"
import { MobileMenu, MobileMenuItem } from "@/components/ui/MobileMenu"
import { useUiStyle } from "@/components/providers/UiStyleProvider"

const navItems: NavItem[] = [
  { name: "Home", url: "/#hero", icon: Home },
  { name: "About", url: "/#about", icon: User },
  { name: "Work", url: "/editorial", icon: Images },
  { name: "Atelier", url: "/#atelier", icon: Building2 },
  { name: "Prices", url: "/#prices", icon: Euro },
  { name: "Booking", url: "/#booking", icon: Calendar },
]

const mobileItems: MobileMenuItem[] = navItems.map((item) => ({
  label: item.name,
  href: item.url,
}))

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { setUiStyle, autoMode } = useUiStyle()

  const toggle = () => setIsOpen((open) => !open)

  useEffect(() => {
    if (!autoMode || isOpen) {
      return
    }

    const updateNavStyle = () => {
      if (pathname !== "/") {
        setUiStyle("dark")
        return
      }

      const hero = document.getElementById("hero")
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight
      const isOverHero = window.scrollY < heroBottom - 120

      setUiStyle(isOverHero ? "light" : "dark")
    }

    updateNavStyle()
    window.addEventListener("scroll", updateNavStyle, { passive: true })
    window.addEventListener("resize", updateNavStyle, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateNavStyle)
      window.removeEventListener("resize", updateNavStyle)
    }
  }, [autoMode, isOpen, pathname, setUiStyle])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open")
    } else {
      document.body.classList.remove("menu-open")
    }

    return () => document.body.classList.remove("menu-open")
  }, [isOpen])

  return (
    <>
      <div className="fixed right-6 top-6 z-50 lg:hidden" data-navbar>
        <HamburgerButton isOpen={isOpen} toggle={toggle} />
      </div>

      <MobileMenu isOpen={isOpen} toggle={toggle} items={mobileItems} />

      <div className="hidden lg:block" data-navbar>
        <NavBar items={navItems} />
      </div>
    </>
  )
}
