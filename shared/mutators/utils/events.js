export function event(model, mut, act, data) {
  return {
    model, mut, act, data
  };
}

export function mutator(model, act, data) {
  return event(model, undefined, act, data);
}

export function action(model, act, data) {
  return event(model, undefined, act, data);
}
