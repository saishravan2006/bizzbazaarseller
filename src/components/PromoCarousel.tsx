import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface PromoCarouselProps {
  className?: string
}

const slides = [
  {
    id: 'offer-new-user',
    badge: 'New User Offer',
    title: 'Groceries',
    subtitle: 'Get Rs 100 OFF',
    description: 'On your first order',
    cta: 'Shop Now',
    gradient: 'from-[#5E2BFF] via-[#6E38F6] to-[#8B5CF6]',
  },
  {
    id: 'fast-delivery',
    badge: 'Lightning Fast',
    title: 'Delivery',
    subtitle: 'Under 30 mins',
    description: 'Across major cities',
    cta: 'Explore',
    gradient: 'from-[#0EA5E9] via-[#22D3EE] to-[#34D399]',
  },
  {
    id: 'seller-boost',
    badge: 'Seller Spotlight',
    title: 'Boost Sales',
    subtitle: 'No listing fee',
    description: 'Limited time offer',
    cta: 'Start Now',
    gradient: 'from-[#F97316] via-[#FB7185] to-[#F472B6]',
  },
]

export function PromoCarousel({ className }: PromoCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setActiveIndex(api.selectedScrollSnap())
    const onSelect = () => setActiveIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    api.on('reInit', onSelect)
    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  return (
    <div className={cn('relative', className)}>
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: 'start' }}
        className="w-full"
        aria-label="Promotions"
      >
        <CarouselContent>
          {slides.map((s) => (
            <CarouselItem key={s.id}>
              <div
                className={cn(
                  'h-36 sm:h-40 rounded-2xl px-5 py-4 text-white overflow-hidden relative',
                  'bg-gradient-to-br',
                  s.gradient,
                  'shadow-[0_8px_24px_-10px_rgba(0,0,0,0.28)]'
                )}
              >
                <div className="flex h-full items-center justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm ring-1 ring-white/25">
                      <span>{s.badge}</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs/4 opacity-90">{s.title}</p>
                      <h3 className="font-title font-semibold text-xl leading-tight">
                        {s.subtitle}
                      </h3>
                      <p className="text-xs/5 opacity-90">{s.description}</p>
                    </div>
                    <Button
                      size="sm"
                      className="mt-3 h-8 rounded-full bg-white text-primary hover:bg-white/90 shadow-lg"
                      variant="default"
                    >
                      {s.cta}
                    </Button>
                  </div>

                  {/* Simple illustration placeholder */}
                  <div className="absolute right-0 bottom-0 h-full w-1/2 pointer-events-none">
                    <div className="absolute -right-6 bottom-4 h-24 w-24 rounded-full bg-white/20 blur-0" />
                    <div className="absolute -right-10 -bottom-6 h-28 w-28 rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev/Next controls */}
        <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 bg-white/90 text-foreground border border-border shadow-md" />
        <CarouselNext className="right-2 top-1/2 -translate-y-1/2 bg-white/90 text-foreground border border-border shadow-md" />
      </Carousel>

      {/* Dots */}
      <div className="mt-2 flex items-center justify-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'h-1.5 w-1.5 rounded-full transition-all',
              i === activeIndex ? 'w-5 bg-primary' : 'bg-muted'
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default PromoCarousel