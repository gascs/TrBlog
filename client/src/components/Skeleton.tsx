import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );
};

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
};

interface SkeletonCardProps {
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-6 shadow-sm ${className}`}>
      <Skeleton className="h-48 w-full rounded-xl mb-4" />
      <Skeleton className="h-6 w-3/4 rounded mb-2" />
      <SkeletonText lines={3} />
      <Skeleton className="h-10 w-32 rounded-lg mt-4" />
    </div>
  );
};

interface SkeletonPostCardProps {
  className?: string;
}

export const SkeletonPostCard: React.FC<SkeletonPostCardProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-full rounded mb-2" />
        <Skeleton className="h-5 w-full rounded mb-2" />
        <Skeleton className="h-4 w-2/3 rounded mb-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
    </div>
  );
};

interface SkeletonDetailProps {
  className?: string;
}

export const SkeletonDetail: React.FC<SkeletonDetailProps> = ({ className = '' }) => {
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="mb-8">
        <Skeleton className="h-8 w-24 rounded mb-4" />
        <Skeleton className="h-12 w-3/4 rounded mb-4" />
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
          </div>
        </div>
      </div>
      <Skeleton className="h-96 w-full rounded-2xl mb-8" />
      <SkeletonText lines={8} />
    </div>
  );
};

export default Skeleton;