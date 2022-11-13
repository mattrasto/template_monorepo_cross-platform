import { models } from '@database';
import { logError } from '@logging';
import { sanitizeFilters, _validateDescriptor } from './utils.js';

// Takes the model name (string)
// Returns a wrapper around the model's bulkCreate function that also validates the input,
// throwing errors on invalid input
export function getBulkCreateFn(modelName) {
  const defaultOptions = { returning: true };
  return async function bulkCreateFn(descriptorsArr, options) {
    if (!descriptorsArr || !Array.isArray(descriptorsArr) || !descriptorsArr.length) {
      throw new Error('No descriptors provided, expected non-empty array of objects');
    }
    const model = models[modelName];
    const allErrors = descriptorsArr
      .map((descriptor, index) => {
        const errors = _validateDescriptor(descriptor, model);
        return errors ? `${index}: ${errors}` : null;
      })
      .filter((x) => x !== null);
    if (allErrors.length) throw new Error(allErrors.join('\n'));
    return model.bulkCreate(descriptorsArr, { ...defaultOptions, ...options }).catch(logError);
  };
}

export function getBulkDeleteFn(modelName) {
  return async function bulkDeleteFn(filtersObj, options = {}) {
    const filters = sanitizeFilters(filtersObj, modelName);
    if (!Object.keys(filters).length) {
      return logError(
        new Error(
          `Invalid filters ${JSON.stringify(filtersObj)}, cannot be empty, after sanitizing: {}`,
        ),
      );
    }
    return models[modelName].destroy({ where: filters, ...options }).catch(logError);
  };
}

export function getBulkActions(modelName) {
  return {
    BULK_CREATE: getBulkCreateFn(modelName),
    BULK_DELETE: getBulkDeleteFn(modelName),
  };
}
