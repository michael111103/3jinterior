/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf9ee',
          100: '#faf0d0',
          200: '#f4de9d',
          300: '#ecc760',
          400: '#e4b02e',
          500: '#d4980f',
          600: '#b87a0a',
          700: '#8f5a0c',
          800: '#754910',
          900: '#633c11',
        },
        dark: {
          900: '#0a0804',
          800: '#120f06',
          700: '#1c1608',
          600: '#27200d',
        },
        cream: '#fdf6e3',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        shimmer: { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseGold: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,152,15,0.4)' }, '50%': { boxShadow: '0 0 0 14px rgba(212,152,15,0)' } },
      },
    },
  },
  plugins: [],
}
