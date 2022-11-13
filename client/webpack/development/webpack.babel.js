const webpack = require('webpack');
const constants = require('../constants.js');
const rules = require('./rules.js');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules
  },
  devServer: {
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    port: 8080,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
