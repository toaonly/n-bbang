module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.scss',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '360px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1440px',
      xxxl: '1920px',
    },
    extend: {},
  },
  plugins: [],
}
