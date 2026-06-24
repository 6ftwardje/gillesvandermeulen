'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { siteConfig } from '@/config/site'
import { fadeInUp } from '@/lib/motion-variants'

export const BookingSection = () => {
  return (
    <SectionWrapper id="booking" variant="default" className="bg-grey-light">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
        className="mx-auto max-w-5xl"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
              Appointments
            </p>
            <h2 className="text-4xl font-bold uppercase leading-none tracking-wide md:text-6xl">
              Book your session
            </h2>
          </div>

          <div className="bg-white p-8 md:p-12">
            <p className="mb-8 text-sm leading-relaxed text-gray-600 md:text-base">
              Book directly through Salonkee for available times, services, and appointment
              confirmation.
            </p>
            <Link
              href={siteConfig.booking.salonkeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center bg-black px-7 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              {siteConfig.booking.label}
            </Link>
            <p className="mt-6 text-xs leading-relaxed text-gray-400">
              Opens Salonkee in a new tab. An embedded widget can be added here once the official
              Salonkee embed code is available.
            </p>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
