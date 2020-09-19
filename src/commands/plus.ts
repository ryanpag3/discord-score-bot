import { Message } from "discord.js";
import logger from "../util/logger";
import { Score } from '../models';
import { handleCommandError } from '../util/error';
import { getMessageEmbed } from '../util/command';


const handleMessage = async (command: string, message: Message) => {
    const splitMessage = message.content.split(' ');
    const splitComment = command.split('+');
    const scoreName = splitComment[0];
    const amount = Number.parseInt(splitComment[1]) || 1;
    const type = splitMessage[2] === '-c' ? 'CHANNEL' : 'SERVER';
    logger.info(`increasing score ${scoreName} by ${amount}`);
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
        return handleCommandError(command, `**Unable to decrease score count!**
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