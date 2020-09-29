import { Message, MessageEmbed } from "discord.js";
import { createScore } from '../service/score';
import { handleCommandError } from "../util/error";
import logger from "../util/logger";
import { User, Scoreboard } from '../models';
import ScoreType from '../constant/score-type';
import { getScoreTypeLowercase } from '../util/command';

const handleMessage = async (user: User, command: string, message: Message) => {
    try {
        const splitMsg = message.content.split(' ');
        let type = ScoreType.SERVER;
        let args = [];
        if (splitMsg[2].startsWith('-')) {
            args = splitMsg[2].split('');
            args.splice(0, 1);
            splitMsg.splice(2, 1);
        }

        if (args.length > 1) {
            throw new Error(`Only one argument is allowed for this comment. (i.e \`-c\` or \`-s\`)`);
        }

        if (args.includes('c')) {
            type = ScoreType.CHANNEL;
        };

        let ScoreboardId;
        let scoreboard;
        if (args.includes('s')) {
            type = ScoreType.SCOREBOARD;
            const scoreboardName = splitMsg.splice(2, 1);
            scoreboard = await Scoreboard.findOne({
                where: {
                    name: scoreboardName,
                    serverId: message.guild.id
                }
            });
            if (!scoreboard)
                throw new Error(`Cannot create a scoreboard score without a valid scoreboard. Have you created one with \`scoreboard\`?`)
            ScoreboardId = scoreboard.id;
        }

        if (!splitMsg[2]) {
            throw new Error(`A name must be provided!`);
        }

        const score = await createScore({
            serverId: message.guild.id,
            channelId: message.channel.id,
            type,
            name: splitMsg[2],
            createdBy: user.id,
            ScoreboardId
        });

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setTitle(`A new score has been created. :100:`)
            .setDescription(`\n\n
            name: **${splitMsg[2]}**
            type: **${getScoreTypeLowercase(type)}**
            ${type === ScoreType.SCOREBOARD ? `scoreboard: **${scoreboard.name}**` : ``}
            `);
        logger.info(`New score created. serverId [${message.guild.id}] channelId: [${message.channel.id}] name: [${splitMsg[2]}]`);
        message.channel.send(embed);
        return score;
    } catch (e) {
        if (e.toString().includes(`SequelizeUniqueConstraintError`)) {
            e = `A score with the specified name already exists.`;
        }
        throw e;
    }
}

export default handleMessage;