import { Entity, NullAble } from '@myorg/basic';

export interface Task extends Entity {
  name: string;
  priority: number;
  startTime?: NullAble<string>;
  endTime?: NullAble<string>;
  benefit?: NullAble<string>;
  disadvantages?: NullAble<string>;
  note?: NullAble<string>;
  state: string;
}
