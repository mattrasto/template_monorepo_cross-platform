// eslint-disable-next-line import/no-cycle
import { useUserStore } from '@stores/user.js';

// Protects routes with an { "auth": true } meta record
async function isAuthenticated(to, from, next) {
  if (!to.matched.some((record) => record.meta.auth)) return next();
  const userStore = useUserStore();
  await userStore.AUTH_VERIFY();
  if (userStore.isAuthenticated) return next();
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
  const userStore = useUserStore();
  // Unauthenticated user: redirect
  // QUESTION: Is this necessary? Will this be caught within other nav guard?
  await userStore.AUTH_VERIFY();
  if (!userStore.isAuthenticated) return next({ path: '/' });
  // Unauthorized (not admin) user: redirect
  await userStore.ENSURE_USER();
  if (!userStore.isAdmin) return next({ path: '/' });
  return next();
}

function maintenanceGuard(to, from, next) {
  if (to.path !== '/maintenance') return next({ path: '/maintenance' });
  return next();
}

export { isAuthenticated, isAdmin, maintenanceGuard };
