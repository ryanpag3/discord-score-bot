/**
 * This utility script parses the command 
 * manifest in src/constant/commands and 
 * generates README documentation from it.
 */
import { promises } from 'fs';
import path from 'path';
import commands from '../constant/commands';

console.log('running Score Bot README command generation.')

const README_PATH = path.join(__dirname, '../../README.md');

const BEGIN_COMMENT = `[//]: <> (BEGIN_GENERATED_COMMANDS)`;

const END_COMMENT = `[//]: <> (END_GENERATED_COMMANDS)`;

const generate = async () => {
    const data = await promises.readFile(README_PATH);
    const asStr = data.toString();
    const split = asStr.split(BEGIN_COMMENT);
    const secondHalfSplit = split[1].split(END_COMMENT);

    const document = [split[0], secondHalfSplit[1]];

    const cmds = [];
    const keys = Object.keys(commands);
    for (const k of keys) { 
        cmds.push(commands[k]);
    }

    let commandsDoc = `${BEGIN_COMMENT}\n\n# Commands\n\n${cmds.map(c => `- [${c.command}](#${c.command}) - _${c.byline}_`).join('\n')}\n\n`;

    for (const c of cmds) {
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
    console.log('readme command generation completed');
}

generate();