import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          light: "#598388",
          DEFAULT: "#45666A",
          dark: "#385356",
        },
        secondary: {
          light: "#7194AD",
          DEFAULT: "#577D98",
          dark: "#4A6B82",
        },
        tertiary: {
          light: "#587C9D",
          DEFAULT: "#45617C",
          dark: "#3B5268",
        },
        accent: {
          light: "#A6B5B2",
          DEFAULT: "#879A96",
          dark: "#7A908B",
        },
        compliment: {
          light: "#619475",
          DEFAULT: "#4B735B",
          dark: "#40634E",
        },
      },
    },
  },
  plugins: [],
};
export default config;
