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

  // Preserve exact Cloudinary asset URLs that do not require or support eager transformations
  if (url.includes('sahrey6n') || url.includes('ibm9kfbm') || url.includes('ahuv4pom')) {
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
