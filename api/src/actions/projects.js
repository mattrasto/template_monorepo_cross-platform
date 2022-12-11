import { prisma } from '@database';
import { logError } from '@logging';

export const Projects = {
  async CREATE(data) {
    console.log('CREATING PROJECT', data);
    try {
      const project = await prisma.projects.create({ data });
      console.log('created project', project);
    } catch (e) {
      logError(e);
    }
  }
};
