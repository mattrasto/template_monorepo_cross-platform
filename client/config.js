// Client config

import { deepMerge } from '@utils/datatypes/object.js';
import { ENVIRONMENT, ENVIRONMENTS } from '@shared/environments.js';

// Environment-specific config
const env = {
  [ENVIRONMENTS.DEV]: {
    clientProtocol: 'http',
    clientHost: process.env.HOST || 'localhost',
    clientPort: process.env.PORT || 8080,
    get clientUrl() {
      if (this.clientPort === 80)
        return `${this.clientProtocol}://${this.clientHost}`;
      return `${this.clientProtocol}://${this.clientHost}:${this.clientPort}`;
    },
    // Which API host to use ("local", "staging", or "production")
    apiMode: 'staging',
    get apiProtocol() {
      if (process.env.API_PROTOCOL) return process.env.API_PROTOCOL;
      if (this.apiMode === 'local') return 'http';
      if (this.apiMode === 'staging') return 'https';
      if (this.apiMode === 'production') return 'https';
      console.error('Invalid apiMode in config');
      return '';
    },
    get apiHost() {
      if (process.env.API_HOST) return process.env.API_HOST;
      if (this.apiMode === 'local') return 'localhost';
      if (this.apiMode === 'staging')
        return 'propheta-platform-staging.propheta.io';
      if (this.apiMode === 'production') return 'propheta-platform.propheta.io';
      console.error('Invalid apiMode in config');
      return '';
    },
    get apiPort() {
      if (process.env.API_PORT) return process.env.API_PORT;
      if (this.apiMode === 'local') return 3000;
      if (this.apiMode === 'staging' || this.apiMode === 'production')
        return 80;
      console.error('Invalid apiMode in config');
      return '';
    },
    get apiUrl() {
      if (this.apiPort === 80) return `${this.apiProtocol}://${this.apiHost}`;
      return `${this.apiProtocol}://${this.apiHost}:${this.apiPort}`;
    },
    services: {
      auth0: {
        domain: '',
        clientId: '',
        loginRedirectUri: 'http://localhost:8080/login/oauth/redirect',
        signupRedirectUri: 'http://localhost:8080/signup/oauth/redirect'
      },
    },
    dev: {
      vuexTrace: true
    }
  },
  [ENVIRONMENTS.STAGING]: {
    clientProtocol: 'https',
    clientHost: process.env.HOST || 'staging.propheta.io',
    clientPort: process.env.PORT || 80,
    get clientUrl() {
      if (this.clientPort === 80)
        return `${this.clientProtocol}://${this.clientHost}`;
      return `${this.clientProtocol}://${this.clientHost}:${this.clientPort}`;
    },
    apiProtocol: process.env.API_PROTOCOL || 'https',
    apiHost: process.env.API_HOST || 'propheta-platform-staging.propheta.io',
    apiPort: process.env.API_PORT || 80,
    get apiUrl() {
      if (this.apiPort === 80) return `${this.apiProtocol}://${this.apiHost}`;
      return `${this.apiProtocol}://${this.apiHost}:${this.apiPort}`;
    },
    services: {
      auth0: {
        domain: '',
        clientId: '',
        loginRedirectUri: 'https://staging.propheta.io/login/oauth/redirect',
        signupRedirectUri:
          'https://staging.propheta.io/signup/oauth/redirect'
      },
    },
  },
  [ENVIRONMENTS.PROD]: {
    clientProtocol: 'https',
    clientHost: process.env.HOST || 'propheta.io',
    clientPort: process.env.PORT || 80,
    get clientUrl() {
      if (this.clientPort === 80)
        return `${this.clientProtocol}://${this.clientHost}`;
      return `${this.clientProtocol}://${this.clientHost}:${this.clientPort}`;
    },
    apiProtocol: process.env.API_PROTOCOL || 'https',
    apiHost: process.env.API_HOST || 'propheta-platform.propheta.io',
    apiPort: process.env.API_PORT || 80,
    get apiUrl() {
      if (this.apiPort === 80) return `${this.apiProtocol}://${this.apiHost}`;
      return `${this.apiProtocol}://${this.apiHost}:${this.apiPort}`;
    },
    services: {
      auth0: {
        domain: '',
        clientId: '',
        loginRedirectUri: 'https://propheta.io/login/oauth/redirect',
        signupRedirectUri: 'https://propheta.io/signup/oauth/redirect'
      },
    },
  }
}[ENVIRONMENT];

// Shared config
export const CONFIG = deepMerge(env, {
  environment: ENVIRONMENT,
  services: {}
});
