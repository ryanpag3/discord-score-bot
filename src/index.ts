require('dotenv').config();
import setupBot from './setup-bot';
import discordClient from './util/discord-client';

setupBot(discordClient)
    .then(() => {
        discordClient.login(process.env.DISCORD_TOKEN);
    });

