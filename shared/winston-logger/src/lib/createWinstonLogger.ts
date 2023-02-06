import { createLogger, format, transports, LoggerOptions } from 'winston';

const { combine, timestamp, simple, colorize, printf, prettyPrint } = format;

// This logger will show information to user
const ShowSimpleMessage = createLogger({
  format: combine(colorize(), simple()),
  transports: [new transports.Console()],
});

// Modify log format and colors
const alignColorsAndTime = combine(
  colorize({
    all: true,
  }),
  timestamp({
    format: 'YYYY-MM-DD HH:MM:SS',
  }),
  printf(
    (info) => {
      if (info.level.includes('info')) {
        // eslint-disable-next-line no-param-reassign
        info.level = info.level.replace(/info/i, 'debug');
      }
      return `${info.level}: ${info.message} `;
    }
  )
);

/**
 * This logger will show log likes debug, warning, error, etc...
 * @date 2023-02-06
 * @param {string | undefined} fileName?: 檔案名稱，若未定義就不會存檔
 */
const CommonLoggerConfig = (fileName?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let configs: any[] = [
    new transports.Console({
      format: alignColorsAndTime,
    })
  ];

  if (fileName) {
    configs = configs.concat([
      new transports.File({
        format: prettyPrint(), // Log file don't need color!
        filename: `Logs/${fileName}.log`,
        level: 'info',
      })
    ]);
  }

  return createLogger({
    transports: configs as LoggerOptions["transports"],
  });
}
  

const createWinstonLogger = {
  ShowSimpleMessage,
  CommonLoggerConfig,
};

export default createWinstonLogger;
