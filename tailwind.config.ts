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
    },
    colors: {
      //primary: "#4A6A82",
      primary: "#45666A",
      //secondary: "#5E8276",
      secondary: "#577D98",
      //tertiary: "#81819C",
      tertiary: "#45617C",
      //accent: "#0B536C",
      accent: "#879A96",
      //bold: "#C4C5BF",
      bold: "#4B735B",
      white: "#FFFFFF",
      black: "#000000",
    },
  },
  plugins: [],
};
export default config;
