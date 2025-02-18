/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ORANGE: "#D87D4A",
        LIGHT_ORANGE: "#FBAF85",
      },
      screens: {
        large_tablet: "920px",
      },
    },
  },
  plugins: [],
};
