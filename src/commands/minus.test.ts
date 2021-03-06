import { createScore } from '../service/score';
import logger from '../util/logger';
import { createTestUser, getTestMessage, resetDb } from '../util/test-util'
import minus from './minus';
import { delay } from 'bluebird';

let TEST_USER;


beforeEach(async () => {
    await resetDb();
    TEST_USER = await createTestUser();
});

it('should decrease a score by one', async () => {
    const scoreName = 'test'
    const command = `${scoreName}--`
    const message = getTestMessage(`.sb ${command}`);
    const score = await createScore({
        serverId: message.guild.id,
        channelId: message.channel.id,
        type: `SERVER`,
        name: scoreName,
        description: undefined,
        createdBy: TEST_USER.id,
        ScoreboardId: null
    });
    const res = await minus(TEST_USER, command, message);
    expect(res.value).toBe(score.value - 1);
});

it('should decrease a score by 10', async () => {
    const scoreName = 'test'
    const command = `${scoreName}-10`
    const message = getTestMessage(`.sb ${command}`);
    const score = await createScore({
        serverId: message.guild.id,
        channelId: message.channel.id,
        type: `SERVER`,
        name: scoreName,
        description: undefined,
        createdBy: TEST_USER.id,
        ScoreboardId: null
    });
    const res = await minus(TEST_USER, command, message);
    expect(res.value).toBe(score.value - 10);
});

it('should respond with an error if the score does not exist', async () => {
    const scoreName = 'test'
    const command = `${scoreName}-10`
    const message = getTestMessage(`.sb ${command}`);
    await minus(TEST_USER, command, message);
    expect(message.channel.send.mock.calls[0][0].description).toContain(`Cannot find matching`);
});