import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const PromoCarousel = React.lazy(() => import('./PromoCarousel'));

const PromoCarouselSkeleton = () => (
  <div className="mb-5">
    <Skeleton className="h-32 w-full rounded-2xl" />
  </div>
);

const LazyPromoCarousel: React.FC = () => {
  return (
    <Suspense fallback={<PromoCarouselSkeleton />}>
      <PromoCarousel />
    </Suspense>
  );
};

export default LazyPromoCarousel;