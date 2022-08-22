const {default: logger} = require('../../src/logger');

describe('logger', () => {
  test('log', () => {
    expect(logger.level).toBe('warn');

    const debugSpy = jest.spyOn(console, 'debug');
    const infoSpy = jest.spyOn(console, 'info');
    const warnSpy = jest.spyOn(console, 'warn');
    const errorSpy = jest.spyOn(console, 'error');

    logger.level = 'debug';
    logger.debug('test');
    expect(debugSpy).toBeCalledWith('test');
    expect(debugSpy).toBeCalledTimes(1);
    logger.info('test');
    expect(infoSpy).toBeCalledTimes(1);
    logger.warn('test');
    expect(warnSpy).toBeCalledTimes(1);
    logger.error('test');
    expect(errorSpy).toBeCalledTimes(1);

    logger.level = 'info';
    logger.debug('test');
    expect(debugSpy).toBeCalledTimes(1);
    logger.info('test');
    expect(infoSpy).toBeCalledTimes(2);
    logger.warn('test');
    expect(warnSpy).toBeCalledTimes(2);
    logger.error('test');
    expect(errorSpy).toBeCalledTimes(2);
  });
});
