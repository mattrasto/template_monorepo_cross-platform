// Router to serve Vue app

import history from 'connect-history-api-fallback';
import express from 'express';
import path from 'path';

import CONFIG from '../config.js';

export const rootRouter = express.Router();

// NOTE: This *must* come after HTTPS redirection middleware
const distDir = path.join(CONFIG.projectRoot, 'dist');
const index = path.join(distDir, 'index.html');
// Middleware for serving '/dist' directory, with maxAge = 30 mins
const staticFileMiddleware = express.static(distDir, {
  maxAge: 30 * 60 * 1000
});
// 1st call for unredirected requests
rootRouter.use(staticFileMiddleware);
// Support history api
// QUESTION: Why does this not work by itself? (Need universal redirect below)
rootRouter.use(history({ index }));
// 2nd call for redirected requests
rootRouter.use(staticFileMiddleware);

// QUESTION: Why is this required if using connect-history-api-fallback middleware?
rootRouter.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(distDir, 'static', 'robots.txt'));
});

rootRouter.get('/sitemap.txt', (req, res) => {
  res.sendFile(path.join(distDir, 'sitemap.txt'));
});

// Redirect all requests to index
// QUESTION: Why is this required if using connect-history-api-fallback middleware?
// QUESTION: Is this even called, or is it routed through staticFileMiddleware?
rootRouter.get('*', (req, res) => {
  res.sendFile(index);
});
