import logger from '../util/logger'
import { keywordsInitialized, loadKeywords } from '../util/keyword';
import { loadUserScores } from '../util/user-score';

export default async () => {
    await loadKeywords();
    await loadUserScores();

    if (!keywordsInitialized())
        throw new Error(`Keywords must be initialized before bot startup.`);
    
    logger.info(`Score Bot has successfully connected to Discord.`);
}