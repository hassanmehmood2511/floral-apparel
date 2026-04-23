/**
 * Purpose: Tailwind CSS configuration file
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        pistachio: {
          DEFAULT: 'var(--pistachio)',
          light: 'var(--pistachio-light)',
          dark: 'var(--pistachio-dark)',
        },
        blush: {
          DEFAULT: 'var(--blush)',
          light: 'var(--blush-light)',
          dark: 'var(--blush-dark)',
        },
        cream: 'var(--cream)',
        charcoal: 'var(--charcoal)',
      },
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-3deg)' },
          '50%': { transform: 'translateY(-15px) rotate(-1deg)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slideUp 0.8s ease-out forwards',
        float: 'float 5s ease-in-out infinite',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
