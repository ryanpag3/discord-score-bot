import { Client, Message } from "discord.js";

import onReady from './ready';
import onMessageReceived from './message';

export default (bot: Client) => {
    bot.on('ready', onReady);
    bot.on('message', onMessageReceived);
}