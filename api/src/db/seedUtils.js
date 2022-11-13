/* eslint-disable no-console */
import { Sequelize } from 'sequelize';

export const INSERT_OPTIONS = {
  ignoreDuplicates: true,
  returning: true,
};
export const TRUNCATE_OPTIONS = {
  logging: console.log,
  truncate: true,
  cascade: true,
};

const { pluralize } = Sequelize.Utils;

export function getTruncateTablesFn(modelList) {
  return async function down(queryInterface, _Sequelize) {
    return Promise.all(
      modelList.map((model) => queryInterface.bulkDelete(pluralize(model), null, TRUNCATE_OPTIONS)),
    );
  };
}
