import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        onyx: '#0a0a0a',
        cotton: '#f5f3ee',
        copper: '#b87333',
        kinetic: '#e8ff00',
        lab: {
          50: '#f5f5f4',
          100: '#e7e5e4',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },
      letterSpacing: {
        brand: '0.32em',
      },
      animation: {
        scan: 'scan 3s linear infinite',
        flicker: 'flicker 4s infinite',
        pulse_slow: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(2000%)' },
        },
        flicker: {
          '0%,19.9%,22%,62.9%,64%,64.9%,70%,100%': { opacity: '1' },
          '20%,21.9%,63%,63.9%,65%,69.9%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
