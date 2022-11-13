export const ENVIRONMENTS = {
  DEV: 'development',
  STAGING: 'staging',
  PROD: 'production',
};
// JWT options
export const JWT_OPTIONS = {
  issuer: 'Magic',
  subject: '',
  audience: 'https://mattrasto.me',
  expiresIn: '30d', // 30 days validity
  algorithm: 'RS256',
};
export const ENVIRONMENT = process.env.NODE_ENV || ENVIRONMENTS.DEV;
export const SUPPORT_EMAIL = 'support@mattrasto.me';
