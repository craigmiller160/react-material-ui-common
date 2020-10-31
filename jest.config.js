/*
 * material-ui-common
 * Copyright (C) 2020 Craig Miller
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const { defaults } = require('jest-config');

module.exports = {
    ...defaults,
    setupFilesAfterEnv: [
        '<rootDir>/test/setup.ts'
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}',
        '<rootDir>/test/**/*.{ts,tsx}',
        '!<rootDir>/node_modules/'
    ],
    moduleNameMapper: {
        '\\.(scss)$': 'identity-obj-proxy'
    },
    modulePaths: [
        '<rootDir>/src'
    ],
    testMatch: [
        '<rootDir>/test/**/*.test.{ts,tsx}'
    ],
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    testEnvironment: 'jsdom',
    testURL: 'http://localhost',
    modulePathIgnorePatterns: [
        '<rootDir>/.yalc'
    ],
    preset: 'ts-jest'
};