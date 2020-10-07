import ScoreType from '../constant/score-type';
import { Score } from '../models';
import { getUserFromMention } from './command';
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
    logger.debug(`loaded ${userScores.length} scores to user score cache.`);
    logger.debug(`server count: ${Object.keys(userScores).length}`);
}

export const loadUserScoreToCache = async (scoreName: string, serverId: string) => {
    if (!userScores[serverId])
        userScores[serverId] = [];
    if (userScores[serverId].includes(scoreName))
        return;
    const user = getUserFromMention(scoreName);
    if (!user){
        logger.error(`could not find user`);
        return;
    }
    userScores[serverId].push(user.id);
    logger.debug(`added user score cache ${user.id} from ${serverId}. Length is now ${userScores[serverId].length}`);
}

export const removeUserScoreFromCache = async (scoreName: string, serverId: string) => {
    if(!userScores[serverId])
        return;
    const user = getUserFromMention(scoreName);
    if (!user)
        return;
    const index = userScores[serverId].indexOf(user.id);
    if (index === -1)
        return;
    userScores[serverId].splice(index, 1);
    logger.debug(`removed user score cache ${scoreName} from ${serverId}. Length is now ${userScores[serverId].length}`);
}

export const cacheHasUserScore = (userId: string, serverId: string) => {
    if (!userScores[serverId])
        return false;
    return userScores[serverId].includes(userId);
}

export const increaseUserScore = async (userId: string, serverId: string) => {
    const score = await Score.findOne({
        where: {
            type: ScoreType.USER,
            serverId,
            name: `<@!${userId}>`
        }
    });
    
    if (!score) {
        logger.error(`Could not find score.`);
        return;
    }

    score.value += 1;
    await score.save();
    logger.debug(`user score ${userId} has been increased by 1`);
}
