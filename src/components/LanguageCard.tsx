import React, { useState, useEffect } from 'react';
import { motion, easeOut } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';

interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
}

interface LanguageCardProps {
  title?: string;
  subtitle?: string;
  languages: LanguageOption[];
  onLanguageSelect: (languageCode: string) => void;
  selectedLanguage?: string;
  className?: string;
}

const LanguageCard: React.FC<LanguageCardProps> = ({
  title = "Choose Language",
  subtitle = "Select your preferred language to continue",
  languages,
  onLanguageSelect,
  selectedLanguage,
  className = ""
}) => {

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: easeOut } as Transition
    }
  } satisfies Variants;

  const languageItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: easeOut } as Transition
    },
    hover: {
      scale: 1.02,
      backgroundColor: "hsl(266 64% 45% / 0.1)",
      transition: { duration: 0.2 } as Transition
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 } as Transition
    }
  } satisfies Variants;

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg border border-border p-6 sm:p-8 max-w-md mx-auto ${className}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-title font-semibold text-foreground mb-2">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm">
          {subtitle}
        </p>
      </div>

      <div className="space-y-3">
        {languages.map((language, index) => (
          <motion.button
            key={language.code}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              selectedLanguage === language.code
                ? 'border-primary bg-primary/8 shadow-lg shadow-primary/10'
                : 'border-border bg-surface hover:bg-primary/3 hover:border-primary/20'
            }`}
            variants={languageItemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: index * 0.1 }}
            onClick={() => onLanguageSelect(language.code)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onLanguageSelect(language.code);
              }
            }}
            aria-pressed={selectedLanguage === language.code}
            aria-describedby={`language-${language.code}-description`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className={`font-medium transition-colors duration-200 ${
                  selectedLanguage === language.code
                    ? 'text-primary font-semibold'
                    : 'text-foreground'
                }`}>
                  {language.nativeLabel}
                </div>
                <div className="text-sm text-muted-foreground mt-1" id={`language-${language.code}-description`}>
                  {language.label}
                </div>
              </div>
              
              {selectedLanguage === language.code && (
                <motion.div
                  className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <motion.div
                    className="w-2.5 h-2.5 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 600, damping: 30 }}
                  />
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {selectedLanguage && (
        <motion.div
          className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3, ease: easeOut }}
        >
          <div className="text-sm text-primary font-medium text-center">
            Language selected: {languages.find(l => l.code === selectedLanguage)?.nativeLabel}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LanguageCard;