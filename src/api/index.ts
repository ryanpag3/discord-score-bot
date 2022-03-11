
import logger from '../util/logger';
import { Score } from '../models';

const fastify = require('fastify')();

fastify.get('/migrate', async (request, reply) => {
    const scores = await Score.findAll({
        where: {}
    });

    return JSON.stringify(scores, null, 4);
});

export const startApi = async () => {
    try {
        await fastify.listen(process.env.API_PORT || 3000);
        logger.info('started discord-score-bot api');
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

startApi();