import { Message } from 'discord.js';
import { Permission } from '../models';
import BotDefaultRoles from '../constant/bot-default-roles';
import Commands from '../constant/commands';
import logger from './logger';
import { getMessageEmbed } from './command';

export const initPermissions = async (message: Message) => {
    await createDefaultRoles(message);
    await assignCommandsToDefaultRoles(message);
    logger.info(`initialized permissions for server: ${message.guild.id}`);
    const embed = getMessageEmbed(message.author)
        .setDescription(`Permissions have been initialized for server. Assign roles ${BotDefaultRoles.ADMIN} or ${BotDefaultRoles.USER} to users.`);
    message.channel.send(embed);
}

const createDefaultRoles = async (message: Message) => {
    if (!message.guild.roles.cache.find(r => r.name === BotDefaultRoles.ADMIN)) {
        logger.debug(`creating default admin role for server ${message.guild.id}`);
        await message.guild.roles.create({
            data: {
                name: BotDefaultRoles.ADMIN
            }
        });
    }

    if (!message.guild.roles.cache.find(r => r.name === BotDefaultRoles.USER)) {
        logger.debug(`creating user role for server ${message.guild.id}`);
        await message.guild.roles.create({
            data: {
                name: BotDefaultRoles.USER
            }
        });
    }
}

const assignCommandsToDefaultRoles = async (message: Message) => {
    const keys = Object.keys(Commands);
    for (const k of keys) {
        const command = Commands[k];
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
};

export const hasPermission = async (command: string, message: Message) => {
    const permission = await Permission.findOne({
        where: {
            serverId: message.guild.id,
            command: command
        }
    });

    if (!permission)
        return true;

    const role = permission.role;
    return message.member.roles.cache.some(r => r.name === role) 
        || message.member.hasPermission(`ADMINISTRATOR`);
}

