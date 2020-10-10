import BotDefaultRoles from './bot-default-roles';

/**
 * Command events will not fire unless they are defined in this manifest.
 * 
 * This is used to generate help responses.
 */
export default {
    HELP: {
        command: `help`,
        byline: `Get help using Score Bot.`,
        description: `Help can be used to get a link to the documentation or directly for a command.`,
        filename: `help.ts`,
        examples: `
Get a link to the documentation.
\`.sb help\`

Get help for a specific command.
\`.sb help [command]\`

Get help for a specific command.
\`.sb [command] -h\`

Get a list of all available commands.
\`.sb help commands\`
`,
        defaultRole: BotDefaultRoles.USER
    },
    ADD: {
        command: `add`,
        byline: `Add a new score to the server.`,
        description: `
There are 4 different type of scores:

- **Server:** access anywhere in your server

- **Channel:** access only in the channel it was created in

- **Scoreboard:** create a scoreboard and assign a score to it

- **User:** Assign a score to a user. User scores increase when users send a message.        
`,
        filename: `add.ts`,
        examples: `
Add a server score.
\`.sb add [name] "[optional_description]"\`

Add a channel score.
\`.sb add -c [name] "[optional_description]"\`

Add a scoreboard score
\`.sb add -s [scoreboard_name] [score_name] "[optional_score_description]"\`

Add a user score
\`.sb add [@mention] "[optional_score_description]"\`
`,
        defaultRole: BotDefaultRoles.USER
    },
    RM: {
        command: 'rm',
        byline: `Delete a score.`,
        description: `Delete a score.`,
        filename: 'rm.ts',
        examples: `
Delete a server score with confirmation.
\`.sb rm [score_name]\`

Include \`f\` in your argument to skip confirming.
\`.sb rm -f [score_name]\`

Delete a channel score.
\`.sb rm -c [score_name]\`

Delete a scoreboard score.
\`.sb rm -s [score_name]\`

Delete a user score.
\`.sb rm [@mention]\`
`,
        defaultRole: BotDefaultRoles.ADMIN
    },
    PLUS: {
        command: 'plus',
        byline: 'Add to a score.',
        description: `Add to a score.`,
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
        byline: 'Remove from a score.',
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
        byline: 'Set a score value.',
        description: `
Set the value of a score. 

Scores have a range of -2147483648 to +2147483647
`,
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
    GROUP: {
        command: 'group',
        byline: 'Manage score groups.',
        description: `
Score groups allow you to modify multiple scores in one action. 

You can create them for any score type and they work with the existing commands for modifying scores.
`,
        filename: 'group.ts',
        defaultRole: BotDefaultRoles.USER,
        examples: `
Create a score group. Score names are comma separated (i.e name1,name2,name3)
\`.sb group [group_name] [score_names]\`

Create a channel score group.
\`.sb group -c [group_name] [channel_score_names]\`

Create a scoreboard score group.
\`.sb group -s [group_name] [scoreboard_score_names]\`

Create a user score group.
\`.sb group -u [group_name] [user_scores]\`

Delete a score group.
\`.sb group -rm [name]\`

Get info on score group.
\`.sb group -i [name]\`

List all current groups
\`.sb group -l\`

All score groups use the same syntax as regular scores to update values but with \`-g\`. (i.e \`.sb [group]+100 -g\`)
`
    },
    SCORES: {
        command: 'scores',
        byline: 'Show the current score values.',
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
        byline: `Get info about a score.`,
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

    SCOREBOARD: {
        command: 'scoreboard',
        byline: 'Manage scoreboards',
        description: `
Scoreboards are groups of scores that can be tracked over time and compared using the \`.sb scores\` command. 

For example, you could create one to track the 4 Hogwart's houses.
`,
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
        byline: 'List the current scoreboards for a server.',
        description: 'List the current scoreboards for a server.',
        filename: 'scoreboards.ts',
        examples: `
\`.sb scoreboards\`
`,
        defaultRole: BotDefaultRoles.USER
    },
    KEYWORD: {
        command: 'keyword',
        byline: `Setup keywords to trigger score changes.`,
        description: `
You can assign keywords to any score. When users type in the chat and include the keyword, it will increase the score by 1.
`,
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
        byline: 'Report a bug.',
        description: `
Open a bug report in the github repository.
`,
        filename: 'bug.ts',
        examples: `
\`.sb bug "This is my bug report that I want to submit."\`
`,
        defaultRole: BotDefaultRoles.ADMIN
    },
    FEATURE: {
        command: 'feature',
        description: `
Open a bug report in the github repository.
`,
        byline: 'Submit a feature request.',
        filename: 'feature.ts',
        examples: `
\`.sb feature "This is my feature request. I would like to submit this feature!"\`
`,
        defaultRole: BotDefaultRoles.ADMIN
    },
    EXPORT: {
        command: 'export',
        byline: 'Export your score data.',
        description: `
This will generate a file that you can use to backup your Score Bot data.

You can also use it to migrate your data to a new server.
`,
        filename: 'export.ts',
        examples: `
\`.sb export\`
`,
        defaultRole: BotDefaultRoles.ADMIN
    },
    IMPORT: {
        command: 'import',
        byline: 'Import your Score Bot or Tally Bot data file.',
        description: `
Attach a file to your message to import it.

Works with both Tally Bot and Score Bot data files.
`,
        filename: 'import.ts',
        examples: `
\`.sb import\`
`,
        defaultRole: BotDefaultRoles.ADMIN
    },
    PERMISSION: {
        command: 'permission',
        byline: 'Setup and manage permissions.',
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
    PREFIX: {
        command: 'prefix',
        byline: 'Change the bot prefix for the server.',
        description: `
This will change the _entire_ prefix to be a new keyword.

For example if you've changed your prefix using the following: \`.sb prefix .rp\`

You would then run the following to create a server score: \`.rp add my-score\`
`,
        filename: 'prefix.ts',
        examples: `
\`.sb prefix [new_prefix]\`
`,
        defaultRole: BotDefaultRoles.ADMIN
    },
    STATS: {
        command: 'stats',
        byline: 'Display statistics for the server.',
        description: `Display statistics for the server.`,
        filename: 'stats.ts',
        examples: `
\`.sb stats\`
`,
        defaultRole: BotDefaultRoles.ADMIN
    }
}