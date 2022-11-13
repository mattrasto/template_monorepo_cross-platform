const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const path = require('path');
const { ENVIRONMENTS } = require('../src/constants.js');
const paths = require('./paths.js');

module.exports = {
  // Optimizes output code to run on a server (as opposed to in a browser)
  target: 'node',
  entry: ['./src/server.js'],
  output: {
    filename: 'server-compiled.js',
    path: paths.OUTPUT_DIRECTORY,
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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || ENVIRONMENTS.DEV),
    }),
  ],
};
