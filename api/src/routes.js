import * as endpoints from './endpoints/index.js';

// Initializes all endpoint routers
// Plug routers into different express endpoints
function initRouters(app) {
  const ROUTER_SPECIAL_ROUTES = {
    rootRouter: '/',
  };

  Object.keys(endpoints).forEach((routerName) => {
    const router = endpoints[routerName];
    if (ROUTER_SPECIAL_ROUTES[routerName]) {
      app.use(ROUTER_SPECIAL_ROUTES[routerName], router);
    } else {
      // Remove "Router" from the router name to get the route string
      const routeName = `/${routerName.replace('Router', '')}`;
      app.use(routeName, router);
    }
  });
}

export { initRouters };
