import { models } from '@database';
import { logError } from '@logging';
import { sanitizeFilters, _validateDescriptor } from './utils.js';

// Given a model name and it's id field, return an object with the standard actions
// for that model (CREATE, DELETE, FILTER, GET, UPDATE)
export function getStandardActions(modelName, idField) {
  return {
    CREATE: createConstructor(modelName),
    DELETE: createIdBasedDeleter(modelName, idField),
    FILTER: createFilter(modelName),
    GET: createIdBasedFetcher(modelName, idField),
    GET_ALL: createAllRecordFetcher(modelName),
    UPDATE: createIdBasedUpdater(modelName, idField),
    idField,
    modelName,
  };
}

// Takes the model name (string)
// Returns a thin wrapper around the model's create function that
// takes an object with all the values for the new instance
function createConstructor(modelName) {
  return async function createFn(valuesObj) {
    const model = models[modelName];
    const errors = _validateDescriptor(valuesObj, model);
    if (errors !== null) throw new Error(errors);
    return model.create(valuesObj).catch(logError);
  };
}

// Takes the model name (string)
// Returns a function that:
// 1. Takes a `filtersObj` argument
// 2. Sanitizes the filters (removes keys with value undefined)
// 3. Runs query against provided model
// 4. Returns a list of results
function createFilter(modelName) {
  const queryFn = async (filtersObj) => {
    const filters = sanitizeFilters(filtersObj, modelName);
    if (!Object.keys(filters).length) {
      throw new Error(
        `Invalid filters ${JSON.stringify(filtersObj)}, cannot be empty, after sanitizing: {}`,
      );
    }
    return models[modelName].findAll({ where: filters }).catch(logError);
  };
  return queryFn;
}

// Takes the model name (string) and id field (string)
// Returns a function that:
// 1. Takes an `id` as argument
// 2. Destroys any instance in that table with such `id`!
function createIdBasedDeleter(modelName, idField) {
  const deleter = async (id, options = {}) =>
    models[modelName].destroy({ ...options, where: { [idField]: id } }).catch(logError);
  return deleter;
}

// Takes the model name (string) and id field (string)
// Returns a function that:
// 1. Takes an `id` as argument
// 2. Tries to fetch the one occurrence of that `id`
// 3. Logs error and returns null on failure
function createIdBasedFetcher(modelName, idField) {
  const getter = async (id) =>
    models[modelName].findOne({ where: { [idField]: id } }).catch(logError);
  return getter;
}

// Takes the model name (string)
// Returns a function that:
// 1. Takes one argument: limit
// 2. Tries to fetch all records (up to limit, if present) of that model
// 3. Logs error and returns null on failure
function createAllRecordFetcher(modelName) {
  return async (limit) => models[modelName].findAll({ limit }).catch(logError);
}

function createIdBasedUpdater(modelName, idField) {
  const updater = async (id, values) => {
    // return models[modelName].update(values, { where: { [idField]: id }, returning: true }).catch(logError);
    const res = await models[modelName]
      .update(values, { where: { [idField]: id }, returning: true })
      .catch(logError);
    if (res.length < 2 || res[1].length < 1) return null;
    return res[1][0];
  };
  return updater;
}
