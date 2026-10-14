/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand colours are driven by CSS variables in src/index.css
        // -> change --brand / --brand-deep there to re-theme the whole site.
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          deep: "rgb(var(--brand-deep) / <alpha-value>)",
        },
        ink: "rgb(var(--ink) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Poppins", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-slow": "marquee 55s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
