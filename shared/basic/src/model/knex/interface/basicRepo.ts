import { Knex } from 'knex';
import { NullAble } from './utils';
import { BaseRepositoryInterface, Entity, EntityId } from './basic';

export abstract class BaseRepo<
  T extends Entity,
  PK extends EntityId = EntityId,
  Conditions extends Partial<T> = Partial<T>
> implements BaseRepositoryInterface<T>
{
  protected readonly knex: Knex;
  protected readonly tableName: string;

  constructor(knex: Knex, tableName: string) {
    this.knex = knex;
    this.tableName = tableName;
  }

  // todo: 為了避免型別問題的暫時做法
  protected getQuery(): Knex.QueryBuilder<T> {
    return this.knex<T>(this.tableName);
  }

  async create(entity: Omit<T, 'id'>): Promise<NullAble<T>> {
    try {
      const [newEntity] = await this.knex(this.tableName)
        .insert(entity)
        .returning('*');
      return newEntity;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async find(id: PK): Promise<T | null> {
    const [entity] = await this.knex(this.tableName).where({ id }).select('*');
    return entity ?? null;
  }

  async findOne(conditions: Conditions): Promise<NullAble<T>> {
    const [entity] = await this.knex(this.tableName)
      .where(conditions)
      .select('*');
    return entity ?? null;
  }

  async findMany(conditions: Conditions): Promise<T[]> {
    const entities = await this.knex(this.tableName)
      .where(conditions)
      .select('*');
    return entities;
  }

  async update(id: PK, data: Partial<T>): Promise<NullAble<T>> {
    try {
      const [entity] = await this.knex(this.tableName)
        .where({ id })
        .update(data)
        .returning('*');
      return entity;
    } catch (e) {
      return null;
    }
  }

  async delete(id: PK): Promise<boolean> {
    try {
      await this.knex(this.tableName).where({ id }).del();
      return true;
    } catch (e) {
      return false;
    }
  }

  async all(): Promise<T[] | null> {
    try {
      return this.knex(this.tableName).select('*');
    } catch (e) {
      return null;
    }
  }

  async has(id: PK): Promise<boolean> {
    const find = await this.find(id);
    return find !== null;
  }

  async hasOne(conditions: Conditions): Promise<boolean> {
    const finds = await this.findMany(conditions);
    return finds.length === 1;
  }
}
