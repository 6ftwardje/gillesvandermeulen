'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Accordion } from '@/components/ui/Accordion'
import { prices } from '@/config/site'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion-variants'

export const PricesSection = () => {
  return (
    <SectionWrapper id="prices" variant="default" animate>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="mx-auto max-w-3xl"
      >
        <motion.h2
          variants={fadeInUp}
          className="mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl lg:text-5xl"
        >
          Prices
        </motion.h2>
        <div className="space-y-1">
          {prices.map((category) => (
            <motion.div key={category.id} variants={staggerItem}>
              <Accordion title={category.name} defaultOpen={false}>
                <div className="space-y-4 pt-2">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-grey-medium pb-4 text-sm md:text-base"
                    >
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-medium tracking-wide">{item.price}</span>
                    </div>
                  ))}
                </div>
              </Accordion>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

