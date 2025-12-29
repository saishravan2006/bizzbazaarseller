import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, Home, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { t } from '@/lib/i18n';
import { encodePayloadV2Lite, openWhatsApp } from '@/lib/whatsapp';
import { useEffect, useMemo } from 'react';
import { SlideUpTransition, StaggerContainer, StaggerItem } from '@/components/PageTransition';
import { PremiumButton, StickyFooter } from '@/components/PremiumButton';

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

  // Enhanced confetti effect with physics
  useEffect(() => {
    const colors = ['#6E56CF', '#7C3AED', '#F59E0B', '#EF4444', '#10B981', '#06B6D4', '#EC4899'];
    const shapes = ['circle', 'square', 'triangle'];

    const createConfetti = () => {
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          const size = Math.random() * 8 + 4;
          const startX = Math.random() * window.innerWidth;
          const drift = (Math.random() - 0.5) * 200;
          const rotation = Math.random() * 720;

          confetti.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${shape === 'circle' ? '50%' : shape === 'square' ? '2px' : '0'};
            ${shape === 'triangle' ? 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);' : ''}
            pointer-events: none;
            z-index: 1000;
            left: ${startX}px;
            top: -20px;
            animation: confettiFall${i % 3} ${3 + Math.random() * 2}s ease-out forwards;
          `;

          document.body.appendChild(confetti);

          setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
      }
    };

    // Dynamic keyframes for varied physics
    if (!document.getElementById('confetti-styles-v2')) {
      const style = document.createElement('style');
      style.id = 'confetti-styles-v2';
      style.textContent = `
        @keyframes confettiFall0 {
          to {
            transform: translateY(100vh) translateX(100px) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes confettiFall1 {
          to {
            transform: translateY(100vh) translateX(-100px) rotate(-540deg);
            opacity: 0;
          }
        }
        @keyframes confettiFall2 {
          to {
            transform: translateY(100vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    createConfetti();
  }, []);

  // Animated checkmark path
  const checkmarkPath = "M4 12l5 5L20 7";

  return (
    <SlideUpTransition className="bg-gradient-to-b from-background to-background/95 flex flex-col">
      {/* Celebration background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 pb-40">
        <StaggerContainer className="text-center max-w-sm">
          {/* Animated Success Icon with SVG Draw */}
          <StaggerItem className="mb-6">
            <motion.div
              className="relative w-24 h-24 mx-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-emerald-500/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Inner circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center">
                {/* Animated checkmark SVG */}
                <motion.svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d={checkmarkPath}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 0.5,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                  />
                </motion.svg>
              </div>

              {/* Sparkle decorations */}
              <motion.div
                className="absolute -top-1 -right-1"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </motion.div>
          </StaggerItem>

          {/* Title */}
          <StaggerItem>
            <h1 className="font-title font-bold text-2xl text-foreground mb-3">
              {t('verification_title', lang)}
            </h1>
          </StaggerItem>

          {/* Description */}
          <StaggerItem>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t('verification_desc', lang)}
            </p>
          </StaggerItem>

          {/* Store Details Card */}
          <StaggerItem>
            <motion.div
              className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-5 text-left"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">🏪</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{storeName}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selected.codes.length} categories selected
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selected.labels.slice(0, 3).map((label, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                  >
                    {label}
                  </span>
                ))}
                {selected.labels.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                    +{selected.labels.length - 3} more
                  </span>
                )}
              </div>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Premium Sticky Footer */}
      <StickyFooter className="space-y-3">
        <PremiumButton
          onClick={handleOpenWhatsApp}
          variant="success"
          size="lg"
          fullWidth
          icon={<MessageCircle className="w-5 h-5" />}
          iconPosition="left"
        >
          {t('open_whatsapp', lang)}
        </PremiumButton>

        <PremiumButton
          onClick={handleDone}
          variant="ghost"
          size="md"
          fullWidth
          icon={<Home className="w-4 h-4" />}
          iconPosition="left"
        >
          {t('done', lang)}
        </PremiumButton>
      </StickyFooter>
    </SlideUpTransition>
  );
};