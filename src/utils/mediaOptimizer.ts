/**
 * Media optimization utilities for high performance and optimal Lighthouse scores.
 */

/**
 * Injects Cloudinary automatic quality and modern format transformations (q_auto,f_auto)
 * to drastically reduce video and image payload sizes without visual degradation.
 */
export function optimizeCloudinaryUrl(url: string): string {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;

  // If already transformed with q_auto or f_auto, return as is
  if (url.includes('/upload/q_auto') || url.includes('/upload/f_auto') || url.includes('q_auto,f_auto')) {
    return url;
  }

  // Inject q_auto,f_auto right after /upload/
  return url.replace('/upload/', '/upload/q_auto,f_auto/');
}

/**
 * Optimizes external video URLs for efficient delivery
 */
export function getOptimizedVideoUrl(url: string): string {
  if (!url) return '';
  return optimizeCloudinaryUrl(url);
}
