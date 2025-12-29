import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PremiumButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost' | 'success';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    pulse?: boolean;
}

/**
 * Premium Button with Spring Physics
 * Features: 3D press effect, ripple, glow, and pulse animations
 */
export const PremiumButton: React.FC<PremiumButtonProps> = ({
    children,
    onClick,
    disabled = false,
    variant = 'primary',
    size = 'md',
    className = '',
    fullWidth = false,
    icon,
    iconPosition = 'left',
    loading = false,
    pulse = false,
}) => {
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    // Handle ripple effect
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const newRipple = { id: Date.now(), x, y };
        setRipples(prev => [...prev, newRipple]);

        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);

        onClick?.();
    }, [disabled, loading, onClick]);

    // Variant styles
    const variantStyles = {
        primary: 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25',
        secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
        ghost: 'bg-transparent hover:bg-muted text-foreground',
        success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25',
    };

    // Size styles
    const sizeStyles = {
        sm: 'px-4 py-2 text-sm rounded-lg',
        md: 'px-6 py-3 text-base rounded-xl',
        lg: 'px-8 py-4 text-lg rounded-xl',
        xl: 'px-10 py-5 text-xl rounded-2xl',
    };

    return (
        <motion.button
            onClick={handleClick}
            disabled={disabled || loading}
            className={cn(
                'relative overflow-hidden font-medium transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                variantStyles[variant],
                sizeStyles[size],
                fullWidth && 'w-full',
                (disabled || loading) && 'opacity-50 cursor-not-allowed',
                className
            )}
            // 🎯 Spring physics for press
            whileHover={{
                scale: disabled ? 1 : 1.02,
                y: disabled ? 0 : -2,
            }}
            whileTap={{
                scale: disabled ? 1 : 0.95,
                y: disabled ? 0 : 0,
            }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 17,
            }}
            // 🌟 Subtle glow on hover
            style={{
                boxShadow: variant === 'primary' ? undefined : undefined,
            }}
        >
            {/* Pulse animation for CTAs */}
            {pulse && !disabled && (
                <motion.div
                    className="absolute inset-0 rounded-inherit bg-white/20"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            )}

            {/* Gradient overlay on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0"
                whileHover={{ opacity: 1, x: ['0%', '100%'] }}
                transition={{ duration: 0.5 }}
            />

            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                    <motion.div
                        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                ) : (
                    <>
                        {icon && iconPosition === 'left' && (
                            <motion.span
                                initial={{ x: 0 }}
                                whileHover={{ x: -2 }}
                            >
                                {icon}
                            </motion.span>
                        )}
                        {children}
                        {icon && iconPosition === 'right' && (
                            <motion.span
                                initial={{ x: 0 }}
                                whileHover={{ x: 2 }}
                            >
                                {icon}
                            </motion.span>
                        )}
                    </>
                )}
            </span>

            {/* Ripple effects */}
            {ripples.map(ripple => (
                <motion.span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/30 pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ width: 0, height: 0, opacity: 0.8 }}
                    animate={{ width: 300, height: 300, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />
            ))}
        </motion.button>
    );
};

/**
 * Sticky Footer with Slide-up Animation
 */
export const StickyFooter: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    return (
        <motion.div
            className={cn(
                'fixed bottom-0 left-0 right-0 p-6',
                'bg-background/80 backdrop-blur-xl',
                'border-t border-border/50',
                'safe-area-bottom',
                className
            )}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                delay: 0.3,
            }}
        >
            {children}
        </motion.div>
    );
};

export default PremiumButton;
