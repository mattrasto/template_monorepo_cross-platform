import { models } from '@database';
import { logError } from '@logging';
import { Op } from 'sequelize';

// Takes the model name (string) and a field name (string)
// Returns a function that:
// 1. Takes a `searchVal`
// 2. Searches for the first record where the search field's value case-insensitively matches the searchVal
// 3. Logs error and returns null on failure
export function createFieldSearcher(modelName, searchField) {
  const getter = async (searchVal) =>
    models[modelName]
      .findOne({
        where: {
          [searchField]: {
            [Op.iLike]: searchVal,
          },
        },
      })
      .catch(logError);
  return getter;
}
