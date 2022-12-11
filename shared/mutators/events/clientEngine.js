import { useUserStore } from '@stores/users.js';
import { useProjectStore } from '@stores/projects.js';

import { Users } from '@mutators/users.js';
import { Projects } from '@mutators/projects.js';

import { Engine } from './engine.js';

let engine = null;

async function processEvent(event, options) {
  const MODEL_EXECUTOR_MAP = {
    Users: { mutator: Users, action: useUserStore },
    Projects: { mutator: Projects, action: useProjectStore },
  };
  const {
    model, action, data,
  } = event;
  const executor = MODEL_EXECUTOR_MAP[model];
  executor.mutator[action].VALIDATE(data);
  return executor.action()[action](data, options);
}

export async function processEvents(events) {
  if (!engine) engine = new Engine(processEvent);
  engine.processEvents(events);
}
