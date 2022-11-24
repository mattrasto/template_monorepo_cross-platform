import { defineStore } from 'pinia';

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [],
  }),
  actions: {
    async CREATE(data, { context, globals }) {
      data.userId = context.userId;
      this.projects.push(data);
      console.log('CREATE PROJECT', data, context, '\n', globals);
      return data;
    },
  },
});
