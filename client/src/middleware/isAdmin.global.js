import { useUserStore } from '@stores/user.js';
// const userStore = useUserStore();

// Protects routes with an { "admin": true } meta record
// TODO: Currently broken on direct link due to server vs. client side rendering
// See: https://github.com/vuejs/pinia/discussions/1212
// eslint-disable-next-line no-undef
export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.matched.some((record) => record.meta.admin)) return null;
  const userStore = useUserStore();
  // Unauthenticated user: redirect
  // QUESTION: Is this necessary? Will this be caught within other nav guard?
  await userStore.AUTH_VERIFY();
  if (!userStore.isAuthenticated) return navigateTo({ path: '/' }); // eslint-disable-line no-undef
  // Unauthorized (not admin) user: redirect
  await userStore.ENSURE_USER();
  if (!userStore.isAdmin) return navigateTo({ path: '/' }); // eslint-disable-line no-undef
  return null;
});
