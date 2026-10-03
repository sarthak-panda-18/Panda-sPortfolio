import { useState, useEffect } from 'react';

/**
 * Hook to detect reduced motion preference and device power constraints.
 * Exposes prefersReducedMotion (boolean), isMobile (boolean), and isLowPower (boolean).
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // 1. Prefers-reduced-motion media query listener
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    // 2. Mobile & Low Power Detection
    const evaluateDeviceEnvironment = () => {
      const isTouch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
      const isNarrowViewport = window.innerWidth < 768;
      const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
      
      const mobileStatus = isNarrowViewport || (isTouch && window.innerWidth < 1024);
      setIsMobile(mobileStatus);
      setIsLowPower(mobileStatus || lowCores);
    };

    evaluateDeviceEnvironment();
    window.addEventListener('resize', evaluateDeviceEnvironment, { passive: true });

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
      window.removeEventListener('resize', evaluateDeviceEnvironment);
    };
  }, []);

  return {
    prefersReducedMotion,
    shouldReduceMotion: prefersReducedMotion,
    isMobile,
    isLowPower,
  };
}
