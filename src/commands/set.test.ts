import { createScore } from '../service/score';
import logger from '../util/logger';
import { createTestScore, createTestUser, getTestMessage, resetDb } from '../util/test-util'
import set from './set';
import { delay } from 'bluebird';

let TEST_USER;
let TEST_SCORE;

beforeEach(async () => {
    await resetDb();
    TEST_USER = await createTestUser();
    TEST_SCORE = await createTestScore(TEST_USER.id);
});

afterAll(async () => {
    await delay(100);
});

it('should set a score amount', async () => {
    const amount = 1234;
    const command = `${TEST_SCORE.name}=${amount}`;
    const score = await set(TEST_USER, command, getTestMessage(`.sb ` + command, TEST_SCORE.serverId, TEST_SCORE.channelId));
    expect(score.value).toBe(amount);
});