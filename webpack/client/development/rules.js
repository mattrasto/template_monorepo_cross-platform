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
    use: [
      'vue-style-loader',
      { loader: 'css-loader', options: { sourceMap: true } }
    ]
  },
  {
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'sass-loader', options: { sourceMap: true } }
    ]
  },
  {
    test: /\.sass$/,
    use: [
      'vue-style-loader',
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'sass-loader', options: { sourceMap: true } }
    ]
  },
  {
    test: /\.(png|jpe?g|gif)(\?.*)?$/,
    loader: 'file-loader'
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: ['file-loader']
  },
  {
    test: /\.svg$/,
    loader: 'vue-svg-loader'
  }
];
