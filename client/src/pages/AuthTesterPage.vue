<template>
  <router-link to="/"><button>To Root</button></router-link>
  <p>Hello Auth</p>
  <h1>Users</h1>
  <p>{{ JSON.stringify(users, null, 4) }}</p>
  <h3>Logged in user: {{ }}</h3>
  <input
    v-model="email"
    type="text"
  >
  <button @click="signupUser">
    Signup
  </button>
  <button @click="loginUser">
    Login
  </button>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@stores/users.js';
import { useProjectStore } from '@stores/projects.js';
import { loginUser } from '@api/auth.js';

export default {
  name: 'AuthTesterPage',
  data() {
    return {
      email: '',
    };
  },
  computed: {
    ...mapState(useUserStore, ['users', 'authUser']),
    ...mapState(useProjectStore, ['projects']),
  },
  methods: {
    ...mapActions(useUserStore, ['CREATE_USER']),
    async signupUser() {
      await this.CREATE_USER({ email: 'mattrasto@gmail.com', password: '123' });
      console.log('userData', this.authUser);
      // await this.SET_CURRENT_USER();
      console.log('User created');
      const loginRes = await loginUser('matt@', '123');
      console.log(loginRes);
    },
    loginUser() {
      // this.CREATE_USER({ userId: '456', email: 'ma' });
    }
  },
};
</script>

<style>

</style>
