/* eslint-disable no-console */

// Logs error and returns null
export async function logError(err, tags) {
  console.error(err, tags);
  return null;
}

// Logs warning and returns null
export async function logWarning(warn, tags) {
  console.warn(warn, tags);
  return null;
}

// Logs info and returns null
export async function logInfo(info, tags) {
  console.log(info, tags);
  return null;
}
