import * as express from 'express';
import { Request, Response } from 'express';
import stock from './routers';
import { commonError, notFoundError } from './middleware';
import { simpleMsg } from '@myorg/winston-logger';
import * as cors from 'cors';
import { getStockInfos } from '@myorg/basic';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/stock', stock);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use(notFoundError);
app.use(commonError);

app.listen(3000, () => {
  simpleMsg('Server is running on port 3000');
});

// createMinLoopJob({
//   jobName: 'echo',
//   jobCallback: () => {
//     console.log('echo');
//   },
//   mins: '40',
// }).then(() => {
//   simpleMsg('create job success');
// });
