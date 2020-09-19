import { Message, MessageEmbed } from "discord.js";
import { COMMAND_MAP } from "./command";

export const handleCommandError = (command: string, errorMsg: string, message: Message, showExamples: boolean = true) => {
    const embed = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(errorMsg);
    if (COMMAND_MAP[command] && showExamples) {
        embed.addField(`Examples`, COMMAND_MAP[command].examples);
    }
    message.channel.send(embed);
}