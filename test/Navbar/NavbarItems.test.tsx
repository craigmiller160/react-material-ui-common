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
import NavbarItems, { Props as NavbarItemsProps } from '../../src/Navbar/NavbarItems';
import createTestComponent from '../utils/createTestComponent';
import createTestRouter, { RouterOptions } from '../utils/createTestRouter';
import renderingValidator, { RenderedItem } from '../utils/renderingValidator';

const defaultProps: NavbarItemsProps = {
    isAuth: true,
    navLinkClass: 'LinkClass',
    items: [
        {
            to: '/one/abc',
            text: 'One',
            exact: true
        },
        {
            to: '/two/def',
            text: 'Two',
            exact: false
        }
    ]
};

const defaultRouterOptions: RouterOptions = {
    initialEntries: [ '/one/abc' ],
    initialIndex: 0
};

const TestNavbarItems = createTestComponent(defaultProps, NavbarItems);
const TestRouter = createTestRouter(defaultRouterOptions);

const noNavLinksItem: RenderedItem = {
    selector: 'NavLink',
    values: []
};

const navLinksItem: RenderedItem = {
    selector: 'NavLink',
    values: [
        {
            props: {
                id: 'navbar-item-one-abc',
                to: '/one/abc',
                className: 'LinkClass'
            }
        },
        {
            props: {
                id: 'navbar-item-two-def',
                to: '/two/def',
                className: 'LinkClass'
            }
        }
    ]
};

const buttonsItem: RenderedItem = {
    selector: 'ForwardRef(Button)',
    values: [
        {
            props: {
                variant: 'contained',
                color: 'default'
            },
            text: 'One'
        },
        {
            props: {
                variant: 'text',
                color: 'inherit'
            },
            text: 'Two'
        }
    ]
};

describe('NavbarItems', () => {
    describe('rendering', () => {
        it('renders items', () => {
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestNavbarItems />
                </TestRouter>
            );

            const items: RenderedItem[] = [
                navLinksItem,
                buttonsItem
            ];

            renderingValidator(wrapper, items);
        });

        it('renders with isAuth = false', () => {
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestNavbarItems isAuth={ false } />
                </TestRouter>
            );

            const items: RenderedItem[] = [
                noNavLinksItem
            ];

            renderingValidator(wrapper, items);
        });
    });
});
