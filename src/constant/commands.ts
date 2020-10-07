import BotDefaultRoles from './bot-default-roles';

/**
 * Command events will not fire unless they are defined in this manifest.
 * 
 * This is used to generate help responses.
 */
export default {
    HELP: {
        command: `help`,
        description: `Get help using Score Bot.`,
        filename: `help.ts`,
        examples: `
Get a link to the documentation.
\`.sb help\`

Get help for a specific command.
\`.sb help [command]\`

Get a list of all available commands.
\`.sb help commands\`
`,
        defaultRole: BotDefaultRoles.USER
    },
    ADD: {
        command: `add`,
        description: `Add a new score to the server.`,
        filename: `add.ts`,
        examples: `
Add a server score.
\`.sb add [name] [optional_description]\`

Add a channel score.
\`.sb add -c [name] [optional_description]\`

Add a scoreboard score
\`.sb add -s [scoreboard_name] [score_name] [optional_score_description]\`
`,
        defaultRole: BotDefaultRoles.USER
    },
    SCORES: {
        command: 'scores',
        description: 'Show the current score values.',
        filename: 'scores.ts',
        examples: `
Get server scores.
\`.sb scores\`

Get channel scores.
\`.sb scores -c\`

Get scoreboard scores.
\`.sb scores -s [scoreboard_name]\`

Get user scores.
\`.sb scores -u\`
`,
        defaultRole: BotDefaultRoles.USER
    },
    INFO: {
        command: 'info',
        description: `Get info about a score.`,
        filename: 'info.ts',
        examples: `
Get server score info.
\`.sb info [score_name]\`

Get channel score info.
\`.sb info -c [score_name]\`

Get server score info.
\`.sb info -s [scoreboard_name] [score_name]\`
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
        description: 'Manage scoreboard or create a new one.',
        filename: 'scoreboard.ts',
        examples: `
Create a scoreboard.
\`.sb scoreboard [name]\`

Create a scoreboard with a description.
\`.sb scoreboard [name] "[description]"\`

Get a scoreboard's information.
\`.sb scoreboard -i [name]\`

Delete a scoreboard
\`.sb scoreboard -rm [name]\`
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
Import your server data. This command works with bot score bot data files and tally bot data files.
\`.sb import\`
`,
        defaultRole: BotDefaultRoles.ADMIN
    },
    PERMISSION: {
        command: 'permission',
        description: 'Setup and manage permissions.',
        filename: 'permission.ts',
        examples: `
Initialize default roles permissions for your server.
\`.sb permission --init\`

Set a command to require a particular role.
\`.sb permission [command] "[role]"\`

Set a command to be allowed by anyone
\`.sb permission [command] everyone\`

Set all commands to require a particular role.
\`.sb permission "[role]"\`
`,
        defaultRole: BotDefaultRoles.ADMIN
    },
    PLUS: {
        command: 'plus',
        description: 'Add to a score.',
        filename: 'plus.ts',
        examples: `
Increase a server score by one.
\`.sb [name]++\`

Increase a channel score by one.
\`.sb [name]++ -c\`

Increase a scoreboard score by one.
\`.sb [name]++ -s\`

You can also increase by an amount
\`.sb [name]+[amount]\`
`,
        defaultRole: BotDefaultRoles.USER,
        isShorthand: true
    },
    MINUS: {
        command: 'minus',
        description: 'Remove from a score.',
        filename: 'minus.ts',
        examples: `
Decrease a server score by one.
\`.sb [name]--\`

Descrease a channel score by one.
\`.sb [name]-- -c\`

Decrease a scoreboard score by one.
\`.sb [name]-- -s\`

You can also decrease by an amount
\`.sb [name]-[amount]\`
`,
        defaultRole: BotDefaultRoles.USER,
        isShorthand: true
    },
    SET: {
        command: 'set',
        description: 'Set a score value.',
        filename: 'set.ts',
        examples: `
Set a server score value.
\`.sb [name]=[amount]\`   

Set a channel score value.
\`.sb [name]=[amount] -c\`

Set a scoreboard score value.
\`.sb [name]=[amount] -s\` 
`,
        defaultRole: BotDefaultRoles.USER,
        isShorthand: true
    },
    PREFIX: {
        command: 'prefix',
        description: 'Change the bot prefix for the server.',
        filename: 'prefix.ts',
        examples: `
\`.sb prefix [new_prefix]\`
`,
        defaultRole: BotDefaultRoles.ADMIN
    }
}