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
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { NavbarItem } from '../types';

export interface Props {
    isAuth: boolean;
    items: Array<NavbarItem>;
    navLinkClass: string;
}

const NavbarItems = (props: Props) => {
    const location = useLocation();

    if (!props.isAuth) {
        return <div />;
    }

    return (
        <>
            {
                props.items.map((item) => {
                    const active = matchPath(location.pathname, {
                        path: item.to,
                        exact: item.exact
                    });

                    const idString = item.to
                        .replace(/^\//, '')
                        .replace(/\//g, '-');

                    return (
                        <NavLink
                            id={ `navbar-item-${idString}` }
                            key={ idString }
                            to={ item.to }
                            className={ props.navLinkClass }
                        >
                            <Button
                                variant={ active ? 'contained' : 'text' }
                                color={ active ? 'default' : 'inherit' }
                            >
                                { item.text }
                            </Button>
                        </NavLink>
                    );
                })
            }
        </>
    );
};

export default NavbarItems;
