import { Message, MessageEmbed } from "discord.js";
import { createScore } from '../service/score';
import { handleCommandError } from "../util/error";
import logger from "../util/logger";
import { User } from '../models';

const handleMessage = async (user: User, command: string, message: Message) => {
    logger.info(user);
    try {
        let isChannelScore = false;
        const splitContent = message.content.split(' ');
        if (splitContent[2] === '-c') {
            splitContent.splice(2, 1);
            isChannelScore = true;
        };

        if (!splitContent[2]) {
            return handleCommandError(command, `A name must be provided!`, message);
        }

        await createScore({
            serverId: message.guild.id,
            channelId: message.channel.id,
            type: isChannelScore ? 'CHANNEL' : 'SERVER',
            name: splitContent[2],
            createdBy: user.id
        });

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setTitle(`A new score has been created. :100:`)
            .setDescription(`\n\n
            name: **${splitContent[2]}**
            type: **${isChannelScore ? 'channel' : 'server'}**
            `);
        logger.info(`New score created. serverId [${message.guild.id}] channelId: [${message.channel.id}] name: [${splitContent[2]}]`);
        message.channel.send(embed);
    } catch (e) {
        logger.error(e);
        let showExamples = true;
        if (e.toString().includes(`SequelizeUniqueConstraintError`)) {
            e = `A score with the specified name already exists.`;
            showExamples = false;
        }
        handleCommandError(command, e.toString(), message, showExamples);
    }
}

export default handleMessage;