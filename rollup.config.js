'use strict';

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/accounting.js',
    format: 'umd',
    name: 'accounting',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    sourcemaps()
  ]
};
