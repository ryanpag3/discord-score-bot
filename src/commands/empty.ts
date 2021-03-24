import { Message, User } from 'discord.js';
import { Score, Scoreboard } from '../models';
import { getMessageEmbed, getScoreTypeLowercase, parseArgs } from '../util/command';
import { handleCommandHelpMessage } from './help';
import ScoreType from '../constant/score-type';
import logger from '../util/logger';

const empty = async (user: User, command: string, message: Message) => {
    const args = parseArgs(message);
    let scoreType = ScoreType.SERVER;
    let include;
    let where = {
        serverId: message.guild.id
    };

    if (args.includes('h'))
        return await handleCommandHelpMessage(command, message);
    
    if (args.includes('c') && args.includes('s'))
        throw new Error(`Only one score type can be provided to \`empty\``);
    
    if (args.includes('c')) {
        scoreType = ScoreType.CHANNEL;
        where['channelId'] = message.channel.id;
    }
    
    let scoreboard;
    if (args.includes('s')) {
        scoreType = ScoreType.SCOREBOARD;
        const split = message.content.split(' ');
        scoreboard = split[3];
        if (!scoreboard)
            throw new Error(`scoreboard name required if emptying scoreboard scores.`);
        include = [
            {
                model: Scoreboard,
                where: {
                    name: scoreboard
                }
            }
        ];
    }

    where['type'] = scoreType;

    const scores = await Score.update({
        value: 0
    }, {
        where,
        include
    });

    let embed;
    switch (scoreType) {
        case ScoreType.SERVER:
            embed = getMessageEmbed(message.author)
                .setDescription(`
All server scores have been set to 0.
                `);
            break;
        case ScoreType.CHANNEL:
            embed = getMessageEmbed(message.author)
                .setDescription(`
Channel scores for the current channel have been set to 0.
                `);
            break;
        case ScoreType.SCOREBOARD:
            embed = getMessageEmbed(message.author)
                .setDescription(`
All scores in scoreboard **${scoreboard}** has been set to 0.
                `)
    }
    message.channel.send(embed);
    logger.info(`emptied scored for type ${scoreType} for user ${message.author.tag}`);
}

export default empty;