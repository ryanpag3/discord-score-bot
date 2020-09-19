import ScoreType from '../constant/score-type';
import { createScore } from '../service/score';
import { createUserIfNotExists } from '../service/user';
import { sequelize } from './db';
import runMigration from './umzug';

export const resetDb = async () => {
    await sequelize.drop({
        cascade: true
    });
    await runMigration();
}

export const getTestMessage = (content: string, serverId?: string, channelId?: string) => {
    let message: any = {
        channel: {
            id: channelId || randomString(32),
            send: jest.fn(),
            startTyping: () => {},
            stopTyping: () => {}
        },
        guild: {
            id: serverId || randomString(32)
        },
        author: {
            tag: 'Ryan Page',
            avatarURL: () => `https://cdn.discordapp.com/avatars/142440980451164160/500fd3b585cea52b1c2895a4269c2b5d.webp`
        },
        delete: jest.fn(),
        content: content || null,
        getLastChannelCall: null,
        getChannelId: null,
        getGuildId: null
    };
    return message;
}

function randomString(len) {
    var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(len)].reduce(a=>a+p[~~(Math.random()*p.length)],'');
}

export const createTestUser = async () => {
    return await createUserIfNotExists(`0n3r1ngt0rul3them4ll`);
}

export const createTestScore = async (createdBy: string) => {
    return await createScore({
        serverId: `serverIdeez`,
        channelId: `channelIdeez`,
        type: ScoreType.SERVER,
        name: `myscorename`,
        createdBy: createdBy
    });
}