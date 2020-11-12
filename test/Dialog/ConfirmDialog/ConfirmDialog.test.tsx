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
import { mount, ReactWrapper } from 'enzyme';
import ConfirmDialog, { Props as ConfirmDialogProps } from '../../../src/Dialog/ConfirmDialog';
import createTestComponent from '../../utils/createTestComponent';
import renderingValidator, { RenderedItem } from '../../utils/renderingValidator';

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

const baseDialogItem: RenderedItem = {
    selector: 'BaseDialog',
    values: [
        {
            props: {
                id: 'ConfirmDialog',
                open: true,
                title: 'Confirm Dialog',
                actions: [
                    { label: 'Confirm', onClick: expect.any(Function) },
                    { label: 'Cancel', onClick: expect.any(Function) }
                ]
            }
        }
    ]
};

const textItem: RenderedItem = {
    selector: 'ForwardRef(DialogContentText) p',
    values: [
        {
            text: 'This is a confirm message'
        }
    ]
};

describe('ConfirmDialog', () => {
    describe('rendering', () => {
        it('renders dialog', () => {
            const wrapper: ReactWrapper = mount(
                <TestConfirmDialog />
            );

            const items: Array<RenderedItem> = [
                baseDialogItem,
                textItem
            ];

            renderingValidator(wrapper, items);
        });
    });

    describe('behavior', () => {
        it('onConfirm', () => {
            const wrapper: ReactWrapper = mount(
                <TestConfirmDialog />
            );

            wrapper.find('button#ConfirmDialog-btn-0').simulate('click');
            expect(onConfirm).toHaveBeenCalled();
        });

        it('onCancel', () => {
            const wrapper: ReactWrapper = mount(
                <TestConfirmDialog />
            );

            wrapper.find('button#ConfirmDialog-btn-1').simulate('click');
            expect(onCancel).toHaveBeenCalled();
        });
    });
});
