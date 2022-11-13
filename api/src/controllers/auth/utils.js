// Authentication utilities
import passwordHash from 'password-hash';
import jwt from 'jsonwebtoken';

import { JWT_OPTIONS } from '@constants';

// Hashes a plaintext password using SHA-256
export const hashPassword = (password) => passwordHash.generate(password, { algorithm: 'sha256' });

// Verifies a plaintext password against a hashed password
export const verifyPassword = (password, hashedPassword) =>
  passwordHash.verify(password, hashedPassword);

// Generates and signs a new JWT
export const signJWT = (payload, userId) => {
  const signOptions = Object.assign(JWT_OPTIONS, { subject: userId });
  return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, signOptions);
};

// Decodes a JWT
// Returns null if token is invalid
export const decodeJWT = (token) => jwt.decode(token, { complete: true });
