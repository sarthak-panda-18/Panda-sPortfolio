/**
 * Motion System - Single source of truth for animations, easings, and durations.
 */

export const EASE = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.2,
  reveal: 0.6,
  curtain: 1.2,
};

// Standard upward fade with 16px vertical travel
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.reveal,
      ease: EASE,
    },
  },
};

// Staggered container for children elements (80ms stagger interval)
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Masked line reveal for headings (inside an overflow-hidden parent)
export const maskLine = {
  hidden: {
    y: "100%",
  },
  visible: {
    y: "0%",
    transition: {
      duration: DURATION.reveal,
      ease: EASE,
    },
  },
};

// Opacity-only fade for reduced motion compliance
export const fade = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.fast,
      ease: EASE,
    },
  },
};

/**
 * Returns the appropriate animation variant based on reduced motion preference.
 * @param {object} standardVariant - The standard motion variant
 * @param {boolean} prefersReducedMotion - Whether reduced motion is active
 * @returns {object} The chosen variant
 */
export function getMotionVariant(standardVariant, prefersReducedMotion = false) {
  if (prefersReducedMotion) {
    return fade;
  }
  return standardVariant;
}
