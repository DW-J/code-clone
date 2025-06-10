/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50% - 2rem))' }
        },
        slideRight: {
          '0%': { transform: 'translateX(calc(-50% - 2rem))' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        slideLeft: 'slideLeft var(--slide-speed, 30s) linear infinite',
        slideRight: 'slideRight var(--slide-speed, 30s) linear infinite'
      }
    }
  },
  plugins: [],
}

