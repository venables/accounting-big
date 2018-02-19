'use strict';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/accounting.js',
    format: 'umd',
    name: 'accounting'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};
