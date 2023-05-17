import { NullAble } from './utils';

export type EntityId = number;

export interface Entity {
  id: EntityId;
}

export interface BaseRepositoryInterface<
  T extends Entity,
  PK extends EntityId = EntityId,
  Conditions extends Partial<T> = Partial<T>
> {
  create(entity: T): Promise<NullAble<T>>;
  find(id: PK): Promise<NullAble<T>>;
  findOne(conditions: Conditions): Promise<NullAble<T>>;
  findMany(conditions: Conditions): Promise<T[]>;
  has(id: PK): Promise<boolean>;
  hasOne(conditions: Conditions): Promise<boolean>;
  update(id: PK, data: Partial<T>): Promise<NullAble<T>>;
  delete(id: PK): Promise<boolean>;
  all(): Promise<T[] | null>;
}
export enum ComparisonOperator {
  EqualTo = '=',
  GreaterThan = '>',
  LessThan = '<',
  GreaterThanOrEqualTo = '>=',
  LessThanOrEqualTo = '<=',
  NotEqualTo = '<>',
}
