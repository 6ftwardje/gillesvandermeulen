'use client'

import { SectionWrapper } from '@/components/ui/SectionWrapper'

export const BookingSection = () => {
  return (
    <SectionWrapper id="booking" variant="default" animate>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl">
          Book your session
        </h2>
        <div className="min-h-[600px] w-full bg-grey-light">
          {/* Placeholder for Salonkee widget embed */}
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Salonkee booking widget will be embedded here
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

