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
import { mount, ReactWrapper } from 'enzyme';
import { useMediaQuery } from '@material-ui/core';
import { act } from 'react-dom/test-utils';
import Navbar, { Props as NavbarProps } from '../../src/Navbar';
import createTestComponent from '../utils/createTestComponent';
import createTestRouter, { RouterOptions } from '../utils/createTestRouter';
import renderingValidator, { RenderedItem } from '../utils/renderingValidator';

jest.mock('@material-ui/core', () => {
    const materialUiCore = jest.requireActual('@material-ui/core');
    return {
        ...materialUiCore,
        useMediaQuery: jest.fn()
    };
});

const mockUseMediaQuery = useMediaQuery as jest.Mock;

const login = jest.fn();
const logout = jest.fn();

const defaultProps: NavbarProps = {
    isAuth: false,
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
    initialEntries: [ '/one/abc' ],
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

const createNavbarItems = (isAuth: boolean): RenderedItem => ({
    selector: 'NavbarItems',
    values: [
        {
            props: {
                isAuth,
                items: [
                    ...defaultProps.items
                ],
                navLinkClass: 'NavLink'
            }
        }
    ]
});

const noNavbarItems: RenderedItem = {
    selector: 'NavbarItems',
    values: []
};

const titleNavLinkItem: RenderedItem = {
    selector: 'NavLink#navbar-title-btn',
    values: [
        {
            props: {
                id: 'navbar-title-btn',
                className: 'NavLink',
                exact: true
            }
        }
    ]
};

const titleItem: RenderedItem = {
    selector: '#navbar-title-btn ForwardRef(Typography)',
    values: [
        {
            props: {
                variant: 'h6',
                noWrap: true
            },
            text: 'Application'
        }
    ]
};

const createAuthBtnItem = (isAuth: boolean): RenderedItem => ({
    selector: 'ForwardRef(Button)#navbar-auth-btn',
    values: [
        {
            props: {
                id: 'navbar-auth-btn',
                variant: 'text',
                color: 'inherit',
                onClick: expect.any(Function)
            },
            text: isAuth ? 'Logout' : 'Login'
        }
    ]
});

const noAuthBtnItem: RenderedItem = {
    selector: 'ForwardRef(Button)#navbar-auth-btn',
    values: []
};

const createMobileMenuItem = (isAuth: boolean, showAuthBtn: boolean): RenderedItem => ({
    selector: 'MobileMenu',
    values: [
        {
            props: {
                menuOpen: false,
                handleMenuClose: expect.any(Function),
                authAction: expect.any(Function),
                authBtnText: isAuth ? 'Logout' : 'Login',
                isAuth,
                title: 'Application',
                items: [
                    ...defaultProps.items
                ],
                showAuthBtn
            }
        }
    ]
});

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

            const items: RenderedItem[] = [
                appbarItem,
                noMenuIconItem,
                titleNavLinkItem,
                titleItem,
                createNavbarItems(false),
                noAuthBtnItem,
                createMobileMenuItem(false, false)
            ];

            renderingValidator(wrapper, items);
        });

        it('renders not for phone, with showAuthBtn and isAuth = true', () => {
            mockUseMediaQuery.mockImplementation(() => true);
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestNavbar showAuthBtn isAuth />
                </TestRouter>
            );

            const items: RenderedItem[] = [
                appbarItem,
                noMenuIconItem,
                titleNavLinkItem,
                titleItem,
                createNavbarItems(true),
                createAuthBtnItem(true),
                createMobileMenuItem(true, true)
            ];

            renderingValidator(wrapper, items);
        });

        it('renders not for phone, with showAuthBtn and isAuth = false', () => {
            mockUseMediaQuery.mockImplementation(() => true);
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestNavbar showAuthBtn />
                </TestRouter>
            );

            const items: RenderedItem[] = [
                appbarItem,
                noMenuIconItem,
                titleNavLinkItem,
                titleItem,
                createNavbarItems(false),
                createAuthBtnItem(false),
                createMobileMenuItem(false, true)
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
                titleNavLinkItem,
                titleItem,
                noNavbarItems,
                noAuthBtnItem,
                createMobileMenuItem(false, false)
            ];

            renderingValidator(wrapper, items);
        });
    });

    describe('behavior', () => {
        it('handleMenuOpen & handleMenuClose', () => {
            mockUseMediaQuery.mockImplementation(() => false);
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestNavbar />
                </TestRouter>
            );

            expect(wrapper.find('MobileMenu').props()).toEqual(expect.objectContaining({
                menuOpen: false
            }));

            act(() => {
                wrapper.find('ForwardRef(IconButton)#navbar-menu-btn').simulate('click');
            });
            wrapper.update();

            expect(wrapper.find('MobileMenu').props()).toEqual(expect.objectContaining({
                menuOpen: true
            }));

            act(() => {
                (wrapper.find('MobileMenu').props() as any).handleMenuClose();
            });
            wrapper.update();

            expect(wrapper.find('MobileMenu').props()).toEqual(expect.objectContaining({
                menuOpen: false
            }));
        });

        it('login', () => {
            mockUseMediaQuery.mockImplementation(() => true);
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestNavbar showAuthBtn />
                </TestRouter>
            );

            wrapper.find('ForwardRef(Button)#navbar-auth-btn').simulate('click');

            expect(login).toHaveBeenCalled();
            expect(logout).not.toHaveBeenCalled();
        });

        it('logout', () => {
            mockUseMediaQuery.mockImplementation(() => true);
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestNavbar showAuthBtn isAuth />
                </TestRouter>
            );

            wrapper.find('ForwardRef(Button)#navbar-auth-btn').simulate('click');

            expect(login).not.toHaveBeenCalled();
            expect(logout).toHaveBeenCalled();
        });
    });
});
