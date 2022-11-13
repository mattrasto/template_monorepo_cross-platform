-require('@babel/register');
const { merge } = require('webpack-merge');

module.exports = (env) => {
  console.log(env.project);
  const nodeEnv = process.env.NODE_ENV || 'development';
  const commonConfig = require(`./common/webpack.common.babel.js`);
  const projectCommonConfig = require(`./${env.project}/webpack.common.babel.js`);
  const projectEnvConfig = require(`./${env.project}/${nodeEnv}/webpack.babel`);
  return merge(commonConfig, projectCommonConfig, projectEnvConfig);
}
