'use client'

import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Accordion } from '@/components/ui/Accordion'
import { prices } from '@/config/site'

export const PricesSection = () => {
  return (
    <SectionWrapper id="prices" variant="default" animate>
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl">
          Prices
        </h2>
        <div className="space-y-2">
          {prices.map((category) => (
            <Accordion key={category.id} title={category.name} defaultOpen={false}>
              <div className="space-y-3">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-grey-medium pb-3 text-sm"
                  >
                    <span className="text-gray-700">{item.name}</span>
                    <span className="font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
            </Accordion>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

