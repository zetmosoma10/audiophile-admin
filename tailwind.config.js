/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ORANGE: "#D87D4A",
        LIGHT_ORANGE: "#FBAF85",
        RED: "#CD2C2C",
        BLACK: "#000",
        BLACK_2: "#101010",
        GREY: "#4C4C4C",
        LIGHT_GREY: "#CFCFCF",
        WHITE: "#FFF",
        WHITE_2: "#FAFAFA",
        LIGHT_GREY: "#F1F1F1",
      },
      screens: {
        large_tablet: "920px",
      },
    },
  },
  plugins: [],
};
