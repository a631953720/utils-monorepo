import type { Knex } from 'knex';
import { pgConfig } from './constant';

// Update with your config settings.
// https://knexjs.org/guide/migrations.html#migration-cli
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: pgConfig.database,
      user: pgConfig.user,
      password: pgConfig.psw,
      port: parseInt(pgConfig.port),
      host: pgConfig.host,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  test: {
    client: 'postgresql',
    connection: {
      database: pgConfig.database,
      user: pgConfig.user,
      password: pgConfig.psw,
      port: parseInt(pgConfig.testPort),
      host: pgConfig.host,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

module.exports = config;
