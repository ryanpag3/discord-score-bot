import { Scoreboard } from '../models';
import ScoreType from '../constant/score-type';
import { createScore } from '../service/score';
import { createTestUser, getTestMessage, resetDb } from '../util/test-util';
import empty from './empty';

let TEST_USER;

beforeEach(async () => {
    await resetDb();
    TEST_USER = await createTestUser();
});

it('should throw an error if multiple score type arguments are passed', async () => {
    const command = `empty`;
    const message = getTestMessage(`.sb ${command} -cs`);
    expect(empty(TEST_USER, command, message)).rejects.toThrow();
});

it('should throw an error if scoreboard type is selected without scoreboard', async () => {
    const command = 'empty';
    const message = getTestMessage(`.sb ${command} -s`);
    expect(empty(TEST_USER, command, message)).rejects.toThrow();
});

it('should set all server scores to 0', async () => {
    const command = 'empty';
    const message = getTestMessage(`.sb ${command}`);
    const score = await createScore({
        serverId: message.guild.id,
        channelId: message.channel.id,
        type: ScoreType.SERVER,
        name: 'testing',
        description: undefined,
        createdBy: TEST_USER.id,
        ScoreboardId: null
    });
    score.value = 50;
    await score.save();

    await empty(TEST_USER, command, message);
    await score.reload();
    expect(score.value).toBe(0);
});

it('should set all channel scores to 0', async () => {
    const command = 'empty';
    const message = getTestMessage(`.sb ${command} -c `);
    const chanScore = await createScore({
        serverId: message.guild.id,
        channelId: message.channel.id,
        type: ScoreType.CHANNEL,
        name: 'testing',
        description: undefined,
        createdBy: TEST_USER.id,
        ScoreboardId: null
    });
    chanScore.value = 50;
    await chanScore.save();

    const servScore = await createScore({
        serverId: message.guild.id,
        channelId: message.channel.id,
        type: ScoreType.SERVER,
        name: 'testing2',
        description: undefined,
        createdBy: TEST_USER.id,
        ScoreboardId: null
    });
    servScore.value = 50;
    await servScore.save();

    await empty(TEST_USER, command, message);
    await servScore.reload();
    await chanScore.reload();
    expect(chanScore.value).toBe(0);
    expect(servScore.value).toBe(50);
});

it('should set all scoreboard scores to 0', async () => {
    const command = 'empty';
    const message = getTestMessage(`.sb ${command} -s scoreboard`);
    const chanScore = await createScore({
        serverId: message.guild.id,
        channelId: message.channel.id,
        type: ScoreType.CHANNEL,
        name: 'testing',
        description: undefined,
        createdBy: TEST_USER.id,
        ScoreboardId: null
    });
    chanScore.value = 50;
    await chanScore.save();

    const servScore = await createScore({
        serverId: message.guild.id,
        channelId: message.channel.id,
        type: ScoreType.SERVER,
        name: 'testing2',
        description: undefined,
        createdBy: TEST_USER.id,
        ScoreboardId: null
    });
    servScore.value = 50;
    await servScore.save();

    const scoreboard = await Scoreboard.create({
        name: 'scoreboard',
        description: undefined,
        createdBy: TEST_USER.id,
        serverId: message.guild.id
    });

    const scoreboardScore = await createScore({
        serverId: message.guild.id,
        channelId: message.channel.id,
        type: ScoreType.SCOREBOARD,
        name: 'testing3',
        description: undefined,
        createdBy: TEST_USER.id,
        ScoreboardId: scoreboard.id
    });
    scoreboardScore.value = 50;
    await scoreboardScore.save();

    await empty(TEST_USER, command, message);
    await servScore.reload();
    await chanScore.reload();
    await scoreboardScore.reload();
    expect(chanScore.value).toBe(50);
    expect(servScore.value).toBe(50);
    expect(scoreboardScore.value).toBe(0);
});
