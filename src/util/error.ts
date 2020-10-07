import { Message, MessageEmbed } from "discord.js";
import { COMMAND_MAP } from "./command";
import logger from './logger';

export const handleCommandError = (command: string, errorMsg: string, message: Message, showExamples: boolean = true) => {
    logger.error(`sending error message to ${message.channel.id}`, errorMsg);
    const embed = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(errorMsg);
    if (COMMAND_MAP[command] && showExamples) {
        embed.addField(`Examples`, COMMAND_MAP[command].examples);
    }
    message.channel.send(embed);
}