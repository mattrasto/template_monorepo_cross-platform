import { forEachAsyncSeries, forEachAsyncParallel } from '@utils/async.js';
import { isObject, cloneObject } from '@utils/datatypes/object.js';
import { logError } from '@logging';

import { useUserStore } from '@stores/users.js';
import { useProjectStore } from '@stores/projects.js';

import { Users } from '@mutators/users/client.js';
import { Projects } from '@mutators/projects/client.js';

const isEvent = (entry) => isObject(entry) && entry.type === 'event';
const isOperator = (entry) => isObject(entry) && entry.type === 'operator';

// {
//   model: 'Users',
//   mutator: 'CREATE',
//   action: 'CREATE',
//   data: { ... }
// }
export async function processEvents(events, context = {}) {
  console.log('EVENTS', events, context);
  return process(events, context);
}

/* eslint-disable curly */
async function process(entry, context) {
  // console.log('entry + context', entry, context);
  // if (Array.isArray(entry)) return forEachAsyncSeries(entry, (event) => process(event, context));
  // if (isOperator(entry)) return processOperator(entry, context);
  // if (isEvent(entry)) return processEvent(entry, context);
  // logError('Error: Invalid entry found while processing events:', entry, context);
  // return null;
  console.log('entry + context', entry, '\n', context, Object.id(context));
  console.log('old context', context, Object.id(context));
  if (Array.isArray(entry)) {
    const newContext = cloneObject(context);
    return forEachAsyncSeries(entry, (event) => process(event, newContext));
  }
  if (isOperator(entry)) return processOperator(entry, context);
  if (isEvent(entry)) return processEvent(entry, context);
  logError('Error: Invalid entry found while processing events:', entry, context);
  return null;
}

async function processOperator(entry, context) {
  if (entry.operatorType === 'parallel') {
    const newContext = cloneObject(context);
    return forEachAsyncParallel(entry.data, (event) => process(event, newContext));
  }
  if (entry.operatorType === 'pass') {
    const eventData = await processEvent(entry.event, context);
    entry.data.forEach((passKey) => {
      context[passKey] = eventData[passKey];
    });
    return eventData;
  }
  logError('Error: Invalid operator entry found while processing events:', entry, context);
  return null;
}

async function processEvent(event, context) {
  const MODEL_EXECUTOR_MAP = {
    Users: { mutator: Users, action: useUserStore },
    Projects: { mutator: Projects, action: useProjectStore },
  };
  const {
    model, mutator, action, data,
  } = event;
  const executor = MODEL_EXECUTOR_MAP[model];
  if (mutator) return executor.mutator[mutator](data, context);
  if (action) return executor.action()[action](data, context);
  return null;
}
