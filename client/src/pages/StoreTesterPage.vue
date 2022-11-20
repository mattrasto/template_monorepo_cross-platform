<template>
  <router-link to="/"><button>To Root</button></router-link>
  <p>Hello Store</p>
  <p>{{ doubleCount }}</p>
  <button @click="increment">Increment</button>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@stores/user.js';

export default {
  name: 'StoreTesterPage',
  data() {
    return {};
  },
  computed: {
    ...mapState(useUserStore, ['doubleCount']),
  },
  methods: {
    ...mapActions(useUserStore, ['increment']),
  },
};
</script>

<style>

</style>
