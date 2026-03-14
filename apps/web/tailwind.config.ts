import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maple: {
          50: "#fff1f1",
          100: "#ffe0e0",
          500: "#e53e3e",
          600: "#c53030",
          700: "#9b2c2c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
