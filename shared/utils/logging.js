// Common handler for catch
// Logs error and returns null
// Accepts optional context object for arbitrary data attributes to include in the report
// - https://docs.sentry.io/platforms/javascript/enriching-events/context/#passing-context-directly
// Example usages:
// 1. somePromise.then(...).catch(logError)
// 2. logError('Some description', { extraTag: 'something' })
async function logError(err, tags) {
  console.error(err, tags);
  return null;
}

export { logError };
