const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@locales': path.resolve(__dirname, 'src/i18n/locales'),
      '@DeckStorage': path.resolve(__dirname, 'src/DeckStorage.js')
    }
  }
  // configure: {
  //   output: {
  //     publicPath: '/public/'
  //   }
  // }
};