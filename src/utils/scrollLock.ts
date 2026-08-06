import { useEffect } from 'react';

let lockCount = 0;
let originalBodyStyleOverflow = '';
let originalHtmlStyleOverflow = '';

/**
 * Reference-counted body scroll locking hook.
 * Guarantees that body scroll is disabled when one or more overlays/modals are active,
 * and safely restored ONLY when all overlays/modals have closed.
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    if (lockCount === 0) {
      originalBodyStyleOverflow = document.body.style.overflow;
      originalHtmlStyleOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    lockCount++;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = originalBodyStyleOverflow;
        document.documentElement.style.overflow = originalHtmlStyleOverflow;
      }
    };
  }, [isLocked]);
}
