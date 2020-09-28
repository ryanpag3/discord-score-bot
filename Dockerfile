FROM node:latest

WORKDIR /opt/score-bot

COPY . /opt/score-bot

RUN rm -rf /opt/score-bot/.env && \
    rm -rf /opt/score-bot/node_modules && \
    yarn install

ENTRYPOINT ["yarn", "watch"]