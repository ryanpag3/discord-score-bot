import { Message, MessageEmbed, User } from 'discord.js';
import COMMANDS from '../constant/commands';
import ScoreType from '../constant/score-type';
import discordClient from './discord-client';
import logger from './logger';

const buildCommandMap = () => {
    const map = {};
    const keys = Object.keys(COMMANDS);
    for (const key of keys) {
        const cmdInfo = COMMANDS[key];
        map[cmdInfo.command] = cmdInfo;
    }
    return map;
}

export const COMMAND_MAP = buildCommandMap();

export const getMessageEmbed = (author: User) => {
    return new MessageEmbed()
        .setAuthor(author.tag, author.avatarURL());
}

export const getScoreTypeLowercase = (type: ScoreType) => {
    if (type === ScoreType.CHANNEL)
        return 'channel';
    if (type === ScoreType.SERVER)
        return 'server';
    if (type === ScoreType.SCOREBOARD)
        return 'scoreboard';
    if (type === ScoreType.USER)
        return 'user';
    return '';
}

export const getScoreType = (type: ScoreType) => {
    if (type === ScoreType.CHANNEL)
        return 'Channel';
    if (type === ScoreType.SERVER)
        return 'Server';
    if (type === ScoreType.SCOREBOARD)
        return 'Scoreboard';
    if (type === ScoreType.USER)
        return 'User';
    return '';
}

export const parseArgs = (message: Message): string[] => {
    try {
        const split = message.content.split(' ');
        if (!split[2]) return [];
        if (!split[2].startsWith('-')) return [];
        return split[2].split('-')[1].split('');
    } catch (e) {
        logger.error(e);
        throw new Error(`An error occured while parsing arguments.`);
    }
}

export const getDoubleQuoteText = (message: Message) => {
    if (!message.content.includes(`"`)) 
        return undefined;
    try {
        return message.content.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
    } catch (e) {
        return undefined;
    }
}

export const getUserFromMention = (mention: string): User => {
    if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return discordClient.users.cache.get(mention);
	}
}