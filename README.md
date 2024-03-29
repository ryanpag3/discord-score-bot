
# This bot will be shutdown on May 1st. Please migrate to https://roscobot.com

# Score Bot

![Build](https://github.com/ryanpag3/discord-score-bot/workflows/Build/badge.svg?branch=master&event=push)

[commands](#commands) | [patch notes](https://github.com/ryanpag3/discord-score-bot/blob/master/PATCHNOTES.md) | [invite bot](https://discord.com/oauth2/authorize?client_id=762877482314629130&scope=bot&permissions=268594241)

Score Bot is exactly what its name describes. Keep scores in your server, channels, etc. It's highly customizable with permissions, custom prefixes, and more. It's also free.

Want a feature added immediately? [Open a bounty](https://www.bountysource.com/teams/score-bot)

If you are coming from Tally Bot, thanks for migrating. I plan on supporting only this bot longterm.

[//]: <> (BEGIN_GENERATED_COMMANDS)

# Commands

- [help](#help) - _Get help using Score Bot._
- [add](#add) - _Add a new score to the server._
- [rm](#rm) - _Delete a score._
- [plus](#plus) - _Add to a score._
- [minus](#minus) - _Remove from a score._
- [set](#set) - _Set a score value._
- [empty](#empty) - _Set all scores of a specific type to 0._
- [group](#group) - _Manage score groups._
- [scores](#scores) - _Show the current score values._
- [info](#info) - _Get info about a score._
- [scoreboard](#scoreboard) - _Manage scoreboards_
- [scoreboards](#scoreboards) - _List the current scoreboards for a server._
- [keyword](#keyword) - _Setup keywords to trigger score changes._
- [bug](#bug) - _Report a bug._
- [feature](#feature) - _Submit a feature request._
- [export](#export) - _Export your score data._
- [import](#import) - _Import your Score Bot or Tally Bot data file._
- [permission](#permission) - _Setup and manage permissions._
- [prefix](#prefix) - _Change the bot prefix for the server._
- [stats](#stats) - _Display statistics for the server._

### `help`

Help can be used to get a link to the documentation or directly for a command.

default role: **ScoreBotUser**

``` txt

Get a link to the documentation.
.sb help

Get help for a specific command.
.sb help [command]

Get help for a specific command.
.sb [command] -h

Get a list of all available commands.
.sb help commands

```

### `add`


There are 4 different type of scores:

- **Server:** access anywhere in your server

- **Channel:** access only in the channel it was created in

- **Scoreboard:** create a scoreboard and assign a score to it

- **User:** Assign a score to a user. User scores increase when users send a message.        


default role: **ScoreBotUser**

``` txt

Add a server score.
.sb add [name] "[optional_description]"

Add a channel score.
.sb add -c [name] "[optional_description]"

Add a scoreboard score
.sb add -s [scoreboard_name] [score_name] "[optional_score_description]"

Add a user score
.sb add [@mention] "[optional_score_description]"

```

### `rm`

Delete a score.

default role: **ScoreBotAdmin**

``` txt

Delete a server score with confirmation.
.sb rm [score_name]

Include f in your argument to skip confirming.
.sb rm -f [score_name]

Delete a channel score.
.sb rm -c [score_name]

Delete a scoreboard score.
.sb rm -s [score_name]

Delete a user score.
.sb rm [@mention]

```

### `plus`

Add to a score.

default role: **ScoreBotUser**

``` txt

Increase a server score by one.
.sb [name]++

Increase a channel score by one.
.sb [name]++ -c

Increase a scoreboard score by one.
.sb [name]++ -s

You can also increase by an amount
.sb [name]+[amount]

```

### `minus`

Remove from a score.

default role: **ScoreBotUser**

``` txt

Decrease a server score by one.
.sb [name]--

Descrease a channel score by one.
.sb [name]-- -c

Decrease a scoreboard score by one.
.sb [name]-- -s

You can also decrease by an amount
.sb [name]-[amount]

```

### `set`


Set the value of a score. 

Scores have a range of -2147483648 to +2147483647


default role: **ScoreBotUser**

``` txt

Set a server score value.
.sb [name]=[amount]   

Set a channel score value.
.sb [name]=[amount] -c

Set a scoreboard score value.
.sb [name]=[amount] -s 

```

### `empty`


Set all scores of a specific type to 0.
        

default role: **ScoreBotAdmin**

``` txt

Set all server scores to 0.
.sb empty

Set scores in a specific channel to 0.
.sb empty -c

Set the scores in a specific scoreboard to 0.
.sb empty -s [scoreboard_name]
        
```

### `group`


Score groups allow you to modify multiple scores in one action. 

You can create them for any score type and they work with the existing commands for modifying scores.


default role: **ScoreBotUser**

``` txt

Create a score group. Score names are comma separated (i.e name1,name2,name3)
.sb group [group_name] [score_names]

Create a channel score group.
.sb group -c [group_name] [channel_score_names]

Create a scoreboard score group.
.sb group -s [group_name] [scoreboard_score_names]

Create a user score group.
.sb group -u [group_name] [user_scores]

Delete a score group.
.sb group -rm [name]

Get info on score group.
.sb group -i [name]

List all current groups
.sb group -l

All score groups use the same syntax as regular scores to update values but with -g. (i.e .sb [group]+100 -g)

```

### `scores`

Show the current score values.

default role: **ScoreBotUser**

``` txt

Get server scores.
.sb scores

Get channel scores.
.sb scores -c

Get scoreboard scores.
.sb scores -s [scoreboard_name]

Get user scores.
.sb scores -u

You can also optionally set the page number and amount per page by adding a comma-separated value at the end.
.sb scores [page_number],[amt_per_page]

To display the second page with the default amount of 20.
.sb scores 2

To display the second page with a larger amount of 40.
.sb scores 2,40

Also works with other score types like so.
.sb scores -c 2,40

```

### `info`

Get info about a score.

default role: **ScoreBotUser**

``` txt

Get server score info.
.sb info [score_name]

Get channel score info.
.sb info -c [score_name]

Get scoreboard score info.
.sb info -s [score_name]

```

### `scoreboard`


Scoreboards are groups of scores that can be tracked over time and compared using the `.sb scores` command. 

For example, you could create one to track the 4 Hogwart's houses.


default role: **ScoreBotUser**

``` txt

Create a scoreboard.
.sb scoreboard [name]

Create a scoreboard with a description.
.sb scoreboard [name] "[description]"

Get a scoreboard's information.
.sb scoreboard -i [name]

Delete a scoreboard
.sb scoreboard -rm [name]

```

### `scoreboards`

List the current scoreboards for a server.

default role: **ScoreBotUser**

``` txt

.sb scoreboards

```

### `keyword`


You can assign keywords to any score. When users type in the chat and include the keyword, it will increase the score by 1.


default role: **ScoreBotUser**

``` txt

Create one or more keywords for a server score.
.sb keyword [score_name] [keywords]

List keywords.
.sb keyword -l

Create one or more keywords for a channel score.
.sb keyword -c [score_name] [keywords]

Create one or more keywords for a scoreboard score.
.sb keyword -s [score_name] [keywords]

Delete a keyword for a server score.
.sb keyword -rm [score_name] [keyword]

Delete a keyword for a channel score.
.sb keyword -rmc [score_name] [keyword]

Delete a keyword for a scoreboard score.
.sb keyword -rms [score_name] [keyword]

```

### `bug`


Open a bug report in the github repository.


default role: **ScoreBotAdmin**

``` txt

.sb bug "This is my bug report that I want to submit."

```

### `feature`


Open a bug report in the github repository.


default role: **ScoreBotAdmin**

``` txt

.sb feature "This is my feature request. I would like to submit this feature!"

```

### `export`


This will generate a file that you can use to backup your Score Bot data.

You can also use it to migrate your data to a new server.


default role: **ScoreBotAdmin**

``` txt

.sb export

```

### `import`


Attach a file to your message to import it.

Works with both Tally Bot and Score Bot data files.


default role: **ScoreBotAdmin**

``` txt

.sb import

```

### `permission`

Setup and manage permissions.

default role: **ScoreBotAdmin**

``` txt

Initialize default roles permissions for your server.
.sb permission --init

Set a command to require a particular role.
.sb permission [command] [role]

Set a command to be allowed by anyone
.sb permission [command] everyone

Set all commands to require a particular role.
.sb permission -a [role]

```

### `prefix`


This will change the _entire_ prefix to be a new keyword.

For example if you've changed your prefix using the following: `.sb prefix .rp`

You would then run the following to create a server score: `.rp add my-score`


default role: **ScoreBotAdmin**

``` txt

.sb prefix [new_prefix]

```

### `stats`

Display statistics for the server.

default role: **ScoreBotAdmin**

``` txt

.sb stats

```

[//]: <> (END_GENERATED_COMMANDS)


## Development

### Setup Discord Developer Token

You will need a Discord developer token.

1. Go here [https://discord.com/developers](https://discord.com/developers)

1. Create a new application and click into it

1. Create a new bot for that application

1. Copy the bot token and put it in your `.env` file under `DISCORD_TOKEN=<token>`

### Invite your bot to your development server

1. Go here [https://discordapi.com/permissions.html](https://discordapi.com/permissions.html)

1. Input the **Client ID** in the form. You can find your Client ID in the same developer dashboard listed in the section above.

1. Assign the appropriate permissions. For development purposes, you can just use `Administrator`

1. Click the link it generates and invite your own personal instance of Score Bot to your server.

### Start up services

Score Bot uses postgres for its database. There is a `docker-compose.yml` file at the root of the project which makes starting up the database ease-peasy lemon squeezy.

`docker-compose up -d`

``` bash
user@computer ~/g/score-bot (master)> docker-compose up -d
Creating network "score-bot_default" with the default driver
Creating score-bot_pgadmin_1  ... done
Creating score-bot_postgres_1 ... done
```

[pgadmin](https://www.pgadmin.org/) is used for database monitoring/management.

_note: you will need to manually create a database with `test_` prepended to it if you are running the integration tests. (i.e score_bot_db -> test_score_bot_db)_

### Install dependencies

`yarn install`

### Run integration tests

`yarn test`

### Configure your environment

The bot is configured using a `.env` file located at the root of the project.

Copy the provided `.env.template` file and edit as necessary

``` bash
cp .env.template .env
```

### Start the bot

`yarn start` - starts the bot

`yarn watch` - starts the bot and will restart when changes occur

## Deployment

It's easy to deploy your own instance of Score Bot if you would like to use it on your server and control your own data. In fact, I encourage you to try it!

### Docker

1. Install Docker for your operating system [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

1. Deploy your database using the provided `docker-compose.yml` file

1. Download the Score Bot image

    ``` bash
    user@computer ~/g/discord-score-bot (master)> docker pull ryanpage/discord-score-bot
    Using default tag: latest
    latest: Pulling from ryanpage/discord-score-bot
    4f250268ed6a: Already exists
    1b49aa113642: Already exists
    c159512f4cc2: Already exists
    8439168fd8dc: Already exists
    55abbc6cc158: Already exists
    e5c5821cd889: Already exists
    b895fb797ecc: Already exists
    5b37d50231fd: Already exists
    6e4c550f68c7: Already exists
    86fbca3d8521: Pull complete
    0b0a2f406ade: Pull complete
    6ceb05111eab: Pull complete
    Digest: sha256:8bdfa2be395213588d6d68178bd459acf4420c73f344c4a476b0cd920fe3b658
    Status: Downloaded newer image for ryanpage/discord-score-bot:latest
    docker.io/ryanpage/discord-score-bot:latest
    ```

1. Configure and deploy image. Configuration is done via environment variables, see `.env.template` for more details.
