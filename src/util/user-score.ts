import ScoreType from '../constant/score-type';
import { Score } from '../models';
import logger from './logger';


// static reference to all user scores
// stucture is flat with all keys being the serverId
// and the value being a list of mentions active in the server
/**
 * {
 *      [serverId]: [mention1, mention2, mention3]
 * }
 */
const userScores = {};


export const loadUserScores = async () => {
    const userScores = await Score.findAll({
        where: {
            type: ScoreType.USER
        }
    });
    for (const score of userScores) {
        await loadUserScoreToCache(score.name, score.serverId);
    }
    logger.info(`loaded ${userScores.length} scores to cache.`);
    logger.debug(`server count: ${Object.keys(userScores).length}`);
}

export const loadUserScoreToCache = async (scoreName: string, serverId: string) => {
    if (!userScores[serverId])
        userScores[serverId] = [];
    if (userScores[serverId].includes(scoreName))
        return;
    userScores[serverId].push(scoreName);
    logger.debug(`added user score cache ${scoreName} from ${serverId}. Length is now ${userScores[serverId].length}`);
}

export const removeUserScoreFromCache = async (scoreName: string, serverId: string) => {
    if(!userScores[serverId])
        return;
    const index = userScores[serverId].indexOf(scoreName);
    if (index === -1)
        return;
    userScores[serverId].splice(index, 1);
    logger.debug(`removed user score cache ${scoreName} from ${serverId}. Length is now ${userScores[serverId].length}`);
}