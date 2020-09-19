import path from 'path';
import { Message, MessageAttachment, MessageEmbed } from 'discord.js';
import ScoreType from '../constant/score-type';
import { Score } from '../models';
import { getMessageEmbed } from '../util/command';
import logger from '../util/logger';
import { createCanvas, loadImage } from 'canvas';

const info = async (command: string, message: Message) => {
    let split = message.content.split(' ');
    let type = ScoreType.SERVER;
    if (split[2] === '-c') {
        type = ScoreType.CHANNEL;
        split.splice(2, 1);
    }

    const scoreName = split[2];
    if (!scoreName)
        throw new Error(`Score name must be provided.`);

    const where = {
        name: scoreName,
        serverId: message.guild.id,
        channelId: message.channel.id,
        type
    }


    if (type === ScoreType.SERVER)
        delete where.channelId;

    logger.info(where);


    const score = await Score.findOne({
        where
    });

    // TODO: readdress this later
    // const width = 500;
    // const height = 200;
    // const canvas = createCanvas(width, height);
    // const ctx = canvas.getContext('2d');
    // const image = await loadImage(path.join(__dirname, `../assets/img/score_bot_2000x700.png`));
    // ctx.drawImage(image, 0, 0, width, height);
    // ctx.font = "18px Hack";
    // ctx.fillStyle = "white";
    // ctx.textAlign = "center";
    // ctx.fillText(`${score.name}\n${score.value}`, width / 2, height / 2);
    // const attachment = new MessageAttachment(canvas.toBuffer());

    const embed = getMessageEmbed(message.author)
        .setDescription(`
            __${type === ScoreType.CHANNEL ? 'Channel' : 'Server'} Score__
            name: **${score.name}**
            value: **${score.value}**
            description: **${score.description || `No description.`}**
            created on: **${new Date(score.createdAt).toLocaleDateString()}**
            last updated: **${new Date(score.updatedAt).toLocaleDateString()}**
        `);
        // .attachFiles([attachment]);

    message.channel.send(embed);
}

export default info;