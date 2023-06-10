import { pgConfig } from '@myorg/configs';
import { Agenda } from 'agenda';

export const agendaConfigs = {
  uri: pgConfig.mongoConfig.uri,
  collection: 'jobCollectionName',
};

export const agenda = new Agenda({
  db: {
    address: `${agendaConfigs.uri}/agenda`,
    collection: agendaConfigs.collection,
  },
});

export async function initAG() {
  await agenda.start();
  // agenda.define('delete old users', (job, done) => {});

  // 危險操作，沒被定義的job都會刪除
  await agenda.purge();

  // 預設最多20個工作
  agenda.maxConcurrency(500);

  // agenda預設lock的工作為0，等於無限制
  // agenda.lockLimit(0);

  // 毫秒為單位，預設lock一個工作的時間為10分鐘
  // agenda.defaultLockLifetime(10000);

  agenda.name(`kk-${process.pid}`);
}
