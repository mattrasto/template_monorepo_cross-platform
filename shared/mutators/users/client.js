import { processEvents, DEFAULT_OPTIONS } from '../utils/clientEventsEngine.js';
import { BaseUsers } from './base.js';

export class Users extends BaseUsers {
  static async CREATE(data, options = DEFAULT_OPTIONS) {
    console.log(options);
    // const { context } = options;
    const { valid, events } = await super.CREATE(data);
    await processEvents(events, options);
    // TODO: Call API
    return data;
  }
}
