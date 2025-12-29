import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
}

// Define page order for directional transitions
const pageOrder = [
    '/',
    '/language',
    '/store-name',
    '/store-type',
    '/confirm',
    '/success'
];

// Get direction based on navigation path
const getDirection = (pathname: string): number => {
    const currentIndex = pageOrder.indexOf(pathname);
    // Default to forward (1) for new pages
    return currentIndex >= 0 ? 1 : 1;
};

// Premium page transition variants
const pageVariants = {
    initial: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        scale: 0.95,
    }),
    animate: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8,
        }
    },
    exit: (direction: number) => ({
        x: direction > 0 ? '-30%' : '30%',
        opacity: 0,
        scale: 0.98,
        transition: {
            type: 'tween',
            ease: [0.32, 0.72, 0, 1], // Custom easing
            duration: 0.3,
        }
    }),
};

// Fade + Scale variant for modal-like pages
const fadeScaleVariants = {
    initial: {
        opacity: 0,
        scale: 0.92,
        y: 20,
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 350,
            damping: 25,
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: -10,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        }
    },
};

// Slide up variant for bottom sheets / success pages
const slideUpVariants = {
    initial: {
        opacity: 0,
        y: '100%',
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        }
    },
    exit: {
        opacity: 0,
        y: '50%',
        transition: {
            duration: 0.25,
        }
    },
};

/**
 * Premium Page Transition Wrapper
 * Wraps page content with smooth directional animations
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
    children,
    className = ''
}) => {
    const location = useLocation();
    const direction = getDirection(location.pathname);

    return (
        <motion.div
            className={`min-h-screen ${className}`}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    );
};

/**
 * Fade Scale Transition - for modal/dialog style pages
 */
export const FadeScaleTransition: React.FC<PageTransitionProps> = ({
    children,
    className = ''
}) => {
    return (
        <motion.div
            className={`min-h-screen ${className}`}
            variants={fadeScaleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    );
};

/**
 * Slide Up Transition - for success/completion pages
 */
export const SlideUpTransition: React.FC<PageTransitionProps> = ({
    children,
    className = ''
}) => {
    return (
        <motion.div
            className={`min-h-screen ${className}`}
            variants={slideUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    );
};

/**
 * Staggered Children Container
 * Animates children sequentially with delay
 */
export const StaggerContainer: React.FC<{
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.1 }) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.1,
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

/**
 * Stagger Item - use inside StaggerContainer
 */
export const StaggerItem: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 24,
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
