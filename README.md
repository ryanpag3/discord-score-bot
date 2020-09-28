
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
