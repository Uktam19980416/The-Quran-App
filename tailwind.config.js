/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    clipPath: {
      polygon: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    },
  },
  daisyui: {
    themes: ['light', 'dark', 'sunset'],
  },
  plugins: [require('daisyui')],
}

