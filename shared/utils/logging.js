// Logs error and returns null
export async function logError(err, tags) {
  console.error(err, tags);
  return null;
}

// Logs info and returns null
export async function logInfo(info, tags) {
  console.log(info, tags); // eslint-disable-line no-console
  return null;
};
