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

import React, { MouseEvent } from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import BaseDialog from '../BaseDialog';
import { DialogAction } from '../../types';

interface Props {
    id?: string;
    open: boolean;
    title: string;
    message: string;
    onConfirm: (event: MouseEvent<HTMLButtonElement>) => void;
    onCancel: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ConfirmDialog = (props: Props) => {
    const {
        id,
        open,
        title,
        message,
        onConfirm,
        onCancel
    } = props;

    const actions: Array<DialogAction> = [
        { label: 'Confirm', onClick: onConfirm },
        { label: 'Cancel', onClick: onCancel }
    ];

    return (
        <BaseDialog
            id={ id }
            open={ open }
            title={ title }
            actions={ actions }>
            <DialogContentText>{ message }</DialogContentText>
        </BaseDialog>
    );
};

export default ConfirmDialog;
