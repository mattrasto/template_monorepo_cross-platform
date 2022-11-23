import { isEqual } from 'lodash';
import deepmerge from 'deepmerge';

export const isObject = (a) => (
  typeof a === 'object' &&
  !Array.isArray(a) &&
  a !== null
);

// Returns all the keys in `toObject` that have a different value
// when compared with `fromObject`
// Optionally ignores keys included in `ignoreKeys`
export const getDiffKeys = (fromObject, toObject, ignoreKeys = []) => {
  return Object.entries(toObject)
    .map(([key, value]) =>
      ignoreKeys.includes(key) || isEqual(fromObject[key], value) ? null : key
    )
    .filter((k) => k !== null);
};

// Small wrapper over deepmerge (full deep clone merge) that overwrites arrays instead of concatenating
// arrayMethod is one of:
// -- "overwrite" (prefer array from "updates")
// -- "concatenate" (concatenate "updates" array to "source" array)
export const deepMerge = (source, updates, arrayMethod = 'overwrite') => {
  if (arrayMethod === 'overwrite') {
    const overwriteMerge = (sourceArray, updatesArray) => updatesArray;
    return deepmerge(source, updates, { arrayMerge: overwriteMerge });
  }
  return deepmerge(source, updates);
};

// Deep clone an object
export const cloneObject = (object) => {
  return JSON.parse(JSON.stringify(object));
};

export const objEquals = (a, b) => isEqual(a, b);
