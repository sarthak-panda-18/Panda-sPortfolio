import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav, profile } from '../data/content';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { EASE, DURATION, staggerContainer, fadeUp, maskLine } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLenis } from '../hooks/useLenis';
import { useScrollProgress } from '../hooks/useScrollProgress';

/**
 * Navbar component featuring scroll-direction awareness (hide on scroll down, show on scroll up),
 * active section scroll spy, full-screen mobile menu overlay, and light/dark theme toggle.
 */
export function Navbar({ isReady = true, onOpenPreloader }) {
  const { prefersReducedMotion } = useReducedMotion();
  const { scrollTo, stop, start } = useLenis();
  const sectionIds = nav.map((item) => item.href.replace('#', ''));
  const { activeSection } = useScrollProgress(['hero', ...sectionIds]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const menuRef = useRef(null);

  // 1. Scroll-direction detection & past-hero background toggle
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      const scrollDelta = currentScrollY - lastScrollY;

      // Solid background when scrolled past initial hero zone (~100px)
      setIsScrolled(currentScrollY > 100);

      // Visibility toggle: always visible at the top, hide when scrolling down, reveal when scrolling up
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (scrollDelta > 6) {
        setIsVisible(false); // Scrolling down
      } else if (scrollDelta < -6) {
        setIsVisible(true); // Scrolling up
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Lock scroll & handle Escape key when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      stop();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        start();
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      start();
    }
  }, [isMobileMenuOpen]);

  const handleNavLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollTo(href);
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(false);
    if (onOpenPreloader) {
      onOpenPreloader();
    } else {
      scrollTo('#hero');
    }
  };

  const navItemsExceptContact = nav.slice(0, nav.length - 1);
  const contactItem = nav[nav.length - 1];

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-reveal ease-earth ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-sand/90 backdrop-blur-md border-b border-hairline'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-content mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo / Name - Click to reopen preloader */}
          <button
            type="button"
            onClick={handleBrandClick}
            className="group flex items-center gap-2 font-serif text-2xl sm:text-3xl text-forest hover:text-clay transition-colors duration-fast focus-visible:outline-none cursor-pointer bg-transparent border-0 p-0 text-left"
            aria-label={`${profile.name} - Open intro cover`}
            title="Click to view opening screen"
          >
            <span>{profile.name}</span>
            <span className="text-[10px] uppercase font-sans tracking-widest text-clay font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-fast hidden lg:inline">
              ✦ Intro
            </span>
          </button>

          {/* Desktop Navigation Links & Controls */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-7" aria-label="Main Navigation">
              {navItemsExceptContact.map((item) => {
                const targetId = item.href.replace('#', '');
                const isActive = activeSection === targetId;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavLinkClick(e, item.href)}
                    className={`group relative py-1 text-sm font-medium tracking-normal transition-colors duration-fast focus-visible:outline-none ${
                      isActive ? 'text-forest font-semibold' : 'text-forest-muted hover:text-forest'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    {/* Underline indicator */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] transition-transform duration-fast ease-earth origin-left ${
                        isActive
                          ? 'bg-clay scale-x-100'
                          : 'bg-forest scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                );
              })}

              {/* Contact CTA pill */}
              {contactItem && (
                <Button
                  variant="highlight"
                  href={contactItem.href}
                  className="text-xs px-5 py-2.5"
                >
                  {contactItem.label}
                </Button>
              )}
            </nav>

            {/* Dark / Light Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Right Controls: Theme Toggle + Hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              className="p-2 text-forest hover:text-clay transition-colors duration-fast focus-visible:outline-none"
            >
              {isMobileMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            ref={menuRef}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
            className="fixed inset-0 z-50 bg-sand flex flex-col justify-between p-8 pt-24 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between absolute top-6 left-6 right-6">
              <span className="font-serif text-2xl text-forest">{profile.name}</span>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 text-forest hover:text-clay transition-colors duration-fast"
                >
                  <X size={28} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Nav links with staggered animation */}
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col space-y-6 my-auto"
            >
              {nav.map((item) => {
                const targetId = item.href.replace('#', '');
                const isActive = activeSection === targetId;

                return (
                  <motion.div key={item.label} variants={fadeUp}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavLinkClick(e, item.href)}
                      className={`font-serif text-4xl block transition-colors duration-fast ${
                        isActive ? 'text-clay underline underline-offset-8' : 'text-forest hover:text-clay'
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Bottom metadata */}
            <div className="border-t border-hairline pt-6 flex flex-col space-y-2">
              <span className="label text-clay">Available for Internships & Roles</span>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm text-forest font-medium hover:text-clay transition-colors duration-fast"
              >
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
