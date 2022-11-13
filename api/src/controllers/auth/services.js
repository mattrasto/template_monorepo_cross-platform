import { calculateFutureTimestamp } from '@utils/datatypes/date.js';
import actions from '@actions';
import { sendSupportEmail } from '@utils/misc.js';
import { CONFIG } from '@config';
import crypto from 'crypto';

// Creates a temporary token, converting expires from string format (eg. '1d' = '1 day') to timestamp
export async function createTemporaryToken(expires, data) {
  const expiresAt = calculateFutureTimestamp(expires);
  const token = crypto.randomBytes(64).toString('hex');
  await actions.temporaryTokens.CREATE({ token, expiresAt, data });
  return token;
}

export async function sendResetPasswordEmail(email, resetPasswordToken) {
  const forgotUrl = `${CONFIG.client.url}/login`;
  const resetUrl = `${forgotUrl}?token=${resetPasswordToken}&email=${email}`;
  const emailHtml = `
    <p>Someone recently requested a password reset for your account on Magic.
    If you didn't request this, your account is safe and you can ignore this email.</p>
    <p>If you did make this request, click here to choose your new password: <a href="${resetUrl}">Reset password</a></p>
    <p>This link will stop working in 30 minutes. If you don't set your new password before then,
    click <a href="${forgotUrl}">here</a> to request another password reset.</p>
  `;
  const emailSent = await sendSupportEmail(email, 'Magic - Reset Password', emailHtml);
  return emailSent;
}

// Validates a temporary token
// NOTE: "data" contains fields whose values MUST match with token's data
export async function validateTemporaryToken(tokenVal, data) {
  const token = await actions.temporaryTokens.GET_BY_TOKEN(tokenVal);
  if (
    // Token is expired
    new Date() >= token.expiresAt ||
    // Tokens' data does not match
    (!token.data && data) ||
    (Object.keys(token.data).length === 0 && Object.keys(data).length !== 0)
  )
    return false;
  let dataMatches = true;
  Object.entries(data).forEach(([key, val]) => {
    if (token.data?.[key] !== val) dataMatches = false;
  });
  if (!dataMatches) return false;
  return true;
}
