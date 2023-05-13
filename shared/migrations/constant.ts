import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({
  path: './.env',
});

export const pgConfig = {
  host: process.env.POSTGRES_HOST ?? '127.0.0.1',
  port: process.env.POSTGRES_PORT ?? '5432',
  testPort: process.env.POSTGRES_TEST_PORT ?? '19877',
  user: process.env.POSTGRES_USER ?? '',
  psw: process.env.POSTGRES_PSW ?? '',
  database: process.env.POSTGRES_DATABASE ?? '',
  debug: process.env.POSTGRES_DEBUG === 'true',
};
