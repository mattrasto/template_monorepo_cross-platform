/* eslint-disable no-console */
import { ENVIRONMENT, ENVIRONMENTS } from '@shared/environments.js';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const SECRET_CONFIGS = {
  [ENVIRONMENTS.STAGING]: {
    projectId: 11597359025,
    secretName: 'magic-api-staging',
  },
  [ENVIRONMENTS.PROD]: {
    projectId: 965811952999,
    secretName: 'magic-api',
  },
};

function _getFullSecretName(env, version = 'latest') {
  const { projectId, secretName } = SECRET_CONFIGS[env];
  return `projects/${projectId}/secrets/${secretName}/versions/${version}`;
}

async function _getSecret(name) {
  const client = new SecretManagerServiceClient();
  const [version] = await client.accessSecretVersion({ name });
  return JSON.parse(version.payload.data.toString());
}

async function initSecrets() {
  console.log(`initSecrets for env ${ENVIRONMENT}`);
  // There is no dev env in GCP, we read directly from Doppler for local runs
  if (ENVIRONMENT === ENVIRONMENTS.DEV) return false;

  const secrets = await _getSecret(_getFullSecretName(ENVIRONMENT));
  if (Object.keys(secrets).length) {
    console.log(`Applying the following secrets to process.env: ${Object.keys(secrets)}`);
    Object.assign(process.env, secrets);
    return true;
  }
  console.log('No secrets to apply');
  return false;
}

export { initSecrets };
