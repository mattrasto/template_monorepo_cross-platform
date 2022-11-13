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

// Performs a forEachAsyncParallel iteration on serial chunks of input array (eg. [1, 2, 3, 4] -> [1, 2] then [3, 4])
// iterFn(...args, chunkNum) is run on every iterable element
// chunkFn(chunkData, chunkNum) is run at the end of every chunk
// NOTE: This will return promise rejections as well
export const forEachAsyncParallelChunked = async (
  iterable,
  iterFn,
  chunkSize,
  chunkFn = () => {},
  id = 'null',
) => {
  if (!chunkSize || !Number.isInteger(chunkSize))
    throw new TypeError('chunkSize must be a positive integer');
  if (chunkSize <= 0) throw new RangeError('chunkSize must be a positive integer');

  const allChunkNums = [...Array(Math.ceil(iterable.length / chunkSize)).keys()];
  let chunkData = []; // Declare up here to only load current chunk in memory
  await forEachAsyncSeries(allChunkNums, async (chunkNum) => {
    chunkData = iterable.slice(chunkNum * chunkSize, (chunkNum + 1) * chunkSize);
    // Closure to inject chunkNum as last argument
    async function boundIterFn(...args) {
      return iterFn(...args, chunkNum);
    }
    await forEachAsyncParallel(chunkData, boundIterFn, id);
    await chunkFn(chunkData, chunkNum);
  });
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
