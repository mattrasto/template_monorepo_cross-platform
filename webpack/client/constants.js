const path = require('path');
const { CLIENT_ROOT } = require('../common/constants.js');

const STATIC_DIRECTORY_NAME = 'static';
const SOURCE_DIRECTORY_NAME = 'src';
const BUNDLES_DIRECTORY_NAME = 'dist';

const CLIENT_FILENAME = 'main.js';
const APP_FILENAME = 'app.js';
const ROOT_HTML_FILENAME = 'index.html';

const PROJECT_ROOT = CLIENT_ROOT;
const OUTPUT_DIRECTORY = path.resolve(PROJECT_ROOT, BUNDLES_DIRECTORY_NAME);
const STATIC_DIRECTORY = path.resolve(PROJECT_ROOT, STATIC_DIRECTORY_NAME);
const SOURCE_DIRECTORY = path.resolve(PROJECT_ROOT, SOURCE_DIRECTORY_NAME);
const MODULES_DIRECTORY = path.resolve(PROJECT_ROOT, 'node_modules');

const CLIENT_ENTRY = path.resolve(SOURCE_DIRECTORY, APP_FILENAME);
const CLIENT_COMPILED = path.resolve(OUTPUT_DIRECTORY, CLIENT_FILENAME);
const CLIENT_HTML_ENTRY = path.resolve(SOURCE_DIRECTORY, ROOT_HTML_FILENAME);

const ALIASES = {
  'vue': '@vue/runtime-dom',
  '@': PROJECT_ROOT,
  '@src': SOURCE_DIRECTORY,
  '@components': path.resolve(SOURCE_DIRECTORY, 'components'),
  '@pages': path.resolve(SOURCE_DIRECTORY, 'pages'),
  '@store': path.resolve(SOURCE_DIRECTORY, 'store'),
  '@api': path.resolve(SOURCE_DIRECTORY, 'api'),
  '@static': STATIC_DIRECTORY,
};

module.exports = {
  OUTPUT_DIRECTORY,
  PROJECT_ROOT,
  CLIENT_COMPILED,
  CLIENT_ENTRY,
  CLIENT_HTML_ENTRY,
  SOURCE_DIRECTORY,
  MODULES_DIRECTORY,
  STATIC_DIRECTORY,
  APP_FILENAME,
  ALIASES,
  STATIC_DIRECTORY_NAME
};
