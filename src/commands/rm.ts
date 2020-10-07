import { Message, MessageCollector, MessageEmbed } from 'discord.js';
import ScoreType from '../constant/score-type';
import { User, Score } from '../models';
import { getMessageEmbed, getUserFromMention } from '../util/command';
import logger from '../util/logger';
import { removeUserScoreFromCache } from '../util/user-score';
import { handleCommandHelpMessage } from './help';


const rm = async (user: User, command: string, message: Message) => {
    const splitMsg = message.content.split(' ');
    let args;
    if (splitMsg[2].startsWith('-')) {
        args = splitMsg[2].split('');
        args.splice(0, 1);
        splitMsg.splice(2, 1);
    } else {
        args = [];
    }

    if (args.includes('h'))
        return await handleCommandHelpMessage(command, message);

    let type = args.includes('c') ? ScoreType.CHANNEL : ScoreType.SERVER;
    const force = args.includes('f');

    const mention = getUserFromMention(splitMsg[2]);
    if (mention)
        type = ScoreType.USER;

    const where = {
        serverId: message.guild.id,
        channelId: message.channel.id,
        name: splitMsg[2],
        type
    };

    if (type === ScoreType.SERVER)
        delete where.channelId;

    if (force)
        return await deleteScore(message);

    message.channel.send(new MessageEmbed({
        description: `Do you really want to do this? **[Y/N]**`
    }));

    // @ts-ignore
    const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
    collector.on('collect', async (message) => {
        if (message.content.toLowerCase() === 'y') {
            return await deleteScore(message);
        } else if (message.content.toLowerCase() === 'n') {
            const embed = getMessageEmbed(message.author)
                .setDescription(`Score deletion was cancelled.`);
            message.channel.send(embed);
        }
        collector.stop();
    });

    async function deleteScore(message: Message) {
        
        if (where.type === ScoreType.USER)
            removeUserScoreFromCache(where.name, where.serverId);

        const res = await Score.destroy({
            where
        });

        const msg = res === 0 ?
            `**${splitMsg[2]}** was not deleted. It does not exist.` :
            `**${splitMsg[2]}** has been deleted.`;

        const embed = getMessageEmbed(message.author)
            .setDescription(msg);
        message.channel.send(embed);

        logger.info(`${splitMsg[2]} has been deleted by ${message.author.tag}`);

        return res;
    }

}

export default rm;