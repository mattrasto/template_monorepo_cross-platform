import { processEvents, DEFAULT_OPTIONS } from '../utils/clientEventsEngine.js';
import { BaseProjects } from './base.js';

export class Projects extends BaseProjects {
  static async CREATE(data, options = DEFAULT_OPTIONS) {
    const { valid, events } = await super.CREATE(data);
    await processEvents(events, options);
    return data;
  }
}
