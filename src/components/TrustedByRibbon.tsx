import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TrustedByRibbonProps {
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
}

const TrustedByRibbon: React.FC<TrustedByRibbonProps> = ({
  className = '',
  speed = 50, // pixels per second
  pauseOnHover = true
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Trusted by data - mix of local businesses and recognizable brands
  const trustedByItems = [
    'Local Store Owners',
    'Chennai Retailers',
    'Small Business Community',
    'Neighborhood Shops',
    'Family Businesses',
    'Local Entrepreneurs',
    'Community Markets',
    'Regional Sellers',
    'Trusted Vendors',
    'Local Commerce',
    'Nearby Businesses',
    'Community Partners'
  ];

  // Intersection Observer for performance
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Pause/resume handlers
  const handleMouseEnter = () => {
    if (pauseOnHover && !shouldReduceMotion) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && !shouldReduceMotion) {
      setIsPaused(false);
    }
  };

  // Create duplicated content for seamless loop
  const duplicatedItems = [...trustedByItems, ...trustedByItems];

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5 border-y border-primary/10 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient fade edges */}
      <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
      
      {/* Ribbon content */}
      <div className="relative py-3 sm:py-4">
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{
            x: shouldReduceMotion || !isVisible || isPaused ? 0 : [
              0, 
              -((trustedByItems.length * 200) + (trustedByItems.length * 32)) // Approximate width calculation
            ]
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : (trustedByItems.length * 200 + trustedByItems.length * 32) / speed,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: 'linear'
          }}
          style={{
            willChange: shouldReduceMotion ? 'auto' : 'transform'
          }}
        >
          {duplicatedItems.map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              {/* Trusted by text */}
              <span className="text-sm sm:text-base font-medium text-foreground/80 tracking-wide">
                Trusted by {item}
              </span>
              
              {/* Separator */}
              <div className="mx-6 sm:mx-8 flex items-center space-x-2">
                <div className="w-1 h-1 bg-primary/40 rounded-full" />
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                <div className="w-1 h-1 bg-primary/40 rounded-full" />
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
      
      {/* Subtle shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: shouldReduceMotion ? 0 : ['-100%', '100%']
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 3,
          repeat: shouldReduceMotion ? 0 : Infinity,
          ease: 'easeInOut'
        }}
        style={{
          width: '200%',
          left: '-100%'
        }}
      />
      
      {/* Screen reader content */}
      <div className="sr-only">
        Trusted by local businesses and community partners in Chennai and nearby areas
      </div>
    </div>
  );
};

export default TrustedByRibbon;