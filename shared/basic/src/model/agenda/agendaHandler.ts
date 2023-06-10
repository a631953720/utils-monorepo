import { agenda } from './agenda';
import {
  DailyJobParams,
  HoursLoopJobParams,
  MinsLoopJobParams,
  MonthlyJobParams,
  WeeklyJobParams,
} from './interface';
import {
  checkMins,
  checkHours,
  checkDayOfWeek,
  checkDayOfMonth,
} from './utils';
import { Loggers } from '@myorg/winston-logger';

const logger = new Loggers({ type: 'Agenda Handler' });

export type AgendaHandlerResponseDTO = {
  isSuccess: boolean;
  errorMessage?: string;
  // 或許可用error code?
};

export async function queryJobsAttrs(
  queryName?: string,
  sort?: any, // TODO: 有空研究
  limit?: number,
  skip?: number
) {
  let queryStr;
  if (!queryName) queryStr = undefined;
  else if (queryName.trim().length > 0)
    queryStr = { name: new RegExp(queryName) };

  const j = await agenda.jobs(queryStr, sort, limit, skip);
  logger.debug(`Job name list: [${j.map((_) => `"${_.attrs.name}"`)}]`);
  return j.map((_) => _.attrs);
}

export async function purge(): Promise<AgendaHandlerResponseDTO> {
  logger.warning('all jobs that undefined callback will removed');
  const count = await agenda.purge();

  if (typeof count !== 'number') {
    logger.error(count, 'remove jobs error');
    return {
      isSuccess: false,
      errorMessage: 'remove jobs error',
    };
  }

  if (count && count > 0) {
    logger.warning(`remove ${count} jobs`, 'agenda purge');
  }
  return {
    isSuccess: true,
  };
}

// job settings
export async function enableJobsByName(
  name: string
): Promise<AgendaHandlerResponseDTO> {
  const count = await agenda.enable({ name: new RegExp(name) });

  if (typeof count !== 'number') {
    logger.error(count, 'enable jobs error');
    return {
      isSuccess: false,
      errorMessage: 'enable jobs error',
    };
  }

  if (count && count > 0) {
    logger.debug(`enable ${count} jobs`, 'agenda enable');
  }

  return {
    isSuccess: true,
  };
}

export async function disableJobsByName(
  name: string
): Promise<AgendaHandlerResponseDTO> {
  const count = await agenda.disable({ name: new RegExp(name) });

  if (typeof count !== 'number') {
    logger.error(count, 'disable jobs error ');
    return {
      isSuccess: false,
      errorMessage: 'disable jobs error',
    };
  }

  if (count && count > 0) {
    logger.debug(`disable ${count} jobs`, 'agenda disable');
  }
  return {
    isSuccess: true,
  };
}

export async function cancelJobsByName(
  name: string
): Promise<AgendaHandlerResponseDTO> {
  const count = await agenda.cancel({ name: new RegExp(name) });

  if (typeof count !== 'number') {
    logger.error(count, 'cancel jobs error ');
    return {
      isSuccess: false,
      errorMessage: 'cancel jobs error',
    };
  }

  if (count && count > 0) {
    logger.debug(`cancel ${count} jobs`, 'agenda cancel');
  }

  return {
    isSuccess: true,
  };
}

// job creates
export async function createMinLoopJob(
  configs: MinsLoopJobParams
): Promise<AgendaHandlerResponseDTO> {
  const { mins, jobName, jobCallback, options = {}, data } = configs;
  if (!checkMins(mins)) {
    logger.error('scheduler time config unavailable', 'createMinLoopJob');
    return {
      isSuccess: false,
      errorMessage: 'scheduler config unavailable',
    };
  }
  if (jobName.trim().length < 1) {
    logger.error('jobName is unavailable', 'createMinLoopJob');
    return {
      isSuccess: false,
      errorMessage: 'create job error',
    };
  }

  await agenda.define(jobName, options, jobCallback);
  await agenda.every(`*/${mins} * * * *`, jobName, data);
  logger.debug(`create [${jobName}] done`, 'createMinLoopJob');
  return {
    isSuccess: true,
  };
}

