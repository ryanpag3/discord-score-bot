import { Client } from "discord.js";
import setupEvents from './events';
import env from './util/env';
import runMigration from './util/umzug';
import { loadKeywords } from './util/keyword';
import { loadUserScores } from './util/user-score';
import { startApi } from './api';

const setupApp =  async (client: Client) => {
    await runMigration();    
    setupEvents(client);
    await startApi();
}

export default setupApp;
