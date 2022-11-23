import { action } from '@mutators/utils/events.js';

export class BaseProjects {
  static async CREATE(data) {
    const events = [
      action('Projects', 'CREATE', data),
    ];
    return { valid: true, events };
  }
}
