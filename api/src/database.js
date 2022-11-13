// Initializes sequelize models
// Loosely based on https://github.com/sequelize/express-example
import Sequelize from 'sequelize';
import requireContext from 'require-context';
import path from 'path';
import { CONFIG } from '@config';

const models = {};
let sequelize = null; // eslint-disable-line import/no-mutable-exports

function getDefaultConfig() {
  return {
    dialect: 'postgres',
    database: CONFIG.database.dbSchema,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: CONFIG.database.dbHost,
    port: 5432,
    pool: {
      max: 15,
      min: 5,
      acquire: 30000, // Timeout on retrieving connection from pool
      idle: 10000, // Time that a connection in pool can be idle before being released
      evict: 2000, // Time interval until idle connections in pool are closed
    },
    // Maximum query timeout of 5 seconds
    dialectOptions: {
      statement_timeout: 5000, // Query timeout
    },
  };
}

// Init platform database connection and ORM
async function initDatabase(config) {
  // console.log(config || getDefaultConfig());
  if (sequelize) return; // Don't re-init if already done
  if (config !== undefined) sequelize = new Sequelize(config);
  else sequelize = new Sequelize(getDefaultConfig());
  sequelize.sync({ force: true });
  // Init all models
  // NOTE: Need to manually import all models when using Webpack + Sequelize
  const context = requireContext(
    path.resolve(CONFIG.projectRoot, 'src', 'models'),
    true,
    /.*/,
    'sync',
  );
  context
    .keys()
    .map(context)
    .forEach((module) => {
      if (!module.default) return; // Ignore index.js
      const sequelizeModel = module.default(sequelize);
      models[sequelizeModel.name] = sequelizeModel;
    });
  // Create associations
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate)
      models[modelName].associate(models);
  });
}

export { initDatabase, models, sequelize };
