import BotDefaultRoles from './bot-default-roles';

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
        `,
        defaultRole: BotDefaultRoles.USER
    },
    ADD: {
        command: `add`,
        description: `Add a new score to the server.`,
        filename: `add.ts`,
        examples: `
        \`.sb add MyScore\`

        \`.sb add -c MyScore\`
        `,
        defaultRole: BotDefaultRoles.USER
    },
    SCORES: {
        command: 'scores',
        description: 'Show the current score values.',
        filename: 'scores.ts',
        examples: `
        \`.sb scores\`

        \`.sb scores -c\`
        `,
        defaultRole: BotDefaultRoles.USER
    },
    INFO: {
        command: 'info',
        description: `Get info about a score.`,
        filename: 'info.ts',
        examples: `
        \`.sb info [score_name]\`
        `,
        defaultRole: BotDefaultRoles.USER
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
        `,
        defaultRole: BotDefaultRoles.ADMIN
    },
    SCOREBOARD: {
        command: 'scoreboard',
        description: 'Create a scoreboard.',
        filename: 'scoreboard.ts',
        examples: `
        \`.sb scoreboard test\`

        \`.sb scoreboard test "My descriptiont!"\`
        `,
        defaultRole: BotDefaultRoles.USER
    },
    SCOREBOARDS: {
        command: 'scoreboards',
        description: 'List the current scoreboards for a server.',
        filename: 'scoreboards.ts',
        examples: `
            \`.sb scoreboards\`
        `,
        defaultRole: BotDefaultRoles.USER
    },
    'SB-INFO': {
        command: 'sb-info',
        description: `Get the information of a scoreboard.`,
        filename: `sb-info.ts`,
        examples: `
            \`.sb sb-info [scoreboard_name]\`
        `,
        defaultRole: BotDefaultRoles.USER
    },
    KEYWORD: {
        command: 'keyword',
        description: `Associate one or more keywords to a score.`,
        filename: 'keyword.ts',
        examples: `
            Create one or more keywords for a server score.
            \`.sb keyword [score_name] [keywords]\`

            Create one or more keywords for a channel score.
            \`.sb keyword -c [score_name] [keywords]\`

            Create one or more keywords for a scoreboard score.
            \`.sb keyword -s [score_name] [keywords]\`

            Delete a keyword for a server score.
            \`.sb keyword -rm [score_name] [keyword]\`

            Delete a keyword for a channel score.
            \`.sb keyword -rmc [score_name] [keyword]\`

            Delete a keyword for a scoreboard score.
            \`.sb keyword -rms [score_name] [keyword]\`
        `,
        defaultRole: BotDefaultRoles.USER
    },
    BUG: {
        command: 'bug',
        description: 'Report a bug.',
        filename: 'bug.ts',
        examples: `
        Create a bug report.
        \`.sb bug "This is my bug report that I want to submit."\`
        `,
        defaultRole: BotDefaultRoles.ADMIN
    },
    FEATURE: {
        command: 'feature',
        description: 'Submit a feature request.',
        filename: 'feature.ts',
        examples: `
        Create a feature request.
        \`.sb feature "This is my feature request. I would like to submit this feature!"\`
        `,
        defaultRole: BotDefaultRoles.ADMIN
    },
    EXPORT: {
        command: 'export',
        description: 'Export your score data.',
        filename: 'export.ts',
        examples: `
        Export your server data.
        \`.sb export\`
        `,
        defaultRole: BotDefaultRoles.ADMIN
    },
    IMPORT: {
        command: 'import',
        description: 'Import your score data.',
        filename: 'import.ts',
        examples: `
        Import your score data.
        \`.sb import\`
        `,
        defaultRole: BotDefaultRoles.ADMIN
    },
    PERMISSION: {
        command: 'permission',
        description: 'Setup and manage permissions',
        filename: 'permission.ts',
        examples: ``,
        defaultRole: BotDefaultRoles.ADMIN
    },
    PLUS: {
        command: 'plus',
        description: 'Add to a score.',
        filename: 'plus.ts',
        examples: ``,
        defaultRole: BotDefaultRoles.USER,
        isShorthand: true
    },
    MINUS: {
        command: 'minus',
        description: 'Remove from a score.',
        filename: 'minus.ts',
        examples: ``,
        defaultRole: BotDefaultRoles.USER,
        isShorthand: true
    },
    SET: {
        command: 'set',
        description: 'Set a score value.',
        filename: 'set.ts',
        examples: ``,
        defaultRole: BotDefaultRoles.USER,
        isShorthand: true
    }
}