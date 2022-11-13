import controllers from '@controllers';
import { createSuccessReport } from '@controllers/utils/reports.js';
import express from 'express';
import { parseToken } from './middleware.js';

export const router = express.Router();

router.post('/login', async (req, res) => {
  res.report(await controllers.auth.attemptLogin(req.body.email, req.body.password));
});

router.post('/verify', parseToken, (req, res) => {
  res.report(createSuccessReport(true, 'User verified successfully'));
});

// Reset password endpoint
// Requires a 'resetPasswordToken' in request body to verify user
router.put('/password', async (req, res) => {
  const { token, email, newPassword } = req.body;
  res.report(await controllers.auth.resetPassword(token, email, newPassword));
});

// Generates a token to reset a user's password and sends to the specified email
// WARNING: Do *NOT* send the token in the response, or every account is able to be hijacked
router.post('/reset-password-token', async (req, res) => {
  const { email } = req.body;
  res.report(await controllers.auth.sendResetPasswordToken(email));
});
