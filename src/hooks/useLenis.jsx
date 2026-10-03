import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

const LenisContext = createContext(null);

/**
 * Lenis Smooth Scrolling Provider.
 * Initializes Lenis smooth scrolling, drives it via requestAnimationFrame,
 * and skips initialization when prefers-reduced-motion is enabled.
 */
export function LenisProvider({ children }) {
  const { prefersReducedMotion } = useReducedMotion();
  const [lenis, setLenis] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // If reduced motion is requested, do not initialize smooth wheel scrolling
    if (prefersReducedMotion) {
      return;
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenisRef.current = instance;
    setLenis(instance);

    let animationFrameId;
    function onRaf(time) {
      instance.raf(time);
      animationFrameId = requestAnimationFrame(onRaf);
    }
    animationFrameId = requestAnimationFrame(onRaf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [prefersReducedMotion]);

  /**
   * Smoothly scrolls to target element or numeric offset with navbar clearance.
   */
  const scrollTo = (target, options = {}) => {
    // Default offset accounts for navbar height (~80px)
    const offset = options.offset !== undefined ? options.offset : -80;

    if (lenisRef.current && !prefersReducedMotion) {
      lenisRef.current.scrollTo(target, { offset, ...options });
    } else {
      // Native fallback
      let targetElement = null;
      if (typeof target === 'string') {
        targetElement = document.querySelector(target);
      } else if (target instanceof HTMLElement) {
        targetElement = target;
      }

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition + offset,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      } else if (typeof target === 'number') {
        window.scrollTo({
          top: target,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }
  };

  const stop = () => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
    document.documentElement.classList.add('lenis-stopped');
    document.body.style.overflow = 'hidden';
  };

  const start = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
    document.documentElement.classList.remove('lenis-stopped');
    document.body.style.overflow = '';
  };

  return (
    <LenisContext.Provider value={{ lenis, scrollTo, stop, start }}>
      {children}
    </LenisContext.Provider>
  );
}

/**
 * Hook to access Lenis instance and control scroll methods.
 */
export function useLenis() {
  const context = useContext(LenisContext);
  if (!context) {
    return {
      lenis: null,
      scrollTo: (target, options = {}) => {
        const offset = options.offset !== undefined ? options.offset : -80;
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      },
      stop: () => {},
      start: () => {},
    };
  }
  return context;
}
