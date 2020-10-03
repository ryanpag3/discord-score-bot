import { Message, MessageEmbed } from "discord.js";
import { User, Server } from '../models';
import { getMessageEmbed } from '../util/command';

const handleMessage = async (user: User, command: string, message: Message) => { 
    const split = message.content.split(' ');
    
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
};

export default handleMessage;
