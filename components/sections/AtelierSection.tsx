'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Accordion } from '@/components/ui/Accordion'
import { siteConfig, atelierImage } from '@/config/site'
import { slideInLeft, slideInRight } from '@/lib/motion-variants'

export const AtelierSection = () => {
  return (
    <SectionWrapper id="atelier" variant="default" className="bg-grey-light">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Atelier Interior Photo */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={slideInLeft}
          className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-square"
        >
          <Image
            src={atelierImage}
            alt="Atelier interior - architectural studio space"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={slideInRight}
          className="flex flex-col justify-center space-y-8"
        >
          <div>
            <h2 className="mb-4 text-3xl font-bold uppercase tracking-wide md:text-4xl lg:text-5xl">
              Atelier
            </h2>
            <p className="text-sm leading-relaxed text-gray-700 md:text-base">
              A space designed for creation. Minimal, architectural, focused.
            </p>
          </div>

          <Accordion title="About the Space" defaultOpen={false}>
            <div className="space-y-4 text-sm leading-relaxed text-gray-600 md:text-base">
              <p>
                The atelier is more than a salon—it's a studio where hair becomes art.
                Located in the heart of Ghent, the space reflects the same architectural
                minimalism that defines Gilles' work.
              </p>
              <p>
                Every detail is considered: from the natural light that floods the space
                to the carefully selected organic products used in each session. The
                environment is designed to inspire both artist and client.
              </p>
              <p>
                Sustainability and quality are at the core of the atelier's philosophy,
                using only the finest organic products that respect both hair and
                environment.
              </p>
            </div>
          </Accordion>

          <div className="pt-4 text-xs uppercase tracking-wider text-gray-500">
            {siteConfig.address.street}, {siteConfig.address.city}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

