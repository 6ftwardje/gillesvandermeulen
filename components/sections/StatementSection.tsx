'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { statementImages } from '@/config/site'
import { slideInLeft, slideInRight } from '@/lib/motion-variants'

export const StatementSection = () => {
  return (
    <SectionWrapper id="statement" variant="default" className="bg-grey-light">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
        {/* Statement Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={slideInRight}
          className="flex items-center lg:col-span-2"
        >
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-wide text-black md:text-5xl lg:text-6xl xl:text-7xl">
            Hair as architecture.
            <br />
            Form as expression.
          </h2>
        </motion.div>

        {/* Asymmetrical Images */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={slideInLeft}
          className="space-y-6"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={statementImages.large}
              alt="Editorial hair styling statement"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
              unoptimized={statementImages.large.includes('imagedelivery.net')}
            />
          </div>
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={statementImages.small}
              alt="Editorial hair detail"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
              unoptimized={statementImages.small.includes('imagedelivery.net')}
            />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

