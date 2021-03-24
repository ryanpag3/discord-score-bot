import { Message } from 'discord.js';
import ScoreType from '../constant/score-type';
import { User, Score, ScoreGroup } from '../models';
import { getMessageEmbed, getScoreType, getScoreTypeLowercase, getUserFromMention, parseArgs } from '../util/command';
import logger from '../util/logger';
import { handleCommandHelpMessage } from './help';

const set = async (user: User, command: string, message: Message) => {
    const args = parseArgs(message);
    let type = ScoreType.SERVER;
    const split = command.split('=');
    const amount = Number.parseInt(split[1]);
    const scoreName = split[0];

    if (!amount && amount !== 0)
        throw new Error(`Amount is required for setting values.`);

    if (args.length > 1)
        throw new Error(`Only one argument is allowed for this command.`);

    if (args.includes('h'))
        return await handleCommandHelpMessage(command, message);

    if (args.includes('g'))
        return await setScoreGroup(scoreName, message, amount);

    if (args.includes('c'))
        type = ScoreType.CHANNEL;
    
    if (args.includes('s'))
        type = ScoreType.SCOREBOARD;
            
    const mention = getUserFromMention(scoreName);
    if (mention)
        type = ScoreType.USER;

    const where = {
        serverId: message.guild.id,
        channelId: message.channel.id,
        type,
        name: scoreName
    };

    if (type === ScoreType.SERVER)
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

    logger.info(`score ${score.name} value has been set to ${amount} by user ${message.author.tag}`);

    return score;
}

const setScoreGroup = async (name: string, message: Message, amount: number) => {
    const group = await ScoreGroup.findOne({
        where: {
            serverId: message.guild.id,
            name
        }
    });

    if (!group)
        throw new Error(`Could not find score group with name **${name}**`);
    
    const where = {
        serverId: message.guild.id,
        type: group.type
    };

    if (group.type === ScoreType.CHANNEL)
        where['channelId'] = message.channel.id;

    await Score.update({
        value: amount
    },{
        where
    });

    const scores = await Score.findAll({ where });

    const embed = getMessageEmbed(message.author)
        .setDescription(`
Score values in group **${group.name}** have been set to **${amount}**.
`);
    message.channel.send(embed);
}

export default set;