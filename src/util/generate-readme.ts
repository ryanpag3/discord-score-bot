/**
 * This utility script parses the command 
 * manifest in src/constant/commands and 
 * generates README documentation from it.
 */
import { promises } from 'fs';
import path from 'path';
import commands from '../constant/commands';

const README_PATH = path.join(__dirname, '../../README.md');

const BEGIN_COMMENT = `[//]: <> (BEGIN_GENERATED_COMMANDS)`;

const END_COMMENT = `[//]: <> (END_GENERATED_COMMANDS)`;

const generate = async () => {
    const data = await promises.readFile(README_PATH);
    const asStr = data.toString();
    const split = asStr.split(BEGIN_COMMENT);
    const secondHalfSplit = split[1].split(END_COMMENT);

    const document = [split[0], secondHalfSplit[1]];

    // TODO: generate table of contents
    let commandsDoc = `${BEGIN_COMMENT}\n\n# Commands\n\n`;

    const keys = Object.keys(commands);
    for (const k of keys) {
        const c = commands[k];
        commandsDoc += `### \`${c.command}\`

${c.description}

default role: **${c.defaultRole}**

\`\`\` txt
${c.examples.replace(/`/g, '')}
\`\`\`

`;
    }
    commandsDoc += END_COMMENT;

    document.splice(1, 0, commandsDoc);

    const str = document.join('');

    await promises.writeFile(README_PATH, str);
    console.log('readme command generation complete');
}

generate();