import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const constants = require('../../shared/build/constants.js');

export default defineConfig({
  root: constants.SOURCE_DIRECTORY,
  plugins: [vue()],
  resolve: {
    alias: constants.ALIASES,
  },
  define: {
    'process.env': {}
  },
  build: {
    outDir: constants.OUTPUT_DIRECTORY,
    emptyOutDir: true,
  }
});
