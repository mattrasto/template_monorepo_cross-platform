<template>
  <router-link to="/"><button>To Root</button></router-link>
  <p>Hello Store</p>
  <h1>Users</h1>
  <p>{{ JSON.stringify(users, null, 4) }}</p>
  <h1>Projects</h1>
  <p>{{ JSON.stringify(projects, null, 4) }}</p>
  <button @click="createValidUser">Add Valid User</button>
  <button @click="createInvalidUser">Add Invalid User</button>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@stores/users.js';
import { useProjectStore } from '@stores/projects.js';

export default {
  name: 'StoreTesterPage',
  data() {
    return {};
  },
  computed: {
    ...mapState(useUserStore, ['users']),
    ...mapState(useProjectStore, ['projects']),
  },
  methods: {
    ...mapActions(useUserStore, ['CREATE_USER']),
    createValidUser() {
      this.CREATE_USER({ email: 'mattrasto@gmail.com' });
    },
    createInvalidUser() {
      this.CREATE_USER({ email: 'ma' });
    }
  },
};
</script>

<style>

</style>
