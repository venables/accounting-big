'use strict';

import config from './rollup.config';
import uglify from 'rollup-plugin-uglify';

config.output.file = 'dist/accounting.min.js';
config.plugins.push(uglify());

export default config;
