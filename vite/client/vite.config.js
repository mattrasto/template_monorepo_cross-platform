import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const constants = require('./constants.js');

console.log(0, constants.SOURCE_DIRECTORY);
console.log(1, constants.OUTPUT_DIRECTORY);

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
