const path = require('path');
const rootConstants = require('../../shared/build/constants.js');

const STATIC_DIRECTORY_NAME = 'static';
const SOURCE_DIRECTORY_NAME = 'src';
const BUNDLES_DIRECTORY_NAME = 'dist';

const ENTRY_FILENAME = 'app.js';
const ROOT_HTML_FILENAME = 'index.html';

const PROJECT_ROOT = rootConstants.CLIENT_ROOT;
const OUTPUT_DIRECTORY = path.resolve(PROJECT_ROOT, BUNDLES_DIRECTORY_NAME);
const STATIC_DIRECTORY = path.resolve(PROJECT_ROOT, STATIC_DIRECTORY_NAME);
const SOURCE_DIRECTORY = path.resolve(PROJECT_ROOT, SOURCE_DIRECTORY_NAME);

const PROJECT_ENTRY = path.resolve(SOURCE_DIRECTORY, ENTRY_FILENAME);
const CLIENT_HTML_ENTRY = path.resolve(SOURCE_DIRECTORY, ROOT_HTML_FILENAME);

const ALIASES = {
  '@': PROJECT_ROOT,
  '@config': path.resolve(PROJECT_ROOT, 'config'),
  '@src': SOURCE_DIRECTORY,
  '@components': path.resolve(SOURCE_DIRECTORY, 'components'),
  '@pages': path.resolve(SOURCE_DIRECTORY, 'pages'),
  '@stores': path.resolve(SOURCE_DIRECTORY, 'stores'),
  '@api': path.resolve(SOURCE_DIRECTORY, 'api'),
  '@analytics': path.resolve(SOURCE_DIRECTORY, 'analytics'),
  '@static': STATIC_DIRECTORY,
};

module.exports = {
  ...rootConstants,
  ALIASES: {
    ...ALIASES,
    ...rootConstants.ALIASES
  },
  OUTPUT_DIRECTORY,
  PROJECT_ENTRY,
  CLIENT_HTML_ENTRY,
  SOURCE_DIRECTORY,
  STATIC_DIRECTORY,
  ENTRY_FILENAME,
  STATIC_DIRECTORY_NAME
};
