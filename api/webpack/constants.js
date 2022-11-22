const path = require('path');
const rootConstants = require('../../shared/build/constants.js');

const SOURCE_DIRECTORY_NAME = 'src';
const BUNDLES_DIRECTORY_NAME = 'dist';

const ENTRY_FILENAME = 'server.js';

const PROJECT_ROOT = rootConstants.API_ROOT;
const OUTPUT_DIRECTORY = path.resolve(PROJECT_ROOT, BUNDLES_DIRECTORY_NAME);
const SOURCE_DIRECTORY = path.resolve(PROJECT_ROOT, SOURCE_DIRECTORY_NAME);

const PROJECT_ENTRY = path.resolve(SOURCE_DIRECTORY, ENTRY_FILENAME);

const ALIASES = {
  '@': PROJECT_ROOT,
  '@config': path.resolve(PROJECT_ROOT, 'config'),
  '@src': SOURCE_DIRECTORY,
  '@actions': path.resolve(SOURCE_DIRECTORY, 'actions'),
  '@controllers': path.resolve(SOURCE_DIRECTORY, 'controllers'),
  '@constants': path.resolve(SOURCE_DIRECTORY, 'constants.js'),
  '@database': path.resolve(SOURCE_DIRECTORY, 'database', 'database.js'),
  '@endpoints': path.resolve(SOURCE_DIRECTORY, 'endpoints'),
  '@models': path.resolve(SOURCE_DIRECTORY, 'models'),
};

module.exports = {
  ...rootConstants,
  ALIASES: {
    ...ALIASES,
    ...rootConstants.ALIASES
  },
  PROJECT_ENTRY,
  ENTRY_FILENAME,
  OUTPUT_DIRECTORY,
};
