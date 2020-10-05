import { Scoreboard } from '../models';
import ScoreType from '../constant/score-type';
import { createTestUser, getTestMessage, resetDb } from '../util/test-util';
import add from './add';
import logger from '../util/logger';

let TEST_USER;
beforeEach(async () => {
    await resetDb();
    TEST_USER = await createTestUser();
    logger.info('done');
});

it('should add a server score', async () => {
    const name = 'test';
    const command = `.sb add ${name}`;
    const message = getTestMessage(command);
    const res = await add(TEST_USER, command, message);
    expect(res.name).toBe(name);
    expect(res.type).toBe(ScoreType.SERVER);
});

it('should add a channel score', async () => {
    const name = 'test';
    const command = `.sb add -c ${name}`;
    const message = getTestMessage(command);
    const res = await add(TEST_USER, command, message);
    expect(res.name).toBe(name);
    expect(res.type).toBe(ScoreType.CHANNEL);  
});

it('should add a scoreboard score', async () => {
    const scoreboardName = 'scoreboard';
    const name = 'test';
    const command = `.sb add -s ${scoreboardName} ${name}`;
    const message = getTestMessage(command);

    const scoreboard = await Scoreboard.create({
        name: scoreboardName,
        createdBy: TEST_USER.id,
        serverId: message.guild.id
    });

    const res = await add(TEST_USER, command, message);
    expect(res.name).toBe(name);
    expect(res.type).toBe(ScoreType.SCOREBOARD);
    expect(res.ScoreboardId).toBe(scoreboard.id);  
});

it('should throw an error if more than 1 arguments are provided', async () => {
    const name = 'test';
    const command = `.sb add -cs ${name}`;
    const message = getTestMessage(command);
    expect(add(TEST_USER, command, message)).rejects.toThrow();
});

it('should throw an error if no name is provided', async () => {
    const command = `.sb add`;
    const message = getTestMessage(command);
    expect(add(TEST_USER, command, message)).rejects.toThrow();
});

it('should throw an error if a scoreboard name is not provided', async () => {
    const name = 'test';
    const command = `.sb add -s idontexist ${name}`;
    const message = getTestMessage(command);
    expect(add(TEST_USER, command, message)).rejects.toThrow();
});



