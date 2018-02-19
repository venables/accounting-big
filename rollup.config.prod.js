'use strict';

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/accounting.min.js',
    format: 'umd',
    name: 'accounting',
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs(),
    sourcemaps(),
    uglify()
  ]
};
