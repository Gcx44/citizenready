/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        maple: {
          600: "#D42B2B",
          700: "#B52222",
        },
      },
    },
  },
  plugins: [],
};
