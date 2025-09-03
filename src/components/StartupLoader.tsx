import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import LogoStack from './LogoStack';

interface StartupLoaderProps {
  onLoadingComplete: () => void;
  minLoadingTime?: number;
  showProgress?: boolean;
}

const StartupLoader: React.FC<StartupLoaderProps> = ({
  onLoadingComplete,
  minLoadingTime = 3000,
  showProgress = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 8 + 2; // 2-10% increments
        const newProgress = Math.min(prev + increment, 95);
        return newProgress;
      });
    }, 150);

    // Complete loading after minimum time
    const loadingTimeout = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      // Smooth exit transition
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(onLoadingComplete, 400);
      }, 600);
    }, minLoadingTime);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimeout);
    };
  }, [minLoadingTime, onLoadingComplete]);

  // Premium animation variants
  const containerVariants = {
    initial: { 
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.05,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const logoVariants = {
    initial: { 
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
      scale: shouldReduceMotion ? 1 : 0.8
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 1,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    pulse: {
      scale: shouldReduceMotion ? 1 : [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const progressVariants = {
    initial: { 
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.6,
        delay: 0.8,
        ease: "easeOut"
      }
    }
  };

  const shimmerVariants = {
    animate: {
      x: shouldReduceMotion ? 0 : ["-100%", "100%"],
      transition: {
        duration: shouldReduceMotion ? 0 : 2,
        repeat: shouldReduceMotion ? 0 : Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-background/95"
          variants={{
            initial: { 
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.95
            },
            animate: { 
              opacity: 1,
              scale: 1,
              transition: {
                duration: shouldReduceMotion ? 0.3 : 0.8,
                ease: "easeInOut"
              }
            },
            exit: { 
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 1.05,
              transition: {
                duration: shouldReduceMotion ? 0.2 : 0.4,
                ease: "easeInOut"
              }
            }
          }}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Premium background effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Subtle gradient orbs */}
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, hsl(266 64% 45% / 0.08) 0%, transparent 70%)'
              }}
            />
            <div 
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, hsl(145 63% 42% / 0.06) 0%, transparent 70%)'
              }}
            />
            
            {/* Animated grid pattern */}
            <motion.div
              className="absolute inset-0 opacity-[0.02]"
              animate={{
                opacity: shouldReduceMotion ? 0.02 : [0.01, 0.03, 0.01]
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 4,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundImage: `
                  linear-gradient(hsl(266 64% 45% / 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(266 64% 45% / 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center space-y-12">
            {/* Premium logo with animations */}
            <motion.div
              variants={{
                initial: { 
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 30,
                  scale: shouldReduceMotion ? 1 : 0.8
                },
                animate: { 
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: shouldReduceMotion ? 0.3 : 1,
                    delay: 0.2,
                    ease: "easeInOut"
                  }
                },
                pulse: {
                  scale: shouldReduceMotion ? 1 : [1, 1.02, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
              }}
              initial="initial"
              animate={["animate", "pulse"]}
              className="relative"
            >
              {/* Logo glow effect */}
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150" />
              
              {/* Main logo - Enlarged for better brand visibility */}
               <div className="relative">
                 <LogoStack
                   logoSrc="/logo.svg"
                   logoAlt="Bizz Bazaar"
                   width={220}
                   height={176}
                   className="mx-auto drop-shadow-2xl"
                   style={{ filter: 'drop-shadow(0 15px 40px hsl(266 64% 45% / 0.25))' }}
                 />
               </div>
              
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  variants={{
                    animate: {
                      x: shouldReduceMotion ? 0 : ["-100%", "100%"],
                      transition: {
                        duration: shouldReduceMotion ? 0 : 2,
                        repeat: shouldReduceMotion ? 0 : Infinity,
                        ease: "easeInOut" as const
                      }
                    }
                  }}
                  animate="animate"
                  style={{
                    width: '200%',
                    height: '100%',
                    left: '-100%'
                  }}
                />
              </div>
            </motion.div>

            {/* Brand name with premium typography */}
             <motion.div
               className="text-center space-y-4"
               initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: shouldReduceMotion ? 0.3 : 0.8, delay: 0.6 }}
             >
               <motion.h1 
                 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold text-foreground tracking-tight leading-none"
                 style={{
                   fontFamily: 'Manrope, system-ui, sans-serif',
                   fontWeight: 800,
                   letterSpacing: '-0.02em',
                   background: 'linear-gradient(135deg, hsl(266 64% 45%) 0%, hsl(145 63% 42%) 100%)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                   backgroundClip: 'text'
                 }}
                 animate={{
                   backgroundPosition: shouldReduceMotion ? '0% 50%' : ['0% 50%', '100% 50%', '0% 50%']
                 }}
                 transition={{
                   duration: shouldReduceMotion ? 0 : 3,
                   repeat: shouldReduceMotion ? 0 : Infinity,
                   ease: 'easeInOut'
                 }}
               >
                 Bizz Bazaar
               </motion.h1>
               <motion.p 
                 className="text-muted-foreground text-xl md:text-2xl font-medium tracking-wide"
                 style={{
                   fontFamily: 'Inter, system-ui, sans-serif',
                   fontWeight: 500,
                   letterSpacing: '0.01em'
                 }}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8, duration: 0.6 }}
               >
                 Connecting stores with customers
               </motion.p>
               
               {/* Benefit-focused tagline */}
                <motion.div
                  className="flex items-center justify-center space-x-2 text-sm text-muted-foreground/70"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                >
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/30" />
                  <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 400 }}>
                    Grow Your Business • Reach More Customers
                  </span>
                  <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary/30" />
                </motion.div>
             </motion.div>

            {/* Premium progress indicator */}
            {showProgress && (
              <motion.div
                className="w-80 max-w-sm space-y-4"
                variants={{
                  initial: { 
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 20
                  },
                  animate: { 
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: shouldReduceMotion ? 0.2 : 0.6,
                      delay: 0.8,
                      ease: ["easeOut"] as const
                    }
                  }
                }}
                initial="initial"
                animate="animate"
              >
                {/* Progress bar container */}
                <div className="relative">
                  {/* Background track */}
                  <div className="h-1 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
                    {/* Progress fill */}
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary via-primary to-accent rounded-full relative"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: shouldReduceMotion ? 0 : ["-100%", "100%"]
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 1.5,
                          repeat: shouldReduceMotion ? 0 : Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Progress percentage */}
                  <div className="flex justify-center mt-3">
                    <motion.span
                      className="text-sm font-medium text-muted-foreground tabular-nums"
                      key={Math.floor(progress)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {Math.floor(progress)}%
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Elegant loading dots */}
            <motion.div
              className="flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary/60 rounded-full"
                  animate={{
                    scale: shouldReduceMotion ? 1 : [1, 1.3, 1],
                    opacity: shouldReduceMotion ? 0.6 : [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 1.5,
                    repeat: shouldReduceMotion ? 0 : Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Subtle corner accent */}
          <motion.div
            className="absolute bottom-8 right-8 w-3 h-3 bg-primary/20 rounded-full"
            animate={{
              scale: shouldReduceMotion ? 1 : [1, 1.2, 1],
              opacity: shouldReduceMotion ? 0.2 : [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 3,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StartupLoader;