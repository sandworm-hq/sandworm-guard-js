export const levels = ['debug', 'info', 'warn', 'error'];

const logger = {
  level: 'warn',
};

levels.forEach((level) => {
  logger[level] = (...args) => {
    if (logger.level && levels.indexOf(logger.level) <= levels.indexOf(level)) {
      // eslint-disable-next-line no-console
      console[level](...args);
    }
  };
});

export default logger;
