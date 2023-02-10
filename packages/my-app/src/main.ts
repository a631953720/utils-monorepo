/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as path from 'path';
import { AES128Crypt } from '@myorg/crypt'

const test = new AES128Crypt();
const type: BufferEncoding = 'binary';

const b = test.Encrypt('test', type);
console.log(b);

const eb = test.Decrypt(b.buffer, type);
console.log(Buffer.from(eb.data).toString('utf-8'));
console.log(Buffer.from(eb.data).toString('binary'));

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: `用到nx建立的share lib` });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
