const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const constants = require('./constants.js');

module.exports = {
  // Optimizes output code to run on a server (as opposed to in a browser)
  target: 'node',
  entry: [constants.PROJECT_ENTRY],
  output: {
    filename: constants.ENTRY_FILENAME,
    path: constants.OUTPUT_DIRECTORY,
  },
  resolve: {
    alias: constants.ALIASES,
  },
  // Prevents dependencies from being unecessarily bundled
  externals: [nodeExternals()],
  optimization: {
    nodeEnv: false, // Prevents Webpack from overwriting NODE_ENV
    // No need to minify code for the API
    minimize: false,
  },
  node: {
    // This prevents Webpack from reassigning the value of __dirname to always be '/'
    __dirname: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    // Pass NODE_ENV to client during build
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
};
