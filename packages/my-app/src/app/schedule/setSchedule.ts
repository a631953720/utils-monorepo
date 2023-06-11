import { ScheduleOptions } from './interface';
import { createDailyJob, getStockInfos, postMessage } from '@myorg/basic';
import { formatLineMsg } from '../../utils';
import { simpleMsg } from '@myorg/winston-logger';

// type 目前只支援日排程
export async function setSchedule({
  type,
  dailyTime,
  IDs,
  mock,
}: ScheduleOptions) {
  const spliceIDs = IDs.splice(0, 5);
  const result = await createDailyJob({
    jobName: `schedule-notify-${spliceIDs.join('-')}`,
    jobCallback: async () => {
      const results = await Promise.all(
        spliceIDs.map((id) => getStockInfos(id, mock))
      );

      const messages = results.map((d) => formatLineMsg(d));

      messages.forEach((message) => {
        postMessage(message);
      });

      simpleMsg('send line message');
    },
    mins: dailyTime.mins,
    hours: dailyTime.hours,
    data: {
      IDs: spliceIDs,
      cycleTime: dailyTime,
      type,
      // TODO: 未來可能是個物件，用來區分是誰設置的，讓前端可顯示，但要思考好段時間吧
      user: 'kk',
    },
  });

  return result;
}
