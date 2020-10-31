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

import { ReactWrapper } from 'enzyme';

export interface RenderedItemValue {
    text?: string;
    props?: object;
    propsExact?: boolean; // Defaults to true
}

export interface RenderedItem {
    selector: string;
    values: Array<RenderedItemValue>;
}

const renderingValidator = (wrapper: ReactWrapper, items: Array<RenderedItem>) => {
    items.forEach((item) => {
        const foundItem = wrapper.find(item.selector);
        expect(foundItem).toHaveLength(item.values.length);

        item.values.forEach((value, index) => {
            const foundItemAtIndex = foundItem.at(index);
            if (value.text) {
                expect(foundItemAtIndex.text()).toEqual(value.text);
            }

            const propsExact = value.propsExact ?? true;

            if (value.props && propsExact) {
                expect(foundItemAtIndex.props()).toEqual(value.props);
            } else if (value.props) {
                expect(foundItemAtIndex.props()).toEqual(expect.objectContaining(value.props));
            }
        });
    });
};

export default renderingValidator;
