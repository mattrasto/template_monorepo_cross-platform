import Vuex from 'vuex';
import { mutationLogger, actionLogger } from 'vuex-trace';
import config from '@/config.js';

const plugins = config.dev?.vuexTrace
  ? [mutationLogger(), actionLogger()]
  : [];

const store = new Vuex.Store({
  modules: {},
  plugins
});

export { store };
