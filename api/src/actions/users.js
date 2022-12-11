import { prisma } from '@database';
import { logError } from '@logging';

export const Users = {
  async CREATE(data) {
    console.log('CREATING USER', data);
    try {
      const user = await prisma.users.create({ data });
      console.log('created user', user);
    } catch (e) {
      logError(e);
    }
  }
};
