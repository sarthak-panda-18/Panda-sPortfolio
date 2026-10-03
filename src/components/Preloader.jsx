import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE, DURATION, maskLine, fadeUp } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLenis } from '../hooks/useLenis';

const PRELOADER_STORAGE_KEY = 'sp_portfolio_preloader_seen';

/**
 * Preloader Curtain Component.
 * Plays once per browser session with masked line-by-line typography reveal
 * and smooth upward curtain slide. Click to skip instantly.
 */
export function Preloader({ onComplete }) {
  const { prefersReducedMotion } = useReducedMotion();
  const { stop, start } = useLenis();
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return !sessionStorage.getItem(PRELOADER_STORAGE_KEY);
    } catch {
      return true;
    }
  });

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(PRELOADER_STORAGE_KEY, 'true');
    } catch {}
    setIsVisible(false);
    start();
    if (onComplete) onComplete();
  };

  useEffect(() => {
    if (prefersReducedMotion || !isVisible) {
      handleDismiss();
      return;
    }

    stop();

    // Snappy reveal sequence (total ~1s)
    const exitTimer = setTimeout(() => {
      handleDismiss();
    }, 1100);

    return () => {
      clearTimeout(exitTimer);
      start();
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader-curtain"
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.6,
            ease: EASE,
          }}
          onClick={handleDismiss}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-forest p-8 md:p-16 select-none cursor-pointer"
          title="Click to enter"
        >
          {/* Top metadata tag */}
          <div className="flex items-center justify-between">
            <span className="label text-clay">Personal Portfolio</span>
            <span className="label text-sand/60">2026</span>
          </div>

          {/* Masked name reveal */}
          <div className="flex flex-col space-y-2">
            <div className="overflow-hidden">
              <motion.h1
                variants={maskLine}
                initial="hidden"
                animate="visible"
                className="font-serif text-5xl sm:text-7xl md:text-9xl text-sand tracking-tight leading-none"
              >
                Sarthak
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={maskLine}
                initial="hidden"
                animate="visible"
                transition={{
                  duration: DURATION.reveal,
                  ease: EASE,
                  delay: 0.1,
                }}
                className="font-serif text-5xl sm:text-7xl md:text-9xl text-sand tracking-tight leading-none"
              >
                Panda
              </motion.h1>
            </div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{
                duration: DURATION.reveal,
                ease: EASE,
                delay: 0.2,
              }}
              className="pt-4"
            >
              <span className="label text-clay font-medium tracking-widest">
                Undergraduate Software Engineer
              </span>
            </motion.div>
          </div>

          {/* Bottom status */}
          <div className="flex items-center justify-between text-xs text-sand/50">
            <span>Click anywhere to enter</span>
            <span className="w-12 h-[1px] bg-sand/30" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
