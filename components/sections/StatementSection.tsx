'use client'

import { SectionWrapper } from '@/components/ui/SectionWrapper'

export const StatementSection = () => {
  return (
    <SectionWrapper id="statement" variant="default" animate>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold uppercase tracking-wide md:text-4xl lg:text-5xl">
            Hair as architecture. Form as expression.
          </h2>
        </div>
        <div className="space-y-6">
          <div className="aspect-[4/5] w-full bg-grey-light">
            {/* Placeholder for large image */}
          </div>
          <div className="aspect-square w-full bg-grey-medium">
            {/* Placeholder for small image */}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

