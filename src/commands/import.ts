import { Message } from 'discord.js';
import axios from 'axios';
import { User, Score, Scoreboard } from '../models';
import logger from '../util/logger';
import BotType from '../constant/bot-type';
import { getMessageEmbed, getScoreType, getScoreTypeLowercase, parseArgs } from '../util/command';
import ScoreType from '../constant/score-type';
import { UniqueConstraintError } from 'sequelize';

const importCmd = async (user: User, command: string, message: Message) => {
    const maxFileSizeBytes = 5000000;
    const jsonFile = message.attachments.first();
    if (!jsonFile)
        throw new Error(`A valid data file is required. Please export one.`);

    if (!jsonFile.name.endsWith('.json'))
        throw new Error(`Data file must be in json format.`);

    if (jsonFile.size > maxFileSizeBytes)
        throw new Error(`Data file is too large. Max size: ${maxFileSizeBytes / 1000}kb`);

    const { data } = await axios.get(jsonFile.url);

    switch (data.botType) {
        case BotType.SCORE_BOT:
            return await importScoreBotData(data, message);
        case BotType.TALLY_BOT:
            return await importTallyBotData(data, message);
    }
}

const importScoreBotData = async (json: {
    botType: BotType,
    data: {
        scores: Score[] 
    }
}, message: Message) => {
    try {
        message.channel.startTyping();
        let errorMsgs = [];

        for (const scoreData of json.data.scores) {
            scoreData.serverId = message.guild.id;
            scoreData.channelId = message.channel.id;

            if (scoreData.type === ScoreType.SCOREBOARD) {
                let board = await Scoreboard.findOne({
                    where: {
                        name: scoreData.Scoreboard.name,
                        serverId: message.guild.id
                    }
                });

                if (!board) {
                    board = await Scoreboard.create({
                        serverId: message.guild.id,
                        name: scoreData.Scoreboard.name,
                        description: scoreData.Scoreboard.description,
                        createdBy: message.author.id
                    });
                }
                scoreData.ScoreboardId = board.id;
                delete scoreData.Scoreboard;
            }

            try {
                await Score.create(scoreData);
            } catch (e) {
                if (e instanceof UniqueConstraintError) {
                    e = new Error(`Score with that name and type already exists.`);
                } else {
                    logger.error(`Error while importing score.`, e);
                }
                errorMsgs.push(`[${getScoreTypeLowercase(scoreData.type)}] **${scoreData.name}** failed to insert. Reason: _${e.message}_`);
            }
        }

        const embed = getMessageEmbed(message.author)
            .setDescription(`
            successfully imported: **${json.data.scores.length - errorMsgs.length}**\n
            ${errorMsgs.length > 0 && `__Errors__\n` + errorMsgs.join('\n')}
            `);
        message.channel.send(embed);
        message.channel.stopTyping();

    } catch (e) {
        logger.error(e);
    }
}

const importTallyBotData = async (data: any, message: Message) => {

}

export default importCmd;