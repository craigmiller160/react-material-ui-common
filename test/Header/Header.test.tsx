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
import createTestComponent from '../utils/CreateTestComponent';
import renderingValidator, { RenderedItem } from '../utils/renderingValidator';

const defaultProps: HeaderProps = {
    title: 'TheHeader',
    noDivider: false,
    id: 'header'
};

const TestSectionHeader = createTestComponent(defaultProps, SectionHeader);
const TestPageHeader = createTestComponent(defaultProps, PageHeader);

describe('Header', () => {
    describe('PageHeader', () => {
        it('renders with divider', () => {
            const wrapper: ReactWrapper = mount(
                <TestPageHeader />
            );

            const items: Array<RenderedItem> = [
                {
                    selector: 'div#header',
                    values: [
                        {
                            props: {
                                className: 'Header'
                            },
                            propsExact: false
                        }
                    ]
                },
                {
                    selector: 'h3',
                    values: [
                        {
                            text: 'TheHeader'
                        }
                    ]
                },
                {
                    selector: 'h5',
                    values: []
                },
                {
                    selector: 'hr',
                    values: [{}]
                }
            ];

            renderingValidator(wrapper, items);
        });

        it('renders without divider', () => {
            throw new Error();
        });
    });

    describe('SectionHeader', () => {
        it('renders with divider', () => {
            throw new Error();
        });

        it('renders without divider', () => {
            throw new Error();
        });
    });
});
