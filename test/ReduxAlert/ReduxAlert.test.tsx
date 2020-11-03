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
import ReduxAlert, { Props as ReduxAlertProps } from '../../src/ReduxAlert';
import createTestReduxProvider from '../utils/createTestReduxProvider';
import createTestComponent from '../utils/createTestComponent';
import { mount, ReactWrapper } from 'enzyme';

const defaultProps: ReduxAlertProps = {
    id: 'the-alert',
    alertStateName: 'alert'
};

const defaultStoreState = {
    alert: {
        show: true,
        type: 'success',
        message: 'Hello World'
    }
};
type StoreStateType = typeof defaultStoreState;

const TestReduxProvider = createTestReduxProvider<StoreStateType>(defaultStoreState);
const TestReduxAlert = createTestComponent<ReduxAlertProps>(defaultProps, ReduxAlert);

describe('ReduxAlert', () => {
    describe('rendering', () => {
        it('renders alert', () => {
            const wrapper: ReactWrapper = mount(
                <TestReduxProvider>
                    <TestReduxAlert />
                </TestReduxProvider>
            );

            console.log(wrapper.debug()); // TODO delete this
        });
    });

    describe('behavior', () => {
        it('closes alert', () => {
            throw new Error();
        });
    });
});
