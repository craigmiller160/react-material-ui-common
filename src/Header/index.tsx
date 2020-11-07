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
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Variant } from '@material-ui/core/styles/createTypography';
import classes from './Header.module.scss';

export interface PublicProps {
    title: string;
    noDivider?: boolean;
    id?: string;
}

interface HeaderProps extends PublicProps {
    variant?: Variant;
}

const BaseHeader = ({ title, variant, noDivider, id }: HeaderProps) => (
    <div id={ id } className={ classes.Header }>
        <Typography variant={ variant }>{ title }</Typography>
        {
            !noDivider &&
            <Divider />
        }
    </div>
);

export const PageHeader = (props: PublicProps) => <BaseHeader { ...props } variant="h3" />;
export const SectionHeader = (props: PublicProps) => <BaseHeader { ...props } variant="h5" />;
