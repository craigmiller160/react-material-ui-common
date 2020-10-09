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
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import alertSlice, { AlertState } from './slice';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Collapse from '@material-ui/core/Collapse';

interface Props {
    alertStateName?: string;
}

type RootState = { [key: string]: AlertState };

const capitalize = (text: string) => {
    const firstLetter = text.substring(0, 1).toUpperCase();
    return `${firstLetter}${text.substring(1)}`;
};

const ReduxAlert = (props: Props) => {
    const alertStateName: string = props.alertStateName ?? 'alert';
    const dispatch = useDispatch();
    const alertState = useSelector<RootState,AlertState>((state) => state[alertStateName], shallowEqual);
    return (
        <Collapse in={ alertState.show }>
            <MuiAlert
                severity={ alertState.type }
                onClose={ () => dispatch(alertSlice.actions.hideAlert()) }
            >
                <AlertTitle>{ capitalize(alertState.type) }</AlertTitle>
                { alertState.message }
            </MuiAlert>
        </Collapse>
    );
};

export default ReduxAlert;