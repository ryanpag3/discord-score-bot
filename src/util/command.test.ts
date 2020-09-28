import ScoreType from '../constant/score-type';
import { getDoubleQuoteText, getScoreType, getScoreTypeLowercase, parseArgs } from './command';
import { getTestMessage } from './test-util';

it('should properly reflect the command constant file', async () => {
    const { COMMAND_MAP } = require('./command');
    const commands = require('../constant/commands');
    const commandsKeys = Object.keys(commands);
    for (const k of commandsKeys) {
        const mapKey = commandsKeys[k];
        expect(COMMAND_MAP[mapKey]).not.toBeNull();
    }
});

it('should get all score types', async () => {
    const types = Object.keys(ScoreType);
    for (const t of types) {
        expect(getScoreTypeLowercase(ScoreType[t])).not.toBeNull();
        expect(getScoreType(ScoreType[t])).not.toBeNull();
    }
});

it('should parse the arguments of a valid command', async () => {
    const cmd = `.sb command -c test`;
    const msg = getTestMessage(cmd);
    const args = parseArgs(msg);
    expect(args.length).toBe(1);
    expect(args[0]).toBe('c');
});

it('should return an empty array if no args are present', async () => {
    const cmd = `.sb command test`;
    const msg = getTestMessage(cmd);
    const args = parseArgs(msg);
    expect(args.length).toBe(0);
});

it('should parse the text located in between two double quotes', async () => {
    const cmd = `.sb command test "my text"`;
    const msg = getTestMessage(cmd);
    const txt = getDoubleQuoteText(msg);
    expect(txt).toBe('my text');
});

it('should return undefined if no matching quote is found', async () => {
    const cmd = `.sb command test "my text`;
    const msg = getTestMessage(cmd);
    const txt = getDoubleQuoteText(msg);
    expect(txt).toBeUndefined();
});
