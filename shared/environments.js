export const ENVIRONMENTS = {
  DEV: 'development',
  STAGING: 'staging',
  PROD: 'production',
};
export const ENVIRONMENT = process.env.NODE_ENV || ENVIRONMENTS.DEV;
