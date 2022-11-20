import { createApp } from 'vue';
import { createMetaManager } from 'vue-meta';

import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router/index.js';

async function attach() {
  const app = createApp(App);
  app.use(router);
  app.use(createPinia());
  app.use(createMetaManager());
  app.mount('#app');
  return app;
}

const app = attach();

export { app };
