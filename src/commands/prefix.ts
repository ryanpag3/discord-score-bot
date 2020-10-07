import { Message, MessageEmbed } from "discord.js";
import { User, Server } from '../models';
import { getMessageEmbed } from '../util/command';
import logger from '../util/logger';
import { handleCommandHelpMessage } from './help';

const handleMessage = async (user: User, command: string, message: Message) => { 
    const split = message.content.split(' ');

    if (split[2] === '-h')
        return await handleCommandHelpMessage(command, message);
    
    if (!split[2])
        throw new Error(`Cannot set server prefix without valid prefix.`);

    await Server.update({
        prefix: split[2]
    }, {
        where: {
            id: message.guild.id
        }
    });

    const embed = getMessageEmbed(message.author)
        .setDescription(`Bot prefix has been set to **${split[2]}**`);
    message.channel.send(embed);
    logger.info(`${message.author.tag} changed bot prefix to ${split[2]} for ${message.guild.id}`);
};

export default handleMessage;

