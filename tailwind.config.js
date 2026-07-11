 /** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif', 'lato'],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "graph-column-in": {
          "0%": { opacity: "0", transform: "scaleY(0.4)" },
          "100%": { opacity: "1", transform: "scaleY(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.55s ease-out forwards",
        "graph-column-in": "graph-column-in 0.35s ease-out forwards",
      },
    },
    screens: {
      xxsm: "358px",
      xsm: "480px",
      sm: "640px",
      md: "760px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
  },
  plugins: [],
}