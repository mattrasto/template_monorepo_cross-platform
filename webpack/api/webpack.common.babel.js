const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
  // Optimizes output code to run on a server (as opposed to in a browser)
  target: 'node',
  entry: ['@src/server.js'],
  output: {
    filename: 'server-compiled.js',
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
    __dirname: false, // This prevents Webpack from reassigning the value of __dirname to always be '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    // Pass NODE_ENV to client during build
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
};
