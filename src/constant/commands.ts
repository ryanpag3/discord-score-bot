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
    }
}