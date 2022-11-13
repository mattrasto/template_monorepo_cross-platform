import Vuex from 'vuex';
import { mutationLogger, actionLogger } from 'vuex-trace';
import { CONFIG } from '@config';

const plugins = CONFIG.dev?.vuexTrace
  ? [mutationLogger(), actionLogger()]
  : [];

const store = new Vuex.Store({
  modules: {},
  plugins
});

export { store };
