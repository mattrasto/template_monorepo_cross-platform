import { defineStore } from 'pinia';
import { Users } from '@mutators/users/client.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    // Internal (do not call directly)
    async CREATE(data, { context, globals }) {
      this.users.push(data);
      console.log('CREATE USER', data, '\n', context, '\n', globals);
      return data;
    },
    // Public
    async CREATE_USER(data) {
      Users.CREATE(data);
    },
    AUTH_VERIFY() {
      console.log('AUTH_VERIFY');
    },
    ENSURE_USER() {
      console.log('ENSURE_USER');
    },
  },
});
