import { DailyJobParams } from '../agenda';

export interface ScheduleOptions {
  type: 'daily';
  IDs: string[];
  dailyTime: string;
  mock?: boolean;
}
