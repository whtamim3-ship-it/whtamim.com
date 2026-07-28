import React from 'react';

interface BrandLogoProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  href?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  onClick,
  href = '#',
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center shrink-0 cursor-pointer select-none ${className}`}
      aria-label="whtamim — Return to Home"
      title="whtamim — Return to Home"
    >
      {/* 
        Official Brand Logo:
        - Uses the official red WH signature logo asset
        - Responsive height: Mobile (28px), Tablet (32px), Desktop (36px)
        - Optical vertical centering alignment offset (-translate-y-[1px])
        - Subtle hover opacity transition & slight brightness boost
        - Zero scale, zero rotation, zero bounce, zero glow
      */}
      <picture className="inline-block">
        <source srcSet="/logo.svg" type="image/svg+xml" />
        <img
          src="/logo.png"
          alt="whtamim official brand logo"
          width="120"
          height="70"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="h-[28px] sm:h-[32px] md:h-[36px] w-auto max-w-full object-contain -translate-y-[1px] transition-all duration-200 ease-out group-hover:opacity-85 group-hover:brightness-110 active:opacity-75"
          style={{
            imageRendering: 'auto',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      </picture>
    </a>
  );
};
