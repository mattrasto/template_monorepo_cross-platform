import { createErrorReport, createFailureReport, createSuccessReport } from './reports.js';

export function getStandardControllers(actions) {
  const { idField, modelName } = actions;
  const getDesc = (id) => `${modelName} with ${idField} '${id}'`;
  const controllers = {
    idField,
    CREATE: async (descriptor) => {
      try {
        const result = await actions.CREATE(descriptor);
        return result
          ? createSuccessReport(result, `Created ${getDesc(result[idField])}`)
          : createErrorReport(500, `Failed creating ${modelName}`);
      } catch (exception) {
        return createFailureReport(400, exception.message);
      }
    },
    DELETE: async (id) => {
      if (!id) return createFailureReport(400, `${idField} must be provided`);
      const result = await actions.DELETE(id);
      const desc = getDesc(id);
      if (result === 0) return createFailureReport(404, `Could not find ${desc}`);
      return result
        ? createSuccessReport(result, `Successfully deleted ${desc}`)
        : createErrorReport(500, `Failed deleting ${desc}`);
    },
    FILTER: async (filters) => {
      try {
        const result = await actions.FILTER(filters);
        return result
          ? createSuccessReport(result, `Found ${result.length} matching ${modelName}(s)`)
          : createErrorReport(500, `Failed filtering ${modelName}s`);
      } catch (e) {
        return createFailureReport(400, e.message);
      }
    },
    GET: async (id) => {
      if (!id) return createFailureReport(400, `${idField} must be provided`);
      const result = await actions.GET(id);
      return result
        ? createSuccessReport(result, `Fetched ${getDesc(id)}`)
        : createFailureReport(404, `Could not find ${getDesc(id)}`);
    },
    GET_ALL: async (limit) => {
      const result = await actions.GET_ALL(limit);
      return result
        ? createSuccessReport(result, `Fetched ${result.length} ${modelName}(s)`)
        : createFailureReport(404, `Could not find any records`);
    },
    UPDATE: async (id, updates) => {
      if (!id) return createFailureReport(400, `${idField} must be provided`);
      if (!updates || !Object.keys(updates).length) {
        return createFailureReport(
          400,
          `Expected non-empty updates, got ${JSON.stringify(updates)}`,
        );
      }
      const result = await actions.UPDATE(id, updates);
      return createSuccessReport(result, `Successfully updated ${getDesc(id)}`);
    },
  };
  // Bulk actions are optional
  if (actions.BULK_CREATE !== undefined) {
    controllers.BULK_CREATE = async (descriptors, options) => {
      try {
        const objects = await actions.BULK_CREATE(descriptors, options);
        return objects
          ? createSuccessReport(objects, `Bulk created ${objects.length} ${modelName}(s)`)
          : createErrorReport(500, `Internal failure creating ${modelName}(s)`);
      } catch (exception) {
        return createFailureReport(400, exception.message);
      }
    };
  }
  if (actions.BULK_DELETE !== undefined) {
    controllers.BULK_DELETE = async (ids) => {
      if (!ids || !ids.length) {
        return createFailureReport(400, 'Expected non-empty array of IDs to delete');
      }
      const filters = { [idField]: ids };
      const result = await actions.BULK_DELETE(filters);
      if (result === 0)
        return createFailureReport(404, `Could not find ${modelName} matching provided IDs`);
      return result
        ? createSuccessReport(result, `Successfully deleted ${result} ${modelName}(s)`)
        : createErrorReport(500, `Internal failure deleting ${modelName}(s)`);
    };
  }
  return controllers;
}
