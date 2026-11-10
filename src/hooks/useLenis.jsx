import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
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
  const activeLocksRef = useRef(new Set());
  const prefersReducedMotionRef = useRef(prefersReducedMotion);
  prefersReducedMotionRef.current = prefersReducedMotion;

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
    if (activeLocksRef.current.size > 0) {
      instance.stop();
    }
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
  const scrollTo = useCallback((target, options = {}) => {
    // Default offset accounts for navbar height (~80px)
    const offset = options.offset !== undefined ? options.offset : -80;
    const reduced = prefersReducedMotionRef.current;

    if (lenisRef.current && !reduced) {
      lenisRef.current.scrollTo(target, { offset, ...options });
    } else {
      // Native fallback
      if (target === '#') {
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
        return;
      }

      let targetElement = null;
      if (typeof target === 'string') {
        targetElement = document.querySelector(target);
      } else if (target instanceof HTMLElement) {
        targetElement = target;
      }

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, elementPosition + offset),
          behavior: reduced ? 'auto' : 'smooth',
        });
      } else if (typeof target === 'number') {
        window.scrollTo({
          top: Math.max(0, target),
          behavior: reduced ? 'auto' : 'smooth',
        });
      }
    }
  }, []);

  const stop = useCallback((lockId = 'default') => {
    activeLocksRef.current.add(lockId);
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
    document.documentElement.classList.add('lenis-stopped');
    document.body.style.overflow = 'hidden';
  }, []);

  const start = useCallback((lockId = 'default') => {
    activeLocksRef.current.delete(lockId);
    if (activeLocksRef.current.size > 0) {
      return;
    }
    if (lenisRef.current) {
      lenisRef.current.start();
    }
    document.documentElement.classList.remove('lenis-stopped');
    document.body.style.overflow = '';
  }, []);

  const contextValue = useMemo(
    () => ({ lenis, scrollTo, stop, start }),
    [lenis, scrollTo, stop, start]
  );

  return (
    <LenisContext.Provider value={contextValue}>
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
        if (target === '#') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (el) {
          const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY + offset);
          window.scrollTo({ top, behavior: 'smooth' });
        } else if (typeof target === 'number') {
          window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
        }
      },
      stop: () => {},
      start: () => {},
    };
  }
  return context;
}
