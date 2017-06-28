const path = require('path');

const config = require('./build/config');
const utils = require('./build/utils');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  entry: {
    admin: './src/routes/admin',
    layout: './src/routes/layout',
    index: './src/routes/index',
    about: './src/routes/about',
    events: './src/routes/events',
    contact: './src/routes/contact',
    login: './src/routes/login',
    services: './src/routes/services',
    reviews: './src/routes/reviews'
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].bundle.js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
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
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('imgs/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('svgs/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('videos/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].bundle.css')
  ],
  devServer: {
    compress: true,
    publicPath: '/',
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
}
