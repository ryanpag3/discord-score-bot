import { createScore } from '../service/score';
import { getTestMessage, resetDb } from '../util/test-util'
import plus from './plus';

beforeEach(async () => {
    await resetDb();
});

it('should increase a score by one', async () => {
    const scoreName = 'test'
    const command = `${scoreName}++`
    const message = getTestMessage(`.sb ${command}`);
    const score = await createScore({
        serverId: message.guild.id,
        channelId: message.channel.id,
        type: `SERVER`,
        name: scoreName
    });
    const res = await plus(command, message);
    expect(res.value).toBe(score.value + 1);
});

it('should increase a score by 10', async () => {
    const scoreName = 'test'
    const command = `${scoreName}+10`
    const message = getTestMessage(`.sb ${command}`);
    const score = await createScore({
        serverId: message.guild.id,
        channelId: message.channel.id,
        type: `SERVER`,
        name: scoreName
    });
    const res = await plus(command, message);
    expect(res.value).toBe(score.value +10);
});

it('should respond with an error if the score does not exist', async () => {
    const scoreName = 'test'
    const command = `${scoreName}+10`
    const message = getTestMessage(`.sb ${command}`);
    await plus(command, message);
    expect(message.channel.send.mock.calls[0][0].description).toContain(`Cannot find matching`);
});