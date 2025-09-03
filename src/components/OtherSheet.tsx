import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { t } from '@/lib/i18n';
import { Lang } from '@/store/useStore';
import { sheetVariants, backdropVariants, buttonVariants } from '@/lib/motion';

interface OtherSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (label: string) => void;
  lang: Lang;
}

export const OtherSheet = ({ isOpen, onClose, onCreate, lang }: OtherSheetProps) => {
  const [customType, setCustomType] = useState('');

  const handleCreate = () => {
    if (customType.trim()) {
      onCreate(customType.trim());
      setCustomType('');
      onClose();
    }
  };

  const handleClose = () => {
    setCustomType('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
          />
          
          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl z-50 shadow-2xl border-t border-border/50"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-6 pb-8">
              {/* Handle */}
              <motion.div 
                className="w-12 h-1.5 bg-muted-foreground/20 rounded-full mx-auto mb-6"
                initial={{ opacity: 0, scaleX: 0.5 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              />
              
              {/* Header */}
              <motion.div 
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <h3 className="font-title font-semibold text-xl text-foreground">
                  {t('create_custom', lang)}
                </h3>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="p-2 -mr-2 hover:bg-muted/50 rounded-xl"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Input */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Store Type Name
                  </label>
                  <Input
                    placeholder={t('custom_type_placeholder', lang)}
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value)}
                    className="text-base h-12 rounded-xl border-2 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && customType.trim()) {
                        handleCreate();
                      }
                    }}
                  />
                </div>
                
                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <motion.div
                    className="flex-1"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="outline"
                      onClick={handleClose}
                      className="w-full h-12 rounded-xl border-2 font-medium"
                    >
                      {t('cancel', lang)}
                    </Button>
                  </motion.div>
                  <motion.div
                    className="flex-1"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      onClick={handleCreate}
                      disabled={!customType.trim()}
                      className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/25 disabled:opacity-50 disabled:shadow-none"
                    >
                      {t('create', lang)}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};