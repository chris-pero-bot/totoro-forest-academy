/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-dark': '#1a3a0a',
        'forest': '#2d5016',
        'forest-mid': '#4a7c28',
        'forest-light': '#6aaf35',
        'forest-pale': '#e8f5d4',
        'earth': '#8b6914',
        'earth-dark': '#5c4510',
        'sky': '#87ceeb',
        'sky-light': '#b8e4f7',
        'cream': '#fff8dc',
        'cream-dark': '#f0e6b8',
        'warm-gray': '#d3d3c7',
        'acorn': '#daa520',
        'acorn-light': '#f0c850',
        'acorn-glow': '#ffd700',
        'soot': '#2c2c2c',
        'error-soft': '#ff6b6b',
        'error-bg': '#fff0f0',
        'success': '#4caf50',
        'success-bg': '#f0fff0',
        'panel': 'rgba(255, 255, 255, 0.85)',
        'panel-dark': 'rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        heading: ['"Fredoka One"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
