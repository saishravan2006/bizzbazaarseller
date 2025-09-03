import React from 'react';
import { motion } from 'framer-motion';
import { resolveLucideIcon } from '@/lib/resolveLucideIcon';
import { cardVariants } from '@/lib/motion';

interface StoreTypeCardProps {
  code: string;
  label: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}

const StoreTypeCard = React.memo(({ code, label, icon, selected, onClick }: StoreTypeCardProps) => {
  const IconComponent = resolveLucideIcon(icon);

  return (
    <motion.button
      onClick={onClick}
      className={`
        group relative w-full p-4 sm:p-4 md:p-5 rounded-2xl border-2 transition-colors duration-200
        ${selected 
          ? 'border-primary bg-primary/8 shadow-lg shadow-primary/10' 
          : 'border-border bg-surface hover:bg-primary/3 hover:border-primary/20'
        }
        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
        active:bg-primary/5 touch-manipulation min-h-[80px] sm:min-h-[70px]
      `}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      exit="exit"
    >
      {selected && (
        <motion.div 
          className="absolute -top-2 -right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/25"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
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
      
      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-2.5">
        <motion.div 
          className={`p-4 sm:p-3.5 rounded-xl transition-colors duration-200 ${
            selected 
              ? 'bg-primary/12 ring-1 ring-primary/20' 
              : 'bg-muted/40 group-hover:bg-primary/8'
          }`}
          whileHover={{ scale: selected ? 1 : 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <IconComponent 
            className={`w-7 h-7 sm:w-6 sm:h-6 transition-colors duration-200 ${
              selected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/80'
            }`} 
          />
        </motion.div>
        <span className={`text-sm font-medium leading-tight transition-colors duration-200 ${
          selected ? 'text-primary font-semibold' : 'text-foreground group-hover:text-primary/90'
        }`}>
          {label}
        </span>
      </div>
    </motion.button>
  );
});

StoreTypeCard.displayName = 'StoreTypeCard';

export { StoreTypeCard };