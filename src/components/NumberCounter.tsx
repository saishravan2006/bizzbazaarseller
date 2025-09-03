import React, { useState, useEffect, useRef, useMemo, startTransition } from 'react';
import { useInView, easeOut, easeIn, easeInOut } from 'framer-motion';
import type { Transition } from 'framer-motion';

interface NumberCounterProps {
  startValue?: number;
  endValue?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'bounce';
  font?: React.CSSProperties;
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  autoStart?: boolean;
  loop?: boolean;
  resetOnReEntry?: boolean;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
  'aria-label'?: string;
}

const easingMap = {
  linear: [0, 0, 1, 1] as [number, number, number, number],
  easeIn: easeIn,
  easeOut: easeOut,
  easeInOut: easeInOut,
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number]
};

const NumberCounter: React.FC<NumberCounterProps> = ({
  startValue = 0,
  endValue = 100,
  duration = 2,
  delay = 0,
  decimals = 0,
  easing = 'easeOut',
  font = { fontSize: '32px', fontWeight: 'bold', letterSpacing: '-0.03em', lineHeight: '1em' },
  textAlign = 'left',
  color = '#000000',
  autoStart = true,
  loop = false,
  resetOnReEntry = false,
  prefix = '',
  suffix = '',
  separator = ',',
  className = '',
  'aria-label': ariaLabel
}) => {
  const [currentValue, setCurrentValue] = useState(startValue);
  const [hasStarted, setHasStarted] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: !resetOnReEntry,
    margin: '0px 0px -10% 0px'
  });

  const formatNumber = useMemo(() => {
    return (value: number) => {
      const fixed = value.toFixed(decimals);
      if (separator && Math.abs(value) >= 1000) {
        const parts = fixed.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return parts.join('.');
      }
      return fixed;
    };
  }, [decimals, separator]);

  const easeValue = useMemo(() => {
    return (t: number) => {
      const easingFunc = easingMap[easing];
      if (easing === 'linear') return t;
      if (easing === 'bounce') {
        if (t < 1 / 2.75) {
          return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
          return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
          return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        } else {
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
      }
      // For function-based easings, use them directly
      if (typeof easingFunc === 'function') {
        return easingFunc(t);
      }
      // For cubic bezier arrays
      const [x1, y1, x2, y2] = easingFunc as [number, number, number, number];
      return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
    };
  }, [easing]);

  const animate = useMemo(() => {
    return (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp + delay * 1000;
      }
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      if (progress >= 0) {
        const easedProgress = easeValue(progress);
        const newValue = startValue + (endValue - startValue) * easedProgress;
        startTransition(() => {
          setCurrentValue(newValue);
        });
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else if (loop) {
          // Reset for loop
          startTimeRef.current = undefined;
          startTransition(() => {
            setCurrentValue(startValue);
          });
          setTimeout(() => {
            animationRef.current = requestAnimationFrame(animate);
          }, 100);
        }
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
  }, [startValue, endValue, duration, delay, easing, loop, easeValue]);

  const startAnimation = useMemo(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = undefined;
      startTransition(() => {
        setCurrentValue(startValue);
        setHasStarted(true);
      });
      animationRef.current = requestAnimationFrame(animate);
    };
  }, [animate, startValue]);

  // Handle auto-start and in-view animation
  useEffect(() => {
    if (isInView && (!hasStarted || resetOnReEntry)) {
      startAnimation();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, hasStarted, resetOnReEntry, startAnimation]);

  // Reset when not in view and resetOnReEntry is true
  useEffect(() => {
    if (!isInView && resetOnReEntry && hasStarted) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTransition(() => {
        setCurrentValue(startValue);
        setHasStarted(false);
      });
      startTimeRef.current = undefined;
    }
  }, [isInView, resetOnReEntry, hasStarted, startValue]);

  const displayValue = formatNumber(currentValue);
  const fullText = `${prefix}${displayValue}${suffix}`;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: 'max-content',
        minWidth: 'max-content'
      }}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel || `Counter from ${startValue} to ${endValue}`}
    >
      <span
        style={{
          display: 'block',
          textAlign,
          color,
          width: 'max-content',
          ...font
        }}
        aria-hidden="true"
      >
        {fullText}
      </span>
    </div>
  );
};

export default NumberCounter;