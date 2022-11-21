import { routes } from './src/routes.js';

import constants from './vite/constants.js';

// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  srcDir: 'src/',
  alias: constants.ALIASES,
  sourcemap: true,
  hooks: {
    // This replaces Nuxt's file based routing with custom routes
    'pages:extend': (pages) => {
      pages.length = 0; // eslint-disable-line no-param-reassign
      pages.push(...routes);
    },
  },
  modules: [
    // '@nuxtjs/router', // Not supported in Nuxt 3 yet
    '@pinia/nuxt',
  ],
  vite: {
    define: {
      'process.env': {}
    },
  },
});
