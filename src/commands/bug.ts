import axios from 'axios';
import dayjs from 'dayjs';
import { Message } from 'discord.js';
import { User } from '../models';
import { getDoubleQuoteText, getMessageEmbed, parseArgs } from '../util/command';
import logger from '../util/logger';
import { handleCommandHelpMessage } from './help';

const recentSubmissions = {};

const bug = async (user: User, command: string, message: Message) => { 

    const args = parseArgs(message);

    if (args.includes('h'))
        return await handleCommandHelpMessage(command, message);

    if (isOnCooldown(message))
        throw new Error(`You are on cooldown until you can submit another bug report. Please wait 5 minutes and try again.`);

    const description = getDoubleQuoteText(message);

    if (!description)
        throw new Error(`Please provide an bug report surrounded by quotes. \`ex. .sb bug "My Bug Report"\``);

    if (description.length < 100)
        throw new Error(`Minimum bug report length is 100 characters.`);

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
            "title": `${message.author.tag} - Bug Report [NEEDS TRIAGE]`,
            "labels": ["bug"],
            "body": description + `\n\n**submitted by: ${message.author.tag}**`
        }
    });
    const embed = getMessageEmbed(message.author)
        .setDescription(`Your bug report has been submitted. You can view its status [here](${response.data.html_url})`);
    message.channel.send(embed);

    recentSubmissions[message.author.id] = dayjs();
}

const isOnCooldown = (message: Message) => {
    if (!recentSubmissions[message.author.id])
        return false;
    const lastRun = recentSubmissions[message.author.id];
    return lastRun.add(5, 'minute').isBefore(dayjs()) === false;
}

export default bug;