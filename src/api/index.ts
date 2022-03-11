require('dotenv').config();
import logger from '../util/logger';
import { 
    Score,
    Scoreboard,
    Keyword
} from '../models';

const fastify = require('fastify')();

fastify.get('/export', async (request, reply) => {
    try {
        if (request.headers.authorization !== process.env.MIGRATE_SECRET)
            return reply.code(401).send();

        const scoreboards = await Scoreboard.findAll({
            where: {
                serverId: request.query.serverId
            }
        });

        const scores = await Score.findAll({
            where: {
                serverId: request.query.serverId
            }
        });

        const keywords = await Keyword.findAll({
            where: {
                serverId: request.query.serverId
            }
        });

        return reply.type('application/json').send(JSON.stringify({
            scores,
            scoreboards,
            keywords
        }, null, 4));
    } catch (e) {
        logger.error(e);
    }
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