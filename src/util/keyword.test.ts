import { Score, Keyword } from '../models';
import { delay } from 'bluebird';
import { createTestUser, getTestMessage, resetDb } from './test-util';
import logger from './logger';
import { handleKeywordMessage, loadKeywords } from './keyword';
import ScoreType from '../constant/score-type';

let TEST_USER;

beforeEach(async () => {
    await resetDb();
    await loadKeywords();
    TEST_USER = await createTestUser();
});

it('should increase a score value when a keyword exists', async () => {
    const command = 'test';
    let msg = getTestMessage(command);
    const score = await Score.create({
        serverId: msg.guild.id,
        channelId: msg.channel.id, 
        name: 'score',
        type: ScoreType.SERVER,
        createdBy: TEST_USER.id
    });
    const previous = score.value;
    const keyword = await Keyword.create({
        ScoreId: score.id,
        serverId: msg.guild.id,
        name: 'test'
    });
    const res = await handleKeywordMessage(msg);
    await score.reload();
    expect(score.value).toBe(previous+1);
});
