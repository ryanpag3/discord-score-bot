import { Client } from "discord.js";
import { registerFont } from 'canvas';
import setupEvents from './events';
import env from './util/env';
import runMigration from './util/umzug';

const setupApp =  async (client: Client) => {
    if (!env.isProd()) await runMigration();
    
    
    
    setupEvents(client);
}

export default setupApp;
