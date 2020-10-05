require('dotenv').config();
import { Sequelize } from 'sequelize';
import path from 'path';
import Umzug from 'umzug';
import db from './db';
import logger from './logger';

const { sequelize } = db;

function getConfig(p: string): any {
    return {
        migrations: {
            path: path.join(__dirname, p),
            params: [
                sequelize.getQueryInterface(),
                Sequelize
            ]
        },
    
        storage: 'sequelize',
        storageOptions: {
            sequelize
        }
    }
}

const migrate = new Umzug(getConfig('../migrations'));

const runMigration = async () => {
    logger.debug(`running database migration.`);
    await migrate.up();
    logger.debug(`completed database migration.`);
}

export const close = async () => {
    await sequelize.close();
}

export default runMigration;