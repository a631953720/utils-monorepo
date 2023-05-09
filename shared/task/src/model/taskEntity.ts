import { Task, TaskPriority, TaskState } from './interface';

// todo: add more method for this class
class TaskEntity implements Task {
  benefits?: string;
  disadvantages?: string;
  endTime?: Date;
  note?: string;
  priority: TaskPriority;
  startTime: Date;
  state: TaskState;
  taskName: string;

  constructor(data: Task) {
    this.benefits = data.benefits;
    this.disadvantages = data.disadvantages;
    this.note = data.note;
    this.taskName = data.taskName;
    this.endTime = data.endTime;
    this.priority = data.priority;
    this.startTime = data.startTime;
    this.state = data.state;
  }
}
