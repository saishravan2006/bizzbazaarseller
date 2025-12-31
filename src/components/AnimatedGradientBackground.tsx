import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AnimatedGradientBackgroundProps {
    className?: string;
    variant?: 'aurora' | 'mesh' | 'radial';
    intensity?: 'subtle' | 'medium' | 'vibrant';
    interactive?: boolean;
}

/**
 * Premium animated gradient background inspired by Linear.app and Vercel
 * Creates a beautiful aurora/mesh gradient effect with optional mouse interactivity
 */
export const AnimatedGradientBackground = ({
    className = '',
    variant = 'aurora',
    intensity = 'medium',
    interactive = true,
}: AnimatedGradientBackgroundProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position for interactive effects
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Smooth spring physics for mouse tracking
    const springConfig = { stiffness: 50, damping: 30, mass: 1 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Transform mouse position to gradient movement
    const gradientX = useTransform(smoothX, [0, 1], [-20, 20]);
    const gradientY = useTransform(smoothY, [0, 1], [-20, 20]);

    useEffect(() => {
        if (!interactive || !containerRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            mouseX.set((e.clientX - rect.left) / rect.width);
            mouseY.set((e.clientY - rect.top) / rect.height);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [interactive, mouseX, mouseY]);

    const intensityOpacity = {
        subtle: { blob: 0.15, noise: 0.02 },
        medium: { blob: 0.25, noise: 0.03 },
        vibrant: { blob: 0.4, noise: 0.04 },
    };

    const { blob: blobOpacity, noise: noiseOpacity } = intensityOpacity[intensity];

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 overflow-hidden ${className}`}
            style={{ zIndex: -1 }}
        >
            {/* Base gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(135deg, 
            hsl(266 64% 98%) 0%, 
            hsl(266 30% 96%) 50%, 
            hsl(145 20% 97%) 100%
          )`,
                }}
            />

            {variant === 'aurora' && (
                <>
                    {/* Primary aurora blob - Purple */}
                    <motion.div
                        className="absolute rounded-full blur-[100px]"
                        style={{
                            width: '60%',
                            height: '60%',
                            left: '10%',
                            top: '10%',
                            background: `radial-gradient(circle, hsl(266 64% 55% / ${blobOpacity}) 0%, transparent 70%)`,
                            x: gradientX,
                            y: gradientY,
                        }}
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Secondary aurora blob - Teal */}
                    <motion.div
                        className="absolute rounded-full blur-[120px]"
                        style={{
                            width: '50%',
                            height: '50%',
                            right: '5%',
                            bottom: '15%',
                            background: `radial-gradient(circle, hsl(175 70% 45% / ${blobOpacity * 0.7}) 0%, transparent 70%)`,
                            x: useTransform(gradientX, v => -v * 0.5),
                            y: useTransform(gradientY, v => -v * 0.5),
                        }}
                        animate={{
                            scale: [1, 1.15, 1],
                            rotate: [0, -8, 0],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 2,
                        }}
                    />

                    {/* Tertiary blob - Pink accent */}
                    <motion.div
                        className="absolute rounded-full blur-[80px]"
                        style={{
                            width: '35%',
                            height: '35%',
                            left: '50%',
                            top: '40%',
                            background: `radial-gradient(circle, hsl(330 70% 60% / ${blobOpacity * 0.5}) 0%, transparent 70%)`,
                            x: useTransform(gradientX, v => v * 0.3),
                            y: useTransform(gradientY, v => v * 0.3),
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 4,
                        }}
                    />
                </>
            )}

            {variant === 'mesh' && (
                <>
                    {/* Mesh gradient with multiple overlapping circles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full blur-[100px]"
                            style={{
                                width: `${30 + i * 10}%`,
                                height: `${30 + i * 10}%`,
                                left: `${(i * 20) % 80}%`,
                                top: `${(i * 15) % 70}%`,
                                background: `radial-gradient(circle, 
                  hsl(${266 + i * 20} ${50 + i * 5}% ${50 + i * 5}% / ${blobOpacity * (1 - i * 0.1)}) 0%, 
                  transparent 70%
                )`,
                            }}
                            animate={{
                                x: [0, 20 * Math.sin(i), 0],
                                y: [0, 15 * Math.cos(i), 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 12 + i * 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: i * 0.5,
                            }}
                        />
                    ))}
                </>
            )}

            {variant === 'radial' && (
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `
              radial-gradient(circle at 20% 30%, hsl(266 64% 55% / ${blobOpacity}) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, hsl(175 70% 45% / ${blobOpacity}) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, hsl(330 70% 60% / ${blobOpacity * 0.5}) 0%, transparent 60%)
            `,
                    }}
                    animate={{
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            )}

            {/* Noise texture overlay for premium depth */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: noiseOpacity,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(hsl(266 64% 30%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(266 64% 30%) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Vignette effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, hsl(0 0% 100% / 0.3) 100%)',
                }}
            />
        </div>
    );
};

export default AnimatedGradientBackground;
