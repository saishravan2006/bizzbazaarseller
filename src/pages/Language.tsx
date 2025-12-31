import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '@/lib/i18n';
import LanguageCard from '@/components/LanguageCard';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/PageTransition';
import { PremiumButton, StickyFooter } from '@/components/PremiumButton';
import { ArrowRight, Globe } from 'lucide-react';
import AnimatedGradientBackground from '@/components/AnimatedGradientBackground';

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
    <PageTransition className="relative flex flex-col overflow-hidden">
      {/* Premium Aurora Gradient Background */}
      <AnimatedGradientBackground
        variant="aurora"
        intensity="subtle"
        interactive={true}
      />

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