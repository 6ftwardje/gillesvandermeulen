"use client"

import { NavBar } from '@/components/ui/tubelight-navbar'
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
  return <NavBar items={navItems} />
}

