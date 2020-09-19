/*
 *   Copyright (c) 2020 Ryan Page
 *   All rights reserved.
 */
const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '../../.env') });


module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'score_bot_db',
        host: process.env.DB_HOSTNAME || 'localhost',
        dialect: process.env.DB_DIALECT || 'postgres',
        logging: false
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'score_bot_db',
        host: process.env.DB_HOSTNAME || 'localhost',
        dialect: process.env.DB_DIALECT || 'postgres',
        logging: false
    }
}