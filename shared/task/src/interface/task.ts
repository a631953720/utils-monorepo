import { Entity, NullAble } from '@myorg/basic';

export enum TaskPriority {
  none,
  low,
  mid,
  high,
}

export enum TaskState {
  NotStart = 'NotStart',
  Doing = 'Doing',
  End = 'End',
  Pending = 'Pending',
  Delay = 'Delay',
  Delete = 'Delete',
}

export interface Task extends Entity {
  priority: number;
  startTime?: NullAble<string>;
  endTime?: NullAble<string>;
  benefit?: NullAble<string>;
  disadvantages?: NullAble<string>;
  note?: NullAble<string>;
  state: string;
}
