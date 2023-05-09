import { TaskPriority, TaskState } from './basic';

export interface Task {
  taskName: string;
  priority: TaskPriority;
  startTime: Date;
  endTime?: Date;
  benefits?: string;
  disadvantages?: string;
  note?: string;
  state: TaskState;
}
