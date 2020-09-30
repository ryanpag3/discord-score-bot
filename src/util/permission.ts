import { Message } from 'discord.js';
import env from './env';
import { Permission } from '../models';
import BotDefaultRoles from '../constant/bot-default-roles';
import Commands from '../constant/commands';
import logger from './logger';

export const initPermissions = async (message: Message) => {
    await createDefaultRoles(message);
    await assignCommandsToDefaultRoles(message);

}

const createDefaultRoles = async (message: Message) => {
    if (!message.guild.roles.cache.find(r => r.name === BotDefaultRoles.ADMIN)) {
        logger.debug(`creating admin role`);
        await message.guild.roles.create({
            data: {
                name: BotDefaultRoles.ADMIN
            }
        });
    }

    if (!message.guild.roles.cache.find(r => r.name === BotDefaultRoles.USER)) {
        logger.debug(`creating user role`);
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
            logger.error(e);
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
        || (!env.isProd() && message.member.hasPermission(`ADMINISTRATOR`));
}

