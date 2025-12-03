import { ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  variant?: 'default' | 'tight' | 'spacious'
  animate?: boolean
  variants?: Variants
}

export const SectionWrapper = ({
  children,
  className,
  id,
  variant = 'default',
  animate = false,
  variants,
}: SectionWrapperProps) => {
  const spacingClasses = {
    default: 'py-section',
    tight: 'py-section-sm',
    spacious: 'py-32',
  }

  const defaultVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const Component = animate ? motion.section : 'section'

  const props = animate
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-100px' },
        variants: variants || defaultVariants,
      }
    : {}

  return (
    <Component
      id={id}
      className={cn(
        'w-full',
        spacingClasses[variant],
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {children}
      </div>
    </Component>
  )
}



