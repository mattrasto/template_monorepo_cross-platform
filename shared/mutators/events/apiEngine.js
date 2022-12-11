import { Users as UserActions } from '@actions/users.js';
import { Projects as ProjectActions } from '@actions/projects.js';

import { Users } from '@mutators/users.js';
import { Projects } from '@mutators/projects.js';

import { Engine } from './engine.js';

let engine = null;

async function processEvent(event, options) {
  const MODEL_EXECUTOR_MAP = {
    Users: { mutator: Users, action: UserActions },
    Projects: { mutator: Projects, action: ProjectActions },
  };
  const {
    model, action, data,
  } = event;
  const executor = MODEL_EXECUTOR_MAP[model];
  executor.mutator[action].VALIDATE(data);
  return executor.action[action](data, options);
}

export async function processEvents(events) {
  if (!engine) engine = new Engine(processEvent);
  engine.processEvents(events);
}
