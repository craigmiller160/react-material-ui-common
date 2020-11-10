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

import React, { ChangeEvent, useState } from 'react';
import MuiTabs from '@material-ui/core/Tabs';
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router';
import { Tab } from '@material-ui/core';
import { TabConfig } from '../types';
import classes from './Tabs.module.scss';

// Only designed at the moment to work with tabs at the end of the react router path

export interface Props {
    id?: string;
    tabs: TabConfig[];
}

interface State {
    selectedTab: number;
}

const tabPathMatch = (pathname: string, tabPath: string): boolean => {
    const parts = pathname.split('/');
    const end = `/${parts[parts.length - 1]}`;
    return end === tabPath;
};

const Tabs = (props: Props) => {
    const {
        tabs,
        id
    } = props;
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const tabIndex = tabs.findIndex((tab) =>
        tabPathMatch(location.pathname, tab.path));
    const [ state, setState ] = useState<State>({
        selectedTab: tabIndex >= 0 ? tabIndex : 0
    });

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number): void => {
        setState((prevState) => ({
            ...prevState,
            selectedTab: newValue
        }));
        const { path } = tabs[newValue];
        const uri = `${match.url}${path}`;
        history.push(uri);
    };

    return (
        <div id={ id } className={ classes.TabsContainer }>
            <MuiTabs
                value={ state.selectedTab }
                indicatorColor="primary"
                textColor="primary"
                centered
                onChange={ handleTabChange }
            >
                {
                    tabs.map((tab, index) => {
                        const tabId = tab.id ?? `tab_${index}`;
                        return (
                            <Tab id={ tabId } key={ tabId } label={ tab.label } />
                        );
                    })
                }
            </MuiTabs>
            <Switch>
                {
                    tabs.map((tab, index) => (
                        <Route
                            key={ tab.path }
                            path={ `${match.path}${tab.path}` }
                            exact
                            component={ tab.component }
                        />
                    ))
                }
                {
                    tabs.length > 0 &&
                    <Redirect to={ `${match.path}${tabs[0].path}` } />
                }
            </Switch>
        </div>
    );
};

export default Tabs;
