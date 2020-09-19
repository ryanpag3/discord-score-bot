import { Score } from '../models';
import logger from '../util/logger';

export const createScore = async ({
    serverId,
    channelId,
    type,
    name,
    createdBy
}) => {
    const score = await Score.create({
        serverId,
        channelId,
        type,
        name,
        createdBy
    });
    logger.info(`New score created. serverId [${serverId}] channelId: [${channelId}] name: [${name}]`);
    return score;
}