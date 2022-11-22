import { logError, logInfo } from '@logging';
import { hashPassword } from '@controllers/auth/utils.js';
import actions from '@actions';
import { getStandardControllers } from '@controllers/utils/standardControllers.js';
import {
  createSuccessReport,
  createFailureReport,
  createErrorReport,
} from '@controllers/utils/reports.js';
import { checkAnonymousUserExists, checkGuestUserExists, checkUserExists } from './services.js';
import {
  validateUserId,
  validateAllowedUpdates,
  validateAllowedCreationRole,
  validateUserDataRequest,
} from './validators.js';

const { idField, DELETE } = getStandardControllers(actions.users);

export default {
  idField,
  DELETE,
  FILTER: filterUsers,
  GET: getUser,
  GET_ALL: getAllUsers,
  UPDATE: updateUser,
  CREATE: createUser,
  createAnonymousUser,
  createGuestUser,
};

function cleanUserData(userData) {
  if (!userData) return null;
  function removePassword(userDataObj) {
    const rawUserData = { ...userDataObj.dataValues } || { ...userDataObj };
    delete rawUserData.password;
    return rawUserData;
  }
  if (Array.isArray(userData)) return userData.map(removePassword);
  return removePassword(userData);
}

// Attempts to create a new registered user
async function createUser(details) {
  details.authLevel = 'user'; // eslint-disable-line no-param-reassign
  // Check if user already exists; exit if so
  if (details.role && details.role.includes('admin')) {
    const errMessage = `Registration failed: not allowed to create a user with role of admin: ${details.email}`;
    logError(errMessage);
    return createFailureReport(403, errMessage);
  }
  const userExists = await checkUserExists(details.email);
  if (userExists) {
    logError(`Could not create user: User already exists: ${details.email}`);
    return createFailureReport(409, `Could not create user: User already exists: ${details.email}`);
  }
  // Hash password
  if (details.password) details.password = hashPassword(details.password); // eslint-disable-line no-param-reassign
  // Handle all cases
  const anonymousUserExists = await checkAnonymousUserExists(details.userId);
  const guestUserExists = await checkGuestUserExists(details.email);
  let createdUser = null;
  if (!guestUserExists && anonymousUserExists) {
    // Only anonymous user already exists (most common case)
    logInfo('guest user exists, but not anonymous user');
  } else if (guestUserExists && anonymousUserExists) {
    // Guest user and anonymous users already exist
    const anonUser = await actions.users.GET(details.userId);
    const guestUser = await actions.users.SEARCH_EMAIL(details.email);
    // const guestUser = await actions.users.('email', email);
    if (anonUser.userId === guestUser.userId) {
      // userIds match: anonymous and guest users are the same (rare case) - upgrade user
      logInfo('anonymous and guest users both exist with same userId');
    } else {
      // userIds don't match: anonymous and guest users are different - upgrade guest user and merge data
      logInfo('anonymous and guest users both exist with different userIds');
    }
  } else {
    // User doesn't exist - create
    createdUser = await actions.users.CREATE(details);
  }
  // Regardless of whether the user existed before or not, set authLevel to "user"
  await actions.users.UPDATE(createdUser.userId, { authLevel: 'user' });
  const cleanedUserData = cleanUserData(createdUser);
  return createSuccessReport(cleanedUserData, `Created user with userId ${createdUser.userId}`);
}

// Creates an anonymous user
async function createAnonymousUser(role) {
  const authLevel = 'anonymous';
  const invalidCreationRoleReport = validateAllowedCreationRole(null, 'anonymous', role);
  if (invalidCreationRoleReport) return invalidCreationRoleReport;
  const newUser = await actions.users.CREATE({ role, authLevel });
  if (!newUser) return createErrorReport(500, 'Failed to create anonymous user');
  const cleanedUserData = cleanUserData(newUser);
  return createSuccessReport(cleanedUserData, 'Successfully created anonymous user.');
}

// Creates a guest user
async function createGuestUser(email, role) {
  const authLevel = 'guest';
  const guestUserExists = await checkGuestUserExists(email);
  if (guestUserExists) {
    logError(`Attempted to create a guest user with an email that already exists: ${email}`);
    return createFailureReport(409, 'Registration failed: user already exists.');
  }
  const invalidCreationRoleReport = validateAllowedCreationRole(email, 'guest', role);
  if (invalidCreationRoleReport) return invalidCreationRoleReport;
  const newUser = await actions.users.CREATE({ email, role, authLevel });
  if (!newUser) return createErrorReport(500, 'Failed to create guest user');
  const cleanedUserData = cleanUserData(newUser);
  return createSuccessReport(cleanedUserData, 'Successfully created guest user.');
}

async function updateUser(userId, updates) {
  const invalidUserIdReport = validateUserId(userId);
  if (invalidUserIdReport) return invalidUserIdReport;
  const invalidUpdatesReport = validateAllowedUpdates(userId, updates);
  if (invalidUpdatesReport) return invalidUpdatesReport;
  const userData = await actions.users.UPDATE(userId, updates);
  if (!userData) return createFailureReport(404, 'User not found');
  const cleanedUserData = cleanUserData(userData);
  return createSuccessReport(cleanedUserData, `Successfully updated user with ID ${userId}`);
}

async function getUser(userIdParam, req) {
  const tokenUserId = req.userId;
  const requestedUserId = userIdParam || tokenUserId;
  const invalidUserIdReport = validateUserId(requestedUserId);
  if (invalidUserIdReport) return invalidUserIdReport;
  const userData = await actions.users.GET(requestedUserId);
  const disallowedUserDataRequestReport = validateUserDataRequest(
    req.token,
    tokenUserId,
    requestedUserId,
    userData,
  );
  if (disallowedUserDataRequestReport) return disallowedUserDataRequestReport;
  const cleanedUserData = cleanUserData(userData);
  return createSuccessReport(
    cleanedUserData,
    `Successfully retrieved user with ID ${requestedUserId}`,
  );
}

async function getAllUsers(limit) {
  const result = await actions.users.GET_ALL(limit);
  if (!result) return createFailureReport(404, `Could not find any records`);
  const cleanedUserData = cleanUserData(result);
  return createSuccessReport(cleanedUserData, `Fetched ${result.length} user(s)`);
}

async function filterUsers(filters) {
  try {
    const result = await actions.users.FILTER(filters);
    if (!result) createErrorReport(500, `Failed to filter users`);
    const cleanedUserData = cleanUserData(result);
    return createSuccessReport(cleanedUserData, `Found ${result.length} matching user(s)`);
  } catch (e) {
    return createFailureReport(400, e.message);
  }
}
