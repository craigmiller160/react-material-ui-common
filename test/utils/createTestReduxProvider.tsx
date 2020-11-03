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

import React, { PropsWithChildren } from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const createMockStore = configureStore([thunk]);

const createTestReduxProvider = <State extends object>(defaultState: State) => (stateProps: Partial<PropsWithChildren<State>>) => {
    const actualState: State = {
        ...defaultState,
        ...stateProps
    };

    const store = createMockStore(actualState);

    return (
        <Provider store={ store }>
            { stateProps.children }
        </Provider>
    );
};

export default createTestReduxProvider;
