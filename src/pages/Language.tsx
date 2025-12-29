import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '@/lib/i18n';
import LanguageCard from '@/components/LanguageCard';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/PageTransition';
import { PremiumButton, StickyFooter } from '@/components/PremiumButton';
import { ArrowRight, Globe } from 'lucide-react';

const languages = [
  { code: 'en' as const, label: 'English', nativeLabel: 'English' },
  { code: 'ta' as const, label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'hi' as const, label: 'Hindi', nativeLabel: 'हिन्दी' }
];

export const Language = () => {
  const { lang, setLang } = useStore();
  const [selectedLang, setSelectedLang] = useState(lang);
  const navigate = useNavigate();

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLang(languageCode as any);
  };

  const handleContinue = () => {
    setLang(selectedLang);
    navigate('/store-name');
  };

  return (
    <PageTransition className="bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Animated ambient background */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(266 64% 45% / 0.08) 0%, transparent 70%)',
            left: '10%',
            top: '10%',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(145 63% 42% / 0.06) 0%, transparent 70%)',
            right: '5%',
            bottom: '20%',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 pb-32">
        <StaggerContainer className="flex flex-col items-center w-full max-w-md">
          {/* Header with icon */}
          <StaggerItem className="text-center mb-8">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <Globe className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.h1
              className="font-title font-semibold text-3xl text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Bizz Bazaar
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Welcome! Let's get started
            </motion.p>
          </StaggerItem>

          {/* Language Selection Card */}
          <StaggerItem className="w-full">
            <LanguageCard
              title="Choose Language"
              subtitle="Select your preferred language to continue"
              languages={languages}
              onLanguageSelect={handleLanguageSelect}
              selectedLanguage={selectedLang}
            />
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Sticky Footer with Premium Button */}
      {selectedLang && (
        <StickyFooter>
          <PremiumButton
            onClick={handleContinue}
            variant="primary"
            size="lg"
            fullWidth
            pulse
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
            {t('continue', selectedLang)}
          </PremiumButton>
        </StickyFooter>
      )}
    </PageTransition>
  );
};