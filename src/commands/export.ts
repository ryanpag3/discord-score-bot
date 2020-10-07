import { Message } from 'discord.js';
import { promises } from 'fs';
import { Op } from 'sequelize';
import BotType from '../constant/bot-type';
import ScoreType from '../constant/score-type';
import { User, Score, Scoreboard } from '../models';
import { getMessageEmbed, getScoreType, parseArgs } from '../util/command';
import logger from '../util/logger';
import { handleCommandHelpMessage } from './help';

const exportCmd = async (_user: User, command: string, message: Message) => {
    const args = parseArgs(message);

    if (args.length > 1) {
        throw new Error(`Only one argument can be provided.`);
    }

    if (args.includes('h'))
        return await handleCommandHelpMessage(command, message);

    let type = ScoreType.SERVER;
    const where = {
        type: {
            [Op.or]: [
                ScoreType.SERVER,
                ScoreType.SCOREBOARD
            ]
        },
        serverId: message.guild.id
    };

    if (args.includes('c')) {
        type = ScoreType.CHANNEL;
        where['channelId'] = message.channel.id;
        where.type[Op.or] = [ScoreType.CHANNEL];
    }

    message.channel.startTyping();

    let scoreData = await Score.findAll({
        where,
        include: {
            model: Scoreboard,
            attributes: {
                exclude: [
                    'id',
                    'serverId',
                    'channelId'
                ]
            }
        },
        order: [['type', 'DESC']],
        attributes: {
            exclude: [
                'id',
                'serverId',
                'channelId'
            ]
        }
    });

    const d = {
        botType: BotType.SCORE_BOT,
        data: {
            scores: scoreData
        }
    }

    const filepath = `/tmp/scorebot-${message.author.id}-${new Date().getTime()}.json`;
    await promises.writeFile(filepath, JSON.stringify(d, null, 4), 'utf-8');
    const embed = getMessageEmbed(message.author)
        .setTitle(`${getScoreType(type)} Export Completed`)
        .setDescription(`
        ${scoreData.length} scores exported.
        `);
    embed.files = [filepath];
    await message.channel.send(embed);
    message.channel.stopTyping();
    await promises.unlink(filepath);
    logger.info(`${message.author.tag} exported bot data from ${message.guild.id}`);
}

export default exportCmd;