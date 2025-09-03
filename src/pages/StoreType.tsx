import React, { useState, useEffect, useMemo, useCallback, useDeferredValue } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, X, AlertCircle, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TopBar } from '@/components/TopBar';
import { StickyMiniCard } from '@/components/StickyMiniCard';
import { StoreTypeCard } from '@/components/StoreTypeCard';
import { SectionHeader } from '@/components/SectionHeader';
import { OtherSheet } from '@/components/OtherSheet';
import { MultiSelectModal } from '@/components/MultiSelectModal';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { t } from '@/lib/i18n';
import { loadSections, type SectionsDoc, type UiItem } from '@/lib/loadSections';
import { matchesQuery } from '@/lib/search';
import { pageVariants, listVariants, listItemVariants, searchVariants } from '@/lib/motion';
import { Skeleton } from '@/components/ui/skeleton';
import LazyPromoCarousel from '@/components/LazyPromoCarousel';
// Added: carousel for horizontal flows and sheet for See All
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Sparkles } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
import { AnimatePresence } from 'framer-motion';

// Remove old interface - using SectionsDoc from loadSections

export const StoreType = () => {
  const { lang, selected, toggleType, resetToSingle, addCustomType, removeType } = useStore();
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
  // Added: See All sheet state and trending search helpers
  const [seeAllSection, setSeeAllSection] = useState<{ label: string; items: UiItem[] } | null>(null);
  const trendingSuggestions = ['Provisional Store', 'Supermarket', 'Stationary', 'Electronics', 'Snacks'];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  
  // Results grid ID for accessibility
  const resultsGridId = 'store-type-results-grid';

  const loadData = useCallback(async () => {
    setRetryLoading(true);
    try {
      const data = await loadSections();
      setSectionsData(data);
      // Check if we got stub data
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

  // Rotate placeholder to make search feel lively when empty
  useEffect(() => {
    if (searchTerm) return; // pause rotation while user types
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % trendingSuggestions.length);
    }, 2500);
    return () => clearInterval(id);
  }, [searchTerm]);

  // Memoized filter functions for performance
  const filterItems = useCallback((items: UiItem[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(item => matchesQuery(item, searchTerm));
  }, []);

  // Memoized filtered items computation using deferred search term
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

  // Stable callback handlers for performance
  const handleTypeSelect = useCallback((code: string, label: string) => {
    // Check if this is a second selection
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

  // Enable: See All
  const handleSeeAll = useCallback((section: { section_label_en: string; items: UiItem[] }) => {
    setSeeAllSection({ label: section.section_label_en, items: section.items });
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

  // Handle deselection from sticky card chips
  const handleDeselect = useCallback((index: number) => {
    if (index < selected.codes.length) {
      removeType(selected.codes[index]);
    }
  }, [selected.codes, removeType]);

  // Handle retry loading
  const handleRetry = useCallback(() => {
    setIsStubData(false);
    loadData();
  }, [loadData]);

  if (isLoading || !sectionsData) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar title={t('select_store_type', lang)} />
        <div className="px-4 sm:px-6 py-4 sm:py-5">
          {/* Search skeleton */}
          <div className="relative mb-6">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
          {/* Grid skeleton */}
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="p-4 rounded-2xl border border-input bg-card">
                <div className="flex flex-col items-center text-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-xl" />
                  <Skeleton className="h-3 w-24 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Create motion variants that respect reduced motion
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

        {/* Lazy Promo Carousel */}
        <div className="mb-5">
          <LazyPromoCarousel />
        </div>

        {/* Search */}
        <motion.div 
          className="relative mb-3"
          variants={shouldReduceMotion ? { initial: { opacity: 1 }, focus: { opacity: 1 } } : searchVariants}
          whileFocus="focus"
          initial="initial"
        >
          {/* Gradient wrapper to make the search feel special */}
          <div className="p-[2px] rounded-full bg-gradient-to-r from-primary/70 via-fuchsia-500/60 to-purple-600/60">
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
              {/* Sparkle accent on the right to attract attention */}
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
        {/* Trending quick search chips */}
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

        {/* Results */}
        <div className="pb-24">
          {deferredSearchTerm ? (
            // Search Results
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
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-base mb-2">No results found</p>
                  <p className="text-muted-foreground/70 text-sm">Try a different search term</p>
                </motion.div>
              )}
              
              {/* Always show Other option in search */}
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
            // Grouped Sections
            <motion.div
              key="grouped-sections"
              variants={adaptiveListVariants}
              initial="hidden"
              animate="visible"
            >
              {sectionsData.sections.map((section, sectionIndex) => (
                <motion.div
                  key={section.section_code}
                  variants={adaptiveItemVariants}
                  custom={sectionIndex}
                >
                  <SectionHeader
                    title={section.section_label_en}
                    rightLabel={"See All"}
                    onRightAction={() => handleSeeAll(section)}
                  >
                    {/* Horizontal motion flow */}
                    <Carousel opts={{ align: 'start', dragFree: true, loop: false }} className="w-full">
                      <CarouselContent>
                        {section.items.map((item, itemIndex) => (
                          <CarouselItem key={item.code} className="basis-[45%] xs:basis-[42%] sm:basis-1/3 md:basis-1/4">
                            <motion.div
                              variants={adaptiveItemVariants}
                              custom={itemIndex}
                              className="h-full"
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
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </SectionHeader>
                </motion.div>
              ))}
              
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

      {/* Accessibility: Live region for selection announcements */}
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

      {/* See All Sheet with Virtualization */}
      <Sheet open={!!seeAllSection} onOpenChange={(open) => { if (!open) setSeeAllSection(null); }}>
        <SheetContent side="bottom" className="rounded-t-2xl h-[95vh] flex flex-col">
          <SheetHeader className="flex-shrink-0">
            <SheetTitle>{seeAllSection?.label}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 mt-4 pb-6">
            {seeAllSection?.items && (
              <Virtuoso
                style={{ height: '100%' }}
                totalCount={Math.ceil(seeAllSection.items.length / 2)} // 2 columns
                itemContent={(index) => {
                  const startIndex = index * 2;
                  const rowItems = seeAllSection.items.slice(startIndex, startIndex + 2);
                  
                  return (
                    <div 
                      className="grid grid-cols-2 gap-3 px-1 mb-3"
                      style={{ height: '120px' }} // Fixed height for performance
                    >
                      {rowItems.map((item) => (
                        <div
                          key={item.code}
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
                      ))}
                    </div>
                  );
                }}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

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
