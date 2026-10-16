/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        hierro: '#000000',
        tiza: '#F1F1EF',
        acero: '#A1A1A1',
        plomo: '#2B2B2B',
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'Impact', '"Arial Narrow"', 'sans-serif'],
        body: ['Archivo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
