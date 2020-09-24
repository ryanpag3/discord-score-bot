import { Message } from 'discord.js';
import ScoreType from '../constant/score-type';
import { User, Score } from '../models';
import { getMessageEmbed, getScoreType, getScoreTypeLowercase, parseArgs } from '../util/command';
import logger from '../util/logger';

const set = async (user: User, command: string, message: Message) => {
    const args = parseArgs(message);
    let type = ScoreType.SERVER;
    const split = command.split('=');
    const amount = Number.parseInt(split[1]);
    const scoreName = split[0];

    if (args.length > 1)
        throw new Error(`Only one argument is allowed for this command.`);

    if (args.includes('c'))
        type = ScoreType.CHANNEL;
    
    if (args.includes('s'))
        type = ScoreType.SCOREBOARD;

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