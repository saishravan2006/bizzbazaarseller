import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    tiltAmount?: number;
    glareEnabled?: boolean;
    scaleOnHover?: number;
    perspective?: number;
    transitionDuration?: number;
}

/**
 * Premium 3D tilt card with perspective, glare, and spring physics
 * Inspired by Apple's hover effects and premium portfolio sites
 */
export const TiltCard = ({
    children,
    className = '',
    tiltAmount = 15,
    glareEnabled = true,
    scaleOnHover = 1.02,
    perspective = 1000,
    transitionDuration = 0.4,
}: TiltCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Motion values for tilt
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    // Glare position
    const glareX = useMotionValue(50);
    const glareY = useMotionValue(50);

    // Spring physics for smooth movement
    const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);
    const springGlareX = useSpring(glareX, springConfig);
    const springGlareY = useSpring(glareY, springConfig);

    // Transform for glare gradient
    const glareBackground = useTransform(
        [springGlareX, springGlareY],
        ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate rotation based on mouse position relative to center
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Normalize and apply tilt
        const normalizedX = mouseY / (rect.height / 2);
        const normalizedY = -mouseX / (rect.width / 2);

        rotateX.set(normalizedX * tiltAmount);
        rotateY.set(normalizedY * tiltAmount);

        // Calculate glare position
        const percentX = ((e.clientX - rect.left) / rect.width) * 100;
        const percentY = ((e.clientY - rect.top) / rect.height) * 100;
        glareX.set(percentX);
        glareY.set(percentY);
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
        glareX.set(50);
        glareY.set(50);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            className={cn('relative cursor-pointer', className)}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: `${perspective}px`,
                transformStyle: 'preserve-3d',
            }}
        >
            <motion.div
                className="relative w-full h-full"
                style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    scale: isHovered ? scaleOnHover : 1,
                }}
                transition={{
                    scale: { duration: transitionDuration, ease: [0.23, 1, 0.32, 1] },
                }}
            >
                {/* Main content */}
                {children}

                {/* Glare overlay */}
                {glareEnabled && (
                    <motion.div
                        className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
                        style={{
                            background: glareBackground,
                            opacity: isHovered ? 0.7 : 0,
                        }}
                        transition={{ opacity: { duration: 0.3 } }}
                    />
                )}

                {/* Edge highlight */}
                <motion.div
                    className="absolute inset-0 rounded-[inherit] pointer-events-none"
                    style={{
                        boxShadow: isHovered
                            ? 'inset 0 1px 0 0 rgba(255,255,255,0.1), 0 20px 40px -10px rgba(0,0,0,0.15)'
                            : 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 4px 12px -2px rgba(0,0,0,0.08)',
                    }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </motion.div>
    );
};

/**
 * Premium glassmorphic card with animated border and glow
 */
interface GlassmorphicCardProps {
    children: React.ReactNode;
    className?: string;
    selected?: boolean;
    onClick?: () => void;
    hoverGlow?: boolean;
    borderGradient?: boolean;
}

export const GlassmorphicCard = ({
    children,
    className = '',
    selected = false,
    onClick,
    hoverGlow = true,
    borderGradient = true,
}: GlassmorphicCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <TiltCard
            className={className}
            tiltAmount={8}
            scaleOnHover={1.03}
        >
            <motion.div
                className={cn(
                    'relative rounded-2xl overflow-hidden transition-all duration-300',
                    'bg-white/70 dark:bg-gray-900/70',
                    'backdrop-blur-xl backdrop-saturate-150',
                    selected && 'ring-2 ring-primary ring-offset-2'
                )}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                animate={{
                    boxShadow: selected
                        ? '0 0 40px -5px hsl(266 64% 45% / 0.3)'
                        : isHovered
                            ? '0 20px 40px -10px rgba(0,0,0,0.12)'
                            : '0 4px 12px -2px rgba(0,0,0,0.08)',
                }}
            >
                {/* Animated gradient border */}
                {borderGradient && (
                    <motion.div
                        className="absolute inset-0 rounded-2xl p-[1px] -z-10"
                        style={{
                            background: 'linear-gradient(135deg, hsl(266 64% 55% / 0.3), hsl(175 70% 45% / 0.3), hsl(330 70% 60% / 0.3))',
                            backgroundSize: '200% 200%',
                        }}
                        animate={{
                            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
                        }}
                        transition={{
                            duration: 3,
                            repeat: isHovered ? Infinity : 0,
                            ease: 'linear',
                        }}
                    />
                )}

                {/* Glow effect on hover */}
                {hoverGlow && (
                    <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isHovered || selected ? 1 : 0,
                        }}
                        style={{
                            background: 'radial-gradient(circle at 50% 0%, hsl(266 64% 55% / 0.1) 0%, transparent 60%)',
                        }}
                    />
                )}

                {/* Content */}
                <div className="relative z-10">
                    {children}
                </div>

                {/* Selection checkmark animation */}
                {selected && (
                    <motion.div
                        className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                        <motion.svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <motion.path
                                d="M4 12l5 5L20 7"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                            />
                        </motion.svg>
                    </motion.div>
                )}
            </motion.div>
        </TiltCard>
    );
};

export default TiltCard;
