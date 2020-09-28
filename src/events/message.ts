import { Message } from "discord.js";
import { createUserIfNotExists } from "../service/user";
import logger from "../util/logger";
import commands from '../commands';
import { COMMAND_MAP } from "../util/command";
import plus from '../commands/plus';
import minus from '../commands/minus';
import { handleCommandError } from '../util/error';
import { User } from '../models';
import set from '../commands/set';
import { ValidationError } from 'sequelize';
import { handleKeywordMessage, includesKeyword } from '../util/keyword';

const onMessageReceived = async (message: Message) => {
    try {
        const prefix = process.env.BOT_PREFIX || `.sb`;
        if (message.content.split(' ')[0] !== prefix && !includesKeyword(message)) {
            logger.debug(`message ignored.`);
            return;
        } else if (message.content.split(' ')[0] !== prefix && includesKeyword(message)) {
            return handleKeywordMessage(message);
        }

        const user = await createUserIfNotExists(message.author.id);

        routeMessage(user, message)
            .then(() => logger.debug(`bot action completed.`))
            .catch((e) => logger.error(e));
    } catch (e) {
        logger.error(`Error while inbounding message.`, e);
    }
}


const routeMessage = async (user: User, message: Message) => {
    const command = message.content.split(' ').slice(1)[0];
    try {
        const cmdInfo = COMMAND_MAP[command];
        if (!cmdInfo && isShorthandMessage(command)) {
            return await routeShorthandMessage(user, command, message);
        } else if (!cmdInfo) {
            throw new Error(`Invalid command provided.`);
        } 
        await commands[cmdInfo.filename](user, command, message);
    } catch (e) {
        handleCommandError(command, e.message, message);
    }
}

const routeShorthandMessage = async (user: User, command: string, message: Message) => {
    if (command.endsWith(`++`)) {
        return await plus(user, command, message);
    } else if (command.endsWith(`--`)) {
        return await minus(user, command, message);
    } else if (isNaN(Number.parseInt(command.split(`+`)[1])) === false) {
        return await plus(user, command, message);
    } else if (isNaN(Number.parseInt(command.split(`-`)[1])) === false) {
        return await minus(user, command, message);
    } else if (isNaN(Number.parseInt(command.split(`=`)[1])) === false) {
        return await set(user, command, message)
    }
    throw new Error(`Invalid command provided.`);
}

export const isShorthandMessage = (command: string) => {
    return command.endsWith(`++`) ||
        command.endsWith(`--`) ||
        isNaN(Number.parseInt(command.split(`+`)[1])) === false ||
        isNaN(Number.parseInt(command.split(`-`)[1])) === false ||
        isNaN(Number.parseInt(command.split(`=`)[1])) === false;
}

export default onMessageReceived;