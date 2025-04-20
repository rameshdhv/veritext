/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9ed700', // Darker lemon green
          hover: '#8bc100',   // Even darker lemon green
          foreground: '#111111', // Dark text on lemon green
        },
        accent: '#d1e986',    // Softer light green accent
        blue: {
          600: '#9ed700',     // Replace blue with darker lemon green
          700: '#8bc100',     // Replace darker blue with even darker lemon green
          800: '#78aa00',     // Even more darker lemon green
        },
      },
    },
  },
  plugins: [],
}; 