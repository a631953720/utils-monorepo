import { Task as ITask } from './interface';
import { Knex } from 'knex';
import { BaseRepo } from '@myorg/basic';

export class Task extends BaseRepo<ITask> {
  constructor(knex: Knex) {
    super(knex, 'task');
  }

  async getForCondition(col: keyof ITask, value: any) {
    const all = await this.all();
    if (!all) return null;

    return all.find((v) => v[col] === value) ?? null;
  }
}
