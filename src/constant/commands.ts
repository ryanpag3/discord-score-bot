/**
 * Command events will not fire unless they are defined in this manifest.
 * 
 * This is used to generate help responses.
 */
export default {
    HELP: {
        command: `help`,
        description: `Provides a link to the documentation.`,
        filename: `help.ts`,
        examples: `
        \`.sb help\`
        `
    },
    ADD: {
        command: `add`,
        description: `Add a new score to the server.`,
        filename: `add.ts`,
        examples: `
        \`.sb add MyScore\`

        \`.sb add -c MyScore\`
        `
    },
    SCORES: {
        command: 'scores',
        description: 'Show the current score values.',
        filename: 'scores.ts',
        examples: `
        \`.sb scores\`

        \`.sb scores -c\`
        `
    },
    INFO: {
        command: 'info',
        description: `Get info about a score.`,
        filename: 'info.ts',
        examples: `
        \`.sb info [score_name]\`
        `
    },
    RM: {
        command: 'rm',
        description: `Delete a score.`,
        filename: 'rm.ts',
        examples: `
        Delete a server score with confirmation.
        \`.sb rm [score_name]\`

        Delete a server score and skip confirmation.
        \`.sb rm -f [score_name]\`
        
        Delete a channel score.
        \`.sb rm -c [channel_score_name]\`
        
        Delete a channel score and skip confirmation.
        \`.sb rm -cf [channel_score_name]\`
        `
    },
    SCOREBOARD: {
        command: 'scoreboard',
        description: 'Create a scoreboard.',
        filename: 'scoreboard.ts',
        examples: `
        \`.sb scoreboard test\`

        \`.sb scoreboard test "My descriptiont!"\`
        `
    },
    SCOREBOARDS: {
        command: 'scoreboards',
        description: 'List the current scoreboards for a server.',
        filename: 'scoreboards.ts',
        examples: `
            \`.sb scoreboards\`
        `
    },
    'SB-INFO': {
        command: 'sb-info',
        description: `Get the information of a scoreboard.`,
        filename: `sb-info.ts`,
        examples: `
            \`.sb sb-info [scoreboard_name]\`
        `
    },
    KEYWORD: {
        command: 'keyword',
        description: `Associate one or more keywords to a score.`,
        filename: 'keyword.ts',
        examples: `
            \`.sb keyword [score_name] [keywords]\`

            \`.sb keyword -c [score_name] [keywords]\`

            \`.sb keyword -s [score_name] [keywords]\`

            \`.sb keyword MyScore MyKeyword\`

            \`.sb keyword MyScore MyFirstKeyword,MySecondKeyword,MyThirdKeyword\`
        `
    }
}