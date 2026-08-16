import React from 'react';

export interface FeaturedCardSkeletonProps {
  className?: string;
  animate?: boolean;
}

/**
 * Individual skeleton card matching the exact dimensions and layout
 * of a FeaturedProjectCard (16:9 aspect-video with rounded corners and typography stubs).
 */
export const FeaturedCardSkeleton: React.FC<FeaturedCardSkeletonProps> = ({
  className = '',
  animate = true,
}) => {
  return (
    <div
      className={`relative flex flex-col w-full select-none ${className}`}
      role="status"
      aria-label="Loading project thumbnail"
      aria-busy="true"
    >
      {/* 16:9 Media Aspect Container (Zero Layout Shift) */}
      <div className="relative aspect-video w-full overflow-hidden rounded-[16px] sm:rounded-[20px] bg-neutral-200/80 dark:bg-neutral-900 border border-neutral-200/40 dark:border-white/[0.05] shadow-[0_8px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.2)]">
        {/* Shimmer Wave Effect */}
        {animate && (
          <div className="absolute inset-0 -translate-x-full animate-[skeletonShimmer_1.8s_infinite_ease-in-out] bg-gradient-to-r from-transparent via-white/40 dark:via-white/[0.06] to-transparent pointer-events-none z-10" />
        )}

        {/* Subtle center media icon placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-10 pointer-events-none">
          <svg className="w-8 h-8 text-neutral-500 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Details Skeleton: Title & Category Stubs */}
      <div className="mt-2.5 flex flex-col items-start text-left w-full space-y-1.5 px-0.5">
        {/* Title Stub */}
        <div className="h-4 w-3/5 min-w-[130px] max-w-[220px] rounded-md bg-neutral-300/80 dark:bg-neutral-800/90 overflow-hidden relative">
          {animate && (
            <div className="absolute inset-0 -translate-x-full animate-[skeletonShimmer_1.8s_infinite_ease-in-out_0.2s] bg-gradient-to-r from-transparent via-white/40 dark:via-white/[0.08] to-transparent" />
          )}
        </div>

        {/* Category Badge Stub */}
        <div className="h-3 w-1/4 min-w-[70px] max-w-[110px] rounded-md bg-neutral-200/90 dark:bg-neutral-800/50 overflow-hidden relative mt-0.5">
          {animate && (
            <div className="absolute inset-0 -translate-x-full animate-[skeletonShimmer_1.8s_infinite_ease-in-out_0.4s] bg-gradient-to-r from-transparent via-white/40 dark:via-white/[0.08] to-transparent" />
          )}
        </div>
      </div>
      <span className="sr-only">Loading project...</span>
    </div>
  );
};

export interface FeaturedWorkSkeletonProps {
  count?: number;
  className?: string;
  showSectionHeader?: boolean;
}

/**
 * Full 3-column Featured Work Grid Skeleton Loader.
 * Guarantees zero layout shifts (CLS = 0) while lazy-loading assets.
 */
export const FeaturedWorkSkeleton: React.FC<FeaturedWorkSkeletonProps> = ({
  count = 3,
  className = '',
  showSectionHeader = false,
}) => {
  return (
    <div
      className={`w-full ${className}`}
      role="status"
      aria-label="Loading featured work showcase"
      aria-busy="true"
    >
      {/* Optional Section Header Skeleton */}
      {showSectionHeader && (
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
          <div className="h-3 w-28 rounded bg-neutral-300/80 dark:bg-neutral-800 animate-pulse" />
          <div className="h-8 w-28 rounded-full bg-neutral-200/80 dark:bg-neutral-800/70 animate-pulse" />
        </div>
      )}

      {/* 3-Column Equal Grid matching FeaturedWork */}
      <div className="selected-work-grid portfolio-grid grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start">
        {Array.from({ length: count }).map((_, idx) => (
          <FeaturedCardSkeleton key={idx} />
        ))}
      </div>
      <span className="sr-only">Loading featured portfolio projects...</span>
    </div>
  );
};

export default FeaturedWorkSkeleton;
