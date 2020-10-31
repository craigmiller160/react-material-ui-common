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
import ConfirmDialog, { Props as ConfirmDialogProps } from '../../../src/Dialog/ConfirmDialog';
import createTestComponent from '../../utils/createTestComponent';

const onConfirm = jest.fn();
const onCancel = jest.fn();

const defaultProps: ConfirmDialogProps = {
    id: 'ConfirmDialog',
    open: true,
    title: 'Confirm Dialog',
    message: 'This is a confirm message',
    onCancel,
    onConfirm
};

const TestConfirmDialog = createTestComponent(defaultProps, ConfirmDialog);

describe('ConfirmDialog', () => {
    describe('rendering', () => {
        it('renders dialog', () => {
            throw new Error();
        });
    });

    describe('behavior', () => {
        it('onConfirm', () => {
            throw new Error();
        });

        it('onCancel', () => {
            throw new Error();
        });
    });
});