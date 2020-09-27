import { Message } from 'discord.js';
import { User, Scoreboard } from '../models';
import { getMessageEmbed } from '../util/command';

const scoreboards = async (user: User, command: string, message: Message) => {
    const scoreboards = await Scoreboard.findAll({
        where: {
            serverId: message.guild.id
        }
    });
    const embed = getMessageEmbed(message.author)
        .setTitle(`Scoreboards`)
        .setDescription(`
            ${scoreboards.map(s => s.name).join('\n')}

            use \`.sb sb-info [name]\` to get scoreboard info
        `);
    message.channel.send(embed);
}

export default scoreboards;