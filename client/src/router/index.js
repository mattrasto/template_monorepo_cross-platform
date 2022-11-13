import { createRouter, createWebHistory } from 'vue-router';
import {
  isAuthenticated,
  isAdmin,
} from './guards.js';
import { routes } from './routes.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes]
});

// Global guards
// NOTE: Every route change evaluates each guard, so keep them light
router.beforeEach(isAuthenticated);
router.beforeEach(isAdmin);

export { router };
