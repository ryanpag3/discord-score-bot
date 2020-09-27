import { Message } from 'discord.js';
import { User, Scoreboard } from '../models';
import { getMessageEmbed } from '../util/command';

const sbInfo = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
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