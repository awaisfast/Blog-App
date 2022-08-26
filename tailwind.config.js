/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}", "./src/components/**/*.{html,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "signup-background": "url('/src/assets/bg-img.jpg')",
        "login-background": "url('/src/assets/bg-img.jpg')",
      },
      fontFamily: {
        serif: "DM Serif Display",
        lexend: "Lexend Deca",
      },
    },
    screens: {
      tablet: "800px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
