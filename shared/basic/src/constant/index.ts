import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({
  path: '../../.env',
});

export const pgConfig = {
  user: process.env.POSTGRES_USER ?? '',
  psw: process.env.POSTGRES_PSW ?? '',
  database: process.env.POSTGRES_DATABASE ?? '',
  debug: process.env.POSTGRES_DEBUG === 'true',
};
