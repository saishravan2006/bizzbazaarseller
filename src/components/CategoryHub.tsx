import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { resolveLucideIcon } from '@/lib/resolveLucideIcon';
import { ChevronRight } from 'lucide-react';
import type { UiSection } from '@/lib/loadSections';

interface CategoryHubProps {
    sections: UiSection[];
    selectedCodes: string[];
    onCategoryClick: (section: UiSection) => void;
}

const CategoryHub = React.memo(({ sections, selectedCodes, onCategoryClick }: CategoryHubProps) => {
    // Calculate selection count per section
    const selectionCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        sections.forEach(section => {
            const sectionItemCodes = section.items.map(item => item.code);
            counts[section.section_code] = selectedCodes.filter(code => sectionItemCodes.includes(code)).length;
        });
        return counts;
    }, [sections, selectedCodes]);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {sections.map((section, index) => {
                const IconComponent = resolveLucideIcon(section.icon);
                const count = selectionCounts[section.section_code] || 0;
                const hasSelection = count > 0;

                return (
                    <motion.button
                        key={section.section_code}
                        onClick={() => onCategoryClick(section)}
                        className={`
              relative group p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200
              ${hasSelection
                                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                                : 'border-border bg-card hover:border-primary/30 hover:bg-primary/3'
                            }
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
              active:scale-[0.98] touch-manipulation
            `}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02, duration: 0.3 }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Selection Badge */}
                        {hasSelection && (
                            <motion.div
                                className="absolute -top-2 -right-2 min-w-[24px] h-6 px-2 bg-primary rounded-full flex items-center justify-center shadow-lg"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                                <span className="text-xs font-bold text-primary-foreground">{count}</span>
                            </motion.div>
                        )}

                        {/* Icon Container */}
                        <div className={`
              w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 transition-colors
              ${hasSelection
                                ? 'bg-primary/15'
                                : 'bg-muted/50 group-hover:bg-primary/10'
                            }
            `}>
                            <IconComponent className={`
                w-6 h-6 sm:w-7 sm:h-7 transition-colors
                ${hasSelection
                                    ? 'text-primary'
                                    : 'text-muted-foreground group-hover:text-primary/80'
                                }
              `} />
                        </div>

                        {/* Title */}
                        <h3 className={`
              text-sm sm:text-base font-semibold leading-tight mb-1 transition-colors line-clamp-2
              ${hasSelection ? 'text-primary' : 'text-foreground group-hover:text-primary/90'}
            `}>
                            {section.section_label_en}
                        </h3>

                        {/* Subcategory count hint */}
                        <p className="text-xs text-muted-foreground">
                            {section.items.length} subcategories
                        </p>

                        {/* Chevron indicator */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
});

CategoryHub.displayName = 'CategoryHub';

export { CategoryHub };
