/* eslint-disable no-console */
import { CONFIG } from '@config';
import { ENVIRONMENT, ENVIRONMENTS } from '@shared/environments.js';
import { reportMiddleware } from '@utils/middleware.js';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import minify from 'express-minify';
import { initDatabase } from '@database';
import { initRouters } from './routes.js';
// import { initSecrets } from './secrets.js';

const corsOptions = {
  origin: '*', // TODO: Only whitelist client(s)
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cors(corsOptions));
app.use(compression());
app.use(minify());
app.use(reportMiddleware);

export default app;

// Create and run app
async function main() {
  if (ENVIRONMENT === ENVIRONMENTS.DEV) console.warn('*** Magic - Development Version ***');
  else if (ENVIRONMENT === ENVIRONMENTS.STAGING) console.warn('--- Magic - Staging Version ---');

  // console.log(process.env);

  // await initSecrets();
  await initDatabase();
  initRouters(app);
  app.listen(CONFIG.port, () => console.log(`Magic API listening on port ${CONFIG.port}`));
}

main();
