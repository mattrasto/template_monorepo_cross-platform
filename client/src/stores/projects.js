import { defineStore } from 'pinia';

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [],
  }),
  actions: {
    async CREATE(data) {
      this.projects.push(data);
    },
  },
});
