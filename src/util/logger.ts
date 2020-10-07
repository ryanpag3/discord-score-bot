import log4js from 'log4js';

const logger = log4js.getLogger();

logger.level = process.env.LOG_LEVEL;

logger.trace(`logger level is set to ${logger.level}`);

export default logger;