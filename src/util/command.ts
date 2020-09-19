import { MessageEmbed } from 'discord.js';
import COMMANDS from '../constant/commands';
import ScoreType from '../constant/score-type';

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

export const getMessageEmbed = (author: any) => {
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
}

export const getScoreType = (type: ScoreType) => {
    if (type === ScoreType.CHANNEL)
        return 'Channel';
    if (type === ScoreType.SERVER)
        return 'Server';
    if (type === ScoreType.SCOREBOARD)
        return 'Scoreboard';
}