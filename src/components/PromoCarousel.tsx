import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Check, MapPin, Gift, Sparkles, Phone, Store, ShieldCheck } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface PromoCarouselProps {
  className?: string
}

// ============================================
// SLIDE 1: Digital Onboarding Banner
// ============================================
const OnboardingSlide = () => (
  <div className="relative h-full w-full bg-gradient-to-br from-[#0891B2] via-[#6366F1] to-[#8B5CF6] overflow-hidden">
    {/* Animated background particles */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-white/20 rounded-full"
        style={{
          left: `${10 + (i * 8)}%`,
          top: `${20 + (i % 3) * 25}%`,
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 2 + (i % 3),
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}

    {/* Glowing network lines */}
    <svg className="absolute inset-0 w-full h-full opacity-20">
      <motion.path
        d="M0,80 Q200,40 400,80 T800,60"
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
    </svg>

    <div className="relative z-10 flex items-center justify-between h-full px-5 py-4">
      {/* Left: Phone mockup */}
      <motion.div
        className="relative flex-shrink-0"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Phone frame */}
        <div className="relative w-20 h-32 bg-gray-900 rounded-xl shadow-2xl border-2 border-gray-700 overflow-hidden">
          {/* Screen */}
          <div className="absolute inset-1 bg-gradient-to-b from-[#075E54] to-[#128C7E] rounded-lg p-1.5">
            {/* WhatsApp header */}
            <div className="flex items-center gap-1 mb-1">
              <div className="w-4 h-4 rounded-full bg-white/20" />
              <span className="text-[6px] text-white font-medium">Bizz Bazaar</span>
              <ShieldCheck className="w-2 h-2 text-green-300" />
            </div>
            {/* Chat bubble */}
            <motion.div
              className="bg-[#DCF8C6] rounded-lg p-1 mt-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              <p className="text-[5px] text-gray-800 font-medium">Shop Verified! ✓</p>
            </motion.div>
          </div>
        </div>

        {/* Floating verified badge */}
        <motion.div
          className="absolute -right-3 top-6 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Check className="w-5 h-5 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Right: Text content */}
      <motion.div
        className="flex-1 pl-4 text-right"
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div
          className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full text-[8px] text-white/90 font-medium mb-1"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-2.5 h-2.5" />
          Fastest Onboarding
        </motion.div>
        <h3 className="text-lg font-bold text-white leading-tight">
          Digital Onboarding
        </h3>
        <p className="text-[10px] text-white/80 mt-0.5">No apps. Just WhatsApp.</p>

        {/* CTA Button */}
        <motion.button
          className="mt-2 inline-flex items-center gap-1 bg-[#25D366] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ["0 0 0 0 rgba(37,211,102,0.4)", "0 0 0 8px rgba(37,211,102,0)", "0 0 0 0 rgba(37,211,102,0)"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <MessageCircle className="w-3 h-3" />
          JOIN NOW
        </motion.button>
      </motion.div>
    </div>
  </div>
)

// ============================================
// SLIDE 2: Chengalpattu Location Banner
// ============================================
const LocationSlide = () => (
  <div className="relative h-full w-full bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#1E40AF] overflow-hidden">
    {/* Animated stars */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/40 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5 + Math.random(),
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}

    <div className="relative z-10 flex items-center justify-between h-full px-5 py-4">
      {/* Left: Text */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="text-[10px] text-amber-300 font-semibold tracking-wider"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎉 NOW LIVE
        </motion.span>
        <h3 className="text-xl font-black text-white leading-none mt-1">
          NOW IN<br />
          <span className="text-amber-300">CHENGALPATTU</span>
        </h3>
        <p className="text-[9px] text-white/70 mt-1 max-w-[120px]">
          Your hyperlocal marketplace has arrived!
        </p>
      </motion.div>

      {/* Right: Animated location pin with map */}
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Glowing platform */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent rounded-full blur-sm"
          animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Mini map grid */}
        <div className="relative w-24 h-20 mb-2">
          <svg className="w-full h-full" viewBox="0 0 100 80">
            {/* Grid lines */}
            {[20, 40, 60, 80].map((x) => (
              <motion.line
                key={`v${x}`}
                x1={x} y1="0" x2={x} y2="80"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: x * 0.01 }}
              />
            ))}
            {[20, 40, 60].map((y) => (
              <motion.line
                key={`h${y}`}
                x1="0" y1={y} x2="100" y2={y}
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: y * 0.01 }}
              />
            ))}
          </svg>

          {/* Location pin */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="relative">
              <MapPin className="w-10 h-10 text-amber-400 drop-shadow-lg" fill="#FCD34D" />
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 w-10 h-10 border-2 border-amber-400 rounded-full"
                animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
)

// ============================================
// SLIDE 3: Credit Offer Banner
// ============================================
const CreditSlide = () => (
  <div className="relative h-full w-full bg-gradient-to-br from-[#FED7AA] via-[#FDBA74] to-[#FB923C] overflow-hidden">
    {/* Sparkle particles */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${10 + (i * 6)}%`,
          top: `${15 + (i % 4) * 20}%`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.15,
        }}
      >
        <Sparkles className="w-3 h-3 text-amber-600/40" />
      </motion.div>
    ))}

    <div className="relative z-10 flex items-center justify-between h-full px-5 py-4">
      {/* Left: Text */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[10px] text-amber-900/70 font-semibold uppercase tracking-wider">
          Limited Time Offer
        </p>
        <h3 className="text-sm font-bold text-amber-900 mt-0.5">
          GET STARTED WITH
        </h3>
        <motion.div
          className="flex items-baseline gap-1 mt-1"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-3xl font-black text-amber-800">₹100</span>
          <span className="text-sm font-bold text-amber-700">CREDIT</span>
        </motion.div>
        <p className="text-[9px] text-amber-800/70 mt-1">
          Grow your business today!
        </p>
      </motion.div>

      {/* Right: Glassmorphic card */}
      <motion.div
        className="relative"
        initial={{ x: 30, opacity: 0, rotate: 5 }}
        animate={{ x: 0, opacity: 1, rotate: 3 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div
          className="relative w-28 h-20 bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl p-3 overflow-hidden"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Card shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />

          {/* Card content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gift className="w-6 h-6 text-amber-600" />
            </motion.div>
            <p className="text-lg font-black text-amber-800 mt-1">₹100</p>
            <span className="text-[7px] text-amber-700 font-semibold">FREE CREDIT</span>
          </div>

          {/* Dashed border decoration */}
          <div className="absolute right-0 top-0 bottom-0 w-px border-r border-dashed border-amber-600/30" />
        </motion.div>

        {/* Claim button */}
        <motion.button
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-800 text-white text-[8px] font-bold px-4 py-1 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          CLAIM NOW
        </motion.button>
      </motion.div>
    </div>
  </div>
)

// ============================================
// MAIN CAROUSEL COMPONENT
// ============================================
const slides = [
  { id: 'onboarding', Component: OnboardingSlide },
  { id: 'location', Component: LocationSlide },
  { id: 'credit', Component: CreditSlide },
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

  // Auto-play
  useEffect(() => {
    if (!api) return
    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)
    return () => clearInterval(interval)
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
          {slides.map(({ id, Component }) => (
            <CarouselItem key={id}>
              <div className="h-36 sm:h-40 rounded-2xl overflow-hidden shadow-xl">
                <Component />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Premium dots indicator */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              i === activeIndex
                ? 'w-6 bg-primary shadow-md'
                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default PromoCarousel