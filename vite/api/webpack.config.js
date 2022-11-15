const { merge } = require('webpack-merge');

module.exports = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const commonConfig = require('./webpack.common.js');
  const envConfig = require(`./${nodeEnv}/webpack.projectEnv.js`);
  return merge(commonConfig, envConfig);
};
