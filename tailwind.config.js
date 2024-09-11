/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-blue': 'rgb(2, 26, 80)',
        'primary-yellow': 'rgb(150, 150, 2)',
      },
    },
  },
  plugins: [],
};

export default config;
