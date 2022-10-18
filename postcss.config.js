const path = require('path')
const url = require('postcss-url')

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    
    url([
      {
        url: 'inline',
        filter: '**/assets/**/*.png',
        basePath: path.resolve(__dirname, 'src')
      },
      {
        url: 'inline',
        filter: '**/assets/**/*.svg',
        basePath: path.resolve(__dirname, 'src')
      }
    ])
  ],
}
