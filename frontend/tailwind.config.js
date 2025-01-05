/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7fe",
          100: "#ddebfc",
          200: "#c3ddfa",
          300: "#99c9f7",
          400: "#69acf1",
          500: "#468ceb",
          DEFAULT: "#468ceb",
          600: "#3773e0",
          700: "#285acd",
          800: "#274aa6",
          900: "#254183",
          950: "#1b2950"
        },
        border: {
          DEFAULT: colors.gray[300],
          dark: colors.gray[700]
        }
      }
    }
  },
  plugins: []
};
