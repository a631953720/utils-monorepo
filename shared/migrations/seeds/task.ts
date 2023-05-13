import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('task').del();

  // Inserts seed entries
  await knex('task').insert([
    {
      id: 1,
      name: 'task-1',
      priority: 0,
      startTime: new Date('2023-05-05').toISOString(),
      endTime: null,
      benefit: 'good',
      disadvantages: 'bad',
      note: null,
      state: 'notStart',
    },
    {
      id: 2,
      name: 'task-2',
      priority: 2,
      startTime: new Date('2023-05-05').toISOString(),
      endTime: null,
      benefit: '大大',
      disadvantages: '鐘鐘',
      note: null,
      state: 'notStart',
    },
    {
      id: 3,
      name: 'task-3',
      priority: 1,
      startTime: new Date('2023-05-05').toISOString(),
      endTime: null,
      benefit: '傑哥',
      disadvantages: '不要',
      note: '看',
      state: 'notStart',
    },
  ]);
}
