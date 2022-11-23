import { processEvents } from '../utils/clientEventsEngine.js';
import { BaseProjects } from './base.js';

export class Projects extends BaseProjects {
  static async CREATE(data) {
    const { valid, events } = await super.CREATE(data);
    await processEvents(events);
  }
}
