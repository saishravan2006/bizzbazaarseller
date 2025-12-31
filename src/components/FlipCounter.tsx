import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface FlipCounterProps {
    value: number;
    className?: string;
}

/**
 * Premium flip counter animation component
 * Animates digit changes with a smooth 3D flip effect
 */
export const FlipCounter = ({ value, className = '' }: FlipCounterProps) => {
    const [displayValue, setDisplayValue] = useState(value);
    const [isAnimating, setIsAnimating] = useState(false);
    const prevValue = useRef(value);
    const direction = useRef<'up' | 'down'>('up');

    useEffect(() => {
        if (value !== prevValue.current) {
            direction.current = value > prevValue.current ? 'up' : 'down';
            setIsAnimating(true);

            // Delay the value change to sync with animation
            const timer = setTimeout(() => {
                setDisplayValue(value);
                setIsAnimating(false);
                prevValue.current = value;
            }, 150);

            return () => clearTimeout(timer);
        }
    }, [value]);

    const flipVariants = {
        initial: (dir: 'up' | 'down') => ({
            rotateX: dir === 'up' ? 90 : -90,
            opacity: 0,
            scale: 0.8,
        }),
        animate: {
            rotateX: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir: 'up' | 'down') => ({
            rotateX: dir === 'up' ? -90 : 90,
            opacity: 0,
            scale: 0.8,
        }),
    };

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{ perspective: '100px' }}
        >
            <AnimatePresence mode="popLayout" custom={direction.current}>
                <motion.span
                    key={displayValue}
                    custom={direction.current}
                    variants={flipVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        mass: 0.8,
                    }}
                    className="inline-block"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {displayValue}
                </motion.span>
            </AnimatePresence>

            {/* Pulse effect on change */}
            <AnimatePresence>
                {isAnimating && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-primary/20"
                        initial={{ scale: 0.5, opacity: 0.8 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

/**
 * Staggered digit flip counter for multi-digit numbers
 * Each digit flips independently with a slight delay
 */
export const StaggeredFlipCounter = ({ value, className = '' }: FlipCounterProps) => {
    const digits = String(value).split('');

    return (
        <div className={`inline-flex items-center justify-center ${className}`}>
            {digits.map((digit, index) => (
                <FlipCounter
                    key={`${index}-${digits.length}`}
                    value={parseInt(digit)}
                    className="w-[1ch]"
                />
            ))}
        </div>
    );
};

/**
 * Badge with animated count - premium selection counter
 */
interface AnimatedBadgeProps {
    count: number;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'success' | 'warning';
}

export const AnimatedBadge = ({
    count,
    className = '',
    size = 'md',
    variant = 'primary'
}: AnimatedBadgeProps) => {
    const sizeClasses = {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base',
    };

    const variantClasses = {
        primary: 'bg-primary/10 text-primary',
        success: 'bg-emerald-500/10 text-emerald-600',
        warning: 'bg-amber-500/10 text-amber-600',
    };

    return (
        <motion.div
            className={`
        relative rounded-full flex items-center justify-center font-semibold
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
      `}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            <FlipCounter value={count} />

            {/* Glow effect */}
            <motion.div
                className={`absolute inset-0 rounded-full ${variant === 'primary' ? 'bg-primary/20' :
                        variant === 'success' ? 'bg-emerald-500/20' : 'bg-amber-500/20'
                    }`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </motion.div>
    );
};

export default FlipCounter;
