import React, { useState, useEffect } from 'react';
import { motion, easeOut } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';

interface StoreNameCardProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  onStoreNameChange: (storeName: string) => void;
  storeName?: string;
  className?: string;
  maxLength?: number;
  minLength?: number;
}

const StoreNameCard: React.FC<StoreNameCardProps> = ({
  title = "Enter Your Store Name",
  subtitle = "Choose a name that represents your business",
  placeholder = "e.g., John's Electronics Store",
  onStoreNameChange,
  storeName = "",
  className = "",
  maxLength = 50,
  minLength = 3
}) => {
  const [inputValue, setInputValue] = useState(storeName);
  const [isFocused, setIsFocused] = useState(false);

  // Sync with external storeName prop changes
  useEffect(() => {
    setInputValue(storeName);
  }, [storeName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Enforce max length
    if (value.length <= maxLength) {
      setInputValue(value);
      onStoreNameChange(value);
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: easeOut } as Transition
    }
  } satisfies Variants;

  const inputVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, delay: 0.2 } as Transition
    },
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 } as Transition
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

      <motion.div
        className="space-y-4"
        variants={inputVariants}
        initial="initial"
        animate="animate"
      >
        <div className="relative">
          <motion.input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`w-full p-4 rounded-xl border-2 text-foreground placeholder-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isFocused || inputValue
                ? 'border-primary bg-primary/3'
                : 'border-border bg-surface hover:border-primary/20'
            }`}
            variants={inputVariants}
            whileFocus="focus"
            aria-describedby="store-name-help store-name-validation"
            aria-invalid={inputValue.length > 0 && inputValue.length < minLength}
          />
          
          {/* Character count indicator */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {inputValue.length}/{maxLength}
          </div>
        </div>

        {/* Input validation feedback */}
        {inputValue && (
          <motion.div
            id="store-name-validation"
            className={`p-3 rounded-xl border text-sm ${
              inputValue.length >= minLength
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-yellow-50 border-yellow-200 text-yellow-700'
            }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            role="status"
            aria-live="polite"
          >
            {inputValue.length >= minLength
              ? '✓ Great! Your store name looks good'
              : `⚠ Store name should be at least ${minLength} characters long`
            }
          </motion.div>
        )}

        {/* Suggestions */}
        <motion.div
          id="store-name-help"
          className="text-xs text-muted-foreground space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-medium">Tips for a great store name:</p>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            <li>Keep it simple and memorable</li>
            <li>Include your business type if helpful</li>
            <li>Avoid special characters</li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StoreNameCard;