/* eslint-disable @typescript-eslint/no-explicit-any */
import winstonLoggers from './createWinstonLogger';
import { DateFormat, DateToMMDD } from './utils';

const { CommonLoggerConfig, ShowSimpleMessage } = winstonLoggers;

type LoggersProps = {
  type: string;
  isSaveLog?: boolean;
  isDebug?: boolean;
};

/**
 * 建立使用 winston class，封裝多個方法。預設不會儲存log，可用setIsSaveLog來決定是否儲存log
 */
export class Loggers {
  private type: string;

  private isSaveLog: boolean;

  private isDebug: boolean;

  constructor({ type, isSaveLog = false, isDebug = false }: LoggersProps) {
    this.type = type;
    this.isSaveLog = isSaveLog;
    this.isDebug = isDebug;
  }

  private getFileName() {
    return this.isSaveLog ? DateToMMDD(Date.now()) : undefined;
  }

  debug(message: any, action = '') {
    if (this.isDebug) {
      CommonLoggerConfig(this.getFileName()).info({
        time: DateFormat(new Date().toISOString()),
        label: `[${this.type}]`,
        message: {
          action,
          message,
        },
      });
    }
  }

  saveLog(message: any, action = '') {
    CommonLoggerConfig(this.getFileName()).info({
      time: DateFormat(new Date().toISOString()),
      label: `[${this.type}]`,
      message: {
        action,
        message,
      },
    });
  }

  error(message: any, action = '') {
    CommonLoggerConfig(this.getFileName()).error({
      time: DateFormat(new Date().toISOString()),
      label: `[${this.type}]`,
      message: {
        action,
        message,
      },
    });
  }

  warning(message: any, action = '') {
    CommonLoggerConfig(this.getFileName()).warn({
      time: DateFormat(new Date().toISOString()),
      label: `[${this.type}]`,
      message: {
        action,
        message,
      },
    });
  }

  setIsSaveLog(flag: boolean) {
    this.isSaveLog = flag;
  }

  setIsDebug(flag: boolean) {
    this.isDebug = flag;
  }
}

export const simpleMsg = ShowSimpleMessage.info.bind(ShowSimpleMessage);

// const testLogger = new Loggers({ type: 'Winston logger test' });
// // 下面可用來測試功能是否正常
// simpleMsg('----------logger test start----------');
// testLogger.debug('debug');
// testLogger.error('error');
// testLogger.warning('warning');
// simpleMsg('----------logger test end-----------');
