import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE, DURATION } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLenis } from '../hooks/useLenis';

/**
 * Pill button component with magnetic desktop pull, smooth fill-slide hover,
 * and warm clay orange slide hover for primary and secondary variants.
 */
export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  target,
  rel,
  ariaLabel,
  type = 'button',
  disabled = false,
  ...props
}) {
  const { prefersReducedMotion, isMobile } = useReducedMotion();
  const { scrollTo } = useLenis();
  const buttonRef = useRef(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  // Handle magnetic desktop hover effect (max 6px pull)
  const handleMouseMove = (event) => {
    if (prefersReducedMotion || isMobile || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

    const maxOffset = 6;
    const factor = 0.2;
    const x = Math.max(-maxOffset, Math.min(maxOffset, distanceX * factor));
    const y = Math.max(-maxOffset, Math.min(maxOffset, distanceY * factor));

    setMagneticOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  const handleClick = (event) => {
    if (href && href.startsWith('#')) {
      event.preventDefault();
      scrollTo(href);
    }
    if (onClick) {
      onClick(event);
    }
  };

  // Variant styling configurations - both primary and secondary have solid filled look and slide into warm clay orange
  const variantStyles = {
    primary: {
      container: 'bg-forest border border-forest group-hover:border-clay',
      slide: 'bg-clay',
      text: 'text-sand group-hover:text-clay-contrast',
    },
    secondary: {
      container: 'bg-forest border border-forest group-hover:border-clay',
      slide: 'bg-clay',
      text: 'text-sand group-hover:text-clay-contrast',
    },
    outline: {
      container: 'bg-transparent border border-forest group-hover:border-clay',
      slide: 'bg-clay',
      text: 'text-forest group-hover:text-clay-contrast',
    },
    highlight: {
      container: 'bg-clay border border-clay group-hover:border-forest',
      slide: 'bg-forest',
      text: 'text-clay-contrast group-hover:text-sand',
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.primary;

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: magneticOffset.x,
        y: magneticOffset.y,
      }}
      transition={{
        duration: DURATION.fast,
        ease: EASE,
      }}
      className={`group relative inline-flex items-center justify-center rounded-pill px-6 py-3 text-sm font-medium tracking-normal overflow-hidden transition-colors cursor-pointer select-none ${currentVariant.container} ${className}`}
      {...props}
    >
      {/* Sliding fill background layer (warm clay orange) */}
      <span
        className={`absolute inset-0 translate-y-full rounded-pill transition-transform ease-earth group-hover:translate-y-0 pointer-events-none duration-fast ${currentVariant.slide}`}
      />

      {/* Button content & text with guaranteed high-contrast hover color */}
      <span className={`relative z-10 inline-flex items-center gap-2 transition-colors duration-fast ${currentVariant.text}`}>
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        aria-label={ariaLabel}
        className="inline-block focus-visible:outline-none"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`inline-block bg-transparent p-0 border-0 focus-visible:outline-none rounded-pill ${disabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
    >
      {content}
    </button>
  );
}
