import { forEachAsyncSeries, forEachAsyncParallel } from '@utils/async.js';
import { isObject, cloneObject } from '@utils/datatypes/object.js';
import { logError } from '@logging';

import { useUserStore } from '@stores/users.js';
import { useProjectStore } from '@stores/projects.js';

import { Users } from '@mutators/users/client.js';
import { Projects } from '@mutators/projects/client.js';

const isEvent = (entry) => isObject(entry) && entry.type === 'event';
const isOperator = (entry) => isObject(entry) && entry.type === 'operator';

export const DEFAULT_OPTIONS = { context: {}, globals: {} };

function scopeOptions(options) {
  const { globals } = options;
  const scopedContext = cloneObject(options.context);
  return { context: scopedContext, globals };
}

export async function processEvents(events, options) {
  // console.log('EVENTS', events, options);
  return process(events, options);
}

/* eslint-disable curly */
async function process(entry, options) {
  // console.log('entry + ...options', '\n', entry, '\n', context, '\n', globals);
  if (Array.isArray(entry)) {
    const scopedOptions = scopeOptions(options);
    return forEachAsyncSeries(entry, (event) => process(event, scopedOptions));
  }
  if (isOperator(entry)) return processOperator(entry, options);
  if (isEvent(entry)) return processEvent(entry, options);
  logError('Error: Invalid entry found while processing events:', entry, options);
  return null;
}

async function processOperator(entry, options) {
  const { context, globals } = options;
  if (entry.operatorType === 'parallel') {
    const scopedOptions = scopeOptions(options);
    return forEachAsyncParallel(entry.data, (event) => process(event, scopedOptions));
  }
  if (entry.operatorType === 'pass') {
    const eventData = await processEvent(entry.event, options);
    entry.data.forEach((passKey) => {
      context[passKey] = eventData[passKey];
    });
    return eventData;
  }
  if (entry.operatorType === 'globals') {
    const eventData = await processEvent(entry.event, options);
    entry.data.forEach((passKey) => {
      globals[passKey] = eventData[passKey];
    });
    return eventData;
  }
  logError('Error: Invalid operator entry found while processing events:', entry, options);
  return null;
}

async function processEvent(event, options) {
  const MODEL_EXECUTOR_MAP = {
    Users: { mutator: Users, action: useUserStore },
    Projects: { mutator: Projects, action: useProjectStore },
  };
  const {
    model, mutator, action, data,
  } = event;
  const executor = MODEL_EXECUTOR_MAP[model];
  if (mutator) return executor.mutator[mutator](data, options);
  if (action) return executor.action()[action](data, options);
  return null;
}
