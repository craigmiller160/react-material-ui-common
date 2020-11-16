/*
 * react-material-ui-common
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
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
    createTestComponent,
    createTestRouter,
    renderingValidator,
    RenderedItem,
    RouterOptions
} from '@craigmiller160/react-test-utils';
import Tabs, { Props as TabsProps } from '../../src/Tabs';

const defaultRouterOptions: RouterOptions = {
    initialEntries: [ '/root/tab1' ],
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

const createMuiTabsItem = (value: number): RenderedItem => ({
    selector: 'WithStyles(ForwardRef(Tabs))',
    values: [
        {
            props: {
                value,
                indicatorColor: 'primary',
                textColor: 'primary',
                centered: true,
                onChange: expect.any(Function)
            }
        }
    ]
});

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
    values: [ {} ]
};

const tab1RouteItem: RenderedItem = {
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

const tab2RouteItem: RenderedItem = {
    selector: 'Route',
    values: [
        {
            props: {
                path: '//tab2',
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
                createMuiTabsItem(0),
                tabItems,
                switchItem,
                tab1RouteItem
            ];

            renderingValidator(wrapper, items);
        });
    });

    describe('behavior', () => {
        it('handleTabChange', () => {
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestTabs />
                </TestRouter>
            );

            wrapper.find('ForwardRef(Tab)').at(1).simulate('click');
            act(() => {
                wrapper.update();
            });
            const items: Array<RenderedItem> = [
                rootDivItem,
                createMuiTabsItem(1),
                tabItems,
                switchItem,
                tab2RouteItem
            ];

            renderingValidator(wrapper, items);
        });
    });
});
