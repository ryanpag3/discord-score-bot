#!/bin/bash

if [ -v "${RUN_BOT}" ]; then
  yarn start-prod &
fi

yarn start-api &

wait