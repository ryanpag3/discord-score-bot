import { User, Score, Keyword } from '../models';
import { Message } from 'discord.js';
import { getMessageEmbed, getScoreTypeLowercase, parseArgs } from '../util/command';
import ScoreType from '../constant/score-type';
import { loadKeywords } from '../util/keyword';
import logger from '../util/logger';
import { handleCommandHelpMessage } from './help';

const keyword = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    const args = parseArgs(message);
    
    if (args.length > 1 && args.includes('r') === false) {
        throw new Error(`Only one argument can be provided.`);
    }

    if (args.includes('h'))
        return handleCommandHelpMessage(command, message);

    if (args.includes('r') && args.includes('m')) {
        return await deleteKeyword(user, command, message);
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

    const embed = getMessageEmbed(message.author)
        .setTitle(`Keyword _"${keywords[0].name}"_ Info`)
        .setDescription(`
            __Scores Triggered By Keyword__
            ${keywords.map(k => {
                return `**${k.Score.name}** | **${k.Score.value}** | **${getScoreTypeLowercase(k.Score.type)}** `
            }).join('\n')}
        `);
    message.channel.send(embed);

    return keywords;
}

const deleteKeyword = async(user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    const args = parseArgs(message);

    let type = ScoreType.SERVER;
    if (args.includes('s')) {
        type = ScoreType.SCOREBOARD;
        split.splice(2, 1);
    }

    if (args.includes('c')) {
        type = ScoreType.CHANNEL;
        split.splice(2, 1);
    }

    const scoreName = split[2];
    if (!scoreName)
        throw new Error(`Score name is required to delete keyword.`);
    
    const keyword = split[3];
    if (!keyword)
        throw new Error(`Keyword name is required to delete keyword.`);
    
    const where = {
        serverId: message.guild.id,
        channelId: message.channel.id,
        type,
        name: scoreName
    };

    if (type !== ScoreType.CHANNEL)
        delete where.channelId;

    const score = await Score.findOne({
        where
    });

    if (!score)
        throw new Error(`Could not find score by name **${scoreName}**. If you deleted a score, all associated keywords are also deleted.`);

    const res = await Keyword.destroy({
        where: {
            ScoreId: score.id,
            serverId: message.guild.id
        }
    });

    if (res === 0)
        throw new Error(`Could not find keyword with the specified parameters.`);

    const embed = getMessageEmbed(message.author)
        .setDescription(`keyword **${keyword}** has been deleted for score **${scoreName}**`);
    message.channel.send(embed);

    return res;
}

export default keyword;