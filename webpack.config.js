const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    home: './src/home',
    about: './src/about',
    services: './src/services',
    reviews: './src/reviews'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader']
        })
      },
      {
        test: /\.(jpg|jpeg|svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css')
  ],
  devServer: {
    compress: true,
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
}
