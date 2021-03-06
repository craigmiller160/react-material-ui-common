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

import alertSlice from './ReduxAlert/slice';

export { default as Navbar } from './Navbar';
export { SectionHeader, PageHeader } from './Header';
export { default as Tabs } from './Tabs';
export { ConfirmDialog, BaseDialog } from './Dialog';
export { default as ReduxAlert } from './ReduxAlert';
export const reduxAlertReducer = alertSlice.reducer;
export const {
    showErrorAlert: showErrorReduxAlert,
    showSuccessAlert: showSuccessReduxAlert,
    hideAlert: hideReduxAlert
} = alertSlice.actions;
export type { NavbarItem, TabConfig, DialogAction } from './types';
