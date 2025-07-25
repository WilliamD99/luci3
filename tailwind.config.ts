import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        nunito: ['var(--font-nunito)'],
      },
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xl2: "1920px",
    },
  },
  plugins: [],
};
export default config;
