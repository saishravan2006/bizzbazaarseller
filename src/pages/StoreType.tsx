import React, { useState, useEffect, useMemo, useCallback, useDeferredValue } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Search, X, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TopBar } from '@/components/TopBar';
import { StickyMiniCard } from '@/components/StickyMiniCard';
import { StoreTypeCard } from '@/components/StoreTypeCard';
import { OtherSheet } from '@/components/OtherSheet';
import { MultiSelectModal } from '@/components/MultiSelectModal';
import { CategoryHub } from '@/components/CategoryHub';
import { SubcategorySheet } from '@/components/SubcategorySheet';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { t } from '@/lib/i18n';
import { loadSections, type SectionsDoc, type UiItem, type UiSection } from '@/lib/loadSections';
import { matchesQuery } from '@/lib/search';
import { pageVariants, listVariants, listItemVariants, searchVariants } from '@/lib/motion';
import { Skeleton } from '@/components/ui/skeleton';
import LazyPromoCarousel from '@/components/LazyPromoCarousel';
import { masterCategories } from '@/lib/masterCategories';

// Category ID to Section Code mapping (based on sections_items_full.json)
// P01=Fresh Produce, P02=Grocery/Staples, P03=Dairy/Bakery/Eggs, P04=Meat/Seafood/Frozen
// P05=Beverages, P08=Personal Care, P09=Health/OTC, P10=Baby/Kids, P11=Pet, P12=Home Care
// NOTE: This mapping is no longer needed - we now use direct section codes from masterCategories

// Hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export const StoreType = () => {
  const { lang, selected, toggleType, resetToSingle, addCustomType, removeType, removeMultiple } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [sectionsData, setSectionsData] = useState<SectionsDoc | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOtherSheet, setShowOtherSheet] = useState(false);
  const [multiSelectModal, setMultiSelectModal] = useState<{
    isOpen: boolean;
    currentLabel: string;
    newLabel: string;
    newCode: string;
  }>({
    isOpen: false,
    currentLabel: '',
    newLabel: '',
    newCode: ''
  });
  const [isStubData, setIsStubData] = useState(false);
  const [retryLoading, setRetryLoading] = useState(false);

  // Subcategory sheet state
  const [selectedSection, setSelectedSection] = useState<UiSection | null>(null);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState<string>('');
  const [selectedCategoryImage, setSelectedCategoryImage] = useState<string>('');
  const [isSubcategorySheetOpen, setIsSubcategorySheetOpen] = useState(false);

  // Updated trending suggestions to match new categories
  const trendingSuggestions = ['Fresh Produce', 'Grocery', 'Dairy', 'Electronics', 'Fashion'];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();



  const resultsGridId = 'store-type-results-grid';

  const loadData = useCallback(async () => {
    setRetryLoading(true);
    try {
      const data = await loadSections();
      setSectionsData(data);
      setIsStubData(data.sections.length === 1 && data.sections[0].section_code === 'STUB');
    } catch (error) {
      console.error('Error loading sections:', error);
      setIsStubData(true);
    } finally {
      setIsLoading(false);
      setRetryLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Rotate placeholder
  useEffect(() => {
    if (searchTerm) return;
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % trendingSuggestions.length);
    }, 2500);
    return () => clearInterval(id);
  }, [searchTerm]);

  // Memoized filter
  const filterItems = useCallback((items: UiItem[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(item => matchesQuery(item, searchTerm));
  }, []);

  // Search results - flatten all items when searching
  const filteredItems = useMemo(() => {
    if (!sectionsData || !deferredSearchTerm) return [];
    return sectionsData.sections.flatMap(section =>
      filterItems(section.items, deferredSearchTerm).map(item => ({
        ...item,
        section: section.section_label_en
      }))
    );
  }, [sectionsData, deferredSearchTerm, filterItems]);

  const hasResults = filteredItems.length > 0;

  // Handle type selection with multi-select modal
  const handleTypeSelect = useCallback((code: string, label: string) => {
    if (selected.codes.length === 1 && !selected.codes.includes(code)) {
      setMultiSelectModal({
        isOpen: true,
        currentLabel: selected.labels[0],
        newLabel: label,
        newCode: code
      });
    } else {
      toggleType(code, label);
    }
  }, [selected.codes, selected.labels, toggleType]);

  const handleMultiAdd = useCallback(() => {
    toggleType(multiSelectModal.newCode, multiSelectModal.newLabel);
    setMultiSelectModal({ ...multiSelectModal, isOpen: false });
  }, [multiSelectModal, toggleType]);

  const handleKeepSingle = useCallback(() => {
    resetToSingle(multiSelectModal.newCode, multiSelectModal.newLabel);
    setMultiSelectModal({ ...multiSelectModal, isOpen: false });
  }, [multiSelectModal, resetToSingle]);

  // Handle category card click - find section and open subcategory sheet
  // Now uses direct section codes (P01, P02, etc.) instead of category IDs
  const handleCategoryClick = useCallback((sectionCode: string, categoryLabel: string) => {
    if (!sectionsData) return;

    const section = sectionsData.sections.find(s => s.section_code === sectionCode);

    if (section) {
      setSelectedSection(section);
      setSelectedCategoryLabel(categoryLabel);
      setSelectedCategoryImage(''); // No images anymore
      setIsSubcategorySheetOpen(true);
    } else {
      // Fallback: if no section found, toggle the category directly
      const fallbackCode = `${sectionCode}.FULL`;
      toggleType(fallbackCode, categoryLabel);
    }
  }, [sectionsData, toggleType]);

  // Handle subcategory sheet close
  const handleSubcategorySheetClose = useCallback(() => {
    setIsSubcategorySheetOpen(false);
    // Delay clearing section to allow exit animation
    setTimeout(() => {
      setSelectedSection(null);
      setSelectedCategoryLabel('');
      setSelectedCategoryImage('');
    }, 300);
  }, []);

  const handleOtherSelect = useCallback(() => {
    setShowOtherSheet(true);
  }, []);

  const handleCustomCreate = useCallback((label: string) => {
    addCustomType(label);
  }, [addCustomType]);

  const handleContinue = useCallback(() => {
    navigate('/confirm');
  }, [navigate]);

  const handleDeselect = useCallback((index: number) => {
    if (index < selected.codes.length) {
      removeType(selected.codes[index]);
    }
  }, [selected.codes, removeType]);

  const handleRetry = useCallback(() => {
    setIsStubData(false);
    loadData();
  }, [loadData]);

  if (isLoading || !sectionsData) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar title={t('select_store_type', lang)} />
        <div className="px-4 sm:px-6 py-4 sm:py-5">
          <div className="relative mb-6">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="p-4 sm:p-5 rounded-2xl border border-input bg-card">
                <div className="flex flex-col gap-3">
                  <Skeleton className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const adaptivePageVariants = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : pageVariants;

  const adaptiveListVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : listVariants;

  const adaptiveItemVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : listItemVariants;

  return (
    <motion.div
      className="min-h-screen bg-background"
      variants={adaptivePageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <TopBar title={t('select_store_type', lang)} />

      <div className="px-4 py-4">
        {/* Error/Offline Banner */}
        <AnimatePresence>
          {isStubData && (
            <motion.div
              className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div className="flex-1 text-sm text-yellow-800">
                Limited list shown; tap to retry
              </div>
              <button
                onClick={handleRetry}
                disabled={retryLoading}
                className="flex items-center gap-1 px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs rounded-md transition-colors disabled:opacity-50"
                aria-label="Retry loading store types"
              >
                <RefreshCw className={`w-3 h-3 ${retryLoading ? 'animate-spin' : ''}`} />
                Retry
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Promo Carousel */}
        <div className="mb-5">
          <LazyPromoCarousel />
        </div>

        {/* Sticky Search with Glassmorphism */}
        <motion.div
          className="sticky top-0 z-30 pt-2 pb-2 -mx-4 px-4 bg-background/80 backdrop-blur-md border-b border-border/40 mb-4"
          variants={shouldReduceMotion ? { initial: { opacity: 1 }, focus: { opacity: 1 } } : searchVariants}
          whileFocus="focus"
          initial="initial"
        >
          <div className="p-[2px] rounded-full bg-gradient-to-r from-primary/70 via-fuchsia-500/60 to-purple-600/60 shadow-sm">
            <div className="relative rounded-full bg-secondary shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_16px_-8px_rgba(0,0,0,0.12)]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 transition-colors" />
              <Input
                type="text"
                role="searchbox"
                placeholder={searchTerm ? 'Search store type' : `Try \"${trendingSuggestions[placeholderIndex]}\"`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-12 h-12 sm:h-11 text-base sm:text-sm rounded-full bg-transparent border-0 focus-visible:ring-0 touch-manipulation"
                aria-label="Search store type"
                aria-autocomplete="list"
                aria-controls={deferredSearchTerm ? resultsGridId : undefined}
                aria-expanded={deferredSearchTerm ? hasResults : undefined}
              />
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary/70">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              {searchTerm && (
                <motion.button
                  className="absolute right-2.5 top-1/2 transform -translate-y-1/2 p-2 hover:bg-muted rounded-full transition-colors"
                  onClick={() => setSearchTerm('')}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Search Chips */}
        <motion.div
          className="mb-6 overflow-x-auto scrollbar-hide"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex gap-2 sm:gap-3 pb-2">
            {trendingSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => setSearchTerm(s)}
                className="flex-shrink-0 px-4 py-2.5 sm:px-3 sm:py-1.5 rounded-full bg-muted text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors touch-manipulation min-h-[44px] sm:min-h-auto flex items-center justify-center font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="pb-24">
          {deferredSearchTerm ? (
            // Search Results - shows flattened items from all categories
            <motion.div
              key="search-results"
              variants={adaptiveListVariants}
              initial="hidden"
              animate="visible"
            >
              {hasResults ? (
                <motion.div
                  id={resultsGridId}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-6"
                  variants={adaptiveListVariants}
                  initial="hidden"
                  animate="visible"
                  role="grid"
                  aria-label="Search results for store types"
                >
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.code}
                      variants={adaptiveItemVariants}
                      custom={index}
                      role="gridcell"
                    >
                      <div
                        role="button"
                        aria-pressed={selected.codes.includes(item.code)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleTypeSelect(item.code, item.label_en);
                          }
                        }}
                      >
                        <StoreTypeCard
                          code={item.code}
                          label={item.label_en}
                          icon={item.icon}
                          selected={selected.codes.includes(item.code)}
                          onClick={() => handleTypeSelect(item.code, item.label_en)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 px-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
                    <div className="relative bg-card border-2 border-dashed border-border rounded-full w-full h-full flex items-center justify-center shadow-sm">
                      <Search className="w-10 h-10 text-muted-foreground/60" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No matches found</h3>
                  <p className="text-muted-foreground text-center max-w-xs mb-6">
                    We couldn't find any category matching "{searchTerm}".
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full text-sm font-medium transition-colors"
                  >
                    Clear Search
                  </button>
                </motion.div>
              )}

              {/* Other option in search */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <StoreTypeCard
                  code="OTHER"
                  label={t('other_label', lang)}
                  icon="plus"
                  selected={false}
                  onClick={handleOtherSelect}
                />
              </motion.div>
            </motion.div>
          ) : (
            // Category Hub - shows all 52 parent categories in a grid
            <motion.div
              key="category-hub"
              variants={adaptiveListVariants}
              initial="hidden"
              animate="visible"
            >
              <CategoryHub
                sections={sectionsData.sections}
                onCategoryClick={handleCategoryClick}
                selectedCodes={selected.codes}
              />

              {/* Other Card */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <StoreTypeCard
                  code="OTHER"
                  label={t('other_label', lang)}
                  icon="plus"
                  selected={false}
                  onClick={handleOtherSelect}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Accessibility: Live region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {selected.codes.length > 0 && `${selected.codes.length} selected`}
      </div>

      {/* Sticky Mini Card */}
      <StickyMiniCard
        selectedCount={selected.codes.length}
        selectedText={t('selected_count', lang, { n: selected.codes.length.toString() })}
        selectedLabels={selected.labels}
        onConfirm={handleContinue}
        onDeselect={handleDeselect}
        confirmText={t('confirm', lang)}
      />

      {/* Other Sheet */}
      <OtherSheet
        isOpen={showOtherSheet}
        onClose={() => setShowOtherSheet(false)}
        onCreate={handleCustomCreate}
        lang={lang}
      />

      {/* Subcategory Sheet - Premium redesigned */}
      <SubcategorySheet
        section={selectedSection}
        categoryLabel={selectedCategoryLabel}
        categoryImage={selectedCategoryImage}
        isOpen={isSubcategorySheetOpen}
        onClose={handleSubcategorySheetClose}
        selectedCodes={selected.codes}
        onToggle={handleTypeSelect}
        onSelectAll={(code, label) => toggleType(code, label)}
        onDeselectAll={(codes) => removeMultiple(codes)}
      />



      {/* Multi Select Modal */}
      <MultiSelectModal
        isOpen={multiSelectModal.isOpen}
        currentLabel={multiSelectModal.currentLabel}
        newLabel={multiSelectModal.newLabel}
        lang={lang}
        onAddMulti={handleMultiAdd}
        onKeepSingle={handleKeepSingle}
      />
    </motion.div>
  );
};
