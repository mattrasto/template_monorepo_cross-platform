const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const { VueLoaderPlugin } = require('vue-loader');
const constants = require('./constants.js');

module.exports = {
  target: 'web',
  entry: [constants.PROJECT_ENTRY],
  output: {
    publicPath: '/',
    filename: constants.ENTRY_FILENAME,
    path: constants.OUTPUT_DIRECTORY,
  },
  optimization: {
    nodeEnv: false, // Prevents Webpack from overwriting NODE_ENV
  },
  resolve: {
    alias: constants.ALIASES,
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: constants.CLIENT_HTML_ENTRY,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyURLs: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: constants.STATIC_DIRECTORY_NAME,
          to: constants.STATIC_DIRECTORY_NAME,
          noErrorOnMissing: true // TODO: Remove when static files exist
        }
      ]
    }),
    // Pass NODE_ENV to client during build
    new webpack.EnvironmentPlugin({
      API_HOST: null,
      API_PORT: null,
      API_PROTOCOL: null,
      NODE_ENV: null,
      HOST: null,
      PORT: null,
    })
  ]
};
