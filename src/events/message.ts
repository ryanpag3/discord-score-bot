import { Message } from "discord.js";
import { createUserIfNotExists } from "../service/user";
import logger from "../util/logger";
import commands from '../commands';
import commandsManifest from '../constant/commands';
import { COMMAND_MAP } from "../util/command";
import plus from '../commands/plus';
import minus from '../commands/minus';
import { handleCommandError } from '../util/error';
import { User, Server } from '../models';
import set from '../commands/set';
import { handleKeywordMessage, includesKeyword } from '../util/keyword';
import { hasPermission } from '../util/permission';

const onMessageReceived = async (message: Message) => {
    try {
        const server = await getServer(message.guild.id);
        const prefix = server.prefix || process.env.BOT_PREFIX || `.sb`;
        
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
            const type = getShorthandMessageType(command);
            if (!await hasPermission(type, message))
                return message.author.send(`Invalid permissions.`)
            return await routeShorthandMessage(user, command, message);
        } else if (!cmdInfo) {
            throw new Error(`Invalid command provided.`);
        }

        const commandKey = getCommandKey(cmdInfo.filename);

        if (!await hasPermission(commandKey, message))
            return message.author.send(`Invalid permissions.`);

        await commands[cmdInfo.filename](user, command, message);
    } catch (e) {
        logger.error(e);
        handleCommandError(command, e.message, message);
    }
}

const routeShorthandMessage = async (user: User, command: string, message: Message) => {
    if (isPlusCommand(command)) {
        return await plus(user, command, message);
    } else if (isMinusCommand(command)) {
        return await minus(user, command, message);
    } else if (isSetCommand(command)) {
        return await set(user, command, message)
    }
    throw new Error(`Invalid command provided.`);
}

const getShorthandMessageType = (command: string) => {
    if (isPlusCommand(command)) {
        return `PLUS`;
    } else if (isMinusCommand(command)) {
        return `MINUS`;
    } else if (isSetCommand(command)) {
        return `SET`;
    }
}

const isPlusCommand = (command: string) => {
    return command.endsWith('++') ||
        isNaN(Number.parseInt(command.split(`+`)[1])) === false;
}

const isMinusCommand = (command: string) => {
    return command.endsWith(`--`) ||
        isNaN(Number.parseInt(command.split(`-`)[1])) === false;
}

const isSetCommand = (command: string) => {
    return isNaN(Number.parseInt(command.split(`=`)[1])) === false;
}

export const isShorthandMessage = (command: string) => {
    return isPlusCommand(command) || isSetCommand(command) || isMinusCommand(command);
}

export const getCommandKey = (filename: string) => {
    let commandKey;
    const keys = Object.keys(commandsManifest);
    for (const key of keys) {
        if (commandsManifest[key].filename === filename) {
            commandKey = key;
            break;
        }
    }
    return commandKey;
}

const getServer = async (serverId: string) => {
    const servers = await Server.upsert({
        id: serverId
    });
    return servers[0];

}

export default onMessageReceived;