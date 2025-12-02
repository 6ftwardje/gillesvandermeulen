'use client'

import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { gallerySeries } from '@/config/site'

export const GallerySection = () => {
  return (
    <SectionWrapper id="gallery" variant="spacious" animate>
      <div className="space-y-24">
        {gallerySeries.map((series) => (
          <div key={series.id} className="space-y-8">
            <h3 className="text-xl font-bold uppercase tracking-wider md:text-2xl">
              {series.title}
            </h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {series.images.map((image, index) => (
                <div
                  key={index}
                  className={index === 0 ? 'lg:col-span-2' : ''}
                >
                  <div className="aspect-[3/4] w-full bg-grey-light">
                    {/* Placeholder for gallery images */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

