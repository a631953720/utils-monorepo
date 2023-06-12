import { Loggers, simpleMsg } from '@myorg/winston-logger';
import { getAllAgendaJobs } from '../mongodb';
import { createDailyJob } from '../agenda';
import { scheduleEvent } from './scheduleEvent';

const loggers = new Loggers({
  type: 'initScheduleJobs',
});

export async function initScheduleJobs() {
  const jobs = await (await getAllAgendaJobs()).toArray();
  jobs.forEach(({ data }) => {
    const date = new Date(data.cycleTime);
    createDailyJob({
      jobName: `schedule-notify-${data.IDs.join('-')}`,
      jobCallback: () => scheduleEvent(data.IDs, data.mock),
      mins: date.getMinutes().toString(),
      hours: date.getHours().toString(),
      data,
    })
      .then(({ isSuccess }) => {
        if (isSuccess) simpleMsg(`init ${data.IDs} success`);
      })
      .catch((reason) => {
        loggers.error(`init ${data.IDs} error. ${JSON.stringify(reason)}`);
      });
  });
}
