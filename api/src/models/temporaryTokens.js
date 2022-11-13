import { Sequelize, DataTypes } from 'sequelize';

const MODEL_NAME = 'TemporaryToken';
const PRIMARY_KEY_FIELD = 'tokenId';

const attributes = {
  [PRIMARY_KEY_FIELD]: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data: {
    type: DataTypes.JSON,
    allowNull: true,
  },
};

export default (sequelize) => {
  const TemporaryToken = sequelize.define(MODEL_NAME, { ...attributes });
  return TemporaryToken;
};

export { MODEL_NAME, PRIMARY_KEY_FIELD };
