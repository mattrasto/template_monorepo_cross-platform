import { Sequelize } from 'sequelize';

export const TIMESTAMP_FIELDS = {
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
};

// eslint-disable-next-line no-console
const logging = console.log;

export async function addRemoveColumns(
  queryInterface,
  tableName,
  addDescriptors,
  removeDescriptors,
) {
  return queryInterface.sequelize.transaction(async (transaction) => {
    Object.entries(addDescriptors).forEach(([col, props]) =>
      queryInterface.addColumn(tableName, col, props, { logging, transaction }),
    );
    Object.keys(removeDescriptors).forEach((col) =>
      queryInterface.removeColumn(tableName, col, { logging, transaction }),
    );
  });
}

export async function createTable(queryInterface, modelName, fields) {
  return queryInterface.sequelize.transaction(async (transaction) =>
    queryInterface.createTable(
      Sequelize.Utils.pluralize(modelName),
      { ...fields, ...TIMESTAMP_FIELDS },
      { logging, transaction },
    ),
  );
}

export async function dropTable(queryInterface, modelName) {
  return queryInterface.sequelize.transaction(async (transaction) =>
    queryInterface.dropTable(Sequelize.Utils.pluralize(modelName), { logging, transaction }),
  );
}

export function getTableCreateMigrationFunctions(modelName, fields) {
  return {
    up: async (queryInterface, _Sequelize) => createTable(queryInterface, modelName, fields),
    down: async (queryInterface, _Sequelize) => dropTable(queryInterface, modelName),
  };
}

export function getTableDeleteMigrationFunctions(modelName, fields) {
  return {
    up: async (queryInterface, _Sequelize) => dropTable(queryInterface, modelName),
    down: async (queryInterface, _Sequelize) => createTable(queryInterface, modelName, fields),
  };
}

export function getTableRenameMigrationFunctions(oldName, newName) {
  return {
    up: async (queryInterface, _Sequelize) =>
      queryInterface.renameTable(oldName, newName, { logging }),
    down: async (queryInterface, _Sequelize) =>
      queryInterface.renameTable(newName, oldName, { logging }),
  };
}

export function getTableRemoveColumnMigrationFunctions(tableName, columnName, columnType) {
  return {
    up: async (queryInterface, _Sequelize) =>
      queryInterface.removeColumn(tableName, columnName, { logging }),
    down: async (queryInterface, _Sequelize) =>
      queryInterface.addColumn(tableName, columnName, columnType, { logging }),
  };
}

export function getAddColumnsMigrationFunctions(tableName, columnDescriptors) {
  return {
    up: async (queryInterface) =>
      queryInterface.sequelize.transaction(async (transaction) => {
        Object.entries(columnDescriptors).forEach(([col, props]) =>
          queryInterface.addColumn(tableName, col, props, { logging, transaction }),
        );
      }),
    down: async (queryInterface) =>
      queryInterface.sequelize.transaction(async (transaction) => {
        Object.keys(columnDescriptors).forEach((col) =>
          queryInterface.removeColumn(tableName, col, { logging, transaction }),
        );
      }),
  };
}

export function getRemoveColumnsMigrationFunctions(tableName, columnDescriptors) {
  // Flip adding
  const { up: down, down: up } = getAddColumnsMigrationFunctions(tableName, columnDescriptors);
  return { up, down };
}

export function getAddRemoveColumnsMigrationFunctions(
  tableName,
  addDescriptors,
  removeDescriptors,
) {
  return {
    up: async (queryInterface) =>
      addRemoveColumns(queryInterface, tableName, addDescriptors, removeDescriptors),
    down: async (queryInterface) =>
      addRemoveColumns(queryInterface, tableName, removeDescriptors, addDescriptors),
  };
}
