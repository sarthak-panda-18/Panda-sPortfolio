import React, { useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * TiltCard Component.
 * Implements smooth CSS 3D perspective spring tilt on hover (max 8 degrees).
 * Disabled under reduced motion or on mobile/touch devices.
 */
export function TiltCard({ children, className = '', ...props }) {
  const { prefersReducedMotion, isMobile } = useReducedMotion();
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6-8 deg
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }}
      className={`bg-surface border border-hairline rounded-card p-6 md:p-8 transition-colors duration-fast ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
