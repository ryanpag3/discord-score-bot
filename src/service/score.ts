import { Score } from '../models';
import logger from '../util/logger';

export const createScore = async ({
    serverId,
    channelId,
    type,
    name,
    description,
    createdBy,
    ScoreboardId
}) => {
    const score = await Score.create({
        serverId,
        channelId,
        type,
        name,
        description,
        createdBy,
        ScoreboardId
    });
    return score;
}