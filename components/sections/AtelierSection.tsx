'use client'

import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Accordion } from '@/components/ui/Accordion'
import { siteConfig } from '@/config/site'

export const AtelierSection = () => {
  return (
    <SectionWrapper id="atelier" variant="default" animate>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="aspect-[4/3] w-full bg-grey-light lg:aspect-square">
          {/* Placeholder for atelier interior photo */}
        </div>
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h2 className="mb-4 text-3xl font-bold uppercase tracking-wide md:text-4xl">
              Atelier
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              A space designed for creation. Minimal, architectural, focused.
            </p>
          </div>
          <Accordion title="About the Space" defaultOpen={false}>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p className="mb-4">
                The atelier is more than a salon—it's a studio where hair becomes art.
                Located in the heart of Ghent, the space reflects the same architectural
                minimalism that defines Gilles' work.
              </p>
              <p className="mb-4">
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
        </div>
      </div>
    </SectionWrapper>
  )
}

