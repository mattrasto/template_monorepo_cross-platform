import { defineStore } from 'pinia';
import { MUTATORS } from '@mutators/index.js'; // HACK: Prevent dependency cycle
import { Users } from '@mutators/users.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    authUserId: null,
  }),
  getters: {
    authUser: (state) => state.users.find((user) => user.userId === state.authUserId),
  },
  actions: {
    // Internal (do not call directly)
    async CREATE(data, { context, globals }) {
      this.users.push(data);
      this.authUserId = data.userId;
      console.log('CREATE USER', data, '\n', context, '\n', globals);
      return data;
    },
    // Public
    async CREATE_USER(data) {
      // return Users.CREATE.EXECUTE(data);
      const events = Users.CREATE.EXECUTE(data);
    },
    AUTH_VERIFY() {
      console.log('AUTH_VERIFY');
    },
    ENSURE_USER() {
      console.log('ENSURE_USER');
    },
  },
});
