/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ancient: {
          cream: "#e6e0ae",
          gold: "#dfbc5e",
          red: "#d73c37",
          darkred: "#b51f09",
        },
        gray: {
          900: "#111111",
          800: "#1f1f1f",
          700: "#2a2a2a",
          600: "#3a3a3a",
          500: "#4a4a4a",
        },
      },
      fontFamily: {
        serif: ["Trajan Pro", "Cinzel", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "ancient-texture":
          'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
      },
    },
  },
  plugins: [],
};
