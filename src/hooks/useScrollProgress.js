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

  useEffect(() => {
    // 1. Passive scroll handler updating the mutable store
    const updateScrollStore = () => {
      const scrollY = window.scrollY;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      scrollStore.scrollY = scrollY;
      scrollStore.globalProgress = totalDocHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalDocHeight)) : 0;

      // Update per-section normalized progress
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const elementHeight = element.offsetHeight;
          const viewportHeight = window.innerHeight;

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
        }
      });
    };

    window.addEventListener('scroll', updateScrollStore, { passive: true });
    updateScrollStore();

    // 2. IntersectionObserver for active section highlighting (Scroll Spy)
    const observerCallback = (entries) => {
      // Find the entry that has the highest intersection ratio or is currently intersecting
      const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
      if (intersectingEntries.length > 0) {
        // Sort by intersection ratio or proximity to viewport center
        const topEntry = intersectingEntries.reduce((prev, curr) => 
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev
        );
        setActiveSection(topEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener('scroll', updateScrollStore);
      observer.disconnect();
    };
  }, [JSON.stringify(sectionIds)]);

  return { activeSection };
}
