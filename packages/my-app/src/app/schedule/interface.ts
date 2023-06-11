import { DailyJobParams } from '@myorg/basic';

export interface ScheduleOptions {
  type: 'daily';
  IDs: string[];
  dailyTime: Pick<DailyJobParams, 'mins' | 'hours'>;
  mock?: boolean;
}
