import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '@/lib/i18n';
import LanguageCard from '@/components/LanguageCard';
import SlideInButton from '@/components/SlideInButton';

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col items-center justify-center px-6 py-12">
      {/* Ambient background elements */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, hsl(266 64% 45% / 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, hsl(145 63% 42% / 0.02) 0%, transparent 50%)
          `
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="font-title font-semibold text-3xl text-foreground mb-2">
          Bizz Bazaar
        </h1>
        <p className="text-muted-foreground text-lg">
          Welcome! Let's get started
        </p>
      </motion.div>

      {/* Language Selection Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <LanguageCard
          title="Choose Language"
          subtitle="Select your preferred language to continue"
          languages={languages}
          onLanguageSelect={handleLanguageSelect}
          selectedLanguage={selectedLang}
        />
      </motion.div>

      {/* Continue Button */}
      {selectedLang && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-8"
        >
          <SlideInButton
            buttonText={t('continue', selectedLang)}
            defaultBackgroundColor="hsl(266 64% 45%)"
            defaultTextColor="white"
            hoverBackgroundColor="hsl(266 64% 40%)"
            hoverTextColor="white"
            onClick={handleContinue}
            className="shadow-lg shadow-primary/20 hover:shadow-primary/30 focus-visible:ring-primary"
          />
        </motion.div>
      )}
    </div>
  );
};