/**
 * Shared mutable mouse state for Three.js parallax.
 * Normalized [-1, 1] relative to viewport center.
 */
export const mouseStore = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
};

let isListenerAttached = false;

export function initMouseTracking() {
  if (typeof window === 'undefined' || isListenerAttached) return;

  const handleMouseMove = (event) => {
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    // Normalized [-1, 1]
    mouseStore.targetX = (event.clientX - halfWidth) / halfWidth;
    mouseStore.targetY = -(event.clientY - halfHeight) / halfHeight;
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  isListenerAttached = true;
}
