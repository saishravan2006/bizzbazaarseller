import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { masterCategories } from '@/lib/masterCategories';
import type { UiSection } from '@/lib/loadSections';
import { Check } from 'lucide-react';

interface CategoryHubProps {
    sections?: UiSection[];
    onCategoryClick?: (categoryCode: string, categoryLabel: string) => void;
    selectedCodes?: string[];
}

const CategoryHub = React.memo(({ sections, onCategoryClick, selectedCodes = [] }: CategoryHubProps) => {

    // Compute selection counts for each category
    const selectionCounts = useMemo(() => {
        const counts: Record<string, { count: number; isAll: boolean }> = {};

        masterCategories.forEach(category => {
            const sectionCode = category.code;

            // Check if .ALL is selected for this section
            const allCode = `${sectionCode}.ALL`;
            if (selectedCodes.includes(allCode)) {
                const section = sections?.find(s => s.section_code === sectionCode);
                counts[sectionCode] = {
                    count: section ? section.items.length : 999,
                    isAll: true
                };
                return;
            }

            // Count individual selections
            const count = selectedCodes.filter(code => code.startsWith(`${sectionCode}.`)).length;
            counts[sectionCode] = { count, isAll: false };
        });

        return counts;
    }, [selectedCodes, sections]);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 px-3 sm:px-4 py-4">
            {masterCategories.map((category, index) => {
                const selection = selectionCounts[category.code] || { count: 0, isAll: false };
                const hasSelections = selection.count > 0;

                return (
                    <motion.button
                        key={category.code}
                        onClick={() => onCategoryClick?.(category.code, category.label)}
                        className={`
                            relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl
                            min-h-[100px] text-center
                            transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                            ${hasSelections
                                ? 'bg-primary/10 border-2 border-primary shadow-lg shadow-primary/20'
                                : 'bg-card border border-border hover:border-primary/50 hover:shadow-md'
                            }
                        `}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02, duration: 0.3 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {/* Selection Badge */}
                        {hasSelections && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`
                                    absolute -top-2 -right-2 z-10 
                                    min-w-[24px] h-[24px] px-1.5 
                                    flex items-center justify-center
                                    rounded-full shadow-lg
                                    ${selection.isAll
                                        ? 'bg-gradient-to-r from-primary to-purple-500'
                                        : 'bg-primary'
                                    }
                                    text-primary-foreground text-xs font-bold
                                    ring-2 ring-background
                                `}
                            >
                                {selection.isAll ? (
                                    <Check className="w-3.5 h-3.5" />
                                ) : (
                                    selection.count
                                )}
                            </motion.div>
                        )}

                        {/* Emoji Icon */}
                        <span className="text-3xl">{category.icon}</span>

                        {/* Category Label */}
                        <span className={`
                            text-xs sm:text-sm font-medium leading-tight
                            transition-colors duration-200
                            ${hasSelections ? 'text-primary' : 'text-foreground'}
                        `}>
                            {category.label}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
});

CategoryHub.displayName = 'CategoryHub';

export { CategoryHub };
