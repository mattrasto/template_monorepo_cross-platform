// import path from 'path';
// import { fileURLToPath } from 'url';
const path = require('path');

const SOURCE_DIRECTORY_NAME = 'src';
const BUNDLES_DIRECTORY_NAME = 'dist';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIRECTORY = path.resolve(PROJECT_ROOT, BUNDLES_DIRECTORY_NAME);
const SOURCE_DIRECTORY = path.resolve(PROJECT_ROOT, SOURCE_DIRECTORY_NAME);

const API_ENTRY = path.resolve(SOURCE_DIRECTORY, 'server.js');

module.exports = {
// export default {
  API_ENTRY,
  OUTPUT_DIRECTORY,
  PROJECT_ROOT,
  SOURCE_DIRECTORY,
};
