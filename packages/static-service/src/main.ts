/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { pgConfig } from '@myorg/basic';
// import * as cors from 'cors/lib'; // FIXME: 會出現 function error
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'assets')));

app.use(
  '/',
  createProxyMiddleware({
    target: pgConfig.apiHost,
    changeOrigin: true,
  })
);

const port = process.env.PORT || 80;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
