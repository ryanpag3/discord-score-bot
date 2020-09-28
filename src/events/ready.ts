import logger from '../util/logger'
import { keywordsInitialized } from '../util/keyword';

export default () => {
    if (!keywordsInitialized())
        throw new Error(`Keywords must be initialized before bot startup.`);
    
    logger.info(`ScoreBOT has successfully connected to Discord.`);
}