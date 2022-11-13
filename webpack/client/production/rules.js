const constants = require('../constants');

module.exports = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    include: [constants.SOURCE_DIRECTORY, constants.MODULES_DIRECTORY]
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [constants.SOURCE_DIRECTORY]
  },
  {
    test: /\.css$/,
    use: ['vue-style-loader', { loader: 'css-loader' }]
  },
  {
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      { loader: 'css-loader' },
      { loader: 'sass-loader' }
    ]
  },
  {
    test: /\.sass$/,
    use: [
      'vue-style-loader',
      { loader: 'css-loader' },
      { loader: 'sass-loader' }
    ]
  },
  {
    test: /\.(png|jpe?g|gif)(\?.*)?$/,
    loader: 'file-loader'
  },
  {
    test: /\.svg$/,
    loader: 'vue-svg-loader'
  }
];
