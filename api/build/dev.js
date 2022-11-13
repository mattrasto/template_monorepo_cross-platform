// Runs docker-compose command to start services locally
import { execSync } from 'child_process';

async function start() {
  let startCmd = `docker-compose -f build/docker-compose.dev.yml up`;
  startCmd = startCmd.replace(/\s+/g, ' ').trim();
  console.log(startCmd); // eslint-disable-line no-console
  execSync(startCmd, { stdio: 'inherit' });
}

start();
