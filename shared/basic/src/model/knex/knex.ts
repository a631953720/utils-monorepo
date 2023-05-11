import knex, { Knex } from 'knex';

let k: Knex;

export function getKnex() {
  if (k) return k;

  k = knex({
    client: 'pg',
    connection: 'postgresql://postgres:psql@127.0.0.1:5432/postgres',
    searchPath: ['knex', 'public'],
    debug: true,
  });

  return k;
}
