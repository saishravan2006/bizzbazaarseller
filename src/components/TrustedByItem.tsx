import React from 'react';
import { motion } from 'framer-motion';

interface TrustedByItemProps {
  id: string;
  src: string;
  alt: string;
  name?: string;
  title?: string;
  quote?: string;
  href?: string;
  className?: string;
}

const TrustedByItem: React.FC<TrustedByItemProps> = ({
  id,
  src,
  alt,
  name,
  title,
  quote,
  href,
  className = ''
}) => {
  const isTestimonial = !!(name || title || quote);
  const isLogo = !isTestimonial;
  
  // Create aria-label combining available info
  const ariaLabel = [
    name,
    title && `${title}`,
    quote && `says: ${quote.slice(0, 100)}${quote.length > 100 ? '...' : ''}`
  ].filter(Boolean).join(', ');

  const content = (
    <motion.div
      className={`
        relative flex-shrink-0 bg-card border border-border/50 rounded-xl overflow-hidden
        transition-all duration-200 hover:shadow-md hover:border-border
        ${isTestimonial ? 'w-[240px] sm:w-[280px] p-4' : 'w-20 sm:w-24 h-20 sm:h-24 p-3'}
        ${className}
      `}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {isTestimonial ? (
        // Testimonial card layout
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <img
              src={src}
              alt={alt}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover bg-muted"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            {name && (
              <div className="font-semibold text-sm text-foreground truncate">
                {name}
              </div>
            )}
            {title && (
              <div className="text-xs text-muted-foreground truncate mb-2">
                {title}
              </div>
            )}
            {quote && (
              <div className="text-xs text-foreground/80 leading-relaxed line-clamp-2">
                "{quote}"
              </div>
            )}
          </div>
        </div>
      ) : (
        // Logo card layout
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain opacity-60 hover:opacity-80 transition-opacity duration-200"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        role="link"
        aria-label={ariaLabel || alt}
        className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel || alt}
      className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
      tabIndex={0}
    >
      {content}
    </div>
  );
};

export default TrustedByItem;