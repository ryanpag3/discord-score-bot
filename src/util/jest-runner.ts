/*
 *   Copyright (c) 2020 Ryan Page
 *   All rights reserved.
 */
require('dotenv').config();
const DefaultJestRunner = require('jest-runner');

class SerialJestRunner extends DefaultJestRunner {
  constructor(...args) {
    super(...args);
    this.isSerial = true;
  }
}

module.exports = SerialJestRunner;