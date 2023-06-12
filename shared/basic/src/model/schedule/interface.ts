import { DailyJobParams } from '../agenda';

export interface ScheduleOptions {
  type: 'daily';
  IDs: string[];
  dailyTime: Pick<DailyJobParams, 'mins' | 'hours'>;
  mock?: boolean;
}
