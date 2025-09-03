import React, { useRef } from 'react';
import { motion, MotionConfigContext, easeOut } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Variants, Transition } from 'framer-motion';

interface SlideInButtonProps {
  buttonText?: string;
  defaultBackgroundColor?: string;
  defaultTextColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  iconName?: string;
  link?: string;
  newTab?: boolean;
  smoothScroll?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

const transition1 = {
  bounce: 0.1,
  delay: 0,
  duration: 0.5,
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

const SlideInButton: React.FC<SlideInButtonProps> = ({
  buttonText = "Get Started",
  defaultBackgroundColor = "hsl(266 64% 45%)",
  defaultTextColor = "white",
  hoverBackgroundColor = "hsl(266 64% 40%)",
  hoverTextColor = "white",
  iconName = "ArrowRight",
  link,
  newTab = false,
  smoothScroll = true,
  onClick,
  className = "",
  disabled = false,
  'aria-label': ariaLabel
}) => {
  const navigate = useNavigate();
  const fallbackRef = useRef(null);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      if (link.startsWith('/')) {
        navigate(link);
      } else {
        if (newTab) {
          window.open(link, '_blank');
        } else {
          window.location.href = link;
        }
      }
    }
  };

  const variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2, ease: easeOut } as Transition
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 } as Transition
    }
  } satisfies Variants;

  return (
    <Transition value={transition1}>
      <motion.button
        ref={fallbackRef}
        className={`inline-flex items-center justify-center px-8 py-4 font-semibold text-lg rounded-2xl shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        style={{
          backgroundColor: disabled ? 'hsl(220 13% 91%)' : defaultBackgroundColor,
          color: disabled ? 'hsl(230 8% 45%)' : defaultTextColor,
          boxShadow: disabled ? 'none' : `0 8px 20px -8px ${defaultBackgroundColor}40`
        }}
        variants={variants}
        initial="initial"
        whileHover={disabled ? {} : {
          scale: 1.02,
          backgroundColor: hoverBackgroundColor,
          color: hoverTextColor,
          boxShadow: `0 12px 32px -8px ${hoverBackgroundColor}50`,
          transition: { duration: 0.2 }
        }}
        whileTap={disabled ? {} : "tap"}
        onClick={disabled ? undefined : handleClick}
        disabled={disabled}
        aria-label={ariaLabel || buttonText}
      >
        <motion.div className="flex items-center space-x-3">
          <span>{buttonText}</span>
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
          >
            →
          </motion.span>
        </motion.div>
      </motion.button>
    </Transition>
  );
};

export default SlideInButton;