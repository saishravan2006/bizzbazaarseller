import { Variants, Transition } from 'framer-motion';

// Check for reduced motion preference
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Base transition configurations
export const transitions = {
  // Quick commerce feel - crisp and snappy
  crisp: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  } as Transition,
  
  // Smooth for modals and sheets
  smooth: {
    type: 'spring',
    stiffness: 300,
    damping: 25,
    mass: 1,
  } as Transition,
  
  // Gentle for page transitions
  gentle: {
    type: 'spring',
    stiffness: 200,
    damping: 20,
    mass: 1.2,
  } as Transition,
  
  // Reduced motion fallback
  reduced: {
    duration: 0.15,
    ease: 'easeOut',
  } as Transition,
};

// Get appropriate transition based on user preference
export const getTransition = (type: keyof typeof transitions): Transition => {
  return shouldReduceMotion() ? transitions.reduced : transitions[type];
};

// Card animations - crisp tap feedback
export const cardVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: getTransition('crisp'),
  },
  hover: {
    scale: shouldReduceMotion() ? 1 : 1.02,
    y: shouldReduceMotion() ? 0 : -2,
    transition: getTransition('crisp'),
  },
  tap: {
    scale: shouldReduceMotion() ? 1 : 0.98,
    transition: { ...getTransition('crisp'), duration: 0.1 },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: getTransition('crisp'),
  },
};

// Modal/Sheet animations - smooth slide up
export const sheetVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: getTransition('smooth'),
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: getTransition('smooth'),
  },
};

// Backdrop animations
export const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: shouldReduceMotion() ? 0.1 : 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: shouldReduceMotion() ? 0.1 : 0.15 },
  },
};

// Sticky tray animations - slide up from bottom
export const stickyTrayVariants: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: getTransition('smooth'),
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: getTransition('smooth'),
  },
};

// Page transition animations
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    x: shouldReduceMotion() ? 0 : 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: getTransition('gentle'),
  },
  exit: {
    opacity: 0,
    x: shouldReduceMotion() ? 0 : -20,
    transition: getTransition('gentle'),
  },
};

// List item stagger animations
export const listVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion() ? 0 : 0.05,
      delayChildren: shouldReduceMotion() ? 0 : 0.1,
    },
  },
};

export const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: shouldReduceMotion() ? 0 : 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: getTransition('crisp'),
  },
};

// Search input focus animations
export const searchVariants: Variants = {
  initial: {
    scale: 1,
  },
  focus: {
    scale: shouldReduceMotion() ? 1 : 1.02,
    transition: getTransition('crisp'),
  },
  blur: {
    scale: 1,
    transition: getTransition('crisp'),
  },
};

// Loading skeleton animations
export const skeletonVariants: Variants = {
  initial: {
    opacity: 0.6,
  },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: shouldReduceMotion() ? 0 : 1.5,
      repeat: shouldReduceMotion() ? 0 : Infinity,
      ease: 'easeInOut',
    },
  },
};

// Button press animations
export const buttonVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: shouldReduceMotion() ? 1 : 1.02,
    transition: getTransition('crisp'),
  },
  tap: {
    scale: shouldReduceMotion() ? 1 : 0.98,
    transition: { ...getTransition('crisp'), duration: 0.1 },
  },
};

// Section header animations
export const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: shouldReduceMotion() ? 0 : 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: getTransition('gentle'),
  },
};

// Toast/notification animations
export const toastVariants: Variants = {
  hidden: {
    opacity: 0,
    y: shouldReduceMotion() ? 0 : -50,
    scale: shouldReduceMotion() ? 1 : 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: getTransition('smooth'),
  },
  exit: {
    opacity: 0,
    y: shouldReduceMotion() ? 0 : -50,
    scale: shouldReduceMotion() ? 1 : 0.95,
    transition: getTransition('crisp'),
  },
};