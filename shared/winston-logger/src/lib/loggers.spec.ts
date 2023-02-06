import { Loggers } from "./loggers";

describe('test Logger', () => {
  test('all function have be decleared', () => {
    const logger = new Loggers({ type: 'test' });

    expect(typeof logger.debug === 'function').toEqual(true);
    expect(typeof logger.warning === 'function').toEqual(true);
    expect(typeof logger.saveLog === 'function').toEqual(true);
    expect(typeof logger.setIsSaveLog === 'function').toEqual(true);
    expect(typeof logger.error === 'function').toEqual(true);
    expect(typeof logger.setIsDebug === 'function').toEqual(true);
  });
});
