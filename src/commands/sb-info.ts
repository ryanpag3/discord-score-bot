import { Message } from 'discord.js';
import { User, Scoreboard } from '../models';
import { getMessageEmbed } from '../util/command';
import { handleCommandHelpMessage } from './help';

const sbInfo = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    
    if (split[2] === '-h')
        return await handleCommandHelpMessage(command, message);
    
    const name = split[2];

    if (!name)
        throw new Error(`A name is required to get scoreboard info.`);
    
    const scoreboard = await Scoreboard.findOne({
        where: {
            serverId: message.guild.id,
            name: name
        }
    });

    if (!scoreboard)
        throw new Error(`Could not find scoreboard with name: **${name}**`);

    const createdBy = message.guild.member(scoreboard.createdBy);

    const scores = await scoreboard.getScores();

    const embed = getMessageEmbed(message.author)
        .setTitle(`Scoreboard Info`)
        .setDescription(`
            name: **${scoreboard.name}**
            description: **${scoreboard.description}**
            created by: **${createdBy.user.tag}**
            amount of scores: **${scores.length}**

            Show scores with \`.sb scores -s ${name}\`
        `);
    message.channel.send(embed);
}

export default sbInfo;