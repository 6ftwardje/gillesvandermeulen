'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
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
        <h2 className="mb-12 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl lg:text-5xl">
          Book your session
        </h2>
        <div className="min-h-[600px] w-full overflow-hidden rounded-sm bg-white">
          {/* Salonkee widget embed will be added here */}
          {/* Replace this div with the actual Salonkee iframe or script */}
          <div className="flex h-full min-h-[600px] items-center justify-center text-sm text-gray-500">
            <div className="text-center">
              <p className="mb-2">Salonkee booking widget</p>
              <p className="text-xs text-gray-400">
                Embed code will be added here
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

