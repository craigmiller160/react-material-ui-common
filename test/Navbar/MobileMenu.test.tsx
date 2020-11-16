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
import {
    createTestComponent,
    createTestRouter,
    renderingValidator,
    RenderedItem,
    RouterOptions
} from '@craigmiller160/react-test-utils';
import MobileMenu, { Props as MobileMenuProps } from '../../src/Navbar/MobileMenu';

const handleMenuClose = jest.fn();
const authAction = jest.fn();

const defaultProps: MobileMenuProps = {
    menuOpen: true,
    handleMenuClose,
    authAction,
    authBtnText: 'Auth Btn',
    isAuth: false,
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
    ],
    showAuthBtn: false
};

const defaultRouterOptions: RouterOptions = {
    initialEntries: [ '/one/abc' ],
    initialIndex: 0
};

const TestMobileMenu = createTestComponent(defaultProps, MobileMenu);
const TestRouter = createTestRouter(defaultRouterOptions);

const drawerItem: RenderedItem = {
    selector: 'ForwardRef(Drawer)',
    values: [
        {
            props: {
                classes: expect.objectContaining({
                    paper: expect.stringContaining('MenuPrimary')
                }),
                className: 'MobileMenu',
                open: true,
                onClose: expect.any(Function)
            }
        }
    ]
};

const titleNavLinkItem: RenderedItem = {
    selector: 'NavLink#navbar-mobile-title-btn',
    values: [
        {
            props: {
                id: 'navbar-mobile-title-btn',
                to: '/',
                exact: true,
                className: 'NavLink'
            }
        }
    ]
};

const titleItem: RenderedItem = {
    selector: '#navbar-mobile-title-btn ForwardRef(Typography)',
    values: [
        {
            props: {
                className: 'title',
                variant: 'h6',
                noWrap: true,
                onClick: expect.any(Function)
            },
            text: 'Application'
        }
    ]
};

const noListItems: RenderedItem = {
    selector: 'ForwardRef(ListItem).menu-item',
    values: []
};

const listItems: RenderedItem = {
    selector: 'ForwardRef(ListItem).menu-item',
    values: [
        {
            props: {
                id: 'navbar-mobile-item-one-abc',
                className: 'menu-item item active',
                onClick: expect.any(Function)
            }
        },
        {
            props: {
                id: 'navbar-mobile-item-two-def',
                className: 'menu-item item ',
                onClick: expect.any(Function)
            }
        }
    ]
};

const navLinkItems: RenderedItem = {
    selector: '.menu-item NavLink.NavLink',
    values: [
        {
            props: {
                to: '/one/abc',
                className: 'NavLink',
                exact: true
            },
            text: 'One'
        },
        {
            props: {
                to: '/two/def',
                className: 'NavLink',
                exact: false
            },
            text: 'Two'
        }
    ]
};

const authBtnItem: RenderedItem = {
    selector: 'ForwardRef(ListItem)#navbar-mobile-auth-btn',
    values: [
        {
            props: {
                id: 'navbar-mobile-auth-btn',
                className: 'item',
                onClick: expect.any(Function)
            },
            text: 'Auth Btn'
        }
    ]
};

const noAuthBtnItem: RenderedItem = {
    selector: '#navbar-mobile-auth-btn',
    values: []
};

describe('MobileMenu', () => {
    describe('rendering', () => {
        it('base rendering', () => {
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestMobileMenu />
                </TestRouter>
            );

            const items: RenderedItem[] = [
                drawerItem,
                titleNavLinkItem,
                titleItem,
                noListItems,
                noAuthBtnItem
            ];

            renderingValidator(wrapper, items);
        });

        it('renders with isAuth', () => {
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestMobileMenu isAuth />
                </TestRouter>
            );

            const items: RenderedItem[] = [
                drawerItem,
                titleNavLinkItem,
                titleItem,
                listItems,
                navLinkItems,
                noAuthBtnItem
            ];

            renderingValidator(wrapper, items);
        });

        it('renders with showAuthBtn', () => {
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestMobileMenu showAuthBtn />
                </TestRouter>
            );

            const items: RenderedItem[] = [
                drawerItem,
                titleNavLinkItem,
                titleItem,
                noListItems,
                authBtnItem
            ];

            renderingValidator(wrapper, items);
        });
    });

    describe('behavior', () => {
        it('authButtonClick', () => {
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestMobileMenu showAuthBtn />
                </TestRouter>
            );

            wrapper.find('ForwardRef(ListItem)#navbar-mobile-auth-btn').simulate('click');

            expect(authAction).toHaveBeenCalled();
        });

        it('Drawer handleMenuClose', () => {
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestMobileMenu />
                </TestRouter>
            );

            const props: any = wrapper.find('ForwardRef(Drawer)').props();
            props?.onClose();

            expect(handleMenuClose).toHaveBeenCalled();
        });

        it('Title click', () => {
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestMobileMenu />
                </TestRouter>
            );

            wrapper.find('NavLink#navbar-mobile-title-btn ForwardRef(Typography)').simulate('click');

            expect(handleMenuClose).toHaveBeenCalled();
        });

        it('menu item click', () => {
            const wrapper: ReactWrapper = mount(
                <TestRouter>
                    <TestMobileMenu isAuth />
                </TestRouter>
            );

            wrapper.find('ForwardRef(ListItem)#navbar-mobile-item-one-abc').simulate('click');

            expect(handleMenuClose).toHaveBeenCalled();
        });
    });
});
