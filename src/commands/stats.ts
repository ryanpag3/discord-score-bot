import { Message, MessageEmbed } from 'discord.js';
import { User } from '../models';
import { getMessageEmbed } from '../util/command';

const stats = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    const embed = getMessageEmbed(message.author)
        .addField('Prefix', split[0]);
    
    const m = await message.channel.send(embed);

    embed.addField('Latency', `${m.createdTimestamp - message.createdTimestamp}ms`);

    m.edit(embed);
}

export default stats;