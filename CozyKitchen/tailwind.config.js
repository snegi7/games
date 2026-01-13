/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../packages/shared/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'game': ['Fredoka', 'Comic Sans MS', 'cursive'],
        'display': ['Bubblegum Sans', 'Comic Sans MS', 'cursive'],
      },
      colors: {
        'kitchen': {
          cream: '#FFF8E7',
          peach: '#FFCBA4',
          coral: '#FF6B6B',
          mint: '#88D8B0',
          sky: '#7EC8E3',
          lavender: '#DDA0DD',
          sunshine: '#FFD93D',
          orange: '#FF9F45',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'steam': 'steam 2s ease-out infinite',
        'coin-fly': 'coin-fly 0.8s ease-out forwards',
        'pop': 'pop 0.3s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'cooking': 'cooking 0.3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)' },
        },
        steam: {
          '0%': { opacity: 0, transform: 'translateY(0) scale(1)' },
          '50%': { opacity: 0.8 },
          '100%': { opacity: 0, transform: 'translateY(-30px) scale(1.5)' },
        },
        'coin-fly': {
          '0%': { 
            transform: 'translate(var(--start-x), var(--start-y)) scale(1)',
            opacity: 1 
          },
          '100%': { 
            transform: 'translate(var(--end-x), var(--end-y)) scale(0.5)',
            opacity: 0 
          },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        cooking: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-2px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-2px) rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
}
