'use strict';

import uglify from 'rollup-plugin-uglify';

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/accounting.min.js',
    format: 'umd',
    name: 'accounting'
  },
  plugins: [
    uglify()
  ]
};
