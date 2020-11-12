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

import { combineReducers, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import alertSlice from '../../src/ReduxAlert/slice';

const rootReducer = combineReducers({
    alert: alertSlice.reducer
});

const message = 'Message';

describe('ReduxAlert.slice', () => {
    let store: Store;
    beforeEach(() => {
        store = configureStore({
            reducer: rootReducer
        });
    });

    it('initial state', () => {
        expect(store.getState()).toEqual({
            alert: {
                show: false,
                message: '',
                type: 'success'
            }
        });
    });

    it('showErrorAlert', () => {
        store.dispatch(alertSlice.actions.showErrorAlert(message));
        expect(store.getState()).toEqual({
            alert: {
                show: true,
                message,
                type: 'error'
            }
        });
    });

    it('showSuccessAlert', () => {
        store.dispatch(alertSlice.actions.showSuccessAlert(message));
        expect(store.getState()).toEqual({
            alert: {
                show: true,
                message,
                type: 'success'
            }
        });
    });

    it('hideAlert', () => {
        store.dispatch(alertSlice.actions.showErrorAlert(message));
        store.dispatch(alertSlice.actions.hideAlert());
        expect(store.getState()).toEqual({
            alert: {
                show: false,
                message,
                type: 'error'
            }
        });
    });
});
