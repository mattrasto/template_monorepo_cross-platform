import { action, mutator } from '@mutators/utils/events.js';

export class BaseUsers {
  static async CREATE(data) {
    const { email } = data;
    if (email.length < 3) return { valid: false, events: [] };
    const defaultProjectData = {
      projectId: '123',
      name: 'Default Project',
    };
    // const events = [
    //   actionEvent('Users', 'CREATE', data),
    //   mutatorEvent('Projects', 'CREATE', defaultProjectData),
    // ];
    // const events = [
    //   [
    //     actionEvent('Users', 'CREATE', data),
    //     mutatorEvent('Projects', 'CREATE', defaultProjectData),
    //   ],
    // ];
    const events = [
      [
        action('Users', 'CREATE', data),
        [
          mutator('Projects', 'CREATE', defaultProjectData),
          mutator('Projects', 'CREATE', defaultProjectData),
        ]
      ],
    ];
    return { valid: true, events };
  }
}
