import Image from 'next/image'
import { ImageData } from '@/types'
import { cn } from '@/lib/utils'

interface ImagePairProps {
  image1: ImageData
  image2: ImageData
  layout?: 'horizontal' | 'vertical' | 'asymmetric'
  className?: string
}

export const ImagePair = ({ image1, image2, layout = 'asymmetric', className }: ImagePairProps) => {
  const layoutClasses = {
    horizontal: 'grid-cols-2 gap-6',
    vertical: 'grid-cols-1 gap-6',
    asymmetric: 'grid-cols-1 lg:grid-cols-3 gap-6',
  }

  return (
    <div className={cn('grid', layoutClasses[layout], className)}>
      <div className={cn(layout === 'asymmetric' && 'lg:col-span-2')}>
        <Image
          src={image1.src}
          alt={image1.alt}
          width={image1.width}
          height={image1.height}
          className="h-full w-full object-cover"
          priority={image1.priority}
        />
      </div>
      <div>
        <Image
          src={image2.src}
          alt={image2.alt}
          width={image2.width}
          height={image2.height}
          className="h-full w-full object-cover"
          priority={image2.priority}
        />
      </div>
    </div>
  )
}

