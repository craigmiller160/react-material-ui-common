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
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { NavbarItem } from '../types';
import styles from './MobileMenu.module.scss';

export interface Props {
    menuOpen: boolean;
    handleMenuClose: () => void;
    authAction: () => void;
    authBtnText: string;
    isAuth: boolean;
    title: string;
    items: Array<NavbarItem>;
    showAuthBtn: boolean;
}

const useStyles = makeStyles((theme) => ({
    MenuPrimary: {
        backgroundColor: theme.palette.primary.main
    }
}));

const MobileMenu = (props: Props) => {
    const classes = useStyles();
    const location = useLocation();

    const authButtonClick = () => {
        props.handleMenuClose();
        props.authAction();
    };

    return (
        <Drawer
            classes={ {
                paper: classes.MenuPrimary
            } }
            className={ styles.MobileMenu }
            open={ props.menuOpen }
            onClose={ props.handleMenuClose }
        >
            <NavLink
                id="navbar-mobile-title-btn"
                to="/"
                exact
                className={ styles.NavLink }
            >
                <Typography
                    className={ styles.title }
                    variant="h6"
                    noWrap
                    onClick={ props.handleMenuClose }
                >
                    { props.title }
                </Typography>
            </NavLink>
            {
                props.isAuth && props.items.map((item) => {
                    const isMatch: boolean = !!matchPath(location.pathname, {
                        path: item.to,
                        exact: item.exact
                    });

                    const activeClass = isMatch ? 'active' : '';
                    const itemClass = `menu-item ${styles.item} ${activeClass}`;

                    const idString = item.to
                        .replace(/^\//, '')
                        .replace(/\//g, '-');

                    return (
                        <ListItem
                            id={ `navbar-mobile-item-${idString}` }
                            key={ idString }
                            className={ itemClass }
                            onClick={ props.handleMenuClose }
                        >
                            <NavLink
                                to={ item.to }
                                exact={ item.exact }
                                className={ styles.NavLink }
                            >
                                <ListItemText>{ item.text }</ListItemText>
                            </NavLink>
                        </ListItem>
                    );
                })
            }
            {
                props.showAuthBtn &&
                <ListItem
                    id="navbar-mobile-auth-btn"
                    className={ styles.item }
                    onClick={ authButtonClick }
                >
                    <ListItemText className={ styles.NavLink }>{ props.authBtnText }</ListItemText>
                </ListItem>
            }
        </Drawer>
    );
};

export default MobileMenu;
