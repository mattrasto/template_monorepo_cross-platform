const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const rules = require('./rules.js');

module.exports = {
  mode: 'production',
  watch: false,
  module: {
    rules
  },
  plugins: [new CleanWebpackPlugin()]
};
