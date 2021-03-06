import axios from 'axios';
import dayjs from 'dayjs';
import { Message } from 'discord.js';
import { User } from '../models';
import { getDoubleQuoteText, getMessageEmbed, parseArgs } from '../util/command';
import logger from '../util/logger';
import { handleCommandHelpMessage } from './help';

const recentSubmissions = {};

const feature = async (user: User, command: string, message: Message) => { 
    
    const args = parseArgs(message);

    if (args.includes('h'))
        return await handleCommandHelpMessage(command, message);

    if (isOnCooldown(message))
        throw new Error(`You are on cooldown until you can submit another feature request. Please wait 5 minutes and try again.`);

    const description = getDoubleQuoteText(message);

    if (!description)
        throw new Error(`Please provide an feature request surrounded by quotes. \`ex. .sb bug "My Feature Request"\``);

    if (description.length < 65)
        throw new Error(`Minimum feature request length is 65 characters.`);

    const response = await axios(`https://api.github.com/repos/${process.env.GITHUB_REPO}/issues`,
    {
        method: 'POST',
        auth: {
            username: process.env.GITHUB_USER,
            password: process.env.GITHUB_TOKEN
        },
        headers: {
            'Accept':'application/vnd.github.v3+json'
        },
        data: {
            "title": `${message.author.tag} - Feature Request [NEEDS TRIAGE]`,
            "labels": ["enhancement"],
            "body": description + `\n\n**submitted by: ${message.author.tag}**`
        }
    });
    const embed = getMessageEmbed(message.author)
        .setDescription(`Your feature request has been submitted. You can view its status [here](${response.data.html_url})`);
    message.channel.send(embed);

    logger.info(`${message.author.tag} submitted a feature request.`);

    recentSubmissions[message.author.id] = dayjs();
}

const isOnCooldown = (message: Message) => {
    if (!recentSubmissions[message.author.id])
        return false;
    const lastRun = recentSubmissions[message.author.id];
    return lastRun.add(5, 'minute').isBefore(dayjs()) === false;
}

export default feature;