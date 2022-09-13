/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}", "./src/components/**/*.{html,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        navshadow: "0 -6mm 4mm white",
      },
      backgroundImage: {
        authbackground: "url('/src/assets/bg-img.jpg')",
        "login-background": "url('/src/assets/bg-img.jpg')",
      },
      fontFamily: {
        serif: "DM Serif Display",
        lexend: "Lexend Deca",
      },
      colors: {
        primary: "#56CC6A",
        darkgrey: "#272727",
        lightgrey: "#A5A5A5",
      },
    },
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
