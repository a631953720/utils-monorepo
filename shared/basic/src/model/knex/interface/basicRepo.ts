import { Knex } from 'knex';
import { NullAble } from './utils';
import { BaseRepositoryInterface, Entity } from './basic';

export abstract class BaseRepo<T extends Entity>
  implements BaseRepositoryInterface<T>
{
  protected readonly knex: Knex;
  protected readonly tableName: string;

  constructor(knex: Knex, tableName: string) {
    this.knex = knex;
    this.tableName = tableName;
  }

  protected getQuery(): Knex.QueryBuilder {
    return this.knex<T>(this.tableName);
  }

  async create(entity: T): Promise<NullAble<T>> {
    const [newEntity] = await this.getQuery().insert(entity).returning('*');
    return newEntity;
  }
  async findById(id: number): Promise<T | null> {
    const [entity] = await this.getQuery().where({ id }).select('*');
    return entity;
  }

  async update(id: number, data: Partial<T>): Promise<boolean> {
    try {
      await this.getQuery().where({ id }).update(data);
      return true;
    } catch (e) {
      return false;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.getQuery().where({ id }).del();
      return true;
    } catch (e) {
      return false;
    }
  }

  async all(): Promise<T[] | null> {
    try {
      return this.getQuery().select('*');
    } catch (e) {
      return null;
    }
  }
}