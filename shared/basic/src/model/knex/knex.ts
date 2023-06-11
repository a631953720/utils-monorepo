import knex, { Knex } from 'knex';
import { types } from 'pg';
import { builtins } from 'pg-types';
import { pgConfig } from '../constants';

// https://github.com/knex/knex/issues/3071#issuecomment-509429039
// 為了讓select出來的時間都經過iso轉換
// todo: 測試不同時區的影響
const parseFn = (val: any) => {
  return val === null ? null : new Date(val).toISOString();
};
types.setTypeParser(builtins.TIMESTAMPTZ, parseFn);
types.setTypeParser(builtins.TIMESTAMP, parseFn);

let k: Knex;

export function getKnex(isE2e = false) {
  if (k) return k;

  const { user, psw, host, port, testPort, database, debug } = pgConfig;

  let connection: string;

  if (isE2e) {
    connection = `postgresql://${user}:${psw}@${host}:${testPort}/${database}`;
  } else {
    connection = `postgresql://${user}:${psw}@${host}:${port}/${database}`;
  }

  k = knex({
    client: 'pg',
    connection,
    searchPath: ['knex', 'public'],
    debug,
    // https://github.com/knex/knex/issues/3585
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetchAsString: ['date'],
  });

  return k;
}
