import { Message } from 'discord.js';
import { User, Scoreboard } from '../models';
import { getMessageEmbed, parseArgs } from '../util/command';
import { handleCommandHelpMessage } from './help';

const scoreboards = async (user: User, command: string, message: Message) => {
    const args = parseArgs(message);
    if (args.includes('h'))
        return await handleCommandHelpMessage(command, message);
    
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