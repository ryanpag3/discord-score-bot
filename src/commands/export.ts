import { Message } from 'discord.js';
import { promises } from 'fs';
import BotType from '../constant/bot-type';
import ScoreType from '../constant/score-type';
import { User, Score, Scoreboard } from '../models';
import { getMessageEmbed, parseArgs } from '../util/command';
import scoreboard from './scoreboard';

const exportCmd = async (user: User, command: string, message: Message) => {

    message.channel.startTyping();

    let data = await Score.findAll({
        where: {
            serverId: message.guild.id
        },
        include: Scoreboard,
        order: [['type', 'DESC']],
        attributes: {
            exclude: ['id']
        }
    });

    const d = {
        botType: BotType.SCORE_BOT,
        data
    }

    const filepath = `/tmp/scorebot-${message.author.id}-${new Date().getTime()}.json`;
    await promises.writeFile(filepath, JSON.stringify(d, null, 4), 'utf-8');
    const embed = getMessageEmbed(message.author)
        .setDescription(`
        ${data.length} entries exported.
        `);
    embed.files = [filepath];
    message.channel.send(embed);
    message.channel.stopTyping();
}

export default exportCmd;