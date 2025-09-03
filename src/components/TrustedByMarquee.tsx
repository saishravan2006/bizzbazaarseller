import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useReducedMotion, PanInfo } from 'framer-motion';
import TrustedByItem from './TrustedByItem';

interface TrustedByItem {
  id: string;
  src: string;
  alt: string;
  name?: string;
  title?: string;
  quote?: string;
  href?: string;
}

interface TrustedByMarqueeProps {
  items: TrustedByItem[];
  speed?: number; // px per second
  rowCount?: 1 | 2;
  direction?: 'ltr' | 'rtl';
  density?: 'compact' | 'comfortable';
  pauseOnHover?: boolean;
  className?: string;
}

const TrustedByMarquee: React.FC<TrustedByMarqueeProps> = ({
  items,
  speed = 40, // Default mobile speed
  rowCount = 1,
  direction = 'ltr',
  density = 'comfortable',
  pauseOnHover = true,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();
  
  // Check for save-data preference
  const saveData = typeof navigator !== 'undefined' && 
    'connection' in navigator && 
    (navigator as any).connection?.saveData;
  
  // Determine if animations should be disabled
  const shouldDisableAnimation = shouldReduceMotion || saveData;
  
  // Responsive speed adjustment
  const getResponsiveSpeed = useCallback(() => {
    if (typeof window === 'undefined') return speed;
    const isMobile = window.innerWidth < 768;
    return isMobile ? speed : speed * 1.75; // Desktop is faster
  }, [speed]);

  // Calculate gap based on density
  const gap = density === 'compact' ? 'gap-3 sm:gap-4' : 'gap-4 sm:gap-6';
  
  // Split items for two rows if needed
  const getRowItems = (rowIndex: number) => {
    if (rowCount === 1) return items;
    return items.filter((_, index) => index % 2 === rowIndex);
  };
  
  // Responsive row count - show 1 row on mobile, 2 on desktop
  const shouldShowSecondRow = rowCount === 2;

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

  // Calculate track width and start animation
  useEffect(() => {
    if (!trackRef.current || shouldDisableAnimation) return;
    
    const updateTrackWidth = () => {
      if (trackRef.current) {
        const width = trackRef.current.scrollWidth / 2; // Divide by 2 because we duplicate items
        setTrackWidth(width);
      }
    };
    
    updateTrackWidth();
    window.addEventListener('resize', updateTrackWidth);
    return () => window.removeEventListener('resize', updateTrackWidth);
  }, [items, shouldDisableAnimation]);

  // Animation control
  useEffect(() => {
    if (!isVisible || isPaused || trackWidth === 0 || shouldDisableAnimation) {
      controls.stop();
      return;
    }
    
    const currentSpeed = getResponsiveSpeed();
    const duration = trackWidth / currentSpeed;
    
    controls.start({
      x: direction === 'ltr' ? -trackWidth : trackWidth,
      transition: {
        duration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop'
      }
    });
  }, [isVisible, isPaused, trackWidth, controls, direction, getResponsiveSpeed, shouldDisableAnimation]);

  // Pause/resume handlers
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover && !shouldDisableAnimation) {
      setIsPaused(true);
    }
  }, [pauseOnHover, shouldDisableAnimation]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && !shouldDisableAnimation) {
      setIsPaused(false);
    }
  }, [pauseOnHover, shouldDisableAnimation]);

  const handleFocus = useCallback(() => {
    if (!shouldDisableAnimation) {
      setIsPaused(true);
    }
  }, [shouldDisableAnimation]);

  const handleBlur = useCallback(() => {
    if (!shouldDisableAnimation) {
      setIsPaused(false);
    }
  }, [shouldDisableAnimation]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setIsPaused(prev => !prev);
    }
  }, []);

  // Drag handlers
  const handleDragStart = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    setDragOffset(info.offset.x);
    // Resume animation after a short delay
    setTimeout(() => {
      setIsPaused(false);
      setDragOffset(0);
    }, 600);
  }, []);

  // Visibility change handler for tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const renderRow = (rowIndex: number, reverse = false) => {
    const rowItems = getRowItems(rowIndex);
    if (rowItems.length === 0) return null;
    
    // Duplicate items for seamless loop
    const duplicatedItems = [...rowItems, ...rowItems];
    
    return (
      <div className="relative overflow-hidden" key={`row-${rowIndex}`}>
        {/* Edge fade gradients */}
        <div className="absolute inset-y-0 left-0 w-6 sm:w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-6 sm:w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <motion.div
          ref={rowIndex === 0 ? trackRef : undefined}
          className={`flex ${gap} py-2`}
          animate={shouldDisableAnimation ? {} : controls}
          drag={shouldDisableAnimation ? false : 'x'}
          dragConstraints={false}
          dragElastic={0.04}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{
            x: dragOffset,
            maskImage: shouldDisableAnimation ? 'none' : 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: shouldDisableAnimation ? 'none' : 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
          }}
          initial={{ x: 0 }}
        >
          {duplicatedItems.map((item, index) => (
            <TrustedByItem
              key={`${item.id}-${index}`}
              {...item}
              className={shouldDisableAnimation ? 'scroll-snap-align-start' : ''}
            />
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      className={`w-full ${className}`}
      aria-labelledby="trustedby-heading"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Heading */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 
          id="trustedby-heading" 
          className="text-lg sm:text-xl font-semibold text-foreground mb-2"
        >
          Trusted by people near you
        </h2>
        <p className="text-sm text-muted-foreground">
          Real sellers from Chennai & nearby
        </p>
        {/* Screen reader summary */}
        <div className="sr-only">
          Trusted by {items.length}+ local sellers and early users
        </div>
      </div>

      {/* Marquee container */}
      <div 
        className={`
          space-y-2 sm:space-y-4
          ${shouldDisableAnimation ? 'overflow-x-auto scroll-smooth' : ''}
        `}
        style={{
          scrollSnapType: shouldDisableAnimation ? 'x mandatory' : 'none'
        }}
      >
        {renderRow(0)}
        {shouldShowSecondRow && (
          <div className="hidden md:block">
            {renderRow(1, true)}
          </div>
        )}
      </div>
      
      {/* Instructions for reduced motion users */}
      {shouldDisableAnimation && (
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            Swipe to browse testimonials
          </p>
        </div>
      )}
    </section>
  );
};

export default TrustedByMarquee;