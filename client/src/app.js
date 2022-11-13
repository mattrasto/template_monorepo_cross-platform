// import Vue from 'vue';
import { createApp } from 'vue';
import { createMetaManager } from 'vue-meta';

import { store } from '@store/index.js';

import App from './App.vue';
import { router } from './router/index.js';

async function attach() {
  const app = createApp(App);
  app.use(router);
  app.use(store);
  app.use(createMetaManager());
  app.mount('#app');
  return app;
}

const app = attach();

export { app };
