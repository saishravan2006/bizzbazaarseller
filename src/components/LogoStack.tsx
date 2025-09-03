import React, { useRef } from 'react';
import { motion, MotionConfigContext, easeOut, easeInOut } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';

interface LogoStackProps {
  logoSrc?: string;
  logoAlt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

const transition1 = {
  bounce: 0.2,
  delay: 0,
  duration: 0.4,
  type: "spring" as const
} as Transition;

const Transition = ({ value, children }: { value: any; children: React.ReactNode }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(
    () => ({ ...config, transition }),
    [transition]
  );
  return (
    <MotionConfigContext.Provider value={contextValue}>
      {children}
    </MotionConfigContext.Provider>
  );
};

const LogoStack: React.FC<LogoStackProps> = ({
  logoSrc = "/logo.svg",
  logoAlt = "Logo",
  width = 732,
  height = 610,
  className = "",
  style = {}
}) => {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const defaultLayoutId = React.useId();
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const logoVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      } as Transition
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: easeOut
      } as Transition
    }
  } satisfies Variants;

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: easeOut
      } as Transition
    }
  } satisfies Variants;

  return (
    <Transition value={transition1}>
      <motion.div
        ref={fallbackRef}
        className={`relative overflow-hidden ${className}`}
        style={{
          width: width,
          height: height,
          ...style
        }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        layoutId={defaultLayoutId}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          {imageError ? (
            <div className="flex items-center justify-center w-full h-full bg-muted rounded-lg">
              <span className="text-muted-foreground text-sm">Logo unavailable</span>
            </div>
          ) : (
            <img
              src={logoSrc}
              alt={logoAlt}
              className={`max-w-full max-h-full object-contain drop-shadow-sm transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
              }}
            />
          )}
          
          {/* Loading placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg animate-pulse">
              <div className="w-16 h-16 bg-muted rounded-lg" />
            </div>
          )}
        </motion.div>
        
        {/* Subtle background gradient */}
        <div 
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            background: 'radial-gradient(circle at center, hsl(266 64% 45% / 0.1) 0%, transparent 70%)'
          }}
        />
        
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 -z-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, hsl(266 64% 45% / 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, hsl(266 64% 45% / 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, hsl(266 64% 45% / 0.05) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: easeInOut
          }}
        />
      </motion.div>
    </Transition>
  );
};

export default LogoStack;