import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useIsPresent } from 'framer-motion';
import { EASE } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLenis } from '../hooks/useLenis';

function PreloaderStage({ onClose }) {
  const { prefersReducedMotion } = useReducedMotion();
  const { stop, start } = useLenis();
  const isPresent = useIsPresent();

  const dialogRef = useRef(null);
  const veilRef = useRef(null);
  const auraRef = useRef(null);
  const openTimeRef = useRef(Date.now());
  const isDismissingRef = useRef(false);

  // Lock Lenis scroll and place keyboard focus on the preloader dialog on mount
  useEffect(() => {
    openTimeRef.current = Date.now();
    isDismissingRef.current = false;
    stop('preloader');

    const focusTimer = setTimeout(() => {
      dialogRef.current?.focus({ preventScroll: true });
    }, 0);

    return () => {
      clearTimeout(focusTimer);
      start('preloader');
    };
  }, [stop, start]);

  const handleDismiss = useCallback(
    (force = false) => {
      if (isDismissingRef.current) return;
      if (!force && Date.now() - openTimeRef.current < 260) {
        return;
      }

      isDismissingRef.current = true;
      start('preloader');
      if (onClose) onClose();
    },
    [onClose, start]
  );

  // Listen for Space, Enter, or Escape while the preloader is active
  useEffect(() => {
    if (!isPresent) return;

    const handleKeyDown = (e) => {
      if (e.repeat) return;

      if (e.code === 'Escape' || e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleDismiss(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresent, handleDismiss]);

  // Unexpected optical radial iris portal driven smoothly at 60fps during exit
  useEffect(() => {
    if (isPresent) {
      if (veilRef.current) {
        veilRef.current.style.maskImage = 'none';
        veilRef.current.style.webkitMaskImage = 'none';
      }
      return;
    }

    if (prefersReducedMotion || !veilRef.current) return;

    const veil = veilRef.current;
    const duration = 960;
    let startTime = null;
    let frameId = null;

    const tick = (now) => {
      if (startTime === null) startTime = now;
      const p = Math.min(1, (now - startTime) / duration);
      const ease = 1 - Math.pow(1 - p, 3.2);

      const inner = ease * 116;
      const feather = 16 + ease * 18;
      const mid1 = inner + feather * 0.35;
      const mid2 = inner + feather * 0.72;
      const outer = inner + feather;

      const mask = `radial-gradient(circle at 50% 44%, rgba(0, 0, 0, 0) ${inner.toFixed(
        2
      )}%, rgba(0, 0, 0, 0.26) ${mid1.toFixed(2)}%, rgba(0, 0, 0, 0.76) ${mid2.toFixed(
        2
      )}%, rgba(0, 0, 0, 1) ${outer.toFixed(2)}%)`;

      veil.style.maskImage = mask;
      veil.style.webkitMaskImage = mask;

      if (p < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [isPresent, prefersReducedMotion]);

  const handleMouseMove = (e) => {
    if (!auraRef.current || prefersReducedMotion || !isPresent) return;
    auraRef.current.style.background = `radial-gradient(640px circle at ${e.clientX}px ${e.clientY}px, rgba(234, 126, 84, 0.11), transparent 70%)`;
  };

  return (
    <motion.div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="You are watching Sarthak Panda's portfolio"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: prefersReducedMotion ? 0.2 : 0.65, ease: EASE },
      }}
      exit={{
        opacity: prefersReducedMotion ? 0 : [1, 1, 0],
        transition: prefersReducedMotion
          ? { duration: 0.25, ease: EASE }
          : { duration: 1.05, times: [0, 0.72, 1], ease: 'linear' },
      }}
      onClick={() => handleDismiss(false)}
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-50 overflow-hidden select-none outline-none flex flex-col justify-end items-center ${
        isPresent ? 'cursor-pointer' : 'pointer-events-none'
      }`}
    >
      {/* 1. Full-Screen Enhanced Monochrome Portrait + Clean Bottom Shadow Scrim (Iris Portal Masked) */}
      <div ref={veilRef} className="absolute inset-0 bg-[#0B0B0D]">
        <motion.img
          src="/preloader-portrait.jpg"
          alt="Sarthak Panda"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: prefersReducedMotion ? 0.15 : 1.35, ease: EASE },
            scale: { duration: prefersReducedMotion ? 0.15 : 2.6, ease: EASE },
          }}
          className="absolute inset-0 w-full h-full object-cover object-[50%_34%] pointer-events-none will-change-transform"
        />

        {/* Subtle Bottom-Only Obsidian Feather Behind Text — Keeps Portrait Clear & Luminous */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(11, 11, 13, 0.90) 0%, rgba(11, 11, 13, 0.58) 18%, rgba(11, 11, 13, 0.14) 32%, rgba(11, 11, 13, 0) 46%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 85% at 50% 40%, rgba(11, 11, 13, 0) 64%, rgba(11, 11, 13, 0.28) 100%)',
          }}
        />

        {/* Subtle Interactive Warm Terracotta Aura */}
        <div
          ref={auraRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(640px circle at 50% 42%, rgba(234, 126, 84, 0.06), transparent 70%)',
          }}
        />
      </div>

      {/* 2. Dual Concentric Silk-Glow Aperture Rings Expanding Outward from Portrait Focal Center */}
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[44%] -translate-y-1/2 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.15, opacity: 0 }}
            animate={{ scale: 0.15, opacity: 0 }}
            exit={{
              scale: 25,
              opacity: [0, 0.85, 0.35, 0],
              transition: {
                duration: 0.96,
                times: [0, 0.14, 0.58, 1],
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className="w-24 h-24 rounded-full border border-[#EA7E54]/65 shadow-[0_0_55px_rgba(234,126,84,0.35)] will-change-transform"
          />
          <motion.div
            initial={{ scale: 0.12, opacity: 0 }}
            animate={{ scale: 0.12, opacity: 0 }}
            exit={{
              scale: 22,
              opacity: [0, 0.45, 0],
              transition: {
                duration: 0.94,
                delay: 0.06,
                times: [0, 0.2, 1],
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className="absolute w-24 h-24 rounded-full border border-[#F4F0EA]/25 will-change-transform"
          />
        </div>
      )}

      {/* 3. Lower-Third Symmetrical Cursive Signature Stage (Zero Overlap With Portrait) */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        exit={
          prefersReducedMotion
            ? { opacity: 0, transition: { duration: 0.2, ease: EASE } }
            : {
                opacity: 0,
                scale: 1.09,
                y: 8,
                transition: { duration: 0.46, ease: [0.16, 1, 0.3, 1] },
              }
        }
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-4 sm:pb-6 pt-2 flex flex-col items-center justify-center text-center will-change-transform"
      >
        <motion.div
          aria-hidden="true"
          initial={{
            scaleX: prefersReducedMotion ? 1 : 0,
            opacity: prefersReducedMotion ? 1 : 0,
          }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="w-12 h-[1px] bg-[#EA7E54]/90 mb-1.5 sm:mb-2 mx-auto origin-center"
        />

        <div className="overflow-hidden mb-0 w-full flex justify-center">
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.15 : 1.15,
              delay: prefersReducedMotion ? 0 : 0.45,
              ease: EASE,
            }}
            className="font-serif italic text-base sm:text-lg md:text-xl text-[#E2E0DA] tracking-wide text-center"
          >
            You are watching
          </motion.p>
        </div>

        <div className="relative flex flex-col items-center justify-center w-full overflow-visible">
          <motion.p
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { clipPath: 'inset(-30% 106% -30% -10%)', opacity: 0.7 }
            }
            animate={{
              clipPath: 'inset(-30% -10% -30% -10%)',
              opacity: 1,
              transitionEnd: { clipPath: 'none' },
            }}
            transition={{
              duration: prefersReducedMotion ? 0.15 : 2.35,
              delay: prefersReducedMotion ? 0 : 0.9,
              ease: [0.42, 0, 0.58, 1],
            }}
            className="font-hand font-normal text-[1.95rem]/[1.32] sm:text-[2.25rem]/[1.32] md:text-[2.75rem]/[1.32] lg:text-[3.15rem]/[1.32] !leading-[1.32] text-[#F4F0EA] md:whitespace-nowrap text-center px-3 pt-2 pb-1.5 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]"
          >
            Sarthak Panda&apos;s{' '}
            <span className="text-[#EA7E54] whitespace-nowrap">portfolio</span>
          </motion.p>

          {/* Symmetrical Ink Flourish Positioned Cleanly Below Cursive Descenders */}
          <svg
            aria-hidden="true"
            viewBox="0 0 420 14"
            fill="none"
            className="w-[82%] max-w-[280px] sm:max-w-[360px] h-3 mx-auto mt-1 sm:mt-1.5 overflow-visible pointer-events-none block"
          >
            <motion.path
              d="M 8 9 Q 210 2, 412 9"
              stroke="#EA7E54"
              strokeWidth="2.4"
              strokeLinecap="round"
              initial={{
                pathLength: prefersReducedMotion ? 1 : 0,
                opacity: prefersReducedMotion ? 0.9 : 0,
              }}
              animate={{ pathLength: 1, opacity: 0.92 }}
              transition={{
                pathLength: {
                  duration: prefersReducedMotion ? 0.1 : 1.55,
                  delay: prefersReducedMotion ? 0 : 2.2,
                  ease: [0.35, 0.05, 0.35, 1],
                },
                opacity: {
                  duration: 0.2,
                  delay: prefersReducedMotion ? 0 : 2.2,
                },
              }}
            />
          </svg>
        </div>

        {/* Interactive Enter Cue */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.95,
            delay: prefersReducedMotion ? 0 : 2.8,
            ease: EASE,
          }}
          className="mt-2 sm:mt-2.5 w-full flex justify-center"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss(true);
            }}
            className="group inline-flex flex-wrap items-center justify-center gap-2 text-xs sm:text-[13px] font-sans tracking-[0.14em] uppercase text-[#C4C2BC] hover:text-[#F4F0EA] transition-colors duration-fast cursor-pointer bg-transparent border-0 px-3 py-1.5"
          >
            <span>Press</span>
            <kbd className="px-2 py-0.5 rounded-[5px] border border-white/25 bg-black/50 text-[11px] font-mono text-[#F4F0EA] group-hover:border-[#EA7E54]/75 transition-colors duration-fast">
              Space
            </kbd>
            <span>or</span>
            <kbd className="px-2 py-0.5 rounded-[5px] border border-white/25 bg-black/50 text-[11px] font-mono text-[#F4F0EA] group-hover:border-[#EA7E54]/75 transition-colors duration-fast">
              Enter
            </kbd>
            <span className="text-white/55">to enter</span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Full-Screen Monochrome Portrait & Cursive Opening Slate with Optical Iris Transition.
 */
export function Preloader({ isOpen = true, onClose }) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && <PreloaderStage key="preloader-stage" onClose={onClose} />}
    </AnimatePresence>
  );
}
