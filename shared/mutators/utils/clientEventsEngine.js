import { forEachAsyncParallel } from '@utils/async.js';

import { useUserStore } from '@stores/users.js';
import { useProjectStore } from '@stores/projects.js';

import { Users } from '@mutators/users/client.js';
import { Projects } from '@mutators/projects/client.js';

// {
//   model: 'Users',
//   mutator: 'CREATE',
//   action: 'CREATE',
//   data: { ... }
// }
export function processEvents(events) {
  // events.forEach(processEvent);
  events.forEach(processEventEntry);
}

function processEventEntry(entry) {
  // Array: process events in parallel
  if (Array.isArray(entry)) {
    console.log(1);
    forEachAsyncParallel(entry, processEventEntry);
  } else {
    console.log(2);
    processEvent(entry);
  }
}

function processEvent(event) {
  const MODEL_EXECUTOR_MAP = {
    Users: { mutator: Users, action: useUserStore },
    Projects: { mutator: Projects, action: useProjectStore },
  };
  const {
    model, mutator, action, data,
  } = event;
  const executor = MODEL_EXECUTOR_MAP[model];
  if (mutator) executor.mutator[mutator](data);
  if (action) executor.action()[action](data);
}
