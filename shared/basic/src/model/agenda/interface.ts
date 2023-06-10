import { Processor, DefineOptions } from 'agenda';

type JobContents = {
  jobName: string;
  jobCallback: Processor; // TODO: 看到時候怎麼處理
  options?: DefineOptions;
  data?: any;
};

export type MinsLoopJobParams = JobContents & {
  mins: string;
};

export type HoursLoopJobParams = JobContents & {
  mins: string;
  hours: string;
};

export type DailyJobParams = JobContents & {
  mins: string;
  hours: string;
};

export type WeeklyJobParams = JobContents & {
  mins: string;
  hours: string;
  week: string[];
};

export type MonthlyJobParams = JobContents & {
  mins: string;
  hours: string;
  dayOfMonth: string;
};
