import {
  action, mutator, parallel, pass, globals, inject,
} from '@mutators/utils/events.js';

export class BaseUsers {
  static async CREATE(data) {
    const { email } = data;
    if (email.length < 3) return { valid: false, events: [] };
    const defaultProjectDataA = {
      projectId: '1',
      name: 'Default Project',
    };
    const defaultProjectDataB = {
      projectId: '2',
      name: 'Default Project',
    };
    const defaultProjectDataC = {
      projectId: '3',
      name: 'Default Project',
    };
    const defaultProjectDataD = {
      projectId: '4',
      name: 'Default Project',
    };
    const events = [
      globals(action('Users', 'CREATE', data), { userId: 'userId1' }),
      [
        inject(globals(pass(mutator('Projects', 'CREATE', defaultProjectDataA), ['name']), ['name']), ['userId1']),
        globals(inject(mutator('Projects', 'CREATE', defaultProjectDataB), ['userId']), ['projectId']),
        inject(mutator('Projects', 'CREATE', defaultProjectDataC), { userId1: 'userId' }),
      ],
      mutator('Projects', 'CREATE', defaultProjectDataD),
    ];
    return { valid: true, events };
  }
}

// TESTS

// Projects should both be created with attached userId
// Final project call should NOT have "projectName" in context
// const events = [
//   pass(action('Users', 'CREATE', data), ['userId']),
//   [
//     pass(mutator('Projects', 'CREATE', defaultProjectData), ['name']),
//     mutator('Projects', 'CREATE', defaultProjectData),
//   ],
//   mutator('Projects', 'CREATE', defaultProjectData),
// ];

// All projects should be created with attached userId
// Projects 2 and 3 should have "userId" in context
// Projects 3 and 4 should have "projectId" in globals
// const events = [
//   pass(action('Users', 'CREATE', data), ['userId']),
//   [
//     pass(mutator('Projects', 'CREATE', defaultProjectDataA), ['name']),
//     globals(mutator('Projects', 'CREATE', defaultProjectDataB), ['projectId']),
//     mutator('Projects', 'CREATE', defaultProjectDataC),
//   ],
//   mutator('Projects', 'CREATE', defaultProjectDataD),
// ];

// Projects may or may not be created with attached userId
// Last two inner project should have "name" in their context
// Last inner project should have "projectId: 2" in their globals
// const events = parallel([
//   pass(action('Users', 'CREATE', data), ['userId']),
//   [
//     pass(mutator('Projects', 'CREATE', defaultProjectDataA), ['name']),
//     globals(mutator('Projects', 'CREATE', defaultProjectDataB), ['projectId']),
//     mutator('Projects', 'CREATE', defaultProjectDataC),
//   ],
//   mutator('Projects', 'CREATE', defaultProjectDataD),
// ]);

// Should behave exactly as the previous example, except inner projects should have "userId"
// directly injected into their project data
// const events = [
//   pass(action('Users', 'CREATE', data), ['userId']),
//   [
//     inject(globals(pass(mutator('Projects', 'CREATE', defaultProjectDataA), ['name']), ['name']), ['userId']), // entry.event.event.data
//     globals(inject(mutator('Projects', 'CREATE', defaultProjectDataB), ['userId']), ['projectId']),
//     inject(mutator('Projects', 'CREATE', defaultProjectDataC), ['userId']), // entry.event.data
//   ],
//   mutator('Projects', 'CREATE', defaultProjectDataD),
// ];

// Should behave similarly as above, except:
// - First inner project should have "userId1" injected key
// - Second inner project should not have any injected data
// - Third inner project should have "userId" injected key
// const events = [
//   globals(action('Users', 'CREATE', data), { userId: 'userId1' }),
//   [
//     inject(globals(pass(mutator('Projects', 'CREATE', defaultProjectDataA), ['name']), ['name']), ['userId1']), // entry.event.event.data
//     globals(inject(mutator('Projects', 'CREATE', defaultProjectDataB), ['userId']), ['projectId']),
//     inject(mutator('Projects', 'CREATE', defaultProjectDataC), { userId1: 'userId' }), // entry.event.data
//   ],
//   mutator('Projects', 'CREATE', defaultProjectDataD),
// ];
