import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { stickyTrayVariants, buttonVariants } from '@/lib/motion';
import { FlipCounter } from '@/components/FlipCounter';

interface StickyMiniCardProps {
  selectedCount: number;
  selectedText: string;
  selectedLabels?: string[];
  onConfirm: () => void;
  onDeselect?: (index: number) => void;
  confirmText: string;
  confirmDisabled?: boolean;
}

export const StickyMiniCard = ({
  selectedCount,
  selectedText,
  selectedLabels = [],
  onConfirm,
  onDeselect,
  confirmText,
  confirmDisabled = false
}: StickyMiniCardProps) => {
  const showCard = selectedCount > 0;

  return (
    <AnimatePresence>
      {showCard && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-30"
          variants={stickyTrayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Gradient backdrop for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none" />

          <div className="relative bg-background/95 backdrop-blur-md border-t border-border/50 px-4 sm:px-6 py-4 sm:py-3 shadow-2xl safe-area-bottom">
            <motion.div
              className="flex items-center justify-between gap-3 sm:gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <motion.div
                  className="w-9 h-9 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <span className="text-primary font-semibold text-sm">
                    <FlipCounter value={selectedCount} />
                  </span>
                  {/* Subtle glow pulse */}
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-full"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Show chips for first 2 selections */}
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  {selectedLabels.slice(0, 2).map((label, index) => (
                    <motion.button
                      key={`${label}-${index}`}
                      onClick={() => onDeselect?.(index)}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full hover:bg-primary/20 transition-colors max-w-[80px] flex-shrink-0"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      aria-label={`Remove ${label}`}
                    >
                      <span className="truncate">{label}</span>
                      <span className="text-primary/70 hover:text-primary">×</span>
                    </motion.button>
                  ))}

                  {selectedCount > 2 && (
                    <span className="text-primary text-xs font-medium px-2 py-1 bg-primary/5 rounded-full flex-shrink-0">
                      +{selectedCount - 2}
                    </span>
                  )}

                  {selectedCount <= 2 && selectedCount > 0 && (
                    <span className="text-foreground/60 text-xs font-medium truncate">
                      {selectedText}
                    </span>
                  )}
                </div>
              </div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  onClick={onConfirm}
                  disabled={confirmDisabled}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 sm:px-8 py-3 h-12 rounded-2xl shadow-lg shadow-primary/25 transition-all disabled:opacity-50 disabled:shadow-none min-w-[120px] touch-manipulation min-h-[44px] sm:min-h-auto flex items-center justify-center"
                >
                  {confirmText}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};