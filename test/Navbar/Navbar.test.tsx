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
import Navbar, { Props as NavbarProps } from '../../src/Navbar';
import createTestComponent from '../utils/createTestComponent';
import createTestRouter, { RouterOptions } from '../utils/createTestRouter';
import { mount, ReactWrapper } from 'enzyme';
import { useMediaQuery } from '@material-ui/core';
import Mock = jest.Mock;
import renderingValidator, { RenderedItem } from '../utils/renderingValidator';

jest.mock('@material-ui/core', () => {
    const materialUiCore = jest.requireActual('@material-ui/core');
    return {
        ...materialUiCore,
        useMediaQuery: jest.fn()
    };
});

const mockUseMediaQuery = useMediaQuery as Mock;

const login = jest.fn();
const logout = jest.fn();

const defaultProps: NavbarProps = {
    isAuth: true,
    showAuthBtn: false,
    login,
    logout,
    title: 'Application',
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
    initialEntries: ['/one/abc'],
    initialIndex: 0
};

const TestNavbar = createTestComponent(defaultProps, Navbar);
const TestRouter = createTestRouter(defaultRouterOptions);

const appbarItem: RenderedItem = {
    selector: 'ForwardRef(AppBar)',
    values: [
        {
            props: {
                position: 'static',
                className: 'NavBar'
            }
        }
    ]
};

const menuIconItem: RenderedItem = {
    selector: 'ForwardRef(IconButton)#navbar-menu-btn',
    values: [
        {
            props: {
                id: 'navbar-menu-btn',
                edge: 'start',
                color: 'inherit',
                onClick: expect.any(Function)
            }
        }
    ]
};

const noMenuIconItem: RenderedItem = {
    selector: 'ForwardRef(IconButton)#navbar-menu-btn',
    values: []
};

const navbarItems: RenderedItem = {
    selector: 'NavbarItems',
    values: [
        {
            props: {
                isAuth: true,
                items: [
                    ...defaultProps.items
                ],
                navLinkClass: 'NavLink'
            }
        }
    ]
};

const noNavbarItems: RenderedItem = {
    selector: 'NavbarItems',
    values: []
};

describe('Navbar', () => {
    beforeEach(() => {
        mockUseMediaQuery.mockReset();
    });

    describe('rendering', () => {
        it('renders not for phone', () => {
            mockUseMediaQuery.mockImplementation(() => true);
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestNavbar />
                </TestRouter>
            );

            // console.log(wrapper.debug()); // TODO delete this

            const items: RenderedItem[] = [
                appbarItem,
                noMenuIconItem,
                navbarItems
            ];

            renderingValidator(wrapper, items);
        });

        it('renders not for phone, with showAuthBtn', () => {
            mockUseMediaQuery.mockImplementation(() => true);
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestNavbar showAuthBtn />
                </TestRouter>
            );

            const items: RenderedItem[] = [
                appbarItem,
                noMenuIconItem,
                navbarItems
            ];

            renderingValidator(wrapper, items);
        });

        it('renders for phone', () => {
            mockUseMediaQuery.mockImplementation(() => false);
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestNavbar />
                </TestRouter>
            );

            const items: RenderedItem[] = [
                appbarItem,
                menuIconItem,
                noNavbarItems
            ];

            renderingValidator(wrapper, items);
        });
    });

    describe('behavior', () => {
        it('handleMenuOpen', () => {
            throw new Error();
        });

        it('handleMenuClose', () => {
            throw new Error();
        });
    });
});
