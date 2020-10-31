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
import { PageHeader, SectionHeader, PublicProps as HeaderProps } from '../../src/Header';
import createTestComponent from '../utils/createTestComponent';
import renderingValidator, { RenderedItem } from '../utils/renderingValidator';

const defaultProps: HeaderProps = {
    title: 'TheHeader',
    noDivider: false,
    id: 'header'
};

const TestSectionHeader = createTestComponent(defaultProps, SectionHeader);
const TestPageHeader = createTestComponent(defaultProps, PageHeader);

const headerDivItem: RenderedItem = {
    selector: 'div#header',
    values: [
        {
            props: {
                className: 'Header'
            }
        }
    ]
};

const h3Item: RenderedItem = {
    selector: 'h3',
    values: [
        {
            text: 'TheHeader'
        }
    ]
};

const noH3Item: RenderedItem = {
    selector: 'h3',
    values: []
};

const h5Item: RenderedItem = {
    selector: 'h5',
    values: [
        {
            text: 'TheHeader'
        }
    ]
};

const noH5Item: RenderedItem = {
    selector: 'h5',
    values: []
};

const hrItem: RenderedItem = {
    selector: 'hr',
    values: [{}]
};

const noHrItem: RenderedItem = {
    selector: 'hr',
    values: []
};

describe('Header', () => {
    describe('PageHeader', () => {
        it('renders with divider', () => {
            const wrapper: ReactWrapper = mount(
                <TestPageHeader />
            );

            const items: Array<RenderedItem> = [
                headerDivItem,
                h3Item,
                noH5Item,
                hrItem
            ];

            renderingValidator(wrapper, items);
        });

        it('renders without divider', () => {
            const wrapper: ReactWrapper = mount(
                <TestPageHeader noDivider />
            );

            const items: Array<RenderedItem> = [
                headerDivItem,
                h3Item,
                noH5Item,
                noHrItem
            ];

            renderingValidator(wrapper, items);
        });
    });

    describe('SectionHeader', () => {
        it('renders with divider', () => {
            const wrapper: ReactWrapper = mount(
                <TestSectionHeader />
            );

            const items: Array<RenderedItem> = [
                headerDivItem,
                noH3Item,
                h5Item,
                hrItem
            ];

            renderingValidator(wrapper, items);
        });

        it('renders without divider', () => {
            const wrapper: ReactWrapper = mount(
                <TestSectionHeader noDivider />
            );

            const items: Array<RenderedItem> = [
                headerDivItem,
                noH3Item,
                h5Item,
                noHrItem
            ];

            renderingValidator(wrapper, items);
        });
    });
});
