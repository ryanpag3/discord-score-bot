import { Message, MessageEmbed } from "discord.js";
import { createScore } from '../service/score';
import { handleCommandError } from "../util/error";
import logger from "../util/logger";

const handleMessage = async (command: string, message: Message) => {
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
            name: splitContent[2]
        });

        logger.info(message.author.avatarURL());

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
        let showExamples = true;
        if (e.toString().includes(`SequelizeUniqueConstraintError`)) {
            e = `A score with the specified name already exists.`;
            showExamples = false;
        }
        handleCommandError(command, e.toString(), message, showExamples);
    }
}

export default handleMessage;