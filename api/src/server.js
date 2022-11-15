/* eslint-disable no-console */
import { CONFIG } from '@config';
import { ENVIRONMENT, ENVIRONMENTS } from '@shared/environments.js';
import controllers from '@controllers';
// import { initDatabase } from '@database';
import { reportMiddleware } from '@utils/middleware.js';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import minify from 'express-minify';
import { initRouters } from './routes.js';
// import { initSecrets } from './secrets.js';
// import { migrateDb } from '../init/migration.js';

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
  // await initSecrets();
  // await initDatabase();
  // await migrateDb();
  initRouters(app);
  if (CONFIG.platform.ensureAdmin)
    await controllers.users.CREATE({
      email: 'admin@mattrasto.me',
      fullName: 'Magic Admin',
      role: 'admin',
      password: process.env.ADMIN_PASS,
      phone: null,
      authLevel: 'user',
      accessToken: null,
    });
  console.log('API_PORT', CONFIG.port);
  app.listen(CONFIG.port, () => console.log(`Magic API listening on port ${CONFIG.port}`));
}

main();
