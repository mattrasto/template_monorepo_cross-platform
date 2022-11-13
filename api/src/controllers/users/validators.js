import { createFailureReport } from '@controllers/utils/reports.js';
import { logError } from '@logging';
import validateUUID from 'uuid-validate';

export const validateUserId = (userId) => {
  if (!userId) return createFailureReport(400, 'Must provide JWT or anonymous userId');
  if (!validateUUID(userId)) return createFailureReport(400, 'userId is invalid (not a UUID)');
  return null;
};

export const validateAllowedUpdates = (userId, updates) => {
  if (updates.password) {
    logError(`Attempted to update user's password: ${userId}`);
    return createFailureReport(403, 'Not allowed to update password');
  }
  if (updates.role === 'admin') {
    logError(`Attempt to update user's role to admin: ${userId}`);
    return createFailureReport(403, 'Not allowed to update role to admin');
  }
  return null;
};

export const validateAllowedCreationRole = (email, authLevel, role) => {
  if (role !== 'admin') return null;
  logError(`Attempted to register ${authLevel} user with a role of admin: ${email || 'anonymous'}`);
  return createFailureReport(
    403,
    'Registration failed: not allowed to create a user with role of admin.',
  );
};

export const validateUserDataRequest = (token, tokenUserId, requestedUserId, userData) => {
  if (!userData) return createFailureReport(404, 'User not found');
  if (userData.authLevel === 'user') {
    // No token provided
    if (!token) return createFailureReport(401, 'Must provide JWT for this user');
    // Token is invalid
    if (tokenUserId !== requestedUserId) return createFailureReport(403, 'Incorrect JWT');
  }
  return null;
};
