/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff2e63',
          purple: '#aa2eff',
          cyan: '#00f0ff',
          yellow: '#ffd700',
          green: '#00d26a',
        },
        warm: {
          100: '#fff5f0',
          500: '#ff8c42',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Poppins"', 'sans-serif'],
      },
      animation: {
        'bounce-fast': 'bounce 0.8s infinite',
        'pulse-glow': 'pulseGlow 1.5s ease-in-out infinite',
        'float-bob': 'floatBob 2s ease-in-out infinite',
        'shake': 'shake 0.4s ease-in-out 2',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { textShadow: '0 0 2px #ff2e63, 0 0 5px #ff2e63' },
          '50%': { textShadow: '0 0 10px #ff2e63, 0 0 20px #aa2eff' },
        },
        floatBob: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-3px)' },
          '75%': { transform: 'translateX(3px)' },
        },
      },
    },
  },
  plugins: [],
}