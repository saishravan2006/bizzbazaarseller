import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { t } from '@/lib/i18n';
import { encodePayloadV2Lite, openWhatsApp } from '@/lib/whatsapp';
import { useEffect } from 'react';

export const Success = () => {
  const { storeId, lang, storeName, selected } = useStore();
  const navigate = useNavigate();

  const payload = encodePayloadV2Lite(
    storeId,
    lang,
    storeName,
    selected.codes,
    selected.labels
  );

  const handleOpenWhatsApp = () => {
    openWhatsApp(payload);
  };

  const handleDone = () => {
    navigate('/');
  };

  // Subtle confetti effect
  useEffect(() => {
    // Simple confetti animation using CSS particles
    const createConfetti = () => {
      const colors = ['#6E56CF', '#7C3AED', '#F59E0B', '#EF4444', '#10B981'];
      
      for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-particle';
        confetti.style.cssText = `
          position: fixed;
          width: 8px;
          height: 8px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          left: ${Math.random() * window.innerWidth}px;
          top: -10px;
          animation: confettiFall 3s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 3000);
      }
    };

    // Add confetti animation CSS
    if (!document.getElementById('confetti-styles')) {
      const style = document.createElement('style');
      style.id = 'confetti-styles';
      style.textContent = `
        @keyframes confettiFall {
          to {
            transform: translateY(calc(100vh + 10px)) rotate(360deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    createConfetti();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5,
            type: 'spring',
            stiffness: 200,
            damping: 20
          }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.2,
              type: 'spring',
              stiffness: 300,
              damping: 15
            }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="font-title font-semibold text-2xl text-text-primary mb-4"
          >
            {t('verification_title', lang)}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="text-text-secondary text-center leading-relaxed mb-8 max-w-sm"
          >
            {t('verification_desc', lang)}
          </motion.p>

          {/* Store Details Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="bg-surface rounded-xl border border-border p-4 mb-8 text-left"
          >
            <h3 className="font-medium text-text-primary mb-2">{storeName}</h3>
            <p className="text-sm text-text-secondary">
              {selected.labels.join(', ')}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="p-6 safe-area-bottom"
      >
        <div className="space-y-3">
          <Button
            onClick={handleOpenWhatsApp}
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-4 rounded-xl text-base"
            size="lg"
          >
            {t('open_whatsapp', lang)}
          </Button>
          
          <Button
            onClick={handleDone}
            variant="ghost"
            className="w-full text-text-primary font-medium py-3"
          >
            {t('done', lang)}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};