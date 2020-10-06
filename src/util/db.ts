require('dotenv').config();
import fs from 'fs';
import { Sequelize } from 'sequelize';
import logger from './logger';

export const DB_DIALECT: any = process.env.DB_DIALECT || 'postgres';
export const DB_NAME = process.env.DB_NAME || 'score_bot_db';
export const DB_HOSTNAME = process.env.DB_HOSTNAME || 'localhost';
export const DB_PORT = Number.parseInt(process.env.DB_PORT) || 3306;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_POOL_MAX = Number.parseInt(process.env.DB_POOL_MAX) || 25;

let SSL = false;
let CA_CERT;
try {
    CA_CERT = fs.readFileSync(process.env.SSL_CERT_PATH);
    SSL = true;
} catch(e) {}

const getDbName = () => {
    if (process.env.NODE_ENV === 'test') {
        logger.debug(`automation flag enabled, using test database...`);
        return `test_${DB_NAME}`;
    }
    return DB_NAME;
}

const sequelize = new Sequelize(getDbName(), DB_USERNAME, DB_PASSWORD, {
    dialect: DB_DIALECT,
    host: DB_HOSTNAME,
    pool: {
        max: DB_POOL_MAX,
        min: 1,
        acquire: 10000,
        idle: 1000,
        evict: 100
    },
    dialectOptions: {
        ca: CA_CERT,
        ssl: SSL
    },
    logging: (msg) => logger.trace(msg)
});

const models = require('../models');

const db: any = {
    Sequelize,
    sequelize
};

const modelNames = Object.keys(models);
for (const name of modelNames) {
    db[name] = models[name];
}

export { sequelize };

export default db;