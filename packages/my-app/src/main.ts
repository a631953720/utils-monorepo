/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as path from 'path';
import { Loggers } from '@myorg/winston-logger';
import { CardCollecterEntity, UserEntity } from '@myorg/basic';

const testLogger = new Loggers({ type: 'default', isSaveLog: true });

testLogger.error('123');

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

const testtt = new CardCollecterEntity();

const user1 = new UserEntity();
const user2 = new UserEntity();

user1.getDeck(testtt);
user1.getDeck(testtt);
user1.getDeck(testtt);
user2.getDeck(testtt);
user2.getDeck(testtt);
user2.getDeck(testtt);
