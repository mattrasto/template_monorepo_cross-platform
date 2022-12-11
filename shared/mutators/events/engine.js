import { forEachAsyncSeries, forEachAsyncParallel } from '@utils/async.js';
import { isObject, cloneObject } from '@utils/datatypes/object.js';
import { isArray } from '@utils/datatypes/array.js';
import { logError } from '@logging';

const isEvent = (entry) => isObject(entry) && entry.type === 'event';
const isOperator = (entry) => isObject(entry) && entry.type === 'operator';

function scopeOptions(options) {
  const { globals } = options;
  const scopedContext = cloneObject(options.context);
  return { context: scopedContext, globals };
}

export class Engine {
  static DEFAULT_OPTIONS = { context: {}, globals: {} };

  processEvent = null;

  constructor(processEvent) {
    this.processEvent = processEvent;
  }

  async processEvents(events, options = Engine.DEFAULT_OPTIONS) {
    return this.process(events, options || Engine.DEFAULT_OPTIONS);
  }

  /* eslint-disable curly */
  async process(entry, options) {
    // console.log('entry + ...options', '\n', entry, '\n', context, '\n', globals);
    if (isArray(entry)) {
      const scopedOptions = scopeOptions(options);
      return forEachAsyncSeries(entry, (event) => this.process(event, scopedOptions));
    }
    if (isOperator(entry)) return this.processOperator(entry, options);
    // if (isEvent(entry)) return this.processEvent(entry, options);
    if (isEvent(entry)) return this.processEvent(entry, options);
    logError('Error: Invalid entry found while processing events:', entry, options);
    return null;
  }

  async processOperator(entry, options) {
    const { context, globals } = options;
    if (entry.operatorType === 'parallel') {
      const scopedOptions = scopeOptions(options);
      return forEachAsyncParallel(entry.data, (event) => this.process(event, scopedOptions));
    }
    if (entry.operatorType === 'pass') {
      const eventData = await this.process(entry.entry, options);
      if (isArray(entry.data)) {
        entry.data.forEach((passKey) => {
          context[passKey] = eventData[passKey];
        });
      } else if (isObject(entry.data)) {
        Object.entries(entry.data).forEach(([passKey, mappedKey]) => {
          context[mappedKey] = eventData[passKey];
        });
      }
      return eventData;
    }
    if (entry.operatorType === 'globals') {
      const eventData = await this.process(entry.entry, options);
      if (isArray(entry.data)) {
        entry.data.forEach((globalKey) => {
          globals[globalKey] = eventData?.[globalKey];
        });
      } else if (isObject(entry.data)) {
        Object.entries(entry.data).forEach(([globalKey, mappedKey]) => {
          globals[mappedKey] = eventData?.[globalKey];
        });
      }
      return eventData;
    }
    if (entry.operatorType === 'inject') {
      if (isArray(entry.data))
        entry.data.forEach((injectKey) => {
          // eslint-disable-next-line no-param-reassign
          entry.event.data[injectKey] = context?.[injectKey] || globals?.[injectKey] || undefined;
        });
      else if (isObject(entry.data)) {
        Object.entries(entry.data).forEach(([injectKey, mappedKey]) => {
          // eslint-disable-next-line no-param-reassign
          entry.event.data[mappedKey] = context?.[injectKey] || globals?.[injectKey] || undefined;
        });
      }
      await this.process(entry.entry, options);
      return null;
    }
    logError('Error: Invalid operator entry found while processing events:', entry, options);
    return null;
  }
}
// const DEFAULT_OPTIONS = { context: {}, globals: {} };

// function scopeOptions(options) {
//   const { globals } = options;
//   const scopedContext = cloneObject(options.context);
//   return { context: scopedContext, globals };
// }

// export async function processEvents(events, options = DEFAULT_OPTIONS) {
//   // console.log('EVENTS', events, options);
//   return process(events, options);
// }

// /* eslint-disable curly */
// async function process(entry, options) {
//   // console.log('entry + ...options', '\n', entry, '\n', context, '\n', globals);
//   if (isArray(entry)) {
//     const scopedOptions = scopeOptions(options);
//     return forEachAsyncSeries(entry, (event) => process(event, scopedOptions));
//   }
//   if (isOperator(entry)) return processOperator(entry, options);
//   if (isEvent(entry)) return processEvent(entry, options);
//   logError('Error: Invalid entry found while processing events:', entry, options);
//   return null;
// }

// async function processOperator(entry, options) {
//   const { context, globals } = options;
//   if (entry.operatorType === 'parallel') {
//     const scopedOptions = scopeOptions(options);
//     return forEachAsyncParallel(entry.data, (event) => process(event, scopedOptions));
//   }
//   if (entry.operatorType === 'pass') {
//     const eventData = await process(entry.entry, options);
//     if (isArray(entry.data)) {
//       entry.data.forEach((passKey) => {
//         context[passKey] = eventData[passKey];
//       });
//     } else if (isObject(entry.data)) {
//       Object.entries(entry.data).forEach(([passKey, mappedKey]) => {
//         context[mappedKey] = eventData[passKey];
//       });
//     }
//     return eventData;
//   }
//   if (entry.operatorType === 'globals') {
//     const eventData = await process(entry.entry, options);
//     if (isArray(entry.data)) {
//       entry.data.forEach((globalKey) => {
//         globals[globalKey] = eventData?.[globalKey];
//       });
//     } else if (isObject(entry.data)) {
//       Object.entries(entry.data).forEach(([globalKey, mappedKey]) => {
//         globals[mappedKey] = eventData?.[globalKey];
//       });
//     }
//     return eventData;
//   }
//   if (entry.operatorType === 'inject') {
//     if (isArray(entry.data))
//       entry.data.forEach((injectKey) => {
//         // eslint-disable-next-line no-param-reassign
//         entry.event.data[injectKey] = context?.[injectKey] || globals?.[injectKey] || undefined;
//       });
//     else if (isObject(entry.data)) {
//       Object.entries(entry.data).forEach(([injectKey, mappedKey]) => {
//         // eslint-disable-next-line no-param-reassign
//         entry.event.data[mappedKey] = context?.[injectKey] || globals?.[injectKey] || undefined;
//       });
//     }
//     await process(entry.entry, options);
//     return null;
//   }
//   logError('Error: Invalid operator entry found while processing events:', entry, options);
//   return null;
// }
