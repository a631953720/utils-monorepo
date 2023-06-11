import { MongoClient, ServerApiVersion } from 'mongodb';
import { pgConfig } from '../constants';

const { mongoConfig } = pgConfig;

let client: MongoClient;
// 如果一直timeout 檢查一下Atlas Network Access 設定
// https://stackoverflow.com/questions/70483569/error-timeout-when-connecting-to-mongodb-atlas-using-mongoose

// 如果一直驗證失敗，檢查一下 Database Access 內設定user的地方
export const getMongoInstance = () => {
  if (client) return client;
  client = new MongoClient(mongoConfig.uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client;
};
