import { User, Message } from 'discord.js';
import { Op } from 'sequelize';
import { Score, ScoreGroup } from '../models';
import ScoreType from '../constant/score-type';
import { getMessageEmbed, getScoreTypeLowercase, parseArgs } from '../util/command';
import { handleCommandHelpMessage } from './help';
import logger from '../util/logger';
import { parse } from 'dotenv/types';

const group = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    const args = parseArgs(message);

    if (args.includes('h'))
        return await handleCommandHelpMessage(command, message);

    if (args.includes('r') && args.includes('m'))
        return await deleteGroup(user, command, message);

    let scoreType = ScoreType.SERVER;
    let channelId;
    if (args.includes('u')) {
        split.splice(2, 1);
        scoreType = ScoreType.USER;
    }

    if (args.includes('c')) {
        split.splice(2, 1);
        channelId = message.channel.id;
        scoreType = ScoreType.CHANNEL;
    }

    if (args.includes('s')) {
        split.splice(2, 1);
        scoreType = ScoreType.SCOREBOARD;
    }

    const groupName = split[2];
    const names = split[3];
    if (!names)
        throw new Error(`You must provide names of scores for a group.`);
    const scores = await Score.findAll({
        where: {
            serverId: message.guild.id,
            name: {
                [Op.and]: names.split(',')
            },
            type: scoreType
        }
    });

    logger.debug(scores);

    logger.debug(`scores found ${scores.length} and scores expected ${names.split(',').length}`);

    if (scores.length < names.split(',').length)
        throw new Error(`Please make sure all scores defined exist for type: **${getScoreTypeLowercase(scoreType)}**`);

    const group = await ScoreGroup.create({
        serverId: message.guild.id,
        channelId,
        scores: names,
        name: groupName,
        type: scoreType
    });

    const embed = getMessageEmbed(message.author)
        .setTitle(`Score Group Created`)
        .setDescription(`
name: **${groupName}**
type: **${getScoreTypeLowercase(scoreType)}**
scores: **${names}**
`);
    message.channel.send(embed);
}

const deleteGroup = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    const args = parseArgs(message);

    const name = split[3];
    let scoreType = ScoreType.SERVER;
    let channelId;
    if (args.includes('u')) {
        split.splice(2, 1);
        scoreType = ScoreType.USER;
    }

    if (args.includes('c')) {
        split.splice(2, 1);
        channelId = message.channel.id;
        scoreType = ScoreType.CHANNEL;
    }

    if (args.includes('s')) {
        split.splice(2, 1);
        scoreType = ScoreType.SCOREBOARD;
    }

    const where = {
        serverId: message.guild.id,
        name,
        type: scoreType
    };

    if (scoreType === ScoreType.CHANNEL)
        where['channelId'] = channelId;
    
    const res = await ScoreGroup.destroy({ where });

    if (res !== 1)
        throw new Error(`Could not find score group to delete.`);

    const embed = getMessageEmbed(message.author)
        .setDescription(`
Score Group Deleted
\`\`\`
name: ${name}
type: ${getScoreTypeLowercase(scoreType)}
\`\`\`
`);
    message.channel.send(embed);
}

export default group;