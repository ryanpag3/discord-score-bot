import { Message } from "discord.js";
import logger from "../util/logger";
import { Score } from '../models';
import { handleCommandError } from '../util/error';
import { getMessageEmbed, parseArgs } from '../util/command';
import { User } from '../models';
import ScoreType from '../constant/score-type';

const handleMessage = async (user: User, command: string, message: Message) => {
    const splitMessage = message.content.split(' ');
    const splitComment = command.split('+');
    const scoreName = splitComment[0];
    const amount = Number.parseInt(splitComment[1]) || 1;
    const args = parseArgs(message);
    let type = ScoreType.SERVER;
    logger.info(`increasing score ${scoreName} by ${amount}`);

    if (args.length > 1)
        throw new Error(`Only one argument is allowed for this command.`);

    if (args.includes('c'))
        type = ScoreType.CHANNEL;
    
    if (args.includes('s'))
        type = ScoreType.SCOREBOARD;

    const where = {
        name: scoreName,
        serverId: message.guild.id,
        channelId: message.channel.id,
        type
    };

    if (type !== 'CHANNEL')
        delete where.channelId;
    
    logger.trace(`minus score query`, where);

    const score = await Score.findOne({
        where
    });

    if (!score) {
        return handleCommandError(command, `**Unable to increase score count!**
        Reason: Cannot find matching ${type === 'CHANNEL' ? 'channel' : 'server'} score with the name **${scoreName}**`, message);
    }
    const previous = score.value;
    score.value += amount;

    await score.save();

    const embed = getMessageEmbed(message.author)
        .setDescription(`
            __${type === 'CHANNEL' ? 'Channel' : 'Server'} Score__\n**${scoreName}** was changed from **${previous}** to **${score.value}**
        `);
    message.channel.send(embed);

    return score;
}

export default handleMessage;