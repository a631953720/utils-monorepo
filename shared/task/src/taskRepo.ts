import { Task as ITask, TaskPriority } from './interface';
import { Knex } from 'knex';
import { BaseRepo } from '@myorg/basic';

type PriorityAndName = {
  name: string;
  priority: TaskPriority;
};
type QueryKeys = keyof ITask;
type QueryValues = ITask[keyof ITask];
type QueryBuilders = Partial<Record<QueryKeys, QueryValues>> & {
  priorityAndName?: PriorityAndName;
};

export class TaskRepo extends BaseRepo<ITask> {
  constructor(knex: Knex) {
    super(knex, 'task');
  }

  async getForCondition(col: keyof ITask, value: any) {
    const all = await this.all();
    if (!all) return null;

    return all.find((v) => v[col] === value) ?? null;
  }

  async queryBuilder(query: QueryBuilders) {
    const q = this.getQuery();

    Object.keys(query).forEach((key: keyof QueryBuilders) => {
      switch (key) {
        case 'priorityAndName':
          // eslint-disable-next-line no-case-declarations
          const { name, priority } = query[key] as PriorityAndName;
          q.where({
            name,
            priority,
          });
          break;
        default:
          q.where<QueryKeys>(key, '=', query[key]);
      }
    });
    return q;
  }

  async findTask(data: PriorityAndName) {
    const r = await this.queryBuilder({
      priorityAndName: { name: data.name, priority: data.priority },
    });
    return r ?? null;
  }
}
