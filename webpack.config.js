const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    admin: './src/admin',
    layout: './src/layout',
    home: './src/home',
    about: './src/about',
    events: './src/events',
    form: './src/form',
    login: './src/login',
    services: './src/services',
    reviews: './src/reviews'
  },
  output: {
    filename: 'js/[name].bundle.js',
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
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].bundle.css')
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
