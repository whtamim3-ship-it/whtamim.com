import React, { useState, useEffect, useRef } from 'react';

export interface BlurUpImageProps {
  src: string;
  lowResSrc?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectRatio?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
}

/**
 * Generates an ultra-lightweight low-resolution placeholder URL 
 * derived from high-resolution CDN assets (Unsplash, YouTube, Cloudinary, etc.)
 */
export function getLowResPlaceholderUrl(url: string): string {
  if (!url) return '';

  // Unsplash URL optimization
  if (url.includes('images.unsplash.com')) {
    if (url.includes('w=')) {
      return url
        .replace(/w=\d+/, 'w=30')
        .replace(/q=\d+/, 'q=20') + '&blur=10';
    }
    return `${url}&w=30&q=20&blur=10`;
  }

  // YouTube Thumbnail optimization
  if (url.includes('img.youtube.com/vi/')) {
    return url.replace('/hqdefault.jpg', '/default.jpg')
              .replace('/maxresdefault.jpg', '/default.jpg')
              .replace('/sddefault.jpg', '/default.jpg');
  }

  // Cloudinary image optimization
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/w_40,q_10,e_blur:300/');
  }

  // Google Drive thumbnail optimization
  if (url.includes('lh3.googleusercontent.com')) {
    if (url.includes('=')) {
      return url.split('=')[0] + '=w40-blur';
    }
    return `${url}=w40-blur`;
  }

  // Fallback to original src (will be blurred via CSS filter)
  return url;
}

export const BlurUpImage: React.FC<BlurUpImageProps> = ({
  src,
  lowResSrc,
  alt,
  className = '',
  imgClassName = '',
  aspectRatio,
  referrerPolicy,
  onError,
  onClick,
  loading = 'lazy',
  style,
}) => {
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  const [isLowResLoaded, setIsLowResLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const highResRef = useRef<HTMLImageElement>(null);

  const placeholderUrl = lowResSrc || getLowResPlaceholderUrl(src);

  // Check if image is already cached in memory
  useEffect(() => {
    setIsHighResLoaded(false);
    setIsLowResLoaded(false);
    setHasError(false);

    if (highResRef.current && highResRef.current.complete && highResRef.current.naturalWidth > 0) {
      setIsHighResLoaded(true);
    }
  }, [src]);

  const handleHighResLoad = () => {
    setIsHighResLoaded(true);
  };

  const handleHighResError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-neutral-200/80 dark:bg-neutral-800/80 ${aspectRatio ? aspectRatio : ''} ${className}`}
      style={style}
    >
      {/* 1. Shimmer/Pulse Skeleton Background (visible before low-res or high-res loads) */}
      {!isHighResLoaded && !isLowResLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent animate-pulse z-0" />
      )}

      {/* 2. Low-Resolution Blurred Placeholder Layer */}
      {placeholderUrl && (
        <img
          src={placeholderUrl}
          alt=""
          aria-hidden="true"
          referrerPolicy={referrerPolicy}
          onLoad={() => setIsLowResLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover filter blur-[18px] scale-110 pointer-events-none transition-opacity duration-700 ease-out z-10 ${
            isHighResLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* 3. High-Resolution Full Asset Layer */}
      <img
        ref={highResRef}
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy={referrerPolicy}
        onLoad={handleHighResLoad}
        onError={handleHighResError}
        className={`w-full h-full object-cover transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) z-20 ${
          isHighResLoaded
            ? 'opacity-100 blur-0 scale-100'
            : 'opacity-0 blur-md scale-105'
        } ${imgClassName}`}
      />

      {/* 4. Error Fallback UI */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900 text-neutral-400 p-4 text-center z-30">
          <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[11px] font-mono uppercase tracking-wider">Image unavailable</span>
        </div>
      )}
    </div>
  );
};
