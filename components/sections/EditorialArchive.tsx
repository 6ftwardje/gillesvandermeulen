'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { editorialVolumes } from '@/config/editorial'
import { ImageData } from '@/types'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion-variants'

export const EditorialArchive = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)

  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-44">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mx-auto max-w-7xl"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
                Editorial work
              </p>
              <h1 className="max-w-5xl text-5xl font-bold uppercase leading-none tracking-wide md:text-7xl lg:text-8xl">
                Photographic archive
              </h1>
            </div>
            <div className="max-w-xl space-y-6 lg:ml-auto">
              <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                A visual record of professional shoots by Gilles Vandermeulen. Built as a living
                archive: each volume can grow with new images, credits, and production notes.
              </p>
              <Link
                href="/#booking"
                className="inline-flex border-b border-black pb-1 text-xs font-semibold uppercase tracking-[0.25em] transition-opacity hover:opacity-60"
              >
                Book a session
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="px-6 pb-28 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-32">
          {editorialVolumes.map((volume) => (
            <motion.article
              key={volume.slug}
              id={volume.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="space-y-10"
            >
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-1 gap-8 border-t border-grey-medium pt-8 lg:grid-cols-[0.7fr_1.3fr]"
              >
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
                    {volume.kicker}
                  </p>
                  <h2 className="text-3xl font-bold uppercase tracking-wide md:text-5xl">
                    {volume.title} <span className="text-gray-400">{volume.year}</span>
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
                  {volume.description}
                </p>
              </motion.div>

              {volume.images.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
                  {volume.images.map((image, index) => {
                    const layoutClass =
                      index % 5 === 0
                        ? 'md:col-span-4'
                        : index % 5 === 1
                          ? 'md:col-span-2 md:pt-24'
                          : index % 5 === 2
                            ? 'md:col-span-3'
                            : 'md:col-span-3 md:pt-12'

                    const aspectClass =
                      image.width > image.height ? 'aspect-[4/3]' : 'aspect-[3/4]'

                    return (
                      <motion.button
                        key={`${volume.slug}-${index}`}
                        variants={staggerItem}
                        onClick={() => setSelectedImage(image)}
                        className={`group text-left ${layoutClass}`}
                      >
                        <div className={`relative w-full overflow-hidden bg-grey-light ${aspectClass}`}>
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 60vw"
                            unoptimized={image.src.includes('imagedelivery.net')}
                          />
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              ) : (
                <motion.div
                  variants={staggerItem}
                  className="flex min-h-[320px] items-center justify-center bg-grey-light px-6 text-center"
                >
                  <p className="max-w-md text-sm uppercase tracking-[0.25em] text-gray-500">
                    Volume images ready to connect. Add Cloudflare Image IDs in config/editorial.ts.
                  </p>
                </motion.div>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt}
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-black"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-full max-h-[88vh] w-full max-w-6xl">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized={selectedImage.src.includes('imagedelivery.net')}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}
    </main>
  )
}
