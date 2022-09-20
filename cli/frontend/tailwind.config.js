/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'sandworm-yellow': '#FFCD53',
        'sandworm-yellow-light': '#FFECC0',
        'custom-light-gray': 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
