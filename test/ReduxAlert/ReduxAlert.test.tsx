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
    createTestReduxProvider,
    renderingValidator,
    RenderedItem
} from '@craigmiller160/react-test-utils';
import ReduxAlert, { Props as ReduxAlertProps } from '../../src/ReduxAlert';

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

const [ TestReduxProvider, storeHandler ] = createTestReduxProvider<StoreStateType>(defaultStoreState);
const TestReduxAlert = createTestComponent<ReduxAlertProps>(defaultProps, ReduxAlert);

const rootDivItem: RenderedItem = {
    selector: 'div#the-alert-container',
    values: [ {} ]
};

const collapseItem: RenderedItem = {
    selector: 'ForwardRef(Collapse)',
    values: [
        {
            props: {
                in: true
            }
        }
    ]
};

const muiAlertItem: RenderedItem = {
    selector: 'ForwardRef(Alert)',
    values: [
        {
            props: {
                id: 'the-alert',
                severity: 'success',
                onClose: expect.any(Function)
            }
        }
    ]
};

const muiAlertTitleItem: RenderedItem = {
    selector: 'ForwardRef(AlertTitle)',
    values: [
        {
            props: {
                id: 'the-alert-title'
            },
            text: 'Success'
        }
    ]
};

const muiAlertMsgItem: RenderedItem = {
    selector: 'span#the-alert-message',
    values: [
        {
            text: 'Hello World'
        }
    ]
};

describe('ReduxAlert', () => {
    describe('rendering', () => {
        it('renders alert', () => {
            const wrapper: ReactWrapper = mount(
                <TestReduxProvider>
                    <TestReduxAlert />
                </TestReduxProvider>
            );

            const items: RenderedItem[] = [
                rootDivItem,
                collapseItem,
                muiAlertItem,
                muiAlertTitleItem,
                muiAlertMsgItem
            ];

            renderingValidator(wrapper, items);
        });
    });

    describe('behavior', () => {
        it('closes alert', () => {
            const wrapper: ReactWrapper = mount(
                <TestReduxProvider>
                    <TestReduxAlert />
                </TestReduxProvider>
            );

            (wrapper.find('ForwardRef(Alert)').props() as any).onClose();

            expect(storeHandler.store?.getActions()).toEqual([
                {
                    type: 'alert/hideAlert',
                    payload: undefined
                }
            ]);
        });
    });
});
