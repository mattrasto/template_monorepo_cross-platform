import { useUserStore } from '@stores/user.js';
// const userStore = useUserStore();

// Protects routes with an { "auth": true } meta record
// TODO: Currently broken on direct link due to server vs. client side rendering
// See: https://github.com/vuejs/pinia/discussions/1212
// eslint-disable-next-line no-undef
export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.matched.some((record) => record.meta.auth)) return null;
  const userStore = useUserStore();
  // await userStore.AUTH_VERIFY();
  userStore.AUTH_VERIFY();
  if (userStore.isAuthenticated) return null;
  // Unauthenticated user: redirect
  // return navigateTo({ name: 'root' }); // eslint-disable-line no-undef
  return null;
});
