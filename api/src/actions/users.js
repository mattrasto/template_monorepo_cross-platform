import { getStandardActions } from '@actions/utils/standardActions.js';
import { getBulkActions } from '@actions/utils/bulkActions.js';
import { createFieldSearcher } from '@actions/utils/miscActions.js';
import { MODEL_NAME, PRIMARY_KEY_FIELD } from '@models/users.js';

export default {
  ...getStandardActions(MODEL_NAME, PRIMARY_KEY_FIELD),
  ...getBulkActions(MODEL_NAME, PRIMARY_KEY_FIELD),
  SEARCH_EMAIL: createFieldSearcher(MODEL_NAME, 'email'),
};
