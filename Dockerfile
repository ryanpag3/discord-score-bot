FROM node:14

ENV NODE_ENV production

WORKDIR /opt/score-bot

COPY . /opt/score-bot

RUN rm -rf /opt/score-bot/.env && \
    rm -rf /opt/score-bot/node_modules && \
    yarn install

ENTRYPOINT ["yarn", "start-prod"]