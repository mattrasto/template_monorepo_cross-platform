import { getStandardActions } from '@actions/utils/standardActions.js';
import { MODEL_NAME, PRIMARY_KEY_FIELD } from '@models/temporaryTokens.js';

export default {
  ...getStandardActions(MODEL_NAME, PRIMARY_KEY_FIELD),
};
