import fs from 'fs';
import path from 'path';
import logger from '../util/logger';

const basename = path.basename(__filename);

const commands = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts' && !file.includes(`.test.`))
    })
    .forEach(file => {
        const handler = require(path.join(__dirname, file));
        commands[file] = handler.default;
    });

export default commands;