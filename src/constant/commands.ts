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
    }
}