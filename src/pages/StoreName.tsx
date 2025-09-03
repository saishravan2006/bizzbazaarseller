import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TopBar } from '@/components/TopBar';
import { useStore } from '@/store/useStore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '@/lib/i18n';
import StoreNameCard from '@/components/StoreNameCard';
import SlideInButton from '@/components/SlideInButton';

export const StoreName = () => {
  const { lang, storeName, setStoreName } = useStore();
  const [name, setName] = useState(storeName);
  const navigate = useNavigate();

  const handleStoreNameChange = (value: string) => {
    setName(value);
  };

  const handleContinue = () => {
    if (name.trim().length >= 3) {
      setStoreName(name.trim());
      navigate('/store-type');
    }
  };

  const isValid = name.trim().length >= 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <TopBar title={t('enter_store_name', lang)} />
      
      {/* Ambient background elements */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, hsl(266 64% 45% / 0.03) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, hsl(145 63% 42% / 0.02) 0%, transparent 50%)
          `
        }}
      />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <StoreNameCard
            title="Enter Your Store Name"
            subtitle="Choose a name that represents your business"
            placeholder={t('store_name_placeholder', lang) || "e.g., John's Electronics Store"}
            onStoreNameChange={handleStoreNameChange}
            storeName={name}
          />
          
          {/* Continue Button - Positioned directly below the card */}
          {isValid && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-6 w-full flex justify-center"
            >
              <SlideInButton
                buttonText={t('continue', lang)}
                defaultBackgroundColor="hsl(266 64% 45%)"
                defaultTextColor="white"
                hoverBackgroundColor="hsl(266 64% 40%)"
                hoverTextColor="white"
                onClick={handleContinue}
                className="shadow-lg shadow-primary/20 hover:shadow-primary/30 focus-visible:ring-primary"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};