import React, { useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowLeft, CheckCheck, Sparkles, Search, ChevronRight } from 'lucide-react';
import { resolveLucideIcon } from '@/lib/resolveLucideIcon';
import type { UiSection, UiItem } from '@/lib/loadSections';

interface SubcategorySheetProps {
    section: UiSection | null;
    categoryLabel?: string;
    categoryImage?: string;
    isOpen: boolean;
    onClose: () => void;
    selectedCodes: string[];
    onToggle: (code: string, label: string) => void;
    onSelectAll?: (sectionCode: string, label: string, itemCodes: string[]) => void;
    onDeselectAll?: (codes: string[]) => void;
}

const SubcategorySheet = React.memo(({
    section,
    categoryLabel,
    categoryImage,
    isOpen,
    onClose,
    selectedCodes,
    onToggle,
    onSelectAll,
    onDeselectAll
}: SubcategorySheetProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Generate the ALL code for this section (e.g., "P02.ALL")
    const allCode = section ? `${section.section_code}.ALL` : '';

    // Check if "ALL" is selected for this section
    const isAllSelected = selectedCodes.includes(allCode);

    // Get individual items selected (not including ALL)
    const selectedItemCodes = useMemo(() => {
        if (!section) return [];
        return section.items.filter(item => selectedCodes.includes(item.code)).map(item => item.code);
    }, [section, selectedCodes]);

    const selectedInSection = isAllSelected ? section?.items.length || 0 : selectedItemCodes.length;

    // Filter items based on search
    const filteredItems = useMemo(() => {
        if (!section) return [];
        if (!searchQuery.trim()) return section.items;
        const query = searchQuery.toLowerCase();
        return section.items.filter(item =>
            item.label_en.toLowerCase().includes(query)
        );
    }, [section, searchQuery]);

    const handleItemClick = useCallback((item: UiItem) => {
        // If ALL is currently selected and user clicks an individual item, 
        // we need to deselect ALL first and select all except the clicked one
        if (isAllSelected && onDeselectAll && section) {
            onDeselectAll([allCode]);
            // Select all items except the one clicked
            section.items.forEach(i => {
                if (i.code !== item.code) {
                    onToggle(i.code, i.label_en);
                }
            });
        } else {
            onToggle(item.code, item.label_en);
        }
    }, [onToggle, isAllSelected, allCode, onDeselectAll, section]);

    const handleSelectAll = useCallback(() => {
        if (!section) return;

        if (isAllSelected) {
            // Deselect ALL
            if (onDeselectAll) {
                onDeselectAll([allCode]);
            }
        } else {
            // If individual items are selected, first deselect them
            if (selectedItemCodes.length > 0 && onDeselectAll) {
                onDeselectAll(selectedItemCodes);
            }
            // Select ALL using the special .ALL code
            if (onSelectAll) {
                onSelectAll(allCode, `${section.section_label_en} (All)`, section.items.map(i => i.code));
            } else {
                // Fallback: just toggle the ALL code
                onToggle(allCode, `${section.section_label_en} (All)`);
            }
        }
    }, [section, isAllSelected, allCode, onSelectAll, onDeselectAll, selectedItemCodes, onToggle]);

    // Determine if an item is selected (either individually or via ALL)
    const isItemSelected = useCallback((itemCode: string) => {
        return isAllSelected || selectedCodes.includes(itemCode);
    }, [isAllSelected, selectedCodes]);

    const displayLabel = categoryLabel || section?.section_label_en || 'Select Subcategories';
    const displayImage = categoryImage;

    return (
        <AnimatePresence>
            {isOpen && section && (
                <>
                    {/* Premium Backdrop with blur */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Sheet Container */}
                    <motion.div
                        className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] flex flex-col"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    >
                        {/* Glassmorphic Sheet */}
                        <div className="bg-gradient-to-b from-background via-background to-background/95 rounded-t-[28px] shadow-2xl flex flex-col overflow-hidden border-t border-x border-border/30">

                            {/* Handle Bar */}
                            <div className="flex justify-center pt-3 pb-2">
                                <div className="w-10 h-1 bg-muted-foreground/20 rounded-full" />
                            </div>

                            {/* Premium Header */}
                            <div className="px-5 pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {/* Back Button */}
                                        <motion.button
                                            onClick={onClose}
                                            className="p-2 -ml-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <ArrowLeft className="w-5 h-5 text-foreground" />
                                        </motion.button>

                                        {/* Category Image & Title */}
                                        <div className="flex items-center gap-3">
                                            {displayImage && (
                                                <motion.div
                                                    className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    <img
                                                        src={displayImage}
                                                        alt={displayLabel}
                                                        className="w-full h-full object-cover scale-[1.4]"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                        }}
                                                    />
                                                    {/* Shine effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none" />
                                                </motion.div>
                                            )}
                                            <div>
                                                <h2 className="text-xl font-bold text-foreground leading-tight">
                                                    {displayLabel}
                                                </h2>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {isAllSelected ? (
                                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                                            <CheckCheck className="w-3 h-3" />
                                                            All selected
                                                        </span>
                                                    ) : selectedInSection > 0 ? (
                                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                                            <Sparkles className="w-3 h-3" />
                                                            {selectedInSection} selected
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">
                                                            {section.items.length} subcategories
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Close Button */}
                                    <motion.button
                                        onClick={onClose}
                                        className="p-2 rounded-xl hover:bg-muted transition-colors"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <X className="w-5 h-5 text-muted-foreground" />
                                    </motion.button>
                                </div>

                                {/* Search Bar */}
                                {section.items.length > 5 && (
                                    <motion.div
                                        className="mt-4 relative"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                    >
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            placeholder="Search subcategories..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted"
                                            >
                                                <X className="w-3.5 h-3.5 text-muted-foreground" />
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </div>

                            {/* Divider with gradient */}
                            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3">

                                {/* SELECT ALL - Premium Card */}
                                <motion.button
                                    onClick={handleSelectAll}
                                    className={`
                                        relative w-full p-4 rounded-2xl border-2 text-left transition-all overflow-hidden
                                        ${isAllSelected
                                            ? 'border-primary bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 shadow-lg shadow-primary/10'
                                            : 'border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/50 hover:from-primary/10'
                                        }
                                        focus:outline-none active:scale-[0.99] touch-manipulation
                                    `}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    {/* Background Pattern */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
                                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary rounded-full blur-2xl" />
                                    </div>

                                    <div className="relative flex items-center gap-4">
                                        {/* Checkbox with animation */}
                                        <motion.div
                                            className={`
                                                flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all
                                                ${isAllSelected
                                                    ? 'border-primary bg-primary shadow-lg shadow-primary/30'
                                                    : 'border-primary/40 bg-primary/5'
                                                }
                                            `}
                                            animate={isAllSelected ? { scale: [1, 1.1, 1] } : {}}
                                        >
                                            <AnimatePresence>
                                                {isAllSelected && (
                                                    <motion.div
                                                        initial={{ scale: 0, rotate: -45 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        exit={{ scale: 0 }}
                                                    >
                                                        <CheckCheck className="w-4 h-4 text-primary-foreground" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        {/* Icon */}
                                        <div className={`
                                            flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                                            ${isAllSelected ? 'bg-primary/20' : 'bg-primary/10'}
                                        `}>
                                            <CheckCheck className={`w-6 h-6 ${isAllSelected ? 'text-primary' : 'text-primary/60'}`} />
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1">
                                            <span className={`font-bold text-lg ${isAllSelected ? 'text-primary' : 'text-primary/80'}`}>
                                                Select All
                                            </span>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                Include all {section.items.length} subcategories
                                            </p>
                                        </div>

                                        <ChevronRight className={`w-5 h-5 ${isAllSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                                    </div>
                                </motion.button>

                                {/* Divider */}
                                <div className="flex items-center gap-3 py-1">
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                                        or pick individually
                                    </span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                                </div>

                                {/* Individual Items - Staggered Grid */}
                                <div className="grid gap-2">
                                    {filteredItems.map((item, index) => {
                                        const IconComponent = resolveLucideIcon(item.icon);
                                        const isSelected = isItemSelected(item.code);
                                        // Clean up label
                                        const cleanLabel = item.label_en.replace(/\r/g, '').trim();

                                        return (
                                            <motion.button
                                                key={item.code}
                                                onClick={() => handleItemClick(item)}
                                                className={`
                                                    flex items-center gap-4 w-full p-4 rounded-xl border text-left transition-all
                                                    ${isSelected
                                                        ? 'border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-md'
                                                        : 'border-border/50 bg-card hover:bg-muted/50 hover:border-border'
                                                    }
                                                    ${isAllSelected ? 'opacity-50 pointer-events-none' : ''}
                                                    focus:outline-none active:scale-[0.99] touch-manipulation
                                                `}
                                                initial={{ opacity: 0, x: -15 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: Math.min(index * 0.03, 0.3) }}
                                                whileTap={{ scale: 0.99 }}
                                                disabled={isAllSelected}
                                            >
                                                {/* Checkbox */}
                                                <motion.div
                                                    className={`
                                                        flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                                                        ${isSelected
                                                            ? 'border-primary bg-primary shadow-sm shadow-primary/20'
                                                            : 'border-muted-foreground/20 bg-transparent'
                                                        }
                                                    `}
                                                >
                                                    <AnimatePresence>
                                                        {isSelected && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                exit={{ scale: 0 }}
                                                            >
                                                                <Check className="w-3.5 h-3.5 text-primary-foreground" />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>

                                                {/* Icon */}
                                                <div className={`
                                                    flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                                                    ${isSelected ? 'bg-primary/15' : 'bg-muted'}
                                                `}>
                                                    <IconComponent className={`
                                                        w-5 h-5 transition-colors
                                                        ${isSelected ? 'text-primary' : 'text-muted-foreground'}
                                                    `} />
                                                </div>

                                                {/* Label */}
                                                <span className={`
                                                    flex-1 font-medium text-sm transition-colors line-clamp-2
                                                    ${isSelected ? 'text-primary' : 'text-foreground'}
                                                `}>
                                                    {cleanLabel}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* No Results */}
                                {filteredItems.length === 0 && searchQuery && (
                                    <motion.div
                                        className="flex flex-col items-center justify-center py-12 text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                            <Search className="w-7 h-7 text-muted-foreground" />
                                        </div>
                                        <p className="text-muted-foreground text-sm">No matching subcategories</p>
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="mt-2 text-primary text-sm font-medium hover:underline"
                                        >
                                            Clear search
                                        </button>
                                    </motion.div>
                                )}
                            </div>

                            {/* Premium Footer */}
                            <div className="p-4 border-t border-border/50 bg-gradient-to-t from-muted/30 to-transparent safe-area-bottom">
                                <motion.button
                                    onClick={onClose}
                                    className={`
                                        w-full py-4 rounded-2xl font-bold text-base transition-all
                                        ${selectedInSection > 0 || isAllSelected
                                            ? 'bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40'
                                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                        }
                                        focus:outline-none active:scale-[0.99]
                                    `}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {isAllSelected ? (
                                            <>
                                                <CheckCheck className="w-5 h-5" />
                                                Done — All {section.items.length} selected
                                            </>
                                        ) : selectedInSection > 0 ? (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                Done — {selectedInSection} selected
                                            </>
                                        ) : (
                                            'Done'
                                        )}
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
});

SubcategorySheet.displayName = 'SubcategorySheet';

export { SubcategorySheet };
