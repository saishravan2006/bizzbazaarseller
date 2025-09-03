import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const TopBar = ({ title, showBack = true, onBack }: TopBarProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-center">
        {showBack && (
          <motion.button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </motion.button>
        )}
      </div>
      
      {title && (
        <h1 className="font-title font-semibold text-lg text-text-primary flex-1 text-center">
          {title}
        </h1>
      )}
      
      <div className="w-9" /> {/* Spacer for center alignment */}
    </motion.div>
  );
};