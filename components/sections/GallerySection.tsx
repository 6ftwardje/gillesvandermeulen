'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { gallerySeries } from '@/config/site'
import { staggerContainer, staggerItem } from '@/lib/motion-variants'

export const GallerySection = () => {
  return (
    <SectionWrapper id="gallery" variant="spacious" className="bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-32"
      >
        {gallerySeries.map((series, seriesIndex) => (
          <motion.div
            key={series.id}
            variants={staggerItem}
            className="space-y-12"
          >
            <h3 className="text-xl font-bold uppercase tracking-wider md:text-2xl lg:text-3xl">
              {series.title}
            </h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              {series.images.map((image, index) => {
                // Asymmetrical layout: first image spans 2 columns
                const isLarge = index === 0
                return (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className={isLarge ? 'lg:col-span-2' : ''}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes={
                          isLarge
                            ? '(max-width: 1024px) 100vw, 66vw'
                            : '(max-width: 1024px) 100vw, 33vw'
                        }
                        unoptimized={image.src.includes('imagedelivery.net')}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}

