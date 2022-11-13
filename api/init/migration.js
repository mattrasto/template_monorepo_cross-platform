/* eslint-disable no-console */
// Initializes the database schema for dev version

import { ENVIRONMENT, ENVIRONMENTS } from '@constants';
import { exec } from 'child_process';
import { SERVER_CONFIG } from '../src/config.js';
import { populateEssentials } from './populateDbEssentials.js';

function checkShouldMigrate() {
  // Only run on local database
  return ENVIRONMENT === ENVIRONMENTS.DEV && SERVER_CONFIG.database.dbMode === 'local';
}

async function migrateDb() {
  if (!checkShouldMigrate()) return;
  try {
    // Run migrations
    await new Promise((resolve, reject) => {
      const migrate = exec(
        // 'node -r esm ./node_modules/.bin/sequelize-cli db:migrate',
        'sequelize db:migrate',
        { env: process.env },
        (err) => (err ? reject(err) : resolve()),
      );
      // Forward stdout+stderr to this process
      migrate.stdout.pipe(process.stdout);
      migrate.stderr.pipe(process.stderr);
    });
    await populateEssentials();
  } catch (err) {
    console.error('Failure on migrating', err);
  }
}

export { migrateDb };
