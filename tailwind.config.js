/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Title: ["Amatic SC", "cursive"],
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("daisyui")],
};
