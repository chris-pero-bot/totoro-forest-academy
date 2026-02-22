/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-dark': '#2D5016',
        'forest': '#4A7C28',
        'forest-light': '#6AAF35',
        'earth': '#8B6914',
        'sky': '#87CEEB',
        'cream': '#FFF8DC',
        'warm-gray': '#D3D3C7',
        'acorn': '#DAA520',
        'soot': '#2C2C2C',
        'error-soft': '#FF6B6B',
        'success': '#4CAF50',
      },
      fontFamily: {
        heading: ['"Fredoka One"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
