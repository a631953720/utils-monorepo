import { ScheduleOptions } from './interface';
import { createDailyJob } from '../agenda';
import { scheduleEvent } from './scheduleEvent';

// type 目前只支援日排程
export async function setSchedule({
  type,
  dailyTime,
  IDs,
  mock,
}: ScheduleOptions) {
  const spliceIDs = IDs.splice(0, 5);
  const date = new Date(dailyTime);
  const result = await createDailyJob({
    jobName: `schedule-notify-${spliceIDs.join('-')}`,
    jobCallback: () => scheduleEvent(spliceIDs, mock),
    mins: date.getMinutes().toString(),
    hours: date.getHours().toString(),
    data: {
      IDs: spliceIDs,
      cycleTime: dailyTime,
      type,
      // TODO: 未來可能是個物件，用來區分是誰設置的，讓前端可顯示，但要思考好段時間吧
      user: 'kk',
      mock,
    },
  });

  return result;
}
