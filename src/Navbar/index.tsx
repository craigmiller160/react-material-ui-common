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

import React, { useState } from 'react';
import { AppBar, useMediaQuery, useTheme } from '@material-ui/core';
import './NavBar.scss';

interface Props {
    isAuth: boolean;
    hasChecked: boolean; // TODO refactor this
    login: () => void;
    logout: () => void;
}

interface State {
    menuOpen: boolean;
}

const isActive = (pathname: string, path: string, exact: boolean = false): boolean =>
    exact ? pathname === path : pathname !== '/' && pathname.startsWith(path);

const Navbar = (props: Props) => {
    const theme = useTheme();
    const isNotPhone = useMediaQuery(theme.breakpoints.up('md'));
    const [state, setState] = useState<State>({
        menuOpen: false
    });

    const handleMenuOpen = () =>
        setState((prevState) => ({
            ...prevState,
            menuOpen: true
        }));

    const handleMenuClose = () =>
        setState((prevState) => ({
            ...prevState,
            menuOpen: false
        }));

    const authBtnText = props.isAuth ? 'Logout' : 'Login';
    const authAction = props.isAuth ? props.logout : props.login;

    return (
        <>
            <AppBar position="static" className="NavBar">

            </AppBar>
        </>
    );
};