import { Model } from 'sequelize/types';
import { User } from '../models';
import logger from '../util/logger';

/**
 * Initialize a discord user to the database.
 */
export const createUserIfNotExists = async (discordId: string) => {
    const user = await User.findByPk(discordId);
    if (user) {
        logger.debug(`user already exists. bailing out!`);
        return user;
    }
    const created = await User.create({
        id: discordId
    });
    logger.info(`created user ${discordId}`);
    return created;
}