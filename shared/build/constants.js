const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SHARED_ROOT = path.resolve(REPO_ROOT, 'shared');
const CLIENT_ROOT = path.resolve(REPO_ROOT, 'client');
const API_ROOT = path.resolve(REPO_ROOT, 'api');

const MODULES_DIRECTORY = path.resolve(REPO_ROOT, 'node_modules');

const ALIASES = {
  '@client': CLIENT_ROOT,
  '@shared': SHARED_ROOT,
  '@utils': path.resolve(SHARED_ROOT, 'utils'),
  '@logging': path.resolve(SHARED_ROOT, 'utils', 'logging.js'),
  '@services': path.resolve(SHARED_ROOT, 'utils', 'services'),
  '@mutators': path.resolve(SHARED_ROOT, 'mutators'),
};

module.exports = {
  REPO_ROOT,
  SHARED_ROOT,
  CLIENT_ROOT,
  API_ROOT,
  MODULES_DIRECTORY,
  ALIASES,
};
