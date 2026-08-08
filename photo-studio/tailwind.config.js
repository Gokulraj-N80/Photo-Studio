/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#FAF8F4', // Warm paper
        surface: '#F2ECE3', // Alternating bands
        ink: '#1C1917', // Headings
        inkLight: '#57534E', // Body
        accent: '#B08544', // Deep antique gold
        secondary: '#7A6A55', // Muted bronze
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}
