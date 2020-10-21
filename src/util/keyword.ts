import { Message } from 'discord.js';
import { Op } from 'sequelize';
import ScoreType from '../constant/score-type';
import { Keyword, Score } from '../models';
import logger from './logger';

let keywords; // maintain one static reference to keywords cache

export const loadKeywords = async () => {
    logger.debug(`loading keywords`);
    const savedKeywords = await Keyword.findAll();
    keywords = savedKeywords.map(k => k.name);
    logger.debug(`loaded ${savedKeywords.length} keywords to keyword cache.`);
    return keywords;
}

export const keywordsInitialized = () => {
    return JSON.stringify(keywords) !== undefined;
}

export const includesKeyword = (message: Message) => {
    return keywords.some(k => {
        logger.trace(`includes ${k}? ${message.content.includes(k)}`);
        return message.content.includes(k);
    });
}

export const getMatchingKeywords = (message: Message) => {
    return keywords.filter(k => {
        logger.trace(`includes ${k}? ${message.content.includes(k)}`);
        return message.content.includes(k);
    })
}

export const handleKeywordMessage = async (message: Message) => {
    logger.debug(`processing keyword message`);
    const matchingKeywords = getMatchingKeywords(message);
    const keywords = await Keyword.findAll({
        where: {
            serverId: message.guild.id,
            name: {
                [Op.or]: matchingKeywords
            }
        }
    });
    for (const k of keywords) {
        const score = await Score.findByPk(k.ScoreId);
        if (!score) {
            logger.info(`Deleting keyword ${k.name} for score ${k.ScoreId} because score does not exist anymore.`);
            await k.destroy();
            continue;
        }

        if (score.type === ScoreType.CHANNEL && score.channelId !== message.channel.id) {
            logger.debug(`Keyword was not sent in channel score's channel. Skipping...`);
            continue;
        }

        score.value++;
        await score.save();
        logger.debug(`increased count of ${score.name} for keyword ${k.name}`);
    }
}

export default keywords;

