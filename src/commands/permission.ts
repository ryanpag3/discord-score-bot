import { Message } from 'discord.js';
import { User } from '../models';
import logger from '../util/logger';
import { initPermissions } from '../util/permission';

const permission = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    if (split[2] === '--init')
        return await initPermissions(message);
}

export default permission;