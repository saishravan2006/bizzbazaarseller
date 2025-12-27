import React, { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowLeft, CheckCheck } from 'lucide-react';
import { resolveLucideIcon } from '@/lib/resolveLucideIcon';
import type { UiSection, UiItem } from '@/lib/loadSections';

interface SubcategorySheetProps {
    section: UiSection | null;
    isOpen: boolean;
    onClose: () => void;
    selectedCodes: string[];
    onToggle: (code: string, label: string) => void;
    onSelectAll?: (sectionCode: string, label: string, itemCodes: string[]) => void;
    onDeselectAll?: (codes: string[]) => void;
}

const SubcategorySheet = React.memo(({
    section,
    isOpen,
    onClose,
    selectedCodes,
    onToggle,
    onSelectAll,
    onDeselectAll
}: SubcategorySheetProps) => {

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

    return (
        <AnimatePresence>
            {isOpen && section && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Sheet */}
                    <motion.div
                        className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    >
                        {/* Handle Bar */}
                        <div className="flex justify-center pt-3 pb-2">
                            <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 pb-4 border-b border-border">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={onClose}
                                    className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                                </button>
                                <div>
                                    <h2 className="text-lg font-bold text-foreground">{section.section_label_en}</h2>
                                    <p className="text-sm text-muted-foreground">
                                        {isAllSelected
                                            ? 'All selected'
                                            : selectedInSection > 0
                                                ? `${selectedInSection} selected`
                                                : `${section.items.length} subcategories`
                                        }
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-muted transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
                            <div className="grid gap-2">
                                {/* SELECT ALL Option */}
                                <motion.button
                                    onClick={handleSelectAll}
                                    className={`
                                        flex items-center gap-4 w-full p-4 rounded-xl border-2 text-left transition-all
                                        ${isAllSelected
                                            ? 'border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-lg'
                                            : 'border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60'
                                        }
                                        focus:outline-none focus:ring-2 focus:ring-primary/20
                                        active:scale-[0.99] touch-manipulation
                                    `}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    {/* Selection Checkbox */}
                                    <div className={`
                                        flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                                        ${isAllSelected
                                            ? 'border-primary bg-primary'
                                            : 'border-primary/50 bg-transparent'
                                        }
                                    `}>
                                        {isAllSelected && <CheckCheck className="w-4 h-4 text-primary-foreground" />}
                                    </div>

                                    {/* Icon */}
                                    <div className={`
                                        flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                                        ${isAllSelected ? 'bg-primary/20' : 'bg-primary/10'}
                                    `}>
                                        <CheckCheck className={`w-5 h-5 ${isAllSelected ? 'text-primary' : 'text-primary/70'}`} />
                                    </div>

                                    {/* Label */}
                                    <div className="flex-1">
                                        <span className={`font-semibold text-base ${isAllSelected ? 'text-primary' : 'text-primary/80'}`}>
                                            Select All
                                        </span>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {section.items.length} subcategories
                                        </p>
                                    </div>
                                </motion.button>

                                {/* Divider */}
                                <div className="flex items-center gap-3 py-2">
                                    <div className="flex-1 h-px bg-border" />
                                    <span className="text-xs text-muted-foreground">or select individually</span>
                                    <div className="flex-1 h-px bg-border" />
                                </div>

                                {/* Individual Items */}
                                {section.items.map((item, index) => {
                                    const IconComponent = resolveLucideIcon(item.icon);
                                    const isSelected = isItemSelected(item.code);

                                    return (
                                        <motion.button
                                            key={item.code}
                                            onClick={() => handleItemClick(item)}
                                            className={`
                                                flex items-center gap-4 w-full p-4 rounded-xl border-2 text-left transition-all
                                                ${isSelected
                                                    ? 'border-primary bg-primary/5 shadow-md'
                                                    : 'border-transparent bg-muted/30 hover:bg-muted/50 hover:border-border'
                                                }
                                                ${isAllSelected ? 'opacity-60' : ''}
                                                focus:outline-none focus:ring-2 focus:ring-primary/20
                                                active:scale-[0.99] touch-manipulation
                                            `}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (index + 1) * 0.02 }}
                                            whileTap={{ scale: 0.99 }}
                                            disabled={isAllSelected}
                                        >
                                            {/* Selection Checkbox */}
                                            <div className={`
                                                flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                                                ${isSelected
                                                    ? 'border-primary bg-primary'
                                                    : 'border-muted-foreground/30 bg-transparent'
                                                }
                                            `}>
                                                {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                                            </div>

                                            {/* Icon */}
                                            <div className={`
                                                flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                                                ${isSelected ? 'bg-primary/15' : 'bg-muted/50'}
                                            `}>
                                                <IconComponent className={`
                                                    w-5 h-5 transition-colors
                                                    ${isSelected ? 'text-primary' : 'text-muted-foreground'}
                                                `} />
                                            </div>

                                            {/* Label */}
                                            <span className={`
                                                flex-1 font-medium text-sm sm:text-base transition-colors
                                                ${isSelected ? 'text-primary' : 'text-foreground'}
                                            `}>
                                                {item.label_en}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer with Done button */}
                        <div className="p-4 border-t border-border bg-background/80 backdrop-blur-sm safe-area-bottom">
                            <button
                                onClick={onClose}
                                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base
                                    hover:bg-primary/90 active:scale-[0.99] transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                {isAllSelected
                                    ? 'Done (All selected)'
                                    : selectedInSection > 0
                                        ? `Done (${selectedInSection} selected)`
                                        : 'Done'
                                }
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
});

SubcategorySheet.displayName = 'SubcategorySheet';

export { SubcategorySheet };
