const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#DC3434",
        },
        secondary: {
          DEFAULT: "#101010",
          400: "#404852",
        },
        typography: {
          DEFAULT: "#262A41",
          400: "#273240",
        },
        gray: {
          DEFAULT: "#E2E8F0",
          400: "#F9FAFC",
        },
        green: {
          DEFAULT: "#31BA96",
        },
        danger: {
          DEFAULT: "#DC3434",
          foreground: "#DC3434",
        },
      },
    },
  },
  plugins: [nextui({})],
};
