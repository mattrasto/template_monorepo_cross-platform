require('@babel/register');
const { merge } = require('webpack-merge');

module.exports = (env) => {
  const project = env.project;
  const nodeEnv = process.env.NODE_ENV || 'development';
  const projectCommonConfig = require(`./${project}/webpack.projectCommon.js`);
  const projectEnvConfig = require(`./${project}/${nodeEnv}/webpack.projectEnv.js`);
  return merge(projectCommonConfig, projectEnvConfig);
}
