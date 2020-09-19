import { Message } from 'discord.js';
import ScoreType from '../constant/score-type';
import { User, Score } from '../models';
import { getMessageEmbed, getScoreType, getScoreTypeLowercase } from '../util/command';
import logger from '../util/logger';

const set = async (user: User, command: string, message: Message) => {
    const splitMsg = message.content.split(' ');
    const type = splitMsg[2] === '-c' ? ScoreType.CHANNEL : ScoreType.SERVER;
    const split = command.split('=');
    const amount = Number.parseInt(split[1]);
    const scoreName = split[0];
    const where = {
        serverId: message.guild.id,
        channelId: message.channel.id,
        type,
        name: scoreName
    };

    if (type === ScoreType.CHANNEL)
        delete where.channelId;
    
    const score = await Score.findOne({ where });
    if (!score) throw new Error(`Could not find score by name **${scoreName}**`);
    score.value = amount;
    await score.save();
    logger.debug(`set the value of ${scoreName} to ${amount}`);

    const embed = getMessageEmbed(message.author)
        .setDescription(`
        ${getScoreTypeLowercase(type)} score **${scoreName}** has been set to ${amount}. 
        `);
    message.channel.send(embed);

    return score;
}

export default set;