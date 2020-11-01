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
import MobileMenu, { Props as MobileMenuProps } from '../../src/Navbar/MobileMenu';
import createTestComponent from '../utils/createTestComponent';
import createTestRouter, { RouterOptions } from '../utils/createTestRouter';

const handleMenuClose = jest.fn();
const authAction = jest.fn();

const defaultProps: MobileMenuProps = {
    menuOpen: true,
    handleMenuClose,
    authAction,
    authBtnText: 'Auth Btn',
    isAuth: true,
    title: 'Application',
    items:  [
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
    showAuthBtn: true
};

const defaultRouterOptions: RouterOptions = {
    initialEntries: ['/one/abc'],
    initialIndex: 0
};

const TestMobileMenu = createTestComponent(defaultProps, MobileMenu);
const TestRouter = createTestRouter(defaultRouterOptions)


describe('MobileMenu', () => {
    describe('rendering', () => {
        it('base rendering', () => {
            throw new Error();
        });

        it('renders with isAuth', () => {
            throw new Error();
        });

        it('renders with showAuthBtn', () => {
            throw new Error();
        });
    });

    describe('behavior', () => {
        it('authButtonClick', () => {
            throw new Error();
        });

        it('Drawer handleMenuClose', () => {
            throw new Error();
        });

        it('Title click', () => {
            throw new Error();
        });

        it('menu item click', () => {
            throw new Error();
        });
    });
});
