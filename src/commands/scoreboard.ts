import { Message, User } from 'discord.js';
import { getDoubleQuoteText, getMessageEmbed } from '../util/command';
import { Scoreboard } from '../models';
import logger from '../util/logger';
import { UniqueConstraintError } from 'sequelize';
import { handleCommandHelpMessage } from './help';

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
        
        if (split[2] === '-h')
            return await handleCommandHelpMessage(command, message);
        
        if (split[2] === '-rm')
            return await deleteScoreboard(user, command, message);
        
        if (split[2] === '-i')
            return await getScoreboardInfo(user, command, message);
        
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

const deleteScoreboard = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    const name = split[3];

    if (!name)
        throw new Error(`A name is required to delete scoreboard.`);

    const where = {
        name,
        serverId: message.guild.id
    };
    const res = await Scoreboard.destroy({ where });
    const msg = res === 0 ?
        `Scoreboard **${name}** was not deleted. It does not exist.` :
        `Scoreboard **${name}** has been deleted.`;
    const embed = getMessageEmbed(message.author)
        .setDescription(msg);
    message.channel.send(embed);

    logger.debug(msg);
}

const getScoreboardInfo = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    const name = split[3];

    if (!name)
        throw new Error(`A name is required to get scoreboard info.`);
    
    const scoreboard = await Scoreboard.findOne({
        where: {
            serverId: message.guild.id,
            name: name
        }
    });

    if (!scoreboard)
        throw new Error(`Could not find scoreboard with name: **${name}**`);

    const createdBy = message.guild.member(scoreboard.createdBy);

    const scores = await scoreboard.getScores();

    const embed = getMessageEmbed(message.author)
        .setTitle(`Scoreboard Info`)
        .setDescription(`
            name: **${scoreboard.name}**
            description: **${scoreboard.description || 'no description'}**
            created by: **${createdBy.user.tag}**
            amount of scores: **${scores.length}**

            Show scores with \`.sb scores -s ${name}\`
        `);
    message.channel.send(embed);
}

export default scoreboard;