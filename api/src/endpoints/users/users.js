import controllers from '@controllers';
import { registerStandardEndpoints } from '@endpoints/utils/standardEndpoints.js';
import { parseTokenIfExists } from '@endpoints/auth/middleware.js';
import express from 'express';

export const router = express.Router();

registerStandardEndpoints(router, controllers.users, {
  GET: {
    route: '/:userId?',
    middlewares: [parseTokenIfExists],
  },
});

// Create anonymous user (users that have interacted with site)
router.post('/anonymous', async (req, res) => {
  const { role } = req.body;
  res.report(await controllers.users.createAnonymousUser(role));
});

// Create guest user (known user (eg. by email), but hasn't interacted with site)
router.post('/guest', async (req, res) => {
  const { email, referralCode, role } = req.body;
  res.report(await controllers.users.createGuestUser(email, role, referralCode));
});
