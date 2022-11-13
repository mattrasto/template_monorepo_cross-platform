const { SERVER_CONFIG } = require('../config.js');

const defaults = {
  database: SERVER_CONFIG.database.dbSchema,
  dialect: 'postgres',
  host: SERVER_CONFIG.database.dbHost,
  password: process.env.DB_PASS,
  port: 5432,
  username: 'admin',
};

module.exports = {
  development: {
    ...defaults,
    host: process.env.PWD !== '/app' ? '127.0.0.1' : defaults.host,
    port: process.env.PWD !== '/app' ? 5433 : defaults.port,
  },
  // SERVER_CONFIG already does database selection based off NODE_ENV env var,
  // so the below should be sane. Alternatively we could expose all environment
  // configs and use the correct ones here for less obscurity
  staging: { ...defaults },
  production: { ...defaults },
};
