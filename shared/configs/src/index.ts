import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({
  path: '../../.env',
});

const lineNotifyConfig = {
  token: process.env.LINE_NOTIFY_TOKEN,
};

const mongoConfig = {
  isOnline: process.env.MONGO_DB_ONLINE === 'true', // 可能用不到？
  user: process.env.MONGO_DB_USER ?? '',
  psw: process.env.MONGO_DB_PSW ?? '',
  cluster: process.env.MONGO_DB_CLUSTER ?? '',
  uri: '',
};

mongoConfig.uri = `mongodb+srv://${mongoConfig.user}:${mongoConfig.psw}@${mongoConfig.cluster}`;

export const pgConfig = {
  host: process.env.POSTGRES_HOST ?? '127.0.0.1',
  port: process.env.POSTGRES_PORT ?? '5432',
  testPort: process.env.POSTGRES_TEST_PORT ?? '19877',
  user: process.env.POSTGRES_USER ?? '',
  psw: process.env.POSTGRES_PSW ?? '',
  database: process.env.POSTGRES_DATABASE ?? '',
  debug: process.env.POSTGRES_DEBUG === 'true',
  mongoConfig,
  lineNotifyConfig,
};

// 測試用
console.log(pgConfig);
