import { action } from '@mutators/events/events.js';
import { attachMutatorExecutors } from '@mutators/utils/mutatorExecutors.js';

/* eslint-disable object-shorthand, func-names */

export const Projects = attachMutatorExecutors({
  CREATE: {
    PLAN: function (data) {
      this.VALIDATE(data);
      return [
        action('Projects', 'CREATE', data),
      ];
    },
    VALIDATE: function (data) {
      console.log('validating project', data);
      // const { email } = data;
      // if (!email || email.length < 3) throw new Error('Email is not long enough.');
    },
  }
});
