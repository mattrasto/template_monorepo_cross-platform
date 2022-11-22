import { logError } from '@utils/logging.js';
import { deepMerge } from '@utils/datatypes/object.js';
import { models } from '@database';

export default {
  updateRecordMetadata,
};

// Updates any table's record's metadata field
// Accepts a model (eg. "User" or models.User), the record's PK, an instruction (how to update), and an update object:
//   instruction = 'replace': replace existing metadata with object
//   instruction = 'merge': deeply merge object with existing metadata, preferring object fields
//   TODO: instruction = 'update': single-level object mapping key->val of dot-notation keys to update (eg. { 'analytics.totalEvents': 50 })
// QUESTION: How do we prevent race conditions?
async function updateRecordMetadata(
  model,
  recordId,
  instruction,
  updateObj,
  arrayMergeMethod = 'overwrite',
) {
  if (typeof model === 'string') model = models[model]; // eslint-disable-line no-param-reassign
  const record = await model.findByPk(recordId);
  if (!record) {
    return logError(`Attempted to update metadata of record that doesn't exist: ${recordId}`);
  }
  if (instruction === 'replace') {
    const newRecordData = await record.update({ metadata: updateObj });
    return newRecordData.dataValues.metadata;
  }
  if (instruction === 'merge') {
    const curMetadata = record.dataValues.metadata;
    const newMetadata = deepMerge(curMetadata, updateObj, arrayMergeMethod);
    await record.update({ metadata: newMetadata });
    return newMetadata;
  }
  return logError(`Unknown update instruction ${instruction}`);
}
