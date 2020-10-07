import path from 'path';
import { GuildMember, Message, MessageAttachment, MessageEmbed } from 'discord.js';
import ScoreType from '../constant/score-type';
import { Score } from '../models';
import { getMessageEmbed } from '../util/command';
import logger from '../util/logger';
import { createCanvas, loadImage } from 'canvas';
import { User } from '../models';
import { handleCommandHelpMessage } from './help';

const info = async (user: User, command: string, message: Message) => {
    let split = message.content.split(' ');
    
    if (split[2] === '-h')
        return await handleCommandHelpMessage(command, message);
    
    let type = ScoreType.SERVER;
    if (split[2] === '-c') {
        type = ScoreType.CHANNEL;
        split.splice(2, 1);
    }

    const scoreName = split[2];
    if (!scoreName)
        throw new Error(`Score name must be provided.`);

    const where = {
        name: scoreName,
        serverId: message.guild.id,
        channelId: message.channel.id,
        type
    }

    if (type === ScoreType.SERVER)
        delete where.channelId;

    const score = await Score.findOne({
        where
    });

    if (!score) {
        throw new Error(`Could not find ${type === ScoreType.CHANNEL ? 'channel' : 'server'} score with name **${scoreName}**.`);
    }

    const createdBy = message.guild.member(score.createdBy);
    const embed = getMessageEmbed(message.author)
        .setDescription(`
            __${type === ScoreType.CHANNEL ? 'Channel' : 'Server'} Score__
            name: **${score.name}**
            value: **${score.value}**
            description: **${score.description || `No description.`}**
            created on: **${new Date(score.createdAt).toLocaleDateString()}**
            last updated: **${new Date(score.updatedAt).toLocaleDateString()}**
            created by: **${createdBy.user.tag}**
        `);

    message.channel.send(embed);
    logger.info(`${message.author.tag} requested score info for ${score.name}`);
}

export default info;