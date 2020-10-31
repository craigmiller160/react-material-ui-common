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
import BaseDialog, { Props as BaseDialogProps } from '../../../src/Dialog/BaseDialog';
import createTestComponent from '../../utils/createTestComponent';
import { mount, ReactWrapper } from 'enzyme';
import renderingValidator, { RenderedItem } from '../../utils/renderingValidator';

const actionClick = jest.fn();

const defaultProps: PropsWithChildren<BaseDialogProps> = {
    id: 'BaseDialog',
    open: true,
    title: 'Base Dialog',
    actions: [
        {
            label: 'Action',
            onClick: actionClick
        }
    ],
    className: 'MyClass'
};

const TestBaseDialog = createTestComponent(defaultProps, BaseDialog);

const dialogRoot: RenderedItem = {
    selector: 'WithStyles(ForwardRef(Dialog))',
    values: [
        {
            props: {
                id: 'BaseDialog',
                open: true,
                className: 'BaseDialog MyClass'
            }
        }
    ]
};

const dialogTitle: RenderedItem = {
    selector: 'ForwardRef(DialogTitle)',
    values: [
        {
            text: 'Base Dialog'
        }
    ]
};

const dialogContent: RenderedItem = {
    selector: 'ForwardRef(DialogContent)',
    values: [{}]
};

const dialogActions: RenderedItem = {
    selector: 'ForwardRef(DialogActions) ForwardRef(Button)',
    values: [
        {
            props: {
                id: 'BaseDialog-btn-0',
                color: 'primary',
                onClick: expect.any(Function)
            }
        }
    ]
};

describe('BaseDialog', () => {
    describe('rendering', () => {
        it('renders dialog', () => {
            const wrapper: ReactWrapper = mount(
                <TestBaseDialog>
                    <p>Hello World</p>
                </TestBaseDialog>
            );

            const contentBody: RenderedItem = {
                selector: 'ForwardRef(DialogContent) p',
                values: [
                    {
                        text: 'Hello World'
                    }
                ]
            };

            const items: Array<RenderedItem> = [
                dialogRoot,
                dialogTitle,
                dialogContent,
                contentBody,
                dialogActions
            ];

            renderingValidator(wrapper, items);
        });
    });

    describe('actions', () => {
        it('handles button action', () => {
            const wrapper: ReactWrapper = mount(
                <TestBaseDialog />
            );

            wrapper.find('button#BaseDialog-btn-0').simulate('click');
            expect(actionClick).toHaveBeenCalled();
        });
    });
});