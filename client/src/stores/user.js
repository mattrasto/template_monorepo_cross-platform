import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count += 1;
    },
    AUTH_VERIFY() {
      console.log('AUTH_VERIFY');
    },
    ENSURE_USER() {
      console.log('ENSURE_USER');
    },
  },
});
