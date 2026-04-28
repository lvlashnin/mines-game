/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        game: {
          bg: "#07080f",
          panel: "#0e1119",
          border: "#1a1f2e",
          gem: "#22c55e",
          mine: "#ef4444",
          hidden: "#1a1f2e",
          hover: "#252d3f",
        },
      },
    },
  },
  plugins: [],
};
