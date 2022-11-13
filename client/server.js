// Express server used to serve Vue app in production

import compression from 'compression';
import { rootRouter } from './server/index.js';

const express = require('express');
const { redirectToHTTPS } = require('express-http-to-https');

import { CONFIG } from '@config';

const app = express();
app.use(compression());

// NOTE: This *must* be the first middleware attached to support HTTPS redirection
// The arguments here achieve two things:
// 1. exempt localhost from redirecting - allows our setup to be environment agnostic / avoid env checks
// 2. exclude /healthcheck endpoint from redirecting - that way we can health check our service easily
// https://www.npmjs.com/package/express-http-to-https#example for more details
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/healthcheck/]));
app.enable('trust proxy');

// Healthcheck route, does not require HTTPS (excluded just above)
app.get('/healthcheck', (req, res) => {
  res.send('All good, thanks for asking!');
});

app.use('/', rootRouter);

app.listen(CONFIG.clientPort, () => {
  // eslint-disable-next-line no-console
  console.log(`Template client server listening on port ${CONFIG.clientPort}`);
});
