import { logError } from '@logging';
import { checkUserExists } from '@controllers/users/services.js';
import actions from '@actions';
import {
  createSuccessReport,
  createFailureReport,
  createErrorReport,
} from '@controllers/utils/reports.js';
import { hashPassword, verifyPassword, signJWT } from './utils.js';
import {
  createTemporaryToken,
  sendResetPasswordEmail,
  validateTemporaryToken,
} from './services.js';

export default {
  attemptLogin,
  sendResetPasswordToken,
  resetPassword,
};

// Attempts to login the user
async function attemptLogin(email, password) {
  const user = await actions.users.SEARCH_EMAIL(email);
  if (!user) return createFailureReport(404, `User with email (${email}) does not exist`);
  const { userId, password: hashedPassword } = user;
  const verified = verifyPassword(password, hashedPassword);
  if (!verified) return createFailureReport(403, 'Username or password are incorrect');
  try {
    const token = signJWT({ email, password }, userId);
    delete user.password;
    return createSuccessReport({ token, user }, 'User logged in successfully');
  } catch (error) {
    logError(error);
    return createErrorReport(500, 'Unable to log in user');
  }
}

async function sendResetPasswordToken(email) {
  if (!(await checkUserExists(email)))
    return createFailureReport(404, `User with e-mail ${email} does not exist.`);
  const resetPasswordToken = createTemporaryToken('30m', { email });
  const emailSent = await sendResetPasswordEmail(email, resetPasswordToken);
  if (!emailSent) return createErrorReport(500, 'Failed to send reset password email');
  return createSuccessReport(true, 'Successfully sent reset password email');
}

async function resetPassword(token, email, newPassword) {
  const isTokenValid = await validateTemporaryToken(token, { email });
  if (!isTokenValid) return createFailureReport(403, 'Invalid token');
  const user = await actions.users.SEARCH_EMAIL(email);
  if (!user) return createFailureReport(404, `User with email (${email}) does not exist`);
  await actions.users.UPDATE(user.userId, { password: hashPassword(newPassword) });
  return createSuccessReport(true, 'Password successfully updated');
}
