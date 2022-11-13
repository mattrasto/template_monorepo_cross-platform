import { Sequelize, DataTypes } from 'sequelize';

const MODEL_NAME = 'User';
const PRIMARY_KEY_FIELD = 'userId';

const attributes = {
  [PRIMARY_KEY_FIELD]: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fullName: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  role: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  authLevel: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  accessToken: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
};

export default (sequelize) => {
  const User = sequelize.define(MODEL_NAME, { ...attributes });
  return User;
};

export { MODEL_NAME, PRIMARY_KEY_FIELD };
