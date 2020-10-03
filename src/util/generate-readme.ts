/**
 * This utility script parses the command 
 * manifest in src/constant/commands and 
 * generates README documentation from it.
 */
import { promises } from 'fs';
import path from 'path';

const README_PATH = path.join(__dirname, '../../README.md');

const generate = async () => {
    const data = await promises.readFile(README_PATH);
    console.log(data.toString());
    // const fileHandle = await promises.appendFile(README_PATH, 'test');

}

generate();