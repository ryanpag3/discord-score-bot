import logger from '../util/logger'
import { keywordsInitialized, loadKeywords } from '../util/keyword';
import { loadUserScores } from '../util/user-score';
import discordClient from '../util/discord-client';

export default async () => {
    await loadKeywords();
    await loadUserScores();

    if (!keywordsInitialized())
        throw new Error(`Keywords must be initialized before bot startup.`);
    
    logger.info(`Score Bot has successfully connected to Discord.`);
    discordClient.user.setPresence({
        status: 'online',
        activity: {
            name: '.sb help'
        }
    })

}