import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { EASE, DURATION } from '../lib/motion';

export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative p-2.5 rounded-pill border border-hairline bg-surface text-forest hover:text-clay hover:border-forest transition-colors duration-fast focus-visible:outline-none flex items-center justify-center cursor-pointer select-none ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
            className="flex items-center justify-center text-clay"
          >
            <Sun size={18} strokeWidth={1.8} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
            className="flex items-center justify-center text-forest"
          >
            <Moon size={18} strokeWidth={1.8} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
