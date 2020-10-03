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

    let commandsDoc = `${BEGIN_COMMENT}\n`;

    const keys = Object.keys(commands);
    for (const k of keys) {
        const c = commands[k];
        commandsDoc += `# \`${c.command}\`

_${c.description}_

default role: **${c.defaultRole}**

\`\`\` txt
${c.examples.replace(/`/g, '')}
\`\`\`

`;
    }
    commandsDoc += `\n` + END_COMMENT;

    document.splice(1, 0, commandsDoc);

    console.log(document);

    const str = document.join('');

    console.log(str);

    await promises.writeFile(README_PATH, str);
}

generate();