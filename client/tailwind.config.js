
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm2': '1317px', // Example custom screen size
        'sm1': '900px', // Example custom screen size
      },
    },
  },
  plugins: [],
}