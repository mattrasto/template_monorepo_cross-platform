/* eslint-disable */
import RootPage from '@pages/RootPage.vue';
import StoreTesterPage from '@pages/StoreTesterPage.vue';

const rootRoutes = [
  { path: '/store', component: StoreTesterPage },
  { path: '/', component: RootPage },
  // // Maintenance page
  // { path: '/maintenance', component: UnderConstructionPage },
  // // TODO: 404 page
  // { path: '*', redirect: '/' }
];

const routes = [
  // NOTE: rootRoutes should always be last since it has the catch-all route
  ...rootRoutes
];

export { routes };
