import { MessageEmbed } from 'discord.js';
import COMMANDS from '../constant/commands';

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