// eslint-disable-next-line import/no-cycle
import { store } from '@store';

// Protects routes with an { "auth": true } meta record
async function isAuthenticated(to, from, next) {
  if (!to.matched.some((record) => record.meta.auth)) return next();
  await store.dispatch('AUTH_VERIFY');
  if (store.getters.isAuthenticated) return next();
  // Unauthenticated user: redirect
  // If from /home, assume new user and redirect to signup
  if (from.path === '/home') return next({ path: '/browse' });
  return next({
    name: 'login',
    params: { redirectLink: to.path }
  });
}

async function isAdmin(to, from, next) {
  if (!to.matched.some((record) => record.meta.admin)) return next();
  // Unauthenticated user: redirect
  // QUESTION: Is this necessary? Will this be caught within other nav guard?
  await store.dispatch('AUTH_VERIFY');
  if (!store.getters.isAuthenticated) return next({ path: '/' });
  // Unauthorized (not admin) user: redirect
  await store.dispatch('ENSURE_USER');
  if (!store.getters.isAdmin) return next({ path: '/' });
  return next();
}

function maintenanceGuard(to, from, next) {
  if (to.path !== '/maintenance') return next({ path: '/maintenance' });
  return next();
}

export { isAuthenticated, isAdmin, maintenanceGuard };
