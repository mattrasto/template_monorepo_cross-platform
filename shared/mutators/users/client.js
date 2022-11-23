import { processEvents } from '../utils/clientEventsEngine.js';
import { BaseUsers } from './base.js';

export class Users extends BaseUsers {
  static async CREATE(data) {
    const { valid, events } = await super.CREATE(data);
    await processEvents(events);
    // TODO: Call API
  }
}
