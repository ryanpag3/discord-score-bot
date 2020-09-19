/*
 *   Copyright (c) 2020 Ryan Page
 *   All rights reserved.
 */
process.env.NODE_ENV = 'test'

module.exports = {
    roots: [
        "<rootDir>/src"
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testEnvironment: "node",
    // setupFilesAfterEnv: ["<rootDir>/src/util/test-setup.ts"],
    runner: '<rootDir>/src/util/jest-runner.ts'
}