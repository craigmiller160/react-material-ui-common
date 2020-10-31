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

import React from 'react';
import Tabs, { Props as TabsProps } from '../../src/Tabs';
import createTestRouter, { RouterOptions } from '../utils/createTestRouter';
import createTestComponent from '../utils/createTestComponent';

const defaultRouterOptions: RouterOptions = {
    initialEntries: ['/'],
    initialIndex: 0
};

const defaultProps: TabsProps = {
    id: 'Tabs',
    tabs: [
        {
            id: 'tab1',
            label: 'Tab 1',
            path: '/tab1',
            component: () => <div />
        },
        {
            id: 'tab2',
            label: 'Tab 2',
            path: '/tab2',
            component: () => <div />
        }
    ]
};

const TestRouter = createTestRouter(defaultRouterOptions);
const TestTabs = createTestComponent(defaultProps, Tabs);

describe('Tabs', () => {
    describe('rendering', () => {
        it('renders tabs and routes', () => {
            throw new Error();
        });
    });

    describe('behavior', () => {
        it('handleTabChange', () => {
            throw new Error();
        });
    });
});