import express from 'express';

import { prisma, isPrismaError } from '@database';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await prisma.users.create({
      data: {
        name: 'Alice',
        email: 'alice@prisma.io',
      },
    });
    console.log(user);
  } catch (e) {
    if (isPrismaError(e)) console.log(e);
  }
  res.json({ status: 'success' });
});

export { router };
