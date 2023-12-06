/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'my-primary': '#122161',
        'my-secondary': '#8C32FF',
        'my-tertiary': '#5EC0ED',
        'my-accent': '#C3E435',
        'my-light': '#F8F8F8',
      },
    },
  },
  plugins: [],
};
