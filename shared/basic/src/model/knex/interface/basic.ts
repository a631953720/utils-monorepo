import { NullAble } from './utils';

export interface Entity {
  id: number;
}

export interface BaseRepositoryInterface<T extends Entity> {
  create(entity: T): Promise<NullAble<T>>;
  findById(id: number): Promise<NullAble<T>>;
  update(id: number, data: Partial<T>): Promise<boolean>;
  delete(id: number): Promise<boolean>;
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
