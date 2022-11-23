import { defineStore } from 'pinia';

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [],
  }),
  actions: {
    async CREATE(data, context) {
      data.userId = context.userId;
      this.projects.push(data);
      console.log('CREATE PROJECT', data, context);
      return data;
    },
  },
});
