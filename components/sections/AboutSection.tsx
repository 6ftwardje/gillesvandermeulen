'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Accordion } from '@/components/ui/Accordion'
import { aboutImage } from '@/config/site'
import { fadeInUp, slideInLeft } from '@/lib/motion-variants'

export const AboutSection = () => {
  return (
    <SectionWrapper id="about" variant="default" animate>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Portrait and Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="space-y-8"
        >
          <div>
            <h2 className="mb-6 text-3xl font-bold uppercase tracking-wide md:text-4xl lg:text-5xl">
              About
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-gray-700 md:text-base">
              Gilles Vandermeulen approaches hair as a form of architectural expression,
              creating structures that reflect contemporary urban minimalism.
            </p>
          </div>
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src={aboutImage}
              alt="Gilles Vandermeulen portrait"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized={aboutImage.includes('imagedelivery.net')}
            />
          </div>
        </motion.div>

        {/* SEO Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={slideInLeft}
          className="flex items-start pt-8 lg:pt-16"
        >
          <div className="w-full">
            <Accordion title="Read More" defaultOpen={false}>
              <div className="space-y-4 text-sm leading-relaxed text-gray-600 md:text-base">
                <p>
                  With a background in high-end fashion and editorial work, Gilles brings
                  a unique perspective to hair artistry. His approach combines technical
                  precision with creative vision, resulting in looks that are both
                  contemporary and timeless.
                </p>
                <p>
                  Based in Ghent, Gilles works from his studio atelier, where he creates
                  custom looks for clients seeking something beyond the ordinary. Each
                  session is a collaboration, a dialogue between artist and client.
                </p>
                <p>
                  His work has been featured in editorial spreads and fashion campaigns,
                  always maintaining the same philosophy: hair as form, structure as
                  expression, minimalism as luxury.
                </p>
              </div>
            </Accordion>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

