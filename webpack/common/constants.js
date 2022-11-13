const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SHARED_ROOT = path.resolve(REPO_ROOT, 'shared');
const CLIENT_ROOT = path.resolve(REPO_ROOT, 'client');

const MODULES_DIRECTORY = path.resolve(REPO_ROOT, 'node_modules');

// console.log('REPO_ROOT', REPO_ROOT);

const ALIASES = {
  '@': REPO_ROOT,
  '@client': CLIENT_ROOT,
  '@shared': SHARED_ROOT,
  '@utils': path.resolve(SHARED_ROOT, 'utils')
};

module.exports = {
  REPO_ROOT,
  SHARED_ROOT,
  CLIENT_ROOT,
  MODULES_DIRECTORY,
  ALIASES,
};
