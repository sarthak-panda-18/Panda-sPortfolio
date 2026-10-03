import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Code2, Terminal, Award } from 'lucide-react';
import { profile, hero, social, contact } from '../data/content';
import { Button } from '../components/Button';
import {
  EASE,
  DURATION,
  staggerContainer,
  fadeUp,
  maskLine,
  fade,
  getMotionVariant,
} from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Hero Section Component.
 * Features masked name reveal, rotating tagline, dual CTA buttons,
 * dynamic social icon links, animated scroll cue, and scroll-linked fadeout.
 */
export function Hero({ isReady = true }) {
  const { prefersReducedMotion } = useReducedMotion();
  const textColumnRef = useRef(null);

  // 1. Tagline rotation state
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isEntranceFinished, setIsEntranceFinished] = useState(false);

  // Set entrance finished flag after animation duration
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsEntranceFinished(true);
      return;
    }
    if (isReady) {
      const timer = setTimeout(() => {
        setIsEntranceFinished(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isReady, prefersReducedMotion]);

  // Rotate tagline every 2.6 seconds (pauses when tab is hidden or before entrance finishes)
  useEffect(() => {
    if (prefersReducedMotion || !isEntranceFinished) return;

    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        setCurrentRoleIndex((prev) => (prev + 1) % profile.roles.length);
      }
    }, 2600);

    return () => clearInterval(interval);
  }, [isEntranceFinished, prefersReducedMotion]);

  // 2. Scroll-linked fade & drift of text column (direct DOM update, zero React re-render)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!textColumnRef.current) return;
      const scrollY = window.scrollY;
      const fadeDistance = window.innerHeight * 0.75;
      
      // At scrollY = 0, opacity is 1.0 (100% full rich forest contrast)
      const fraction = Math.min(1, Math.max(0, scrollY / fadeDistance));
      const opacity = Math.max(0, 1 - fraction * 1.3);
      const translateY = -fraction * 36;

      textColumnRef.current.style.opacity = `${opacity}`;
      textColumnRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize immediately at 100% opacity
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  // 3. Social links filtering (render only non-empty entries)
  const socialEntries = [
    { key: 'github', label: 'GitHub', url: social.github, icon: Github },
    { key: 'linkedin', label: 'LinkedIn', url: social.linkedin, icon: Linkedin },
    { key: 'leetcode', label: 'LeetCode', url: social.leetcode, icon: Code2 },
    { key: 'codechef', label: 'CodeChef', url: social.codechef, icon: Terminal },
    { key: 'hackerrank', label: 'HackerRank', url: social.hackerrank, icon: Award },
  ].filter((item) => item.url && item.url.trim().length > 0);

  // Motion variants with reduced motion support
  const activeContainerVariant = prefersReducedMotion ? fade : staggerContainer;
  const activeLineVariant = prefersReducedMotion ? fade : maskLine;
  const activeFadeVariant = prefersReducedMotion ? fade : fadeUp;

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="section min-h-[100svh] flex flex-col justify-center relative pt-28 md:pt-32 pb-16 bg-transparent"
    >
      <div className="max-w-content mx-auto px-6 w-full flex-grow flex flex-col justify-center">
        {/* Left-aligned text container (Desktop: ~54% width to ensure zero overlap with right 3D cluster) */}
        <div
          ref={textColumnRef}
          style={{ opacity: 1 }}
          className="w-full lg:w-[58%] xl:w-[54%] will-change-transform"
        >
          <motion.div
            variants={activeContainerVariant}
            initial="hidden"
            animate={isReady ? 'visible' : 'hidden'}
            className="flex flex-col items-start"
          >
            {/* 1. Location & Availability badge */}
            <motion.div variants={activeFadeVariant} className="flex flex-wrap items-center gap-2 mb-3">
              <span className="label text-clay">{profile.location}</span>
              <span className="text-hairline select-none">•</span>
              <span className="label text-forest-muted">{contact.availability}</span>
            </motion.div>

            {/* 2. Accessible Single H1 + Masked Typography Display */}
            <h1 className="sr-only">{profile.name} — Portfolio</h1>

            <div
              aria-hidden="true"
              className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[5.75rem] text-forest font-normal tracking-tight leading-[0.95] my-2 select-none"
            >
              {/* Line 1: Sarthak */}
              <div className="overflow-hidden pb-1">
                <motion.div variants={activeLineVariant}>
                  Sarthak
                </motion.div>
              </div>

              {/* Line 2: Panda */}
              <div className="overflow-hidden pb-2">
                <motion.div
                  variants={activeLineVariant}
                  transition={{
                    duration: DURATION.reveal,
                    ease: EASE,
                    delay: prefersReducedMotion ? 0 : 0.08,
                  }}
                >
                  Panda
                </motion.div>
              </div>
            </div>

            {/* 3. Rotating Tagline */}
            <motion.div
              variants={activeFadeVariant}
              className="h-8 sm:h-9 overflow-hidden relative w-full my-2"
              aria-live="off"
            >
              {/* Accessible copy for screen readers */}
              <span className="sr-only">Specializing in: {profile.roles.join(', ')}</span>

              {prefersReducedMotion ? (
                <div className="font-serif italic text-xl sm:text-2xl text-clay">
                  {profile.roles[0]}
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRoleIndex}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{
                      duration: DURATION.reveal,
                      ease: EASE,
                    }}
                    className="font-serif italic text-xl sm:text-2xl text-clay absolute inset-0 flex items-center"
                  >
                    {profile.roles[currentRoleIndex]}
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>

            {/* 4. One-line Intro */}
            <motion.p
              variants={activeFadeVariant}
              className="text-base sm:text-lg md:text-xl text-forest-muted font-normal leading-relaxed max-w-xl mt-3 mb-8"
            >
              {profile.intro}
            </motion.p>

            {/* 5. Dual CTA Buttons */}
            <motion.div
              variants={activeFadeVariant}
              className="flex flex-wrap gap-4 items-center mb-8"
            >
              <Button variant="primary" href="#projects" ariaLabel="View my work projects">
                {hero.primaryCta}
              </Button>
              <Button variant="secondary" href="#contact" ariaLabel="Get in touch with Sarthak">
                {hero.secondaryCta}
              </Button>
            </motion.div>

            {/* 6. Social Links Row (Rendered only if links are configured) */}
            {socialEntries.length > 0 && (
              <motion.div
                variants={activeFadeVariant}
                className="flex items-center space-x-3 pt-2"
                aria-label="Social and coding profiles"
              >
                {socialEntries.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.key}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${profile.name} on ${item.label}`}
                      className="p-2.5 rounded-pill border border-hairline bg-surface text-forest hover:text-clay hover:border-forest transition-colors duration-fast focus-visible:outline-none"
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </a>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
