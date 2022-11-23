function createEvent(model, mut, act, data) {
  return {
    type: 'event',
    eventType: (mut && 'mutation') || (act && 'action'),
    model,
    mutator: mut,
    action: act,
    data
  };
}

export function mutator(model, mut, data) {
  return createEvent(model, mut, undefined, data);
}

export function action(model, act, data) {
  return createEvent(model, undefined, act, data);
}

function createOperator(operatorType, data, event) {
  return {
    type: 'operator',
    operatorType,
    data,
    event,
  };
}

export function parallel(eventsArr) {
  return createOperator('parallel', eventsArr);
}

export function pass(event, values) {
  return createOperator('pass', values, event);
}
