const path = require('path');

module.exports = {
  build: {
    assetsRoot: path.resolve(__dirname, '../public'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/'
  },
  dev: {
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/'
  }
}
