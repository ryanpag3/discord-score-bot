import { Client } from "discord.js";
import setupEvents from './events';
import env from './util/env';
import runMigration from './util/umzug';
import { loadKeywords } from './util/keyword';
import { loadUserScores } from './util/user-score';

const setupApp =  async (client: Client) => {
    await runMigration();    
    setupEvents(client);
}

export default setupApp;
