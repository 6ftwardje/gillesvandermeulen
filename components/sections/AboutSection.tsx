'use client'

import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Accordion } from '@/components/ui/Accordion'

export const AboutSection = () => {
  return (
    <SectionWrapper id="about" variant="default" animate>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold uppercase tracking-wide md:text-4xl">
            About
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-700">
            Gilles Vandermeulen approaches hair as a form of architectural expression,
            creating structures that reflect contemporary urban minimalism.
          </p>
          <div className="aspect-[3/4] w-full bg-grey-light">
            {/* Placeholder for Gilles portrait */}
          </div>
        </div>
        <div className="flex items-start">
          <Accordion title="Read More" defaultOpen={false}>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p className="mb-4">
                With a background in high-end fashion and editorial work, Gilles brings
                a unique perspective to hair artistry. His approach combines technical
                precision with creative vision, resulting in looks that are both
                contemporary and timeless.
              </p>
              <p className="mb-4">
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
      </div>
    </SectionWrapper>
  )
}

