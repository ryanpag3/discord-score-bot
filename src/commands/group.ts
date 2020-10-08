import { User, Message } from 'discord.js';
import { Op } from 'sequelize';
import { Score, ScoreGroup } from '../models';
import ScoreType from '../constant/score-type';
import { getMessageEmbed, getScoreTypeLowercase, parseArgs } from '../util/command';
import { handleCommandHelpMessage } from './help';
import logger from '../util/logger';

const group = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    const args = parseArgs(message);
    
    if (args.includes('h'))
        return await handleCommandHelpMessage(command, message);

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

    logger.info(split);

    const groupName = split[2];
    const names = split[3];
    if (!names)
        throw new Error(`You must provide names of scores for a group.`);
    const scores = await Score.findAll({
        where: {
            name: {
                [Op.or]: names.split(',')
            },
            type: scoreType
        }
    });
    
    if (scores.length < names.split(','))
        throw new Error(`Could not find some scores in group.`);
    
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

export default group;