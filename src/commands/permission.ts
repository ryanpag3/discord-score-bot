import { Message } from 'discord.js';
import { getCommandKey } from '../events/message';
import { User, Permission } from '../models';
import { COMMAND_MAP, getDoubleQuoteText, getMessageEmbed } from '../util/command';
import logger from '../util/logger';
import { initPermissions } from '../util/permission';


const permission = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    if (split[2] === '--init')
        return await initPermissions(message);
    
    logger.info(message.content);

    const targetCommand = split[2];
    const targetRole = getDoubleQuoteText(message) || split[3];
    if (!targetCommand || !targetRole)
        throw new Error(`Please provide both a command and a role for this command.`);
    
    if (!COMMAND_MAP[targetCommand])
        throw new Error(`A valid command is required. \`.sb help commands\` for available commands.`);

    if (!message.guild.roles.cache.some(r => r.name === targetRole))
        throw new Error(`Could not find role by the name of ${targetRole}.\nAvailable roles are **${message.guild.roles.cache.map(r => r.name).join(', ')}**`);

    const existingPermission = await Permission.findOne({
        where: {
            serverId: message.guild.id,
            command: getCommandKey(COMMAND_MAP[targetCommand].filename)
        }
    });

    if (existingPermission)
        await existingPermission.destroy();

    await Permission.create({
        serverId: message.guild.id,
        command: getCommandKey(COMMAND_MAP[targetCommand].filename),
        role: targetRole
    });

    const embed = getMessageEmbed(message.author)
        .setDescription(`command **${targetCommand}** now requires the role **${targetRole}**`);
    message.channel.send(embed);
}

export default permission;