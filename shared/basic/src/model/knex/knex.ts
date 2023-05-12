import knex, { Knex } from 'knex';
import { pgConfig } from '../../constant';

let k: Knex;

export function getKnex() {
  if (k) return k;

  k = knex({
    client: 'pg',
    connection: `postgresql://${pgConfig.user}:${pgConfig.psw}@127.0.0.1:5432/${pgConfig.database}`,
    searchPath: ['knex', 'public'],
    debug: true,
  });

  return k;
}
