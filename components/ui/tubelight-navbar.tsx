"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUiStyle } from "@/components/providers/UiStyleProvider"

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

function getHash(url: string) {
  if (url.startsWith("/#")) return url.replace("/", "")
  if (url.startsWith("#")) return url
  return null
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(items[0].name)
  const { uiStyle } = useUiStyle()
  const isLight = uiStyle === "light"

  useEffect(() => {
    if (pathname === "/editorial") {
      setActiveTab("Work")
      return
    }

    if (pathname !== "/") {
      return
    }

    const handleScroll = () => {
      const sections = items
        .map((item) => {
          const hash = getHash(item.url)
          const id = hash?.replace("#", "")
          const element = id ? document.getElementById(id) : null

          return { name: item.name, element }
        })
        .filter((section) => section.element)

      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]

        if (section.element) {
          const top = section.element.offsetTop
          const bottom = top + section.element.offsetHeight

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveTab(section.name)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [items, pathname])

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    setActiveTab(item.name)

    const hash = getHash(item.url)

    if (pathname === "/" && hash) {
      event.preventDefault()
      const element = document.querySelector(hash)

      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <div
      className={cn(
        "fixed left-1/2 top-0 z-50 -translate-x-1/2 pt-6",
        className,
      )}
      data-navbar
    >
      <div
        className={cn(
          "flex items-center gap-3 rounded-full px-1 py-1 shadow-lg backdrop-blur-xl transition-colors duration-300",
          isLight
            ? "border border-white/40 bg-black/20 text-white"
            : "border border-black/20 bg-white/40 text-black",
        )}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={(event) => handleClick(event, item)}
              className={cn(
                "relative cursor-pointer rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-300",
                isLight
                  ? isActive
                    ? "bg-white/30 text-white"
                    : "text-white/80 hover:text-white"
                  : isActive
                    ? "bg-black/20 text-black"
                    : "text-black/80 hover:text-black",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className={cn(
                    "absolute inset-0 -z-10 w-full rounded-full transition-colors duration-300",
                    isLight ? "bg-white/20" : "bg-black/10",
                  )}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div
                    className={cn(
                      "absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full transition-colors duration-300",
                      isLight ? "bg-white" : "bg-black",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute -left-2 -top-2 h-6 w-12 rounded-full blur-md transition-colors duration-300",
                        isLight ? "bg-white/30" : "bg-black/20",
                      )}
                    />
                    <div
                      className={cn(
                        "absolute -top-1 h-6 w-8 rounded-full blur-md transition-colors duration-300",
                        isLight ? "bg-white/30" : "bg-black/20",
                      )}
                    />
                    <div
                      className={cn(
                        "absolute left-2 top-0 h-4 w-4 rounded-full blur-sm transition-colors duration-300",
                        isLight ? "bg-white/30" : "bg-black/20",
                      )}
                    />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
