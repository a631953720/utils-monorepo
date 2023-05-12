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
