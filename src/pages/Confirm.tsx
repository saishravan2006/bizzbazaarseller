import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TopBar } from '@/components/TopBar';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '@/lib/i18n';
import { encodePayloadV2Lite, openWhatsApp, copyToClipboard } from '@/lib/whatsapp';
import { useToast } from '@/hooks/use-toast';

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
    <div className="min-h-screen bg-background">
      <TopBar title={t('store_details', lang)} />

      <div className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Summary Card */}
          <div className="bg-surface rounded-xl border border-border p-6">
            <h3 className="font-title font-semibold text-lg text-text-primary mb-4">
              {t('store_details', lang)}
            </h3>
            
            <div className="space-y-4">
              {/* Store Name */}
              <div>
                <label className="text-sm text-text-secondary">
                  {t('store_name_label', lang)}
                </label>
                <p className="font-medium text-text-primary mt-1">
                  {storeName}
                </p>
              </div>
              
              {/* Store Types */}
              <div>
                <label className="text-sm text-text-secondary">
                  Store Types ({selected.codes.length})
                </label>
                <div className="mt-2 space-y-2">
                  {selected.labels.map((label, index) => (
                    <div
                      key={selected.codes[index]}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <span className="font-medium text-text-primary">
                        {label}
                      </span>
                      <span className="text-xs text-text-secondary font-mono">
                        {selected.codes[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Message Preview */}
          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-title font-semibold text-base text-text-primary">
                WhatsApp Message
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyMessage}
                className="text-primary hover:text-primary-hover"
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {t('copy_message', lang)}
              </Button>
            </div>
            
            <pre className="text-xs text-text-secondary bg-muted/30 p-3 rounded-lg whitespace-pre-wrap font-mono">
              {payload}
            </pre>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-surface border-t border-border safe-area-bottom">
        <div className="space-y-3">
          <Button
            onClick={handleSendToWhatsApp}
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-4 rounded-xl text-base"
            size="lg"
          >
            {t('send', lang)}
          </Button>
          
          <Button
            onClick={handleEditStoreType}
            variant="ghost"
            className="w-full text-text-primary font-medium py-3"
          >
            {t('edit_store_type', lang)}
          </Button>
        </div>
      </div>
    </div>
  );
};