export async function createHoursLoopJob(
  configs: HoursLoopJobParams
): Promise<AgendaHandlerResponseDTO> {
  const { mins, hours, jobName, jobCallback, options = {}, data } = configs;
  if (!checkMins(mins) || !checkHours(hours) || hours === '0') {
    logger.error('scheduler config unavailable', 'createHoursLoopJob');
    return {
      isSuccess: false,
      errorMessage: 'scheduler time config unavailable',
    };
  }
  if (jobName.trim().length < 1) {
    logger.error('jobName is unavailable', 'createHoursLoopJob');
    return {
      isSuccess: false,
      errorMessage: 'create job error',
    };
  }

  await agenda.define(jobName, options, jobCallback);
  await agenda.every(`${mins} */${hours} * * *`, jobName, data);
  logger.debug(`create [${jobName}] done`, 'createHoursLoopJob');
  return {
    isSuccess: true,
  };
}

export async function createDailyJob(
  configs: DailyJobParams
): Promise<AgendaHandlerResponseDTO> {
  const { mins, hours, jobName, jobCallback, options = {}, data } = configs;
  if (!checkMins(mins) || !checkHours(hours)) {
    logger.error(configs, '[createDailyJob] scheduler config unavailable');
    return {
      isSuccess: false,
      errorMessage: 'scheduler time config unavailable',
    };
  }
  if (jobName.trim().length < 1) {
    logger.error('jobName is unavailable', 'createDailyJob');
    return {
      isSuccess: false,
      errorMessage: 'create job error',
    };
  }

  await agenda.define(jobName, options, jobCallback);
  await agenda.every(`${mins} ${hours} */1 * *`, jobName, data);
  logger.debug(`create [${jobName}] done`, 'createDailyJob');
  return {
    isSuccess: true,
  };
}

export async function createWeeklyJob(
  configs: WeeklyJobParams
): Promise<AgendaHandlerResponseDTO> {
  const {
    mins,
    hours,
    week,
    jobName,
    jobCallback,
    options = {},
    data,
  } = configs;
  if (!checkMins(mins) || !checkHours(hours) || !checkDayOfWeek(week)) {
    logger.error(configs, '[createWeeklyJob] scheduler config unavailable');
    return {
      isSuccess: false,
      errorMessage: 'scheduler time config unavailable',
    };
  }
  if (jobName.trim().length < 1) {
    logger.error('jobName is unavailable', 'createWeeklyJob');
    return {
      isSuccess: false,
      errorMessage: 'create job error',
    };
  }

  await agenda.define(jobName, options, jobCallback);
  await agenda.every(`${mins} ${hours} * * ${week}`, jobName, data);
  logger.debug(`create [${jobName}] done`, 'createWeeklyJob');
  return {
    isSuccess: true,
  };
}

export async function createMonthlyJob(
  configs: MonthlyJobParams
): Promise<AgendaHandlerResponseDTO> {
  const {
    mins,
    hours,
    dayOfMonth,
    jobName,
    jobCallback,
    options = {},
    data,
  } = configs;
  if (!checkMins(mins) || !checkHours(hours) || !checkDayOfMonth(dayOfMonth)) {
    logger.error(configs, '[createMonthlyJob] scheduler config unavailable');
    return {
      isSuccess: false,
      errorMessage: 'scheduler time config unavailable',
    };
  }
  if (jobName.trim().length < 1) {
    logger.error('jobName is unavailable', 'createMonthlyJob');
    return {
      isSuccess: false,
      errorMessage: 'create job error',
    };
  }

  await agenda.define(jobName, options, jobCallback);
  await agenda.every(`${mins} ${hours} ${dayOfMonth} * *`, jobName, data);
  logger.debug(`create [${jobName}] done`, 'createMonthlyJob');
  return {
    isSuccess: true,
  };
}
