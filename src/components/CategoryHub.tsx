import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { blinkitCategories } from '@/lib/blinkitCategories';
import type { UiSection } from '@/lib/loadSections';
import { Check } from 'lucide-react';

// Category ID to Section Code mapping (must match StoreType.tsx)
const categoryToSectionMap: Record<string, string> = {
    'veg': 'P01',
    'atta': 'P02',
    'oil': 'P02',
    'dairy': 'P03',
    'bakery': 'P03',
    'munchies': 'P02',
    'tea': 'P05',
    'cold-drinks': 'P05',
    'instant': 'P02',
    'sweet': 'P02',
    'choc': 'P02',
    'sauces': 'P02',
    'bath': 'P08',
    'hair': 'P08',
    'skin': 'P08',
    'oral': 'P08',
    'fem': 'P08',
    'shave': 'P08',
    'deo': 'P08',
    'makeup': 'P08',
    'laundry': 'P12',
    'dish': 'P12',
    'clean': 'P12',
    'repel': 'P12',
    'pooja': 'P47',
    'shoe': 'P12',
    'diaper': 'P10',
    'baby-food': 'P10',
    'baby-skin': 'P10',
    'pharm': 'P09',
    'supp': 'P09',
    'sex': 'P09',
    'meat': 'P04',
    'eggs': 'P03',
    'biscuit': 'P02',
    'noodle': 'P02',
    'cereal': 'P02',
    'frozen': 'P04',
    'icecream': 'P04',
    'dry': 'P02',
    'organic': 'P02',
    'batteries': 'P28',
    'bulb': 'P28',
    'stationery': 'P17',
    'pet': 'P11',
    'spices': 'P02',
    'paneer': 'P03',
    'water': 'P05',
    'pickle': 'P02',
    'syrup': 'P05',
    'energy': 'P05',
};

interface CategoryHubProps {
    sections?: UiSection[];
    onCategoryClick?: (categoryId: string, categoryLabel: string) => void;
    selectedCodes?: string[];
}

const CategoryHub = React.memo(({ sections, onCategoryClick, selectedCodes = [] }: CategoryHubProps) => {

    // Compute selection counts for each category
    const selectionCounts = useMemo(() => {
        const counts: Record<string, number> = {};

        blinkitCategories.forEach(category => {
            const sectionCode = categoryToSectionMap[category.id];
            if (!sectionCode) {
                counts[category.id] = 0;
                return;
            }

            // Check if .ALL is selected for this section
            const allCode = `${sectionCode}.ALL`;
            if (selectedCodes.includes(allCode)) {
                // Find section to get item count
                const section = sections?.find(s => s.section_code === sectionCode);
                counts[category.id] = section ? section.items.length : 999; // Show all
                return;
            }

            // Count individual selections
            const count = selectedCodes.filter(code => code.startsWith(`${sectionCode}.`)).length;
            counts[category.id] = count;
        });

        return counts;
    }, [selectedCodes, sections]);

    return (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-x-2 gap-y-6 px-2 sm:px-4 py-4">
            {blinkitCategories.map((category, index) => {
                const selectedCount = selectionCounts[category.id] || 0;
                const hasSelections = selectedCount > 0;
                const isAllSelected = selectedCodes.includes(`${categoryToSectionMap[category.id]}.ALL`);

                return (
                    <motion.button
                        key={category.id}
                        onClick={() => onCategoryClick?.(category.id, category.label)}
                        className={`
                            flex flex-col items-center gap-2 group focus:outline-none w-full relative
                            ${hasSelections ? 'scale-[1.02]' : ''}
                        `}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.01, duration: 0.3 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Selection Badge */}
                        {hasSelections && (
                            <motion.div
                                initial={{ scale: 0, y: 5 }}
                                animate={{ scale: 1, y: 0 }}
                                className={`
                                    absolute -top-1.5 -right-1.5 z-10 
                                    min-w-[22px] h-[22px] px-1 
                                    flex items-center justify-center gap-0.5
                                    rounded-full shadow-lg
                                    ${isAllSelected
                                        ? 'bg-gradient-to-r from-primary to-purple-500'
                                        : 'bg-primary'
                                    }
                                    text-primary-foreground text-[10px] font-bold
                                    ring-2 ring-background
                                `}
                            >
                                {isAllSelected ? (
                                    <Check className="w-3 h-3" />
                                ) : (
                                    selectedCount
                                )}
                            </motion.div>
                        )}

                        {/* Image Container - Blinkit Style */}
                        <div className={`
                            relative w-full aspect-square rounded-[16px] overflow-hidden 
                            transition-all duration-300
                            ${hasSelections
                                ? 'bg-primary/10 ring-2 ring-primary shadow-lg shadow-primary/20'
                                : 'bg-[#F0F6FF] group-hover:shadow-md'
                            }
                        `}>
                            <img
                                src={category.image}
                                alt={category.label}
                                className={`
                                    w-full h-full object-cover object-center 
                                    scale-[1.6] group-hover:scale-[1.65] 
                                    transition-transform duration-300 ease-out
                                    ${hasSelections ? 'brightness-105' : ''}
                                `}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                                    (e.target as HTMLImageElement).style.opacity = '0.3';
                                }}
                            />

                            {/* Selected overlay glow */}
                            {hasSelections && (
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
                            )}
                        </div>

                        {/* Title */}
                        <div className="h-10 flex items-start justify-center overflow-hidden px-0.5 w-full">
                            <span className={`
                                text-[11px] sm:text-[12px] leading-[1.15] text-center font-semibold w-full break-words
                                transition-colors duration-200
                                ${hasSelections ? 'text-primary' : 'text-[#1c1c1c]'}
                            `}>
                                {category.label}
                            </span>
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
});

CategoryHub.displayName = 'CategoryHub';

export { CategoryHub };
