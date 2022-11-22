import actions from '@actions';

// Checks if an anonymous user exists
export async function checkAnonymousUserExists(userId) {
  if (!userId) return false;
  const existingUser = await actions.users.GET(userId);
  if (existingUser) return true;
  return false;
}

// Checks if a guest or registered user exists
export async function checkGuestUserExists(email) {
  if (!email) return false;
  const existingUser = await actions.users.SEARCH_EMAIL(email);
  if (existingUser) return true;
  return false;
}

// Checks if a registered user exists
// Either email or userId must be passed
export async function checkUserExists(email, userId) {
  if (email) {
    const existingUser = await actions.users.SEARCH_EMAIL(email);
    if (existingUser && existingUser.authLevel === 'user') return true;
  } else if (userId) {
    const existingUser = await actions.users.GET(userId);
    if (existingUser && existingUser.authLevel === 'user') return true;
  }
  return false;
}
