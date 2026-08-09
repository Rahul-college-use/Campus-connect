/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Custom Breakpoint Screen Definitions
    screens: {
      'sm': '640px',   // Mobile landscape / small tablets
      'md': '768px',   // Tablets
      'lg': '1024px',  // Laptops / Desktops
      'xl': '1280px',  // Large desktops
      '2xl': '1536px', // Ultra-wide displays
    },
    extend: {
      // Centered Container Defaults
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',   // 16px mobile
          sm: '1.5rem',      // 24px tablet
          lg: '2rem',        // 32px desktop
        },
        screens: {
          sm: '600px',
          md: '720px',
          lg: '960px',
          xl: '1200px',
          '2xl': '1400px',
        },
      },
      // Custom Animation Keyframes for Toasts/Modals
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-in': 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.2s ease-in-out',
      },
    },
  },
  plugins: [],
};