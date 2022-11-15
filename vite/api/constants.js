const path = require('path');
// import path from 'path';
const { API_ROOT } = require('../common/constants.js');
const rootConstants = require('../common/constants.js');

const SOURCE_DIRECTORY_NAME = 'src';
const BUNDLES_DIRECTORY_NAME = 'dist';

const ENTRY_FILENAME = 'server.js';

const PROJECT_ROOT = API_ROOT;
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
  '@database': path.resolve(SOURCE_DIRECTORY, 'database.js'),
  '@endpoints': path.resolve(SOURCE_DIRECTORY, 'endpoints'),
  '@models': path.resolve(SOURCE_DIRECTORY, 'models'),
};

// export default {
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