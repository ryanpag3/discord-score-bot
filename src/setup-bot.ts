import { Client } from "discord.js";
import setupEvents from './events';
import runMigration from './util/umzug';

const setupApp =  async (client: Client) => {
    await runMigration();    
    setupEvents(client);
}

export default setupApp;
