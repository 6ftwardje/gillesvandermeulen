'use client'

import { siteConfig } from '@/config/site'
import Link from 'next/link'

export const FooterSection = () => {
  return (
    <footer className="border-t border-grey-medium py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-6 text-center md:flex-row md:space-y-0">
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase tracking-wider">
              {siteConfig.name}
            </p>
            <p className="text-xs text-gray-500">
              {siteConfig.address.street}, {siteConfig.address.city}
            </p>
          </div>
          {siteConfig.social.instagram && (
            <Link
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-gray-600 transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              aria-label="Visit Instagram profile"
              tabIndex={0}
            >
              Instagram
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}



