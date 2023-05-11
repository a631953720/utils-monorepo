import knex from 'knex';

const c = knex({
  client: 'pg',
  connection: 'postgresql://psql:psql@127.0.0.1:5432/database',
  searchPath: ['knex', 'public'],
  debug: true,
});

c('');
