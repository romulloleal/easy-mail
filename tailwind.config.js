/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#d1d5db',
        info: '#16B1FF',
        danger: '#FF4C51',
        warning: '#FFB400',
        confirm: '#56CA00',
      },
    },
  },
  safelist: [
    {
      pattern:
        /(bg|text|border)-(primary|secondary|info|danger|warning|confirm)/,
    },
  ],
  plugins: [],
};
