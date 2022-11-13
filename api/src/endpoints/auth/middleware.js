// Authentication utilities
// JWT  options
import { JWT_OPTIONS } from '@constants';
import jwt from 'jsonwebtoken';

// Verifies an existing JWT
const verifyJWT = (token, userId) => {
  const verifyOptions = Object.assign(JWT_OPTIONS, { subject: userId });
  try {
    return jwt.verify(token, process.env.JWT_PUBLIC_KEY, verifyOptions);
  } catch (err) {
    return false;
  }
};

// Parses a JWT from the Authorization (Bearer) header
const parseJWT = (req) => {
  const header = req.headers.authorization;
  if (!header) return null;
  const bearer = header.split(' ');
  const token = bearer[1];
  return token;
};

// Decodes a JWT
// Returns null if token is invalid
const decodeJWT = (token) => jwt.decode(token, { complete: true });

// Source: https://medium.com/@maison.moa/using-jwt-json-web-tokens-to-authorize-users-and-protect-api-routes-3e04a1453c3e
// Check to make sure header is not undefined and JWT is not invalid; if so, return Unauthorized (401)
// TODO: Rename to authenticateUser
export const parseToken = (req, res, next) => {
  const token = parseJWT(req);
  if (!token) {
    // If header is undefined or JWT is invalid, return Unauthorized (401)
    res.statusCode = 401;
    res.json({ status: 'failure', message: 'JWT is not present' });
    return;
  }
  req.token = token;
  req.userId = decodeJWT(token).payload.sub; // We store userId in JWT's subject
  if (verifyJWT(token, req.userId)) next();
  else {
    // If header is undefined or JWT is invalid, return Unauthorized (401)
    res.statusCode = 401;
    res.json({ status: 'failure', message: 'JWT is invalid' });
  }
};

// Checks if JWT is present, parsing if so (returning error if present but invalid)
// If JWT not present, continues
export const parseTokenIfExists = (req, res, next) => {
  const token = parseJWT(req);
  if (!token) {
    next();
    return;
  }
  req.token = token;
  req.userId = decodeJWT(token).payload.sub; // We store userId in JWT's subject
  if (verifyJWT(token, req.userId)) next();
  else {
    // If header is undefined or JWT is invalid, return Unauthorized (401)
    res.statusCode = 401;
    res.json({ status: 'failure', message: 'JWT is invalid' });
  }
};
