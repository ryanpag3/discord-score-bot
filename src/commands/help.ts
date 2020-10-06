import { Message, MessageEmbed } from "discord.js";
import { COMMAND_MAP } from '../util/command';
import { User } from '../models';

const handleMessage = (user: User, command: string, message: Message) => {
    const optionalCommand = message.content.split(' ')[2];
    if (optionalCommand) {
        return handleCommandHelpMessage(optionalCommand, message);
    }

    const embed = new MessageEmbed()
        .setTitle(`Help`)
        .setDescription(`You can view the documentation [here](https://github.com/ryanpag3/discord-score-bot#commands)\n\nUse \`.sb help [command]\` to get specific command information.`);
    message.channel.send(embed);
}

export const handleCommandHelpMessage = (command: string, message: Message) => {
    if (command === 'commands') {
        return listCommands(message);
    }

    const cmdInfo = COMMAND_MAP[command];

    if (!cmdInfo)
        throw new Error(`Could not find command ${command}`);

    const embed = new MessageEmbed()
        .setTitle(`Help [${command}]`)
        .setDescription(cmdInfo.description)
        .addField(`Examples`, cmdInfo.examples);
    message.channel.send(embed);
}

const listCommands = (message: Message) => {
    const commands = Object.keys(COMMAND_MAP);
    const embed = new MessageEmbed()
        .setTitle(`Commands`)
        .setDescription(`${commands.sort().join(`\n`)}`);
    message.channel.send(embed);
}

export default handleMessage;