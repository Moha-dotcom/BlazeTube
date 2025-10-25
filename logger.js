// logger.js
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,       // adds color
      translateTime: 'SYS:standard', // human-readable time
      ignore: 'pid,hostname' // hides less useful fields
    }
  }
});

export default logger;