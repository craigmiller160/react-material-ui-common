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
import { mount, ReactWrapper } from 'enzyme';
import renderingValidator, { RenderedItem } from '../utils/renderingValidator';

const defaultRouterOptions: RouterOptions = {
    initialEntries: ['/root/tab1'],
    initialIndex: 0
};

const defaultProps: TabsProps = {
    id: 'tabs',
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

const rootDivItem: RenderedItem = {
    selector: 'div#tabs',
    values: [
        {
            props: {
                className: 'TabsContainer'
            }
        }
    ]
};

const muiTabsItem: RenderedItem = {
    selector: 'WithStyles(ForwardRef(Tabs))',
    values: [
        {
            props: {
                value: 0,
                indicatorColor: 'primary',
                textColor: 'primary',
                centered: true,
                onChange: expect.any(Function)
            }
        }
    ]
};

const tabItems: RenderedItem = {
    selector: 'ForwardRef(Tab)',
    values: [
        {
            props: {
                id: 'tab1',
                label: 'Tab 1'
            }
        },
        {
            props: {
                id: 'tab2',
                label: 'Tab 2'
            }
        }
    ]
};

const switchItem: RenderedItem = {
    selector: 'Switch',
    values: [{}]
};

const routeItems: RenderedItem = {
    selector: 'Route',
    values: [
        {
            props: {
                path: '//tab1',
                exact: true,
                component: expect.anything()
            }
        }
    ]
};

describe('Tabs', () => {
    describe('rendering', () => {
        it('renders tabs and routes', () => {
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestTabs />
                </TestRouter>
            );

            const items: Array<RenderedItem> = [
                rootDivItem,
                muiTabsItem,
                tabItems,
                switchItem,
                routeItems
            ];

            renderingValidator(wrapper, items);
        });
    });

    describe('behavior', () => {
        it('handleTabChange', () => {
            throw new Error();
        });
    });
});