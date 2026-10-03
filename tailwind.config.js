/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sand: "rgb(var(--color-sand) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        forest: {
          DEFAULT: "rgb(var(--color-forest) / <alpha-value>)",
          muted: "rgb(var(--color-forest-muted) / <alpha-value>)",
        },
        clay: {
          DEFAULT: "rgb(var(--color-clay) / <alpha-value>)",
          contrast: "rgb(var(--color-clay-contrast) / <alpha-value>)",
        },
        hairline: "rgb(var(--color-hairline) / <alpha-value>)",
      },
      fontFamily: {
        serif: ['"DM Serif Display"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        pill: "9999px",
      },
      maxWidth: {
        content: "1100px",
      },
      transitionTimingFunction: {
        earth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        fast: "200ms",
        reveal: "600ms",
      },
    },
  },
  plugins: [],
};
