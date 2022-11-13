import { router } from '@src/router/index.js';
import { logError } from '@utils/logging.js';

// Updates the current route's specified query parameter without throwing redundant navigation error
export function safeQueryParamUpdate(paramName, newVal) {
  const curQuery = router.history.current.query;
  if (curQuery[paramName] === newVal) return;
  router
    .replace({
      query: {
        ...curQuery,
        [paramName]: newVal || undefined
      }
    })
    .catch((err) => {
      if (
        err.name !== 'NavigationDuplicated' &&
        !err.message.includes(
          'Avoided redundant navigation to current location'
        )
      ) {
        logError(err);
      }
    });
}

// Converts a query object (like you would get from route.query) to a valid URL query string
// TODO: use a web API or library that handles special characters/whitespace better
export function queryObjectToString(query) {
  if (!query || !Object.keys(query).length) return '';
  const queryArr = Object.entries(query);
  let queryString = `?${queryArr[0][0]}=${queryArr[0][1]}`;
  queryArr.slice(1).forEach((queryParam) => {
    if (queryParam[1] === undefined || queryParam[1] === null) return;
    queryString += `&${queryParam[0]}=${queryParam[1]}`;
  });
  return queryString;
}
