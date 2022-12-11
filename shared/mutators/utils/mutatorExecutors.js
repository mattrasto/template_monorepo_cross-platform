import { CONFIG } from '@config';

// Mutator -> client event processor
// Process events locally, then send events to API
// Called after a mutation has been planned in client and is ready to execute (eg. calling CREATE_USER())
// ONLY runs on client
async function processClientEvents(events) {
  const { processEvents } = await import('@mutators/events/clientEngine.js' /* webpackIgnore: true */);
  await processEvents(events);
  const { sendEvents } = await import('@api/user.js' /* webpackIgnore: true */);
  await sendEvents(events);
}

// Mutator -> API event processor
// Process events locally
// Called after a mutation has been planned in API and is ready to execute (eg. calling /user/create)
// ONLY runs on API
async function processAPIEvents(events) {
  const { processEvents } = await import('@mutators/events/apiEngine.js' /* webpackIgnore: true */);
  await processEvents(events);
  // Eventually, we could send events to subscribed listeners here
}

const serviceProcessors = {
  CLIENT: processClientEvents,
  API: processAPIEvents,
};

export function attachMutatorExecutors(mutator) {
  Object.values(mutator).forEach((action) => {
    action.EXECUTE = async function (data) {
      let events = [];
      try {
        events = this.PLAN(data);
      } catch (e) {
        console.log(e); // eslint-disable-line no-console
      }
      await serviceProcessors[CONFIG.service](events);
    };
  });
  return mutator;
}
