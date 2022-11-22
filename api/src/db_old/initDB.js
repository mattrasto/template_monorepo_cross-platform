import { initDatabase, models, sequelize } from '../database.js';

initDatabase(require('./config')[process.env.NODE_ENV]);

export default sequelize;
export { models, sequelize };
