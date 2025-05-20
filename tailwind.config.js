/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mauve: {
          50: '#f8f6f7',
          100: '#f0edef',
          200: '#e6e2e5',
          300: '#d8d3d7',
          400: '#c5bfc4',
          500: '#b3acb1',
          600: '#9f979d',
          700: '#8a8288',
          800: '#756d73',
          900: '#60585e',
          950: '#4a4348',
        },
      },
    },
  },
  plugins: [],
} 