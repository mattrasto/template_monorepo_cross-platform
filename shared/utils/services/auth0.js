import auth0 from 'auth0-js';
import { logError } from '@utils/logging.js';

import config from '@config';

const webAuth = new auth0.WebAuth({
  domain: config.services.auth0.domain,
  clientID: config.services.auth0.clientId,
  scope: 'openid profile email phone'
});

// Redirects the user to signup via Google OAuth, then redirects to /login
async function googleOAuthLogin() {
  webAuth.authorize(
    {
      redirectUri: config.services.auth0.loginRedirectUri,
      connection: 'google-oauth2',
      responseType: 'token',
      connection_scope: 'https://www.googleapis.com/auth/user.phonenumbers.read'
    },
    (err) => {
      logError(err);
      return false;
    }
  );
}

// Redirects the user to signup via Google OAuth, then redirects to /login
async function googleOAuthSignup() {
  webAuth.authorize(
    {
      redirectUri: config.services.auth0.signupRedirectUri,
      connection: 'google-oauth2',
      responseType: 'token',
      connection_scope: 'https://www.googleapis.com/auth/user.phonenumbers.read'
    },
    (err) => {
      logError(err);
      return false;
    }
  );
}

// Retrieves a user's Google profile info using their access token
async function getOAuthUserInfo(accessToken) {
  return new Promise((resolve, reject) => {
    webAuth.client.userInfo(accessToken, (err, user) => {
      if (err) reject(user);
      else resolve(user);
    });
  });
}

export { googleOAuthLogin, googleOAuthSignup, getOAuthUserInfo };
