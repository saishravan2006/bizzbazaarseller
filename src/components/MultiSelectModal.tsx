import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { t } from '@/lib/i18n';
import { Lang } from '@/store/useStore';
import { backdropVariants, buttonVariants } from '@/lib/motion';

interface MultiSelectModalProps {
  isOpen: boolean;
  currentLabel: string;
  newLabel: string;
  lang: Lang;
  onAddMulti: () => void;
  onKeepSingle: () => void;
}

export const MultiSelectModal = ({ 
  isOpen, 
  currentLabel, 
  newLabel, 
  lang, 
  onAddMulti, 
  onKeepSingle 
}: MultiSelectModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Modal */}
            <motion.div
              className="bg-background rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-border/50"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <h3 className="font-title font-semibold text-xl text-foreground mb-4">
                  {t('multi_title', lang)}
                </h3>
                
                <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                  {t('multi_desc', lang, { current: currentLabel, new: newLabel })}
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    onClick={onAddMulti}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl shadow-lg shadow-primary/25"
                  >
                    {t('add_multi', lang)}
                  </Button>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    onClick={onKeepSingle}
                    variant="outline"
                    className="w-full h-12 font-medium rounded-xl border-2"
                  >
                    {t('keep_single', lang)}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};