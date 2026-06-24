'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { featuredEditorialImages } from '@/config/editorial'
import { staggerContainer, staggerItem } from '@/lib/motion-variants'

export const GallerySection = () => {
  return (
    <SectionWrapper id="gallery" variant="spacious" className="bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-14"
      >
        <motion.div
          variants={staggerItem}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
              Selected work
            </p>
            <h2 className="max-w-3xl text-4xl font-bold uppercase leading-none tracking-wide md:text-6xl lg:text-7xl">
              Editorial archive
            </h2>
          </div>
          <div className="max-w-xl space-y-6 lg:ml-auto">
            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
              Professional photographic work from past shoots, gathered as a visual record of shape,
              texture, and movement.
            </p>
            <Link
              href="/editorial"
              className="inline-flex border-b border-black pb-1 text-xs font-semibold uppercase tracking-[0.25em] transition-opacity hover:opacity-60"
            >
              View all volumes
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {featuredEditorialImages.map((image, index) => (
            <motion.div
              key={`${image.series}-${index}`}
              variants={staggerItem}
              className={index % 2 === 0 ? 'pt-10 md:pt-20' : ''}
            >
              <Link href="/editorial" className="group block">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-grey-light">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    unoptimized={image.src.includes('imagedelivery.net')}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
