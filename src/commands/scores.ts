import { Message, MessageAttachment } from 'discord.js';
import Chart from 'chart.js';
import { Score, Scoreboard } from '../models';
import logger from '../util/logger';
import ScoreType from '../constant/score-type';
import { renderSmallChart } from '../util/canvas';
import { getMessageEmbed, parseArgs } from '../util/command';
import { User } from '../models';

const scores = async (user: User, command: string, message: Message) => {
    const split = message.content.split(' ');
    let type = ScoreType.SERVER;
    const args = parseArgs(message);

    if (args.length > 1)
        throw new Error(`Only one argument is allowed for this command.`);

    if (args.includes('c'))
        type = ScoreType.CHANNEL;

    const scoreboardName = split[3];
    if (args.includes('s')) {
        type = ScoreType.SCOREBOARD;
        const scoreboard = await Scoreboard.findOne({
            where: {
                serverId: message.guild.id,
                name: scoreboardName
            }
        });
        
        if (!scoreboard) 
            throw new Error(`Cannot find scoreboard with name ${scoreboardName} to display scores.`);
        
        
    }

    const where = {
        serverId: message.guild.id,
        channelId: message.channel.id,
        type
    }

    if (type === ScoreType.SERVER || type === ScoreType.SCOREBOARD) {
        delete where.channelId;
    }

    const scores = await Score.findAll({
        where,
        order: [['value', 'DESC']],
        limit: 20
    });

    const embed = getMessageEmbed(message.author)
        .setDescription(`You can get more information on a specific score by running:\n\n\`.sb info ${split[2] || ''} [score_name]\`\n
        View pages by running \`.sb scores [page_number]\`
        `);
    const attachment = new MessageAttachment(buildChart(type, scores));
    embed.attachFiles([attachment]);
    message.channel.send(embed);
}

const buildChart = (type: ScoreType, scores: Score[]) => {
    const config = {
        type: 'horizontalBar',
        data: {
            labels: scores.map(s => `${s.name} [${s.value}]`),
            datasets: [
                {
                    data: scores.map(s => s.value),
                    backgroundColor: "lightgrey"
                }
            ],
        },
        options: {
            title: {
                display: true,
                text: `${type} SCORES`,
                fontSize: 24,
                fontColor: `white`,
                fontStyle: `bold`
            },
            legend: {
                display: false,
                labels: {
                    defaultFontColor: "white",
                    fontSize: 18
                }
            },
            scales: {
                yAxes: [{
                    responsive: false,
                    ticks: {
                        fontColor: 'white',
                        fontSize: 14,
                        fontStyle: 'bold',
                        beginAtZero: true
                    },
                    gridLines: {
                        color: '#5f6670',
                        lineWidth: 2
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'white',
                        fontSize: 22,
                        fontStyle: 'bold',
                        beginAtZero: true
                    },
                    gridLines: {
                        color: '#5f6670',
                        lineWidth: 2
                    }
                }]
            }
        }
    };

    return renderSmallChart(config);
}


export default scores;