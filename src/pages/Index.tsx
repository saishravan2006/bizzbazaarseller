import React, { useCallback, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, easeOut, easeInOut } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { shouldReduceMotion, getTransition } from '@/lib/motion';
import SlideInButton from '@/components/SlideInButton';
import NumberCounter from '@/components/NumberCounter';
import LogoStack from '@/components/LogoStack';
import ProTextTypeEffect from '@/components/ProTextTypeEffect';
import TrustedByMarquee from '@/components/TrustedByMarquee';
import TrustedByRibbon from '@/components/TrustedByRibbon';
import type { Variants, Transition } from 'framer-motion';

const FirstPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Demo data for TrustedByMarquee - Using local placeholder to avoid ORB errors
  const demoItems = [
    { 
      id: "1", 
      src: "/placeholder.svg", 
      alt: "Alex Roman", 
      name: "Alex Roman", 
      title: "Store Owner", 
      quote: "Bizz Bazaar helped me reach customers I never knew existed in my area." 
    },
    { 
      id: "2", 
      src: "/placeholder.svg", 
      alt: "Priya Sharma", 
      name: "Priya Sharma", 
      title: "Boutique Owner", 
      quote: "Amazing platform! My sales increased by 40% in just two months." 
    },
    { 
      id: "3", 
      src: "/placeholder.svg", 
      alt: "Raj Patel", 
      name: "Raj Patel", 
      title: "Electronics Store", 
      quote: "The best decision for my business. Highly recommend to all local sellers." 
    },
    { 
      id: "4", 
      src: "/placeholder.svg", 
      alt: "Sarah Johnson", 
      name: "Sarah Johnson", 
      title: "Cafe Owner", 
      quote: "Simple, effective, and results-driven. Perfect for small businesses." 
    },
    { 
      id: "5", 
      src: "/placeholder.svg", 
      alt: "David Kumar", 
      name: "David Kumar", 
      title: "Grocery Store", 
      quote: "Customer discovery made easy. Love the local focus of this platform." 
    },
    { 
      id: "6", 
      src: "/placeholder.svg", 
      alt: "Maya Singh", 
      name: "Maya Singh", 
      title: "Fashion Retailer", 
      quote: "Incredible reach in my neighborhood. Customers find me so easily now." 
    },
    { 
      id: "7", 
      src: "/placeholder.svg", 
      alt: "Arjun Reddy", 
      name: "Arjun Reddy", 
      title: "Mobile Repair", 
      quote: "Great for service-based businesses. My bookings doubled!" 
    },
    { 
      id: "8", 
      src: "/placeholder.svg", 
      alt: "Kavya Nair", 
      name: "Kavya Nair", 
      title: "Bakery Owner", 
      quote: "Perfect for connecting with local customers who love fresh baked goods." 
    },
    { 
      id: "9", 
      src: "/placeholder.svg", 
      alt: "Vikram Shah", 
      name: "Vikram Shah", 
      title: "Pharmacy Owner", 
      quote: "Reliable platform with genuine local customers. Highly satisfied." 
    },
    { 
      id: "10", 
      src: "/placeholder.svg", 
      alt: "Anita Gupta", 
      name: "Anita Gupta", 
      title: "Jewelry Store", 
      quote: "Excellent for showcasing handcrafted items to the right audience." 
    },
    // Logo items - Using local placeholder to avoid ORB errors
    { 
      id: "logo-1", 
      src: "/logo.svg", 
      alt: "Partner Company" 
    },
    { 
      id: "logo-2", 
      src: "/logo.svg", 
      alt: "Partner Company" 
    },
    { 
      id: "logo-3", 
      src: "/logo.svg", 
      alt: "Partner Company" 
    },
    { 
      id: "logo-4", 
      src: "/logo.svg", 
      alt: "Partner Company" 
    },
    { 
      id: "logo-5", 
      src: "/logo.svg", 
      alt: "Partner Company" 
    },
    { 
      id: "logo-6", 
      src: "/logo.svg", 
      alt: "Partner Company" 
    }
  ];

  // Subtle pointer-parallax for the hero group
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 20, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 100, damping: 20, mass: 0.3 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion()) return;
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX - w / 2) * 0.008; // Very subtle movement
    const y = (e.clientY - h / 2) * 0.008;
    mx.set(x);
    my.set(y);
  }, [mx, my]);

  const handleLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  // Touch gesture: swipe up to continue
  const touchStartY = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0]?.clientY ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current == null) return;
    const endY = e.changedTouches[0]?.clientY ?? touchStartY.current;
    if (touchStartY.current - endY > 50) navigate('/language');
    touchStartY.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate('/language');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Cleanup motion values on unmount
  useEffect(() => {
    return () => {
      mx.destroy();
      my.destroy();
    };
  }, [mx, my]);

  const goNext = () => navigate('/language');

  // Breathing animation for the logo
  const logoVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: getTransition('gentle')
    },
    hover: {
      scale: shouldReduceMotion() ? 1 : 1.02,
      transition: { duration: 0.3, ease: easeOut } as Transition
    }
  } satisfies Variants;

  const taglineVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { ...getTransition('gentle'), delay: 0.15 }
    }
  } satisfies Variants;

  const ctaVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { ...getTransition('gentle'), delay: 0.3 }
    },
    hover: {
      scale: shouldReduceMotion() ? 1 : 1.02,
      boxShadow: shouldReduceMotion() ? undefined : '0 12px 32px -8px hsl(266 64% 45% / 0.3)',
      transition: { duration: 0.2 } as Transition
    },
    tap: {
      scale: shouldReduceMotion() ? 1 : 0.98,
      transition: { duration: 0.1 } as Transition
    }
  } satisfies Variants;

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 bg-gradient-to-br from-background via-background to-muted/20"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Ambient background elements */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, hsl(266 64% 45% / 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, hsl(145 63% 42% / 0.02) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, hsl(266 64% 45% / 0.01) 0%, transparent 70%)
          `
        }}
      />

      {/* Subtle texture overlay */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-[0.015]"
        animate={{ opacity: shouldReduceMotion() ? 0.015 : [0.01, 0.02, 0.01] }}
        transition={{ duration: shouldReduceMotion() ? 0 : 12, repeat: shouldReduceMotion() ? 0 : Infinity, ease: easeInOut }}
        style={{
          backgroundImage: 'radial-gradient(hsl(266 64% 45%) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <main className="w-full max-w-4xl mx-auto text-center select-none" role="main" aria-labelledby="app-title">
        {/* Hero section with enhanced parallax */}
        <motion.div 
          style={{ x: sx, y: sy }} 
          className="flex flex-col items-center space-y-6 sm:space-y-8"
        >
          {/* Logo using LogoStack component */}
           <motion.div
             variants={logoVariants}
             initial="initial"
             animate="animate"
             whileHover="hover"
             className="relative"
           >
             <LogoStack
               logoSrc="/logo.svg"
               logoAlt="Bizz Bazaar"
               width={300}
               height={240}
               className="mx-auto"
               style={{ maxWidth: '100%', height: 'auto' }}
             />
           </motion.div>

          {/* Refined tagline with premium typography */}
          <motion.div
            variants={taglineVariants}
            initial="initial"
            animate="animate"
            className="space-y-2"
          >
            <ProTextTypeEffect
              text={[
                "Your store, always visible to the right customer.",
                "Connect with customers who matter most.",
                "Grow your business with Bizz Bazaar."
              ]}
              as="h1"
              aria-labelledby="app-title"
              className="text-2xl sm:text-3xl md:text-4xl font-title font-semibold text-foreground tracking-tight leading-tight max-w-[20ch] mx-auto"
              typingSpeed={80}
              initialDelay={1000}
              pauseDuration={2000}
              deletingSpeed={40}
              loop={true}
              showCursor={true}
              cursorCharacterPreset="|"
              cursorBlinkDuration={0.7}
              textColors={['hsl(230 13% 14%)']} 
              cursorColorMode="custom"
              cursorCustomColor="hsl(266 64% 45%)"
              startOnVisible={true}
              font={{
                fontSize: 'inherit',
                fontWeight: 'inherit',
                fontFamily: 'inherit',
                lineHeight: 'inherit',
                letterSpacing: 'inherit'
              }}
            />
            <p className="text-base sm:text-lg text-muted-foreground font-medium tracking-wide max-w-[32ch] mx-auto">
               Connect with customers who matter most
             </p>
             
             {/* Stats counter */}
             <motion.div
               className="flex items-center justify-center space-x-8 mt-4"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4, duration: 0.5 }}
             >
               <div className="text-center">
                 <span
                   className="mb-1 block"
                   style={{
                     fontSize: '24px',
                     fontWeight: 'bold',
                     color: 'hsl(266 64% 45%)',
                     textAlign: 'center',
                     width: 'max-content',
                     margin: '0 auto'
                   }}
                   aria-label="Active stores: 20+"
                 >
                   20+
                 </span>
                 <div className="text-xs text-muted-foreground">Active Stores</div>
               </div>
               <div className="text-center">
                 <span
                   className="mb-1 block"
                   style={{
                     fontSize: '24px',
                     fontWeight: 'bold',
                     color: 'hsl(145 63% 42%)',
                     textAlign: 'center',
                     width: 'max-content',
                     margin: '0 auto'
                   }}
                   aria-label="Customers reached: 1K"
                 >
                   1K
                 </span>
                 <div className="text-xs text-muted-foreground">Customers Reached</div>
               </div>
             </motion.div>
          </motion.div>
        </motion.div>

        {/* Elegant CTA section */}
        <motion.div
          className="mt-12 sm:mt-16 flex flex-col items-center space-y-4"
          variants={{
            initial: { opacity: 0 },
            animate: { 
              opacity: 1,
              transition: { delay: 0.5, staggerChildren: 0.1 }
            }
          }}
          initial="initial"
          animate="animate"
        >
          <SlideInButton
             buttonText="Get Started"
             defaultBackgroundColor="hsl(266 64% 45%)"
             defaultTextColor="white"
             hoverBackgroundColor="hsl(266 64% 40%)"
             hoverTextColor="white"
             link="/language"
             className="shadow-lg shadow-primary/20 hover:shadow-primary/30 focus-visible:ring-primary"
           />

          {/* Subtle interaction hints */}
          <motion.div
            className="flex items-center space-x-6 text-xs sm:text-sm text-muted-foreground/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="hidden sm:inline">Press Enter</span>
            <span className="w-1 h-1 bg-muted-foreground/30 rounded-full hidden sm:block" />
            <span>Swipe up</span>
            <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
            <span>Tap to continue</span>
          </motion.div>
        </motion.div>
        
        {/* Trusted by Near You Ribbon */}
        <motion.div
          className="mt-8 sm:mt-12 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <TrustedByRibbon 
            speed={60}
            pauseOnHover={true}
            className="shadow-sm"
          />
        </motion.div>
        
        {/* Trusted By Section */}
        <motion.div
          className="mt-12 sm:mt-16 w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <TrustedByMarquee 
            items={demoItems}
            speed={40}
            rowCount={2}
            direction="ltr"
            density="comfortable"
            pauseOnHover={true}
          />
        </motion.div>
      </main>

      {/* Subtle brand accent in corner */}
      <motion.div
        className="absolute bottom-6 right-6 w-2 h-2 bg-primary/20 rounded-full"
        animate={{ 
          scale: shouldReduceMotion() ? 1 : [1, 1.2, 1],
          opacity: shouldReduceMotion() ? 0.2 : [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: shouldReduceMotion() ? 0 : 3, 
          repeat: shouldReduceMotion() ? 0 : Infinity,
          ease: easeInOut
        }}
      />
    </div>
  );
};

export default FirstPage;
