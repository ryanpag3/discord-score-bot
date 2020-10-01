import { Client } from "discord.js";
import setupEvents from './events';
import env from './util/env';
import runMigration from './util/umzug';
import { loadKeywords } from './util/keyword';

const setupApp =  async (client: Client) => {
    await runMigration();
    
    await loadKeywords();
    
    setupEvents(client);
}

export default setupApp;
