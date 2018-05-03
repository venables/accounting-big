'use strict';

import config from './rollup.config.js';

config.output.file = 'dist/accounting.js';
config.output.format = 'umd';
config.output.name = 'accounting';

export default config;
