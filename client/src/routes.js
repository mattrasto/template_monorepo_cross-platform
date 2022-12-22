const rootRoutes = [
  {
    name: 'store', path: '/store', file: '@pages/StoreTesterPage.vue', meta: { auth: true }
  },
  {
    name: 'auth', path: '/auth', file: '@pages/AuthTesterPage.vue', meta: { auth: true }
  },
  { name: 'root', path: '/', file: '@pages/RootPage.vue' },
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
