// API config

import { deepMerge } from '@utils/datatypes/object.js';
import path from 'path';
import { ENVIRONMENT, ENVIRONMENTS } from '@shared/environments.js';

// Environment-specific config
const env = {
  [ENVIRONMENTS.DEV]: {
    port: 3000,
    client: {
      url: 'http://127.0.0.1:8080',
    },
    database: {
      // Which database host to use ("local" or "staging")
      dbMode: process.env.DB_MODE || 'local',
      get dbHost() {
        if (this.dbMode === 'local') return 'database';
        if (this.dbMode === ENVIRONMENTS.STAGING) return 'db.ygcnupsoxirqjcbkzgku.supabase.co';
        console.error('Invalid dbMode in config');
        return '';
      },
      get dbSchema() {
        if (this.dbMode === 'local') return ENVIRONMENTS.DEV;
        if (this.dbMode === ENVIRONMENTS.STAGING) return 'postgres';
        console.error('Invalid dbMode in config');
        return '';
      },
      dbPort: 5433,
    },
    services: {},
  },
  [ENVIRONMENTS.STAGING]: {
    port: process.env.API_PORT,
    client: {
      url: 'https://staging.mattrasto.me',
    },
    database: {
      dbHost: 'db.ygcnupsoxirqjcbkzgku.supabase.co',
      dbSchema: 'postgres',
    },
    services: {},
  },
  [ENVIRONMENTS.PROD]: {
    port: 80,
    client: {
      url: 'https://mattrasto.me',
    },
    database: {
      dbHost: '34.82.216.169',
      dbSchema: ENVIRONMENTS.PROD,
    },
    services: {},
  },
}[ENVIRONMENT];

// Shared config
export const CONFIG = deepMerge(env, {
  environment: ENVIRONMENT,
  projectRoot: path.resolve(__dirname, '..'),
});
