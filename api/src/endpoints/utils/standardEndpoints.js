const getDefaultHandlers = (controllers) => {
  const { idField } = controllers;
  const getHandler = (controller) => async (req, res) => {
    res.report(await controller(req, res));
  };
  return {
    CREATE: getHandler((req) => controllers.CREATE(req.body, req)), // controllers.CREATE(req.body, req)
    DELETE: getHandler((req) => controllers.DELETE(req.params[idField], req)),
    FILTER: getHandler((req) => controllers.FILTER(req.query, req)),
    GET_ALL: getHandler((req) => controllers.GET_ALL(req.query.limit, req)),
    GET: getHandler((req) => controllers.GET(req.params[idField], req)),
    UPDATE: getHandler((req) => controllers.UPDATE(req.params[idField], req.body.updates, req)),
    BULK_CREATE: getHandler((req) =>
      controllers.BULK_CREATE(req.body.descriptors, req.body.options, req),
    ),
    BULK_DELETE: getHandler((req) => controllers.BULK_DELETE(req.body.ids, req)),
  };
};

export function registerStandardEndpoints(router, controllers, options) {
  const { idField } = controllers;
  const defaultHandlers = getDefaultHandlers(controllers);
  router.post(
    options.CREATE?.route || '/',
    ...(options.CREATE?.middlewares || []),
    defaultHandlers.CREATE,
  );
  router.delete(
    options.DELETE?.route || `/:${idField}`,
    ...(options.DELETE?.middlewares || []),
    defaultHandlers.DELETE,
  );
  router.get(
    options.FILTER?.route || '/filter',
    ...(options.FILTER?.middlewares || []),
    defaultHandlers.FILTER,
  );
  router.get(
    options.GET_ALL?.route || `/all`,
    ...(options.GET_ALL?.middlewares || []),
    defaultHandlers.GET_ALL,
  );
  router.get(
    options.GET?.route || `/:${idField}`,
    ...(options.GET?.middlewares || []),
    defaultHandlers.GET,
  );
  router.patch(
    options.UPDATE?.route || `/:${idField}`,
    ...(options.UPDATE?.middlewares || []),
    defaultHandlers.UPDATE,
  );
  if (controllers.BULK_CREATE !== undefined) {
    router.post(
      options.BULK_CREATE?.route || '/bulk',
      ...(options.BULK_CREATE?.middlewares || []),
      defaultHandlers.BULK_CREATE,
    );
  }
  if (controllers.BULK_DELETE !== undefined) {
    // NOTE: Ideally this would be a DELETE endpoint, but those cannot have a body 🙄
    router.post(
      options.BULK_DELETE?.route || '/bulk/delete',
      ...(options.BULK_DELETE?.middlewares || []),
      defaultHandlers.BULK_DELETE,
    );
  }
}
