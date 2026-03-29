// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nexa: {
          primary:   '#6C4FF6',
          secondary: '#9B7FFA',
          accent:    '#C084FC',
          dark:      '#0D0A1E',
          card:      '#1A1535',
          border:    '#2D2550',
        }
      },
      backgroundImage: {
        'card-gradient': 'linear-gradient(135deg, #1A1535, #2D1B5E)',
        'hero-gradient': 'radial-gradient(ellipse at 60% 40%, #4C1D95 0%, #1e1b4b 40%, #0D0A1E 80%)',
      },
    },
  },
  plugins: [],
}