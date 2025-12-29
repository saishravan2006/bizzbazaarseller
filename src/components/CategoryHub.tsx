import React, { useMemo, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { masterCategories } from '@/lib/masterCategories';
import { categoryImages } from '@/lib/categoryImages';
import type { UiSection } from '@/lib/loadSections';
import { Check, Sparkles } from 'lucide-react';

interface CategoryHubProps {
    sections?: UiSection[];
    onCategoryClick?: (categoryCode: string, categoryLabel: string) => void;
    selectedCodes?: string[];
}

// Gradient colors for categories - Blinkit-style vibrant colors
const categoryGradients: Record<string, string> = {
    'P01': 'from-green-400 to-emerald-500',
    'P02': 'from-amber-400 to-orange-500',
    'P03': 'from-yellow-300 to-amber-400',
    'P04': 'from-red-400 to-rose-500',
    'P05': 'from-cyan-400 to-blue-500',
    'P06': 'from-purple-400 to-violet-500',
    'P07': 'from-gray-400 to-gray-600',
    'P08': 'from-pink-400 to-rose-500',
    'P09': 'from-teal-400 to-cyan-500',
    'P10': 'from-sky-300 to-blue-400',
    'P11': 'from-orange-400 to-amber-500',
    'P12': 'from-blue-400 to-indigo-500',
    'P13': 'from-slate-400 to-gray-500',
    'P14': 'from-violet-400 to-purple-500',
    'P15': 'from-amber-500 to-yellow-600',
    'P16': 'from-pink-500 to-fuchsia-500',
    'P17': 'from-indigo-400 to-blue-500',
    'P18': 'from-emerald-400 to-teal-500',
    'P19': 'from-rose-400 to-pink-500',
    'P20': 'from-green-500 to-lime-500',
    'P21': 'from-fuchsia-400 to-purple-500',
    'P22': 'from-gray-500 to-slate-600',
    'P23': 'from-blue-500 to-indigo-600',
    'P24': 'from-slate-500 to-gray-600',
    'P25': 'from-cyan-500 to-teal-600',
    'P26': 'from-neutral-400 to-stone-500',
    'P27': 'from-yellow-400 to-amber-500',
    'P28': 'from-lime-400 to-green-500',
    'P29': 'from-orange-500 to-red-500',
    'P30': 'from-stone-400 to-neutral-500',
    'P31': 'from-indigo-400 to-violet-500',
    'P32': 'from-zinc-500 to-slate-600',
    'P33': 'from-amber-400 to-yellow-500',
    'P34': 'from-gray-600 to-zinc-700',
    'P35': 'from-red-500 to-orange-600',
    'P36': 'from-green-400 to-emerald-500',
    'P37': 'from-sky-400 to-blue-500',
    'P38': 'from-yellow-500 to-amber-600',
    'P39': 'from-blue-500 to-indigo-600',
    'P40': 'from-pink-500 to-rose-600',
    'P41': 'from-purple-400 to-fuchsia-500',
    'P42': 'from-neutral-500 to-stone-600',
    'P43': 'from-rose-400 to-pink-500',
    'P44': 'from-orange-500 to-yellow-500',
    'P45': 'from-amber-500 to-orange-600',
    'P46': 'from-teal-500 to-cyan-600',
    'P47': 'from-blue-400 to-indigo-500',
    'P48': 'from-green-500 to-emerald-600',
    'P49': 'from-violet-500 to-purple-600',
    'P50': 'from-cyan-400 to-sky-500',
    'P51': 'from-slate-400 to-gray-500',
    'P52': 'from-zinc-500 to-gray-600',
};

// ✨ Premium 3D Category Card Component with Mouse Tracking
const CategoryCard = React.memo(({
    category,
    index,
    selection,
    gradient,
    onCategoryClick
}: {
    category: { code: string; label: string; icon?: string };
    index: number;
    selection: { count: number; isAll: boolean };
    gradient: string;
    onCategoryClick?: (code: string, label: string) => void;
}) => {
    const hasSelections = selection.count > 0;
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    // 🎯 3D Tilt effect with mouse tracking
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 });
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    // Handle mouse move for 3D effect
    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((event.clientX - centerX) / rect.width);
        y.set((event.clientY - centerY) / rect.height);
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    }, [x, y]);

    // 🌊 Ripple effect on click
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const rippleX = event.clientX - rect.left;
        const rippleY = event.clientY - rect.top;
        const newRipple = { id: Date.now(), x: rippleX, y: rippleY };
        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
        onCategoryClick?.(category.code, category.label);
    }, [category.code, category.label, onCategoryClick]);

    // ✨ Staggered wave entry animation
    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.02 + Math.sin(index * 0.5) * 0.03, // Wave pattern
            }
        }
    };

    // 🎨 Shimmer loading animation
    const shimmerVariants = {
        animate: {
            backgroundPosition: ["200% 0", "-200% 0"],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    return (
        <motion.button
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            whileTap={{ scale: 0.92 }}
            className="flex flex-col items-center gap-2 group focus:outline-none w-full relative"
        >
            {/* ✨ Glow Effect Behind Card */}
            <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                style={{ transform: "translateZ(-20px)" }}
            />

            {/* 🏷️ Selection Badge with Breathing Animation */}
            {hasSelections && (
                <motion.div
                    initial={{ scale: 0, y: 5, rotate: -180 }}
                    animate={{
                        scale: 1,
                        y: 0,
                        rotate: 0,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`
                        absolute -top-1.5 -right-1.5 z-20 
                        min-w-[24px] h-[24px] px-1.5 
                        flex items-center justify-center gap-0.5
                        rounded-full shadow-lg
                        ${selection.isAll
                            ? 'bg-gradient-to-r from-primary via-purple-500 to-pink-500'
                            : 'bg-primary'
                        }
                        text-primary-foreground text-[10px] font-bold
                        ring-2 ring-background
                    `}
                    style={{ transform: "translateZ(30px)" }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {selection.isAll ? (
                            <Check className="w-3.5 h-3.5" />
                        ) : (
                            selection.count
                        )}
                    </motion.div>
                </motion.div>
            )}

            {/* 🖼️ Main Card Container with 3D Transform */}
            <motion.div
                className={`
                    relative w-full aspect-square rounded-2xl overflow-hidden 
                    transition-all duration-300 ease-out
                    bg-gradient-to-br ${gradient}
                    ${hasSelections
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl'
                        : ''
                    }
                `}
                style={{
                    transform: "translateZ(20px)",
                    boxShadow: isHovered
                        ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px -5px var(--primary)"
                        : "0 10px 40px -10px rgba(0, 0, 0, 0.15)"
                }}
                animate={{
                    y: isHovered ? -8 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {/* 🎬 Shimmer Loading Placeholder */}
                {!imageLoaded && categoryImages[category.code] && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        style={{ backgroundSize: "200% 100%" }}
                        variants={shimmerVariants}
                        animate="animate"
                    />
                )}

                {/* 🖼️ Product Image with Zoom Effect */}
                {categoryImages[category.code] ? (
                    <motion.img
                        src={categoryImages[category.code]}
                        alt={category.label}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                        animate={{
                            scale: isHovered ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                            className="text-3xl sm:text-4xl filter drop-shadow-md"
                            animate={{
                                scale: isHovered ? 1.2 : 1,
                                rotate: isHovered ? [0, -5, 5, 0] : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {category.icon}
                        </motion.span>
                    </div>
                )}

                {/* 🌈 Dynamic Gradient Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 rounded-2xl"
                    animate={{
                        opacity: isHovered ? 0.7 : 1,
                    }}
                />

                {/* ✨ Hover Shine Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0"
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? ["0%", "100%"] : "0%",
                    }}
                    transition={{ duration: 0.6 }}
                />

                {/* 🌊 Ripple Effects */}
                {ripples.map(ripple => (
                    <motion.span
                        key={ripple.id}
                        className="absolute rounded-full bg-white/40 pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            transform: "translate(-50%, -50%)",
                        }}
                        initial={{ width: 0, height: 0, opacity: 0.8 }}
                        animate={{ width: 200, height: 200, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                ))}

                {/* ✅ Selection Overlay with Sparkle */}
                {hasSelections && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]"
                    >
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-6 h-6 text-white/30" />
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>

            {/* 📝 Category Title with Hover Underline */}
            <div className="h-8 flex items-start justify-center overflow-hidden px-0.5 w-full relative">
                <motion.span
                    className={`
                        text-[10px] sm:text-[11px] leading-tight text-center font-medium w-full
                        line-clamp-2
                        ${hasSelections ? 'text-primary font-semibold' : 'text-foreground/80'}
                    `}
                    animate={{
                        y: isHovered ? -2 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {category.label}
                </motion.span>

                {/* Animated Underline */}
                <motion.div
                    className="absolute bottom-1 left-1/2 h-0.5 bg-primary rounded-full"
                    initial={{ width: 0, x: "-50%" }}
                    animate={{
                        width: isHovered ? "60%" : 0,
                        x: "-50%"
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />
            </div>
        </motion.button>
    );
});

CategoryCard.displayName = 'CategoryCard';

// 🏠 Main CategoryHub Component
const CategoryHub = React.memo(({ sections, onCategoryClick, selectedCodes = [] }: CategoryHubProps) => {

    // Compute selection counts for each category
    const selectionCounts = useMemo(() => {
        const counts: Record<string, { count: number; isAll: boolean }> = {};

        masterCategories.forEach(category => {
            const sectionCode = category.code;
            const allCode = `${sectionCode}.ALL`;

            if (selectedCodes.includes(allCode)) {
                const section = sections?.find(s => s.section_code === sectionCode);
                counts[sectionCode] = {
                    count: section ? section.items.length : 999,
                    isAll: true
                };
                return;
            }

            const count = selectedCodes.filter(code => code.startsWith(`${sectionCode}.`)).length;
            counts[sectionCode] = { count, isAll: false };
        });

        return counts;
    }, [selectedCodes, sections]);

    // 🎬 Container animation for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,
                delayChildren: 0.1,
            }
        }
    };

    return (
        <motion.div
            className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 px-3 sm:px-4 py-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ perspective: 1000 }}
        >
            {masterCategories.map((category, index) => {
                const selection = selectionCounts[category.code] || { count: 0, isAll: false };
                const gradient = categoryGradients[category.code] || 'from-gray-400 to-gray-500';

                return (
                    <CategoryCard
                        key={category.code}
                        category={category}
                        index={index}
                        selection={selection}
                        gradient={gradient}
                        onCategoryClick={onCategoryClick}
                    />
                );
            })}
        </motion.div>
    );
});

CategoryHub.displayName = 'CategoryHub';

export { CategoryHub };
