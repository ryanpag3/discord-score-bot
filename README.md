
# Score Bot

![Build](https://github.com/ryanpag3/discord-score-bot/workflows/Build/badge.svg?branch=master&event=push)

Score Bot is the spiritual successor to [Tally Bot](https://github.com/ryanpag3/discord-tally-bot).

Track scores across your entire server, a channel, or create custom scoreboards.

This project is a WIP. No ETA on release currently.

## RIP Tally Bot

Tally Bot has seen considerable growth since I first wrote it over a weekend. I have been supporting it off and on for awhile now and have decided to cut the cord and build something lighter, faster and more focused on what users want.

_**Why not just update Tally Bot?**_ Everything in this bot will be fundamentally different than the previous one. All commands will have different syntax and many of the less-popular features of Tally Bot I plan to gut out. This will be a complete rewrite of the codebase.

_**When is Tally Bot going to die?**_ I'm not sure. Current plan is sometime in 2021.

_**What happens to my Tally Bot data?**_ You will have the opportunity to migrate your Tally Bot data to this new bot.

## Objectives

**Score Bot** (working title) aims to fix a lot of the issues I have now with maintaining Tally Bot.

1. Deployment is not straightforward. It's not easy for users to deploy their own instance of the bot.

1. The bot tries to do too much. This is a lightweight feature-rich scoring bot.

1. Tech debt impedes scaling possibilities while also requiring larger-than-necessary resources to do so.

1. Command syntax is poor and documentation is not easy to access.

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

[//]: <> (BEGIN_GENERATED_COMMANDS)

# Commands

- [help](#help) - _Get help using Score Bot._
- [add](#add) - _Add a new score to the server._
- [scores](#scores) - _Show the current score values._
- [info](#info) - _Get info about a score._
- [rm](#rm) - _Delete a score._
- [scoreboard](#scoreboard) - _Create a scoreboard._
- [scoreboards](#scoreboards) - _List the current scoreboards for a server._
- [sb-info](#sb-info) - _Get the information of a scoreboard._
- [keyword](#keyword) - _Associate one or more keywords to a score._
- [bug](#bug) - _Report a bug._
- [feature](#feature) - _Submit a feature request._
- [export](#export) - _Export your score data._
- [import](#import) - _Import your score data._
- [permission](#permission) - _Setup and manage permissions_
- [plus](#plus) - _Add to a score._
- [minus](#minus) - _Remove from a score._
- [set](#set) - _Set a score value._
- [prefix](#prefix) - _Change the bot prefix for the server._

### `help`

Get help using Score Bot.

default role: **ScoreBotUser**

``` txt

Get a link to the documentation.
.sb help

Get help for a specific command.
.sb help [command]

Get a list of all available commands.
.sb help commands

```

### `add`

Add a new score to the server.

default role: **ScoreBotUser**

``` txt

Add a server score.
.sb add [name] [optional_description]

Add a channel score.
.sb add -c [name] [optional_description]

Add a scoreboard score
.sb add -s [scoreboard_name] [score_name] [optional_score_description]

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

```

### `info`

Get info about a score.

default role: **ScoreBotUser**

``` txt

Get server score info.
.sb info [score_name]

Get channel score info.
.sb info -c [score_name]

Get server score info.
.sb info -s [scoreboard_name] [score_name]

```

### `rm`

Delete a score.

default role: **ScoreBotAdmin**

``` txt

Delete a server score with confirmation.
.sb rm [score_name]

Delete a server score and skip confirmation.
.sb rm -f [score_name]

Delete a channel score.
.sb rm -c [channel_score_name]

Delete a channel score and skip confirmation.
.sb rm -cf [channel_score_name]

```

### `scoreboard`

Create a scoreboard.

default role: **ScoreBotUser**

``` txt

.sb scoreboard test

.sb scoreboard test "My descriptiont!"

```

### `scoreboards`

List the current scoreboards for a server.

default role: **ScoreBotUser**

``` txt

.sb scoreboards

```

### `sb-info`

Get the information of a scoreboard.

default role: **ScoreBotUser**

``` txt

.sb sb-info [scoreboard_name]

```

### `keyword`

Associate one or more keywords to a score.

default role: **ScoreBotUser**

``` txt

Create one or more keywords for a server score.
.sb keyword [score_name] [keywords]

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

Report a bug.

default role: **ScoreBotAdmin**

``` txt

Create a bug report.
.sb bug "This is my bug report that I want to submit."

```

### `feature`

Submit a feature request.

default role: **ScoreBotAdmin**

``` txt

Create a feature request.
.sb feature "This is my feature request. I would like to submit this feature!"

```

### `export`

Export your score data.

default role: **ScoreBotAdmin**

``` txt

Export your server data.
.sb export

```

### `import`

Import your score data.

default role: **ScoreBotAdmin**

``` txt

Import your server data. This command works with bot score bot data files and tally bot data files.
.sb import

```

### `permission`

Setup and manage permissions

default role: **ScoreBotAdmin**

``` txt

Initialize default roles permissions for your server.
.sb permission --init

Set a command to require a particular role.
.sb permission [command] "[role]"

Set a command to be allowed by anyone
.sb permission [command] everyone

Set all commands to require a particular role.
.sb permission "[role]"

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

Set a score value.

default role: **ScoreBotUser**

``` txt

Set a server score value.
.sb [name]=[amount]   

Set a channel score value.
.sb [name]=[amount] -c

Set a scoreboard score value.
.sb [name]=[amount] -s 

```

### `prefix`

Change the bot prefix for the server.

default role: **ScoreBotAdmin**

``` txt

.sb prefix [new_prefix]

```

[//]: <> (END_GENERATED_COMMANDS)
