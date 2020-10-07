require('dotenv').config();
import { CategoryChannel } from 'discord.js';
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

let ssl;
let sslEnabled = false;
let CA_CERT;
try {
    CA_CERT = fs.readFileSync(process.env.SSL_CERT_PATH).toString();
    ssl = {
        ca: CA_CERT,
        require: true
    }
    sslEnabled = true;
    logger.debug('SSL is active for DB connection.');
} catch(e) {
    logger.trace(e);
}

const getDbName = () => {
    let name = DB_NAME;
    if (process.env.NODE_ENV === 'test') {
        name = `test_${DB_NAME}`;
    }
    logger.debug(`using database: ${name}`);
    return name;
}

const seqConfig = {
    dialect: DB_DIALECT,
    host: DB_HOSTNAME,
    port: DB_PORT,
    ssl: sslEnabled,
    pool: {
        max: DB_POOL_MAX,
        min: 1,
        acquire: 10000,
        idle: 1000,
        evict: 100
    },
    dialectOptions: {
        ssl
    },
    logging: (msg) => logger.trace(msg)
};

logger.trace(seqConfig);
const sequelize = new Sequelize(getDbName(), DB_USERNAME, DB_PASSWORD, seqConfig);

const models = require('../models');

const db: any = {
    Sequelize,
    sequelize
};

const modelNames = Object.keys(models);
for (const name of modelNames) {
    logger.debug(`instantiating model: ${name}`);
    db[name] = models[name];
}

export { sequelize };

export default db;