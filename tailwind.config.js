/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{tsx,ts}",
    "./src/components/*.{tsx,ts}",
  ],
  theme: {
    extend: {
      colors: {
        darkGray: "#252525",
        secondaryGray: "#2A2A2A",
        lightGray: "#3A3A3A",
        primaryRed: "#DA4040",
        lightRed: "#e67373",
        backgroundRed: "#803333",
        secondaryRed: "#963636",
        darkRed: "#4A2B2B",
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [],
}
