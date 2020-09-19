import { sequelize } from './db';
import runMigration from './umzug';

export const resetDb = async () => {
    await sequelize.drop({
        cascade: true
    });
    await runMigration();
}

export const getTestMessage = (content: string) => {
    let message: any = {
        channel: {
            id: randomString(32),
            send: jest.fn(),
            startTyping: () => {},
            stopTyping: () => {}
        },
        guild: {
            id: randomString(32)
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