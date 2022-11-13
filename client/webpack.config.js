-require('@babel/register');
const { merge } = require('webpack-merge');

const common = require('./webpack/webpack.common.babel.js');

/* eslint-disable global-require, import/no-dynamic-require */
const env = process.env.NODE_ENV || 'development';
const envConfig = require(`./webpack/${env}/webpack.babel`);

module.exports = merge(common, envConfig);
