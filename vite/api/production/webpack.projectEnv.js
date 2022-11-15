// const { ENVIRONMENTS } = require('../../src/constants.js');
const rules = require('./rules.js');

module.exports = {
  mode: 'production',
  module: {
    rules,
  },
};
