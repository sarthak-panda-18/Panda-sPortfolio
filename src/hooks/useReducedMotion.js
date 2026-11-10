import { useState, useEffect } from 'react';

function detectEnvironment() {
  if (typeof window === 'undefined') {
    return {
      prefersReducedMotion: false,
      isMobile: false,
      isLowPower: false,
    };
  }

  const prefersReducedMotion = Boolean(
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const isTouch =
    'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
  const isNarrowViewport = window.innerWidth < 768;
  const lowCores =
    typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

  const isMobile = isNarrowViewport || (isTouch && window.innerWidth < 1024);
  const isLowPower = isMobile || lowCores;

  return { prefersReducedMotion, isMobile, isLowPower };
}

/**
 * Hook to detect reduced motion preference and device power constraints.
 * Exposes prefersReducedMotion (boolean), isMobile (boolean), and isLowPower (boolean).
 */
export function useReducedMotion() {
  const [env, setEnv] = useState(detectEnvironment);

  useEffect(() => {
    const mediaQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

    const syncEnvironment = () => {
      const next = detectEnvironment();
      setEnv((prev) =>
        prev.prefersReducedMotion === next.prefersReducedMotion &&
        prev.isMobile === next.isMobile &&
        prev.isLowPower === next.isLowPower
          ? prev
          : next
      );
    };

    syncEnvironment();

    if (mediaQuery) {
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', syncEnvironment);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(syncEnvironment);
      }
    }

    window.addEventListener('resize', syncEnvironment, { passive: true });

    return () => {
      if (mediaQuery) {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', syncEnvironment);
        } else if (mediaQuery.removeListener) {
          mediaQuery.removeListener(syncEnvironment);
        }
      }
      window.removeEventListener('resize', syncEnvironment);
    };
  }, []);

  return {
    prefersReducedMotion: env.prefersReducedMotion,
    shouldReduceMotion: env.prefersReducedMotion,
    isMobile: env.isMobile,
    isLowPower: env.isLowPower,
  };
}
