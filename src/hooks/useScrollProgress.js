import { useState, useEffect } from 'react';

/**
 * Shared mutable external store for 60fps scroll tracking.
 * Three.js useFrame hooks can inspect these values directly without triggering React re-renders.
 */
export const scrollStore = {
  globalProgress: 0,
  scrollY: 0,
  sectionProgress: {},
};

/**
 * Hook to track scroll progress and current active section (Scroll Spy).
 * @param {string[]} sectionIds - Array of section element IDs to track
 * @returns {{ activeSection: string }}
 */
export function useScrollProgress(sectionIds = ['hero', 'about', 'skills', 'projects', 'education', 'contact']) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'hero');
  const sectionIdsKey = sectionIds.join(',');

  useEffect(() => {
    const ids = sectionIdsKey ? sectionIdsKey.split(',') : [];

    // Passive scroll & resize handler updating the mutable store and active Scroll Spy section
    const updateScrollStore = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalDocHeight = document.documentElement.scrollHeight - viewportHeight;

      scrollStore.scrollY = scrollY;
      scrollStore.globalProgress = totalDocHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalDocHeight)) : 0;

      let nextActive = ids[0] || 'hero';
      const anchorY = viewportHeight * 0.35;

      // Update per-section normalized progress and determine active section
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const elementHeight = element.offsetHeight;

          // Normalized progress from when element enters bottom (0) to when it leaves top (1)
          const scrollStart = elementTop - viewportHeight;
          const scrollEnd = elementTop + elementHeight;
          const totalDistance = scrollEnd - scrollStart;

          if (totalDistance > 0) {
            const progress = (scrollY - scrollStart) / totalDistance;
            scrollStore.sectionProgress[id] = Math.min(1, Math.max(0, progress));
          } else {
            scrollStore.sectionProgress[id] = 0;
          }

          if (rect.top <= anchorY) {
            nextActive = id;
          }
        }
      });

      // Highlight the last section when scrolled to the bottom of the page
      if (ids.length > 0 && totalDocHeight > 0 && scrollY >= totalDocHeight - 24) {
        nextActive = ids[ids.length - 1];
      }

      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
    };

    window.addEventListener('scroll', updateScrollStore, { passive: true });
    window.addEventListener('resize', updateScrollStore, { passive: true });
    updateScrollStore();

    return () => {
      window.removeEventListener('scroll', updateScrollStore);
      window.removeEventListener('resize', updateScrollStore);
    };
  }, [sectionIdsKey]);

  return { activeSection };
}
