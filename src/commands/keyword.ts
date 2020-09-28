import { User, Score, Keyword } from '../models';
import { Message } from 'discord.js';
import { getMessageEmbed, getScoreTypeLowercase, parseArgs } from '../util/command';
import ScoreType from '../constant/score-type';
import { loadKeywords } from '../util/keyword';
import logger from '../util/logger';

const keyword = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    const args = parseArgs(message);
    if (args.length > 1) {
        throw new Error(`Only one argument can be provided.`);
    }

    if (args.includes('i'))
        return await getKeywordInfo(user, command, message);

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
            serverId: message.guild.id,
            name: keyword
        });
    }

    const embed = getMessageEmbed(message.author)
        .setTitle(`Score Keywords`)
        .setDescription(`
            ${score.name} has been associated with keyword(s): **${split[3]}**
        `);
    message.channel.send(embed);

    loadKeywords();
}

const getKeywordInfo = async (user: User, command: string, message: Message) => {
    logger.info('we here doh');
    const split = message.content.split(' ');
    const keyword = split[3];
    if (!keyword)
        throw new Error(`A keyword must be provided to get info.`);

    const keywords = await Keyword.findAll({
        where: {
            serverId: message.guild.id,
            name: keyword
        },
        include: Score
    });

    logger.info(keywords);

    const embed = getMessageEmbed(message.author)
        .setTitle(`Keyword _"${keywords[0].name}"_ Info`)
        .setDescription(`
            __Scores Triggered By Keyword__
            ${keywords.map(k => {
                return `**${k.Score.name}** | **${k.Score.value}** | **${getScoreTypeLowercase(k.Score.type)}** `
            }).join('\n')}
        `);
    message.channel.send(embed);
}

export default keyword;