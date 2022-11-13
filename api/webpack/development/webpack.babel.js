const { ENVIRONMENTS } = require('../../src/constants.js');
const rules = require('./rules.js');

module.exports = {
  mode: ENVIRONMENTS.DEV,
  devtool: 'inline-source-map',
  module: {
    rules,
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500,
    poll: 1000,
  },
};
