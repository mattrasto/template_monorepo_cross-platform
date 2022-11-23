import { forEachAsyncSeries, forEachAsyncParallel } from '@utils/async.js';
import { isObject } from '@utils/datatypes/object.js';
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
export async function processEvents(events, context ={}) {
  console.log('EVENTS', events, context);
  process(events, context);
}

/* eslint-disable curly */
async function process(entry, context) {
  console.log('entry + context', entry, context);
  if (Array.isArray(entry)) {
    // Array: process events in series
    // console.log('array', entry);
    await forEachAsyncSeries(entry, (event) => process(event, context));
  } else if (isOperator(entry)) {
    if (entry.operatorType === 'parallel') {
      // console.log('parallel operator');
      await forEachAsyncParallel(entry.data, (event) => process(event, context));
    } else if (entry.operatorType === 'pass') {
      // console.log('pass operator', entry);
      const eventData = await processEvent(entry.event, context);
      // console.log('eventData', eventData);
      entry.data.forEach((passKey) => {
        // console.log('passKey', passKey);
        context[passKey] = eventData[passKey];
      });
    }
  } else if (isEvent(entry)) {
    // Event: process
    // console.log('event', entry);
    await processEvent(entry, context);
  } else
    logError('Error: Invalid entry found while processing events:', entry);
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
