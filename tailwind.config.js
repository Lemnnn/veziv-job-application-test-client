/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Chakra Petch", "sans-serif"],
      body: ["Chakra Petch", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#c8c9cb",
        accent: "#7d7e82",
        secondary: "#e5e5e6",
        background: "#ededee",
        text: "#161717",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
