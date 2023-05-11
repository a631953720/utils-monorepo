import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('task', (table) => {
    table.increments('id').primary();
    table.integer('priority').nullable();
    table.date('startTime');
    table.date('endTime');
    table.string('benefit', 1000);
    table.string('disadvantages', 1000);
    table.string('note', 1000);
    table.string('state');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('task');
}
