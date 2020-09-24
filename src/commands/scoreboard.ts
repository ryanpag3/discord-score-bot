import { Message, User } from 'discord.js';
import { getDoubleQuoteText, getMessageEmbed } from '../util/command';
import { Scoreboard } from '../models';
import logger from '../util/logger';
import { UniqueConstraintError } from 'sequelize';

/**
 * Create a scoreboard.
 * 
 * A scoreboard is an arbitrary group of scores that can be tracked and compared.
 * 
 * @param user - user running the command
 * @param command - the command keyword being run
 * @param message - The full discord.js message
 */
const scoreboard = async (user: User, command: string, message: Message) => {
    try {
        const split = message.content.split(' ');
        const name = split[2];
        const description = getDoubleQuoteText(message);

        const scoreboard = await Scoreboard.create({
            name,
            description,
            createdBy: user.id,
            serverId: message.guild.id
        });

        const embed = getMessageEmbed(message.author)
            .setTitle(`New scoreboard created.`)
            .setDescription(`
        name: **${scoreboard.name}**
        description: **${scoreboard.description || 'No description.'}**
        `);
        message.channel.send(embed);
        return scoreboard;
    } catch (e) {
        if (e instanceof UniqueConstraintError)
            e = new Error(`Scoreboard already exists with that name.`);
        logger.error(e);
        throw e;
    }
}

export default scoreboard;