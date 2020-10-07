import { Message } from 'discord.js';
import { getCommandKey } from '../events/message';
import { User, Permission } from '../models';
import { COMMAND_MAP, getDoubleQuoteText, getMessageEmbed } from '../util/command';
import commands from '../constant/commands';
import logger from '../util/logger';
import { initPermissions } from '../util/permission';
import { handleCommandHelpMessage } from './help';


const permission = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');

    if (split[2] === '-h')
        return await handleCommandHelpMessage(command, message);

    if (split[2] === '--init')
        return await initPermissions(message);

    if (split[2] === '-l')
        return await listPermissions(message);

    if (split[2] === '-a')
        return await setAllPermissions(message);
    
    logger.info(message.content);

    const targetCommand = split[2];
    const targetRole = getDoubleQuoteText(message) || split[3];
    if (!targetCommand || !targetRole)
        throw new Error(`Please provide both a command and a role for this command.`);
    
    if (!COMMAND_MAP[targetCommand])
        throw new Error(`A valid command is required. \`.sb help commands\` for available commands.`);

    if (targetRole === 'everyone')
        return await setEveryonePermission(targetCommand, message);

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
    logger.info(`${message.author.tag} set permission ${targetCommand} to role ${targetRole}`);
}

const listPermissions = async (message: Message) => {
    const permissions = await Permission.findAll({
        where: {
            serverId: message.guild.id
        }
    });
    const embed = getMessageEmbed(message.author)
        .setDescription(`
        __Current Permissions__
        ${permissions.map(p => `**${commands[p.command].command}** | ${p.role}`).join('\n')}
        `);
    message.channel.send(embed);
}

const setEveryonePermission = async (command: string, message: Message) => {
    await Permission.destroy({
        where: {
            serverId: message.guild.id,
            command
        }
    });
    const embed = getMessageEmbed(message.author)
        .setDescription(`Permission for command **${command}** was removed. Everyone can now use the command.`);
    message.channel.send(embed);
}

const setAllPermissions = async (message: Message) => {
    const split = message.content.split(' ');

    if (!split[3])
        throw new Error(`Please provide a role to assign to all commands.`);
    
    if (!message.guild.roles.cache.some(r => r.name === split[3]) && split[3] !== 'everyone')
        throw new Error(`Could not find role by the name of ${split[3]}.\nAvailable roles are **${message.guild.roles.cache.map(r => r.name).join(', ')}**`);

    await Permission.destroy({
        where: {
            serverId: message.guild.id
        }
    });

    if (split[3] === 'everyone') {
        const embed = getMessageEmbed(message.author)
            .setDescription(`All permissions removed. All users can use all commands.`);
        message.channel.send(embed);
        return;
    }


    const keys = Object.keys(commands);
    for (const k of keys) {
        const command = commands[k];
        try {
            await Permission.create({
                serverId: message.guild.id,
                command: k,
                role: command.defaultRole
            });
            logger.debug(`assigned ${k} to role ${command.defaultRole} in server ${message.guild.id}`);
        } catch (e) {
            // ignore any that already exist
        }
    }

    const embed = getMessageEmbed(message.author)
        .setDescription(`All commands now required the role **${split[3]}**`);
    message.channel.send(embed);
}

export default permission;