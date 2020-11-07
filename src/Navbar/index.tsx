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
import { AppBar, Button, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import NavbarItems from './NavbarItems';
import { NavbarItem } from '../types';
import MobileMenu from './MobileMenu';

export interface Props {
    isAuth: boolean;
    showAuthBtn: boolean;
    login: () => void;
    logout: () => void;
    title: string;
    items: Array<NavbarItem>;
}

interface State {
    menuOpen: boolean;
}

const Navbar = (props: Props) => {
    const theme = useTheme();
    const isNotPhone = useMediaQuery(theme.breakpoints.up('md'));
    const [ state, setState ] = useState<State>({
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
            <AppBar position="static" className={ styles.NavBar }>
                <Toolbar>
                    {
                        !isNotPhone &&
                        <IconButton id="navbar-menu-btn" edge="start" color="inherit" onClick={ handleMenuOpen }>
                            <MenuIcon />
                        </IconButton>
                    }
                    <Button variant="text" color="inherit">
                        <NavLink id="navbar-title-btn" to="/" exact className={ styles.NavLink }>
                            <Typography variant="h6" noWrap>{ props.title }</Typography>
                        </NavLink>
                    </Button>
                    {
                        isNotPhone &&
                        <>
                            <div className={ styles.left }>
                                <NavbarItems
                                    isAuth={ props.isAuth }
                                    items={ props.items }
                                    navLinkClass={ styles.NavLink }
                                />
                            </div>
                            <div>
                                {
                                    props.showAuthBtn &&
                                    <Button
                                        id="navbar-auth-btn"
                                        variant="text"
                                        color="inherit"
                                        onClick={ authAction }
                                    >
                                        { authBtnText }
                                    </Button>
                                }
                            </div>
                        </>
                    }
                </Toolbar>
            </AppBar>
            <MobileMenu
                menuOpen={ state.menuOpen }
                handleMenuClose={ handleMenuClose }
                authAction={ authAction }
                authBtnText={ authBtnText }
                isAuth={ props.isAuth }
                title={ props.title }
                items={ props.items }
                showAuthBtn={ props.showAuthBtn }
            />
        </>
    );
};

export default Navbar;
