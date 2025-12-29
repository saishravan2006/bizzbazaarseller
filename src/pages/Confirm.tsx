import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Send, Edit3, MessageSquare, Store, ChevronRight } from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '@/lib/i18n';
import { encodePayloadV2Lite, openWhatsApp, copyToClipboard } from '@/lib/whatsapp';
import { useToast } from '@/hooks/use-toast';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/PageTransition';
import { PremiumButton, StickyFooter } from '@/components/PremiumButton';

export const Confirm = () => {
  const { storeId, lang, storeName, selected } = useStore();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const payload = encodePayloadV2Lite(
    storeId,
    lang,
    storeName,
    selected.codes,
    selected.labels
  );

  const handleSendToWhatsApp = () => {
    openWhatsApp(payload);
    navigate('/success');
  };

  const handleCopyMessage = async () => {
    const success = await copyToClipboard(payload);
    if (success) {
      setCopied(true);
      toast({
        title: t('copied_toast', lang),
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEditStoreType = () => {
    navigate('/store-type');
  };

  return (
    <PageTransition className="bg-background flex flex-col">
      <TopBar title={t('store_details', lang)} />

      <div className="flex-1 px-5 py-6 pb-44 overflow-y-auto">
        <StaggerContainer className="space-y-5">
          {/* Summary Card with Enhanced Design */}
          <StaggerItem>
            <motion.div
              className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-5 shadow-sm"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Store className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-title font-semibold text-lg text-foreground">
                    {t('store_details', lang)}
                  </h3>
                  <p className="text-sm text-muted-foreground">Review before sending</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Store Name */}
                <div className="p-3 bg-muted/30 rounded-xl">
                  <label className="text-xs text-muted-foreground uppercase tracking-wide">
                    {t('store_name_label', lang)}
                  </label>
                  <p className="font-semibold text-foreground mt-1 text-lg">
                    {storeName}
                  </p>
                </div>

                {/* Store Types with Stagger Animation */}
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    Categories
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold">
                      {selected.codes.length}
                    </span>
                  </label>
                  <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selected.labels.map((label, index) => (
                      <motion.div
                        key={selected.codes[index]}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 bg-muted/20 rounded-xl border border-border/30 group hover:bg-muted/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium text-foreground text-sm">
                            {label}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-mono px-2 py-1 bg-background/50 rounded">
                          {selected.codes[index]}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </StaggerItem>

          {/* Message Preview Card */}
          <StaggerItem>
            <motion.div
              className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-5 shadow-sm"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="font-title font-semibold text-foreground">
                    WhatsApp Message
                  </h3>
                </div>
                <motion.button
                  onClick={handleCopyMessage}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 text-sm font-medium transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-1.5 text-green-500"
                      >
                        <Check className="w-4 h-4" />
                        Copied!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-1.5 text-muted-foreground"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              <div className="relative">
                <pre className="text-xs text-muted-foreground bg-muted/20 p-4 rounded-xl whitespace-pre-wrap font-mono border border-border/30 max-h-32 overflow-y-auto">
                  {payload}
                </pre>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card/80 to-transparent rounded-b-xl pointer-events-none" />
              </div>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Premium Sticky Footer */}
      <StickyFooter className="space-y-3">
        <PremiumButton
          onClick={handleSendToWhatsApp}
          variant="success"
          size="lg"
          fullWidth
          pulse
          icon={<Send className="w-5 h-5" />}
          iconPosition="right"
        >
          {t('send', lang)}
        </PremiumButton>

        <PremiumButton
          onClick={handleEditStoreType}
          variant="ghost"
          size="md"
          fullWidth
          icon={<Edit3 className="w-4 h-4" />}
          iconPosition="left"
        >
          {t('edit_store_type', lang)}
        </PremiumButton>
      </StickyFooter>
    </PageTransition>
  );
};