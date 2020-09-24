import { Score } from '../models';
import logger from '../util/logger';

export const createScore = async ({
    serverId,
    channelId,
    type,
    name,
    createdBy,
    ScoreboardId
}) => {
    const score = await Score.create({
        serverId,
        channelId,
        type,
        name,
        createdBy,
        ScoreboardId
    });
    logger.info(`New score created. serverId [${serverId}] channelId: [${channelId}] name: [${name}]`);
    return score;
}