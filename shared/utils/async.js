// Via https://stackoverflow.com/a/49432189
// Performs a forEach on a list with async functions and waits for each operation to finish before continuing
export const forEachAsyncSeries = async (iterable, fn) => {
  let idx = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const t of iterable) {
    // pseudo forEach because forEach does not allow async code
    await fn(t, idx); // eslint-disable-line no-await-in-loop
    idx += 1;
  }
};

// Via https://stackoverflow.com/a/49432189
// Performs a forEach on a list of async functions in parallel
export const forEachAsyncParallel = async (iterable, fn) => {
  await Promise.all(iterable.map(fn));
};

// Returns a promise that resolves after time
export const pTimeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

// Wait until the function returns true, stopping early if specified
// Useful for waiting for global variables to be defined
// limit is an integer representing how many seconds must pass before returning
export const waitUntilTrue = async (func, limit, ...args) => {
  const startTime = new Date().getTime();
  while (!func(...args)) {
    await pTimeout(100); // eslint-disable-line no-await-in-loop
    if (limit && new Date().getTime() - startTime > limit) return false;
  }
  return true;
};
