/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          300: '#cbd5e1',
          800: '#1e293b',
          950: '#020617',
        },
        cyan: {
          500: '#06b6d4',
        }
      }
    },
  },
  plugins: [],
}
