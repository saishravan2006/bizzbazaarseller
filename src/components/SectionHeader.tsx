import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SectionHeaderProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  rightLabel?: string;
  onRightAction?: () => void;
}

export const SectionHeader = ({ title, children, defaultExpanded = true, rightLabel, onRightAction }: SectionHeaderProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  // If rightLabel is provided, we render a non-collapsible header like the reference "Categories — See All"
  if (rightLabel) {
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between w-full px-1">
          <h3 className="font-title font-semibold text-lg text-text-primary">{title}</h3>
          <button
            type="button"
            onClick={onRightAction}
            className="flex items-center gap-1 text-primary text-sm font-medium hover:text-primary/90 active:opacity-90"
          >
            {rightLabel}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <motion.button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full p-3 text-left bg-surface rounded-lg border border-border hover:bg-muted/30 transition-colors"
        whileTap={{ scale: 0.995 }}
      >
        <h3 className="font-title font-semibold text-base text-text-primary">
          {title}
        </h3>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <ChevronDown className="w-5 h-5 text-text-secondary" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};