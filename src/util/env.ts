import logger from './logger';

export default class Env {
    static isProd() {
        logger.debug(`is production? ${process.env.NODE_ENV && process.env.NODE_ENV === 'production'}`);
        return process.env.NODE_ENV && process.env.NODE_ENV === 'production';
    }
}
