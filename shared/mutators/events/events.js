import { MUTATORS } from '../index.js';

function createEvent(model, act, data) {
  return {
    type: 'event',
    model,
    action: act,
    data
  };
}

export function action(model, act, data) {
  return createEvent(model, act, data);
}

export function plan(model, act, data) {
  return MUTATORS[model][act].PLAN(data);
}

function createOperator(operatorType, data, entry) {
  return {
    type: 'operator',
    operatorType,
    data,
    entry,
    event: entry?.event || entry, // Keep record of base event at top level of entry
  };
}

export function parallel(eventsArr) {
  return createOperator('parallel', eventsArr);
}

export function pass(entry, values) {
  return createOperator('pass', values, entry);
}

export function globals(entry, values) {
  return createOperator('globals', values, entry);
}

export function inject(entry, values) {
  return createOperator('inject', values, entry);
}
