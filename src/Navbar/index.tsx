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