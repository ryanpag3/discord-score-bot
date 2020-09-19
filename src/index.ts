require('dotenv').config();
import Discord from 'discord.js';
import setupBot from './setup-bot';

export const discordClient = new Discord.Client();

setupBot(discordClient)
    .then(() => {
        discordClient.login(process.env.DISCORD_TOKEN);
    });

