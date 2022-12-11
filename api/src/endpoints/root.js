import express from 'express';

import { prisma, isPrismaError } from '@database';

import { processEvents } from '@mutators/events/apiEngine.js';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ status: 'success' });
});

router.post('/events', async (req, res) => {
  try {
    const { events } = req.body;
    console.log('EVENTS', events);
    await processEvents(events);
  } catch (e) {
    if (isPrismaError(e)) console.log(e);
  }
  res.json({ status: 'success' });
});

export { router };
