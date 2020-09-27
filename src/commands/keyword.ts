import { User, Score, Keyword } from '../models';
import { Message } from 'discord.js';
import { getMessageEmbed, parseArgs } from '../util/command';
import ScoreType from '../constant/score-type';

const keyword = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    const args = parseArgs(message);
    if (args.length > 1) {
        throw new Error(`Only one argument can be provided.`);
    }

    let type = ScoreType.SERVER;
    if (args.includes('c')) {
        type = ScoreType.CHANNEL;
        split.splice(2, 1);
    }


    if (args.includes('s')) {
        type = ScoreType.SCOREBOARD;
        split.splice(2, 1);
    }

    const score = await Score.findOne({
        where: {
            serverId: message.guild.id,
            name: split[2],
            type
        }
    });

    if (!score) {
        throw new Error(`Could not find score.`);
    }

    if (!split[3]) {
        throw new Error(`At least one keyword is required.`);
    }

    const keywords = split[3].split(',');

    for (const keyword of keywords) {
        await Keyword.create({
            ScoreId: score.id,
            name: keyword
        });
    }

    const embed = getMessageEmbed(message.author)
        .setTitle(`Score Keywords`)
        .setDescription(`
            ${score.name} has been associated with: **${split[3]}**
        `);
    message.channel.send(embed);
}

export default keyword;