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

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const cwd = process.cwd();
const libPath = path.resolve(cwd, 'lib');
const srcPath = path.resolve(cwd, 'src');

glob.sync(`${srcPath}/**/*.scss`)
    .map((file) => {
        const relative = file.replace(srcPath, '');
        return [file, `${libPath}${relative}`];
    })
    .forEach(([src, dest]) => fs.copyFileSync(src, dest));