const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const { VueLoaderPlugin } = require('vue-loader');
const rootConstants = require('../common/constants.js');
const projectConstants = require('./constants.js');

const constants = {
  ...rootConstants,
  ...projectConstants,
  ALIASES: {
    ...rootConstants.ALIASES,
    ...projectConstants.ALIASES,
  },
}

module.exports = {
  target: 'web',
  entry: [constants.CLIENT_ENTRY],
  output: {
    filename: constants.APP_FILENAME,
    path: constants.OUTPUT_DIRECTORY,
    publicPath: '/'
  },
  resolve: {
    modules: ['src', 'static', 'node_modules'], // Base paths for absolute imports
    extensions: ['*', '.js', '.scss', '.css', '.vue'],
    alias: constants.ALIASES
  },
  optimization: {
    nodeEnv: false // Prevents Webpack from overwriting NODE_ENV
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
      COMMIT_REF: process.env.COMMIT_REF || '',
      BUILD_VERSION: process.env.BUILD_VERSION || '',
    })
  ]
};
