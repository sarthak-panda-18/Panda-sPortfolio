import React from 'react';

export function CodeChefIcon({ size = 24, strokeWidth = 1.75, className = '', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M 10 9.25 A 3.5 3.5 0 0 0 3 9.25 V 14.75 A 3.5 3.5 0 0 0 10 14.75" />
      <path d="M 21 9.25 A 3.5 3.5 0 0 0 14 9.25 V 14.75 A 3.5 3.5 0 0 0 21 14.75" />
    </svg>
  );
}